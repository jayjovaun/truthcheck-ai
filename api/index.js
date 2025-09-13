// Vercel serverless function for API root endpoint
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Method not allowed. Use GET.' 
    })
  }

  try {
    res.json({ 
      message: 'TruthCheck AI API',
      version: '2.0.0',
      platform: 'Vercel Serverless',
      endpoints: {
        health: '/api/health',
        analyze: '/api/analyze (POST)'
      }
    })
  } catch (error) {
    console.error('API root error:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      timestamp: new Date().toISOString()
    })
  }
}
