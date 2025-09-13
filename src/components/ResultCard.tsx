import React from 'react'
import { Card, Badge, ListGroup } from 'react-bootstrap'
import { motion } from 'framer-motion'
import classNames from 'classnames'

interface StructuredResult {
  verdict: 'SAFE' | 'SUSPICIOUS' | 'SCAM' | 'TRUSTWORTHY' | 'QUESTIONABLE' | 'LIKELY_FAKE'
  confidence: number
  explanation: string
  signals: string[]
  rawText?: string
}

interface ResultCardProps {
  result: StructuredResult
}

const verdictClass = (v: StructuredResult['verdict']) => {
  switch (v) {
    case 'SAFE':
    case 'TRUSTWORTHY':
      return 'verdict-safe'
    case 'SCAM':
    case 'LIKELY_FAKE':
      return 'verdict-scam'
    case 'SUSPICIOUS':
    case 'QUESTIONABLE':
    default:
      return 'verdict-suspicious'
  }
}

const verdictLabel = (v: StructuredResult['verdict']) => {
  switch (v) {
    case 'SAFE':
      return 'Appears Safe'
    case 'TRUSTWORTHY':
      return 'Trustworthy'
    case 'SUSPICIOUS':
      return 'Suspicious'
    case 'QUESTIONABLE':
      return 'Questionable'
    case 'SCAM':
      return 'Likely Scam/Phishing'
    case 'LIKELY_FAKE':
      return 'Likely Fake'
    default:
      return 'Result'
  }
}

const verdictIcon = (v: StructuredResult['verdict']) => {
  switch (v) {
    case 'SAFE':
    case 'TRUSTWORTHY':
        return '✅'
    case 'SCAM':
    case 'LIKELY_FAKE':
        return '🚨'
    case 'SUSPICIOUS':
    case 'QUESTIONABLE':
      default:
      return '⚠️'
  }
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-4">
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">
          <div className="text-center mb-3">
            <div className="mb-2">
              <span style={{ fontSize: '2rem' }}>{verdictIcon(result.verdict)}</span>
            </div>
            <Badge className={classNames('verdict-badge', verdictClass(result.verdict))}>{verdictLabel(result.verdict)}</Badge>
            <div className="mt-2">
              <small className="text-muted">Confidence: {Math.round(result.confidence)}%</small>
            </div>
          </div>

          <div className="mt-4">
            <h5 className="mb-3">Explanation</h5>
            <div 
              className="p-3 rounded" 
              style={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef', whiteSpace: 'pre-wrap', textAlign: 'left', lineHeight: '1.6' }}
            >
              {result.explanation}
            </div>
          </div>

          {result.signals && result.signals.length > 0 && (
            <div className="mt-4">
              <h6 className="mb-2">Signals</h6>
              <ListGroup>
                {result.signals.map((s, i) => (
                  <ListGroup.Item key={i}>{s}</ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          )}

          <div className="mt-4 text-center">
            <small className="text-muted">Always verify information from multiple sources and trust your instincts</small>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  )
}

export default ResultCard 