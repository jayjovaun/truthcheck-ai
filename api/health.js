// Vercel serverless function for health check
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
    res.status(200).json({ 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'production',
      vercel: true
    })
  } catch (error) {
    console.error('Health check error:', error)
    res.status(500).json({ 
      status: 'unhealthy',
      error: 'Internal server error',
      timestamp: new Date().toISOString()
    })
  }
}
