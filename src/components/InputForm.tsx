import { useState } from 'react'
import { Form, Button, ButtonGroup, Alert, ProgressBar } from 'react-bootstrap'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Link, Newspaper, Shield, Zap, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { analyzeContent, type AnalysisResponse } from '../lib/api'
import ResultCard from './ResultCard'
import Loader from './Loader'
import { toast } from 'react-hot-toast'

const InputForm = () => {
  const [input, setInput] = useState('')
  const [analysisType, setAnalysisType] = useState<'message' | 'link' | 'news'>('message')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResponse['result'] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    setError(null)
    setResult(null)
    setProgress(0)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 200)

    try {
      const analysisResult = await analyzeContent(input, analysisType)
      setResult(analysisResult)
      setProgress(100)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Analysis failed. Please try again.'
      setError(message)
      try { toast.error(message) } catch {}
      console.error('Analysis error:', err)
    } finally {
      clearInterval(progressInterval)
      setIsLoading(false)
      setTimeout(() => setProgress(0), 1000)
    }
  }

  const getPlaceholder = () => {
    switch (analysisType) {
      case 'message':
        return `Example: "Congratulations! You've won $1,000,000! Click here to claim your prize now! Limited time offer!"

Paste any suspicious message, email, or text here...`
      case 'link':
        return `Example: https://suspicious-website.com/claim-prize

Enter any URL or link you want to check...`
      case 'news':
        return `Example: "Scientists Discover That Drinking Coffee Cures All Diseases"

Paste a news headline or article content...`
      default:
        return 'Enter content to analyze...'
    }
  }

  const getAnalysisTypeConfig = () => {
    const configs = {
      message: {
        icon: <MessageSquare size={20} />,
        label: 'Message/Email',
        description: 'Analyze messages, emails, and texts for scams and phishing',
        color: 'primary',
        examples: ['Phishing emails', 'Scam messages', 'Social engineering']
      },
      link: {
        icon: <Link size={20} />,
        label: 'Suspicious Link',
        description: 'Check URLs and links for malicious content',
        color: 'success',
        examples: ['Malicious websites', 'Fake login pages', 'Cryptocurrency scams']
      },
      news: {
        icon: <Newspaper size={20} />,
        label: 'News Article',
        description: 'Verify news articles and content for misinformation',
        color: 'info',
        examples: ['Fake news', 'Misinformation', 'Biased reporting']
      }
    }
    return configs[analysisType]
  }

  const currentConfig = getAnalysisTypeConfig()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="analysis-card">
        <div className="text-center mb-4">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-3"
          >
            <div className="analysis-type-icon">
              {currentConfig.icon}
            </div>
          </motion.div>
          <h2 className="analysis-title">AI Content Analysis</h2>
          <p className="analysis-description">
            {currentConfig.description}
          </p>
        </div>

        {/* Analysis Type Selection */}
        <div className="analysis-type-selector mb-4">
          <h5 className="selector-title">Choose Analysis Type</h5>
          <ButtonGroup className="w-100 analysis-type-buttons">
            {(['message', 'link', 'news'] as const).map((type) => {
              const config = {
                message: { icon: <MessageSquare size={18} />, label: 'Message/Email', color: 'primary' },
                link: { icon: <Link size={18} />, label: 'Suspicious Link', color: 'success' },
                news: { icon: <Newspaper size={18} />, label: 'News Article', color: 'info' }
              }[type]

              return (
                <Button
                  key={type}
                  variant={analysisType === type ? config.color : `outline-${config.color}`}
                  onClick={() => setAnalysisType(type)}
                  className="analysis-type-btn"
                >
                  {config.icon}
                  <span className="btn-label">{config.label}</span>
                </Button>
              )
            })}
          </ButtonGroup>
        </div>

        {/* Detection Examples */}
        <div className="detection-examples mb-4">
          <h6 className="examples-title">
            <Shield size={16} className="me-2" />
            This analysis detects:
          </h6>
          <div className="examples-list">
            {currentConfig.examples.map((example, index) => (
              <span key={index} className="example-badge">
                {example}
              </span>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label className="form-label-modern">
              <span className="label-text">Content to Analyze</span>
              <span className="label-counter">
                {input.length} / 10,000 characters
              </span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={8}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={getPlaceholder()}
              className="form-control-modern"
              maxLength={10000}
              disabled={isLoading}
            />
            {input.length > 9000 && (
              <Form.Text className="text-warning">
                <AlertTriangle size={14} className="me-1" />
                Approaching character limit
              </Form.Text>
            )}
          </Form.Group>

          <div className="submit-section">
            <Button
              type="submit"
              size="lg"
              disabled={!input.trim() || isLoading}
              className="submit-button w-100"
            >
              {isLoading ? (
                <>
                  <div className="spinner-border spinner-border-sm me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  Analyzing Content...
                </>
              ) : (
                <>
                  <Zap size={20} className="me-2" />
                  Analyze with AI
                </>
              )}
            </Button>
            
            {isLoading && (
              <div className="progress-container mt-3">
                <ProgressBar
                  now={progress}
                  className="modern-progress"
                  animated
                  striped
                />
                <small className="progress-text">
                  {progress < 30 ? 'Preparing analysis...' :
                   progress < 60 ? 'Processing content...' :
                   progress < 90 ? 'AI analyzing patterns...' :
                   'Finalizing results...'}
                </small>
              </div>
            )}
          </div>
        </Form>

        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4"
            >
              <Alert variant="danger" className="modern-alert">
                <XCircle size={20} className="me-2" />
                {error}
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Spinner */}
        {isLoading && <Loader />}

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <ResultCard result={result} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tips Section */}
        <div className="tips-section mt-4">
          <h6 className="tips-title">
            <CheckCircle size={16} className="me-2" />
            Pro Tips for Better Results
          </h6>
          <ul className="tips-list">
            <li>Include the complete message or URL for accurate analysis</li>
            <li>For emails, include sender information and subject line</li>
            <li>For news articles, include headlines and key claims</li>
            <li>The more context provided, the more accurate the analysis</li>
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export default InputForm 