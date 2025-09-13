import axios from 'axios'
import { API_BASE_URL } from '../config/api'

export type Verdict = 'SAFE' | 'SUSPICIOUS' | 'SCAM' | 'TRUSTWORTHY' | 'QUESTIONABLE' | 'LIKELY_FAKE'

export interface AnalysisResponse {
  result: {
    verdict: Verdict
    confidence: number
    explanation: string
    signals: string[]
    rawText?: string
  }
}

// Generate structured prompt
const generatePrompt = (content: string, type: 'message' | 'link' | 'news'): string => {
  const base = `You are an AI security assistant. Analyze the INPUT for risks.
Return STRICT JSON with this exact schema and no extra text:
{"verdict":"SAFE|SUSPICIOUS|SCAM|TRUSTWORTHY|QUESTIONABLE|LIKELY_FAKE","confidence":0-100,"explanation":"string","signals":["string",...],"rawText":"string"}

Guidelines:
- Provide concise, actionable explanation.
- Pick a single most appropriate verdict.
- confidence is an integer 0-100.
- signals are short bullet phrases.
`

  switch (type) {
    case 'message':
      return `${base}
Context: Message/Email
INPUT:\n${content}`
    case 'link':
      return `${base}
Context: URL/Link
INPUT:\n${content}`
    case 'news':
      return `${base}
Context: News/Article
INPUT:\n${content}`
    default:
      return `${base}
Context: General
INPUT:\n${content}`
  }
}

export const analyzeContent = async (
  content: string,
  type: 'message' | 'link' | 'news'
): Promise<AnalysisResponse['result']> => {
  try {
    const prompt = generatePrompt(content, type)

    const response = await axios.post<AnalysisResponse>(
      `${API_BASE_URL}/api/analyze`,
      { prompt },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 30000,
      }
    )

    return response.data.result
  } catch (error: unknown) {
    console.error('API Error:', error)

    if (axios.isAxiosError(error)) {
      if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
        throw new Error('API service is unavailable. Please check your internet connection.')
      } else if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.')
      } else if (error.response?.status === 500) {
        const errorMsg = (error.response?.data as any)?.error || 'Server error'
        if (typeof errorMsg === 'string' && errorMsg.includes('configuration error')) {
          throw new Error('Server missing API key. Please configure GEMINI_API_KEY in environment variables.')
        }
        throw new Error('Server error. Please try again later.')
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout. Please try again.')
      }
    }

    throw new Error('Failed to analyze content. Please check your connection and try again.')
  }
}

export const checkServerHealth = async (): Promise<boolean> => {
  const attempt = async (timeoutMs: number): Promise<boolean> => {
    try {
      // Allow non-200s so we can decide whether to retry
      const response = await axios.get(`${API_BASE_URL}/api/health`, {
        timeout: timeoutMs,
        validateStatus: () => true,
      })
      return response.status === 200
    } catch (err) {
      return false
    }
  }

  // First try (shorter) to keep UI snappy
  const okQuick = await attempt(8000)
  if (okQuick) return true

  // If first probe fails (e.g., Render cold start), wait briefly and retry with longer timeout
  await new Promise((r) => setTimeout(r, 1500))
  const okRetry = await attempt(15000)
  return okRetry
}