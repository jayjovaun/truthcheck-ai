import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Zap, 
  Lock, 
  CheckCircle,
  ArrowRight,
  Globe,
  Brain
} from 'lucide-react'

const HomePage = () => {
  const features = [
    {
      icon: <Brain className="feature-icon" />,
      title: "AI-Powered Detection",
      description: "Advanced machine learning algorithms analyze content patterns to identify potential threats."
    },
    {
      icon: <Zap className="feature-icon" />,
      title: "Real-Time Analysis",
      description: "Get instant results in seconds. Our AI processes your content quickly and efficiently."
    },
    {
      icon: <Lock className="feature-icon" />,
      title: "Privacy First",
      description: "Zero data retention. Your content is analyzed and immediately discarded. No accounts required."
    },
    {
      icon: <Globe className="feature-icon" />,
      title: "Multi-Language Support",
      description: "Detect threats in multiple languages. Protection for a connected world."
    }
  ]

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="hero-badge">
                  <Shield size={16} />
                  <span>AI-Powered Protection</span>
                </div>
                <h1 className="hero-title">
                  Advanced AI Protection
                  <span className="gradient-text"> Against Digital Threats</span>
                </h1>
                <p className="hero-subtitle">
                 AI technology for detecting phishing, scams, and misinformation. 
                  Analyze any message, link, or article in seconds with professional-grade accuracy.
                </p>
                <div className="hero-buttons">
                  <Button
                    as={Link as any}
                    to="/analyzer"
                    size="lg"
                    className="hero-primary-btn"
                  >
                    Try Free Analyzer
                    
                  </Button>
                  <Button
                    as={Link as any}
                    to="/features"
                    variant="outline-light"
                    size="lg"
                    className="hero-secondary-btn"
                  >
                    Learn More
                  </Button>
                </div>
                <div className="hero-stats">
                  <div className="stat-item">
                    <CheckCircle size={16} />
                    <span>No signup required</span>
                  </div>
                  <div className="stat-item">
                    <CheckCircle size={16} />
                    <span>100% private</span>
                  </div>
                  <div className="stat-item">
                    <CheckCircle size={16} />
                    <span>Always free</span>
                  </div>
                </div>
              </motion.div>
            </Col>
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hero-visual"
              >
                <div className="hero-dashboard">
                  <div className="dashboard-header">
                    <div className="dashboard-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div className="dashboard-title">TruthCheck AI</div>
                  </div>
                  <div className="dashboard-content">
                    <div className="scan-animation">
                      <div className="scan-line"></div>
                      <div className="scan-result safe">
                        <CheckCircle size={24} />
                        <span>Content Verified Safe</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <Container>
          <Row>
            <Col lg={12} className="text-center mb-5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="section-title">
                  Powered by Advanced AI
                </h2>
                <p className="section-subtitle">
                  Experience the future of digital security with cutting-edge artificial intelligence
                </p>
              </motion.div>
            </Col>
          </Row>
          <Row>
            {features.map((feature, index) => (
              <Col lg={6} key={index} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="feature-card">
                    <Card.Body>
                      <div className="feature-header">
                        {feature.icon}
                        <h4 className="feature-title">{feature.title}</h4>
                      </div>
                      <p className="feature-description">{feature.description}</p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Container>
          <Row>
            <Col lg={12} className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="cta-title">Ready to Stay Safe?</h2>
                <p className="cta-subtitle">
                  Start protecting yourself with TruthCheck AI
                </p>
                <Button
                  as={Link as any}
                  to="/analyzer"
                  size="lg"
                  className="cta-button"
                >
                  Start Free Analysis
                  <ArrowRight size={20} className="ms-2" />
                </Button>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default HomePage 