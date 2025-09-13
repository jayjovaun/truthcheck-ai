// Vercel serverless function for content analysis
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed. Use POST.' 
    })
  }

  try {
    const { prompt } = req.body

    // Validation
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ 
        error: 'Invalid request: prompt is required and must be a string' 
      })
    }

    if (prompt.length > 10000) {
      return res.status(400).json({ 
        error: 'Prompt too long: maximum 10,000 characters allowed' 
      })
    }

    // Check for Gemini API key
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not configured')
      return res.status(500).json({ 
        error: 'Server configuration error: AI service not available' 
      })
    }

    // Optional URL analysis (heuristics) when analyzing links
    let preSignals = []
    let preRiskScore = 0
    let candidateUrl = null
    if (typeof prompt === 'string' && /Context:\s*URL\/Link/i.test(prompt)) {
      candidateUrl = extractUrlFromPrompt(prompt)
      const { signals, riskScore } = analyzeUrlHeuristics(candidateUrl)
      preSignals = signals
      preRiskScore = riskScore
      // Reputation checks (optional)
      if (candidateUrl) {
        try {
          const { signals: repSignals, riskDelta } = await checkDomainReputation(candidateUrl)
          preSignals = [...preSignals, ...repSignals]
          preRiskScore += riskDelta
        } catch {}
      }
    }

    // Prepare the request to Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`
    
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    }

    console.log('Sending request to Gemini API...')
    
    // Make request to Gemini API (Node 18+ global fetch)
    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text()
      console.error('Gemini API Error:', {
        status: geminiResponse.status,
        statusText: geminiResponse.statusText,
        body: errorText
      })
      
      if (geminiResponse.status === 429) {
        return res.status(429).json({ 
          error: 'AI service rate limit exceeded. Please try again later.' 
        })
      }
      
      return res.status(500).json({ 
        error: 'AI service unavailable. Please try again later.' 
      })
    }

    const data = await geminiResponse.json()
    console.log('Gemini API response received')

    // Extract the generated text
    const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!generatedText) {
      console.error('No text generated from Gemini API:', data)
      return res.status(500).json({ 
        error: 'Failed to generate analysis. Please try again.' 
      })
    }

    // Try to parse structured JSON from the model; fallback to raw text
    let structured
    try {
      // Extract possible JSON substring
      const match = generatedText.match(/\{[\s\S]*\}/)
      structured = match ? JSON.parse(match[0]) : JSON.parse(generatedText)
    } catch (_) {
      structured = null
    }

    if (
      structured &&
      typeof structured.verdict === 'string' &&
      typeof structured.confidence === 'number' &&
      typeof structured.explanation === 'string' &&
      Array.isArray(structured.signals)
    ) {
      return res.json({
        result: {
          verdict: structured.verdict,
          confidence: Math.max(0, Math.min(100, Math.round(structured.confidence))),
          explanation: structured.explanation,
          signals: [...preSignals, ...structured.signals].slice(0, 12),
          rawText: generatedText.trim(),
        },
        timestamp: new Date().toISOString(),
      })
    }

    // Fallback normalization
    const lower = generatedText.toLowerCase()
    let fallbackVerdict = lower.includes('scam') || lower.includes('phishing')
      ? 'SCAM'
      : lower.includes('suspicious') || lower.includes('warning')
      ? 'SUSPICIOUS'
      : lower.includes('trustworthy') || lower.includes('safe')
      ? 'SAFE'
      : 'SUSPICIOUS'

    // If heuristics indicate notable risk, bias verdict towards Suspicious
    if (preRiskScore >= 20 && fallbackVerdict === 'SAFE') {
      fallbackVerdict = 'SUSPICIOUS'
    }

    res.json({ 
      result: {
        verdict: fallbackVerdict,
        confidence: Math.max(40, Math.min(85, 50 + preRiskScore)),
        explanation: 'Heuristic verdict due to unstructured model output.',
        signals: [...preSignals, 'Keyword-based assessment'],
        rawText: generatedText.trim(),
      },
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    console.error('Server Error:', error)
    
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      return res.status(504).json({ 
        error: 'Request timeout. Please try again.' 
      })
    }
    
    res.status(500).json({ 
      error: 'Internal server error. Please try again later.' 
    })
  }
}

