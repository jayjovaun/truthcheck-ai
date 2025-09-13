import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { Shield, Zap, CheckCircle, Link as LinkIcon, MessageSquare, Newspaper } from 'lucide-react'
import { Link } from 'react-router-dom'

const FeaturesPage = () => {
  const mainFeatures = [
    {
      icon: <Shield className="main-feature-icon" />,
      title: 'Security First',
      badge: 'Protection',
      description:
        'Hardened by secure headers, input validation, and rate limiting. Built to help you assess content safely.',
      points: ['Helmet security headers', 'Strict input limits', 'Smart error handling'],
    },
    {
      icon: <Zap className="main-feature-icon" />,
      title: 'Real-time AI',
      badge: 'Speed',
      description:
        'Fast, structured AI responses designed for clear decisions with explanations and signals.',
      points: ['Structured JSON output', 'Clear verdict + confidence', 'Actionable signals'],
    },
  ]

  const analysisTypes = [
    {
      icon: <MessageSquare className="analysis-icon" />,
      title: 'Message / Email',
      description:
        'Detect phishing tactics, urgent language, requests for credentials, and credibility red flags.',
    },
    {
      icon: <LinkIcon className="analysis-icon" />,
      title: 'Suspicious Link',
      description:
        'Evaluate URL structure and signals before you click. Designed for safer browsing decisions.',
    },
    {
      icon: <Newspaper className="analysis-icon" />,
      title: 'News / Article',
      description:
        'Assess credibility, emotional framing, and verifiable claims to spot misinformation.',
    },
  ]

  return (
    <div className="features-page">
      {/* Hero */}
      <section className="features-hero">
        <Container>
          <Row>
            <Col lg={12} className="text-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <h1 className="features-title">Explore Features</h1>
                <p className="features-subtitle">Modern AI tooling to help you evaluate risky content quickly and clearly</p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Main features */}
      <section className="main-features-section">
        <Container>
          <Row>
            {mainFeatures.map((feature, index) => (
              <Col lg={6} className="mb-4" key={feature.title}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="main-feature-card">
                    <Card.Body>
                      <div className="main-feature-header">
                        {feature.icon}
                        <div>
                          <h4 className="main-feature-title">{feature.title}</h4>
                          <Badge bg="primary" className="feature-badge">
                            {feature.badge}
                          </Badge>
                        </div>
                      </div>
                      <p className="main-feature-description">{feature.description}</p>
                      <ul className="feature-list">
                        {feature.points.map((p) => (
                          <li key={p}>
                            <CheckCircle size={16} className="feature-check" /> {p}
                          </li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Analysis types */}
      <section className="analysis-types-section">
        <Container>
          <Row>
            {analysisTypes.map((item, index) => (
              <Col lg={4} className="mb-4" key={item.title}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="analysis-type-card">
                    <Card.Body>
                      <div className="analysis-type-header">
                        {item.icon}
                        <h5 className="analysis-type-title">{item.title}</h5>
                      </div>
                      <p className="analysis-type-description">{item.description}</p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          <Row className="mt-4">
            <Col lg={12} className="text-center">
              <Button as={Link as any} to="/analyzer" size="lg" className="cta-button">
                Try the Free Analyzer
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default FeaturesPage