// ------------------------------
// Helpers: URL extraction and heuristics
// ------------------------------
const extractUrlFromPrompt = (promptText) => {
  try {
    // Expect our prompt includes a section: "Context: URL/Link" and then INPUT:\n<url>
    const inputIndex = promptText.indexOf('INPUT:')
    if (inputIndex === -1) return null
    const input = promptText.slice(inputIndex + 'INPUT:'.length).trim()
    // First token or first URL-like substring
    const urlMatch = input.match(/https?:\/\/[^\s\n]+/i)
    return urlMatch ? urlMatch[0] : null
  } catch (e) {
    return null
  }
}

const analyzeUrlHeuristics = (urlString) => {
  const signals = []
  let riskScore = 0
  if (!urlString) return { signals, riskScore, isValid: false }

  try {
    const url = new URL(urlString)
    const host = url.hostname || ''
    const tld = host.split('.').pop() || ''

    const suspiciousTlds = new Set(['zip', 'mov', 'xyz', 'top', 'click', 'work', 'ru', 'tk'])
    const shorteners = new Set(['bit.ly', 't.co', 'tinyurl.com', 'goo.gl', 'is.gd', 'ow.ly', 'buff.ly'])

    // Non-https
    if (url.protocol !== 'https:') {
      signals.push('Uses non-HTTPS protocol')
      riskScore += 10
    }
    // IP literal
    if (/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
      signals.push('IP address host (not a domain)')
      riskScore += 20
    }
    // IDN homograph indicator
    if (host.includes('xn--')) {
      signals.push('Internationalized domain (possible homograph)')
      riskScore += 15
    }
    // Excessive subdomains
    if (host.split('.').length >= 4) {
      signals.push('Many subdomains')
      riskScore += 10
    }
    // Suspicious TLD
    if (suspiciousTlds.has(tld)) {
      signals.push(`Suspicious TLD .${tld}`)
      riskScore += 10
    }
    // Link shortener
    if (shorteners.has(host)) {
      signals.push('URL shortener (destination obscured)')
      riskScore += 15
    }
    // Unusual port
    if (url.port && url.port !== '80' && url.port !== '443') {
      signals.push(`Unusual port :${url.port}`)
      riskScore += 10
    }
    // Phishy keywords
    const lc = (url.pathname + url.search).toLowerCase()
    const phishy = ['login', 'verify', 'password', 'account', 'bank', 'update']
    if (phishy.some((k) => lc.includes(k))) {
      signals.push('Contains sensitive-action keywords')
      riskScore += 10
    }
    // Long query
    if (url.search.length > 200) {
      signals.push('Very long query string')
      riskScore += 5
    }

    return { signals, riskScore, isValid: true }
  } catch (e) {
    signals.push('Invalid URL format')
    riskScore += 20
    return { signals, riskScore, isValid: false }
  }
}

// ------------------------------
// Optional: Domain reputation checks (configurable)
// ------------------------------
const extractDomainFromUrl = (urlString) => {
  try {
    const { hostname } = new URL(urlString)
    return hostname || null
  } catch {
    return null
  }
}

const checkPhishingDatabase = async (urlOrDomain) => {
  // Public phishing DB (optional). Non-fatal on failure.
  try {
    const candidate = encodeURIComponent(urlOrDomain)
    const resp = await fetch(`https://phish.sinking.yachts/v2/check/${candidate}`, { method: 'GET' })
    if (!resp.ok) return null
    const data = await resp.json()
    // API typically returns { status: 'ok', is_scphish?: boolean } — tolerate shape variations
    const flags = []
    if (data && (data.match || data.isScam || data.is_phish === true || data.isPhish === true || data.is_phishing === true)) {
      flags.push('Listed in phishing database')
    }
    return flags
  } catch {
    return null
  }
}

const checkDomainReputation = async (urlString) => {
  const enable = process.env.ENABLE_REPUTATION_CHECKS === '1'
  if (!enable) return { signals: [], riskDelta: 0 }

  const domain = extractDomainFromUrl(urlString)
  if (!domain) return { signals: [], riskDelta: 0 }

  const signals = []
  let riskDelta = 0

  const phishingFlags = await checkPhishingDatabase(domain)
  if (Array.isArray(phishingFlags) && phishingFlags.length > 0) {
    signals.push(...phishingFlags)
    riskDelta += 25
  }

  return { signals, riskDelta }
}
