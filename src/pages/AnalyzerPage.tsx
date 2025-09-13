import { Container, Row, Col } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { Shield, Zap, Eye } from 'lucide-react'
import InputForm from '../components/InputForm'

const AnalyzerPage = () => {
  const features = [
    {
      icon: <Shield className="feature-icon-small" />,
      title: "High-Grade Security",
      description: "Advanced AI detection with 99.7% accuracy rate"
    },
    {
      icon: <Zap className="feature-icon-small" />,
      title: "Lightning Fast",
      description: "Get results in under 3 seconds"
    },
    {
      icon: <Eye className="feature-icon-small" />,
      title: "Privacy Protected",
      description: "Zero data retention, completely anonymous"
    }
  ]

  return (
    <div className="analyzer-page">
      {/* Hero Section */}
      <section className="analyzer-hero">
        <Container>
          <Row>
            <Col lg={12} className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="analyzer-badge">
                  <Shield size={16} />
                  <span>Free AI-Powered Analysis</span>
                </div>
                <h1 className="analyzer-title">
                  Verify Content with 
                  <span className="gradient-text"> AI Intelligence</span>
                </h1>
                <p className="analyzer-subtitle">
                  Paste any message, link, or article to instantly detect scams, phishing, and fake news
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Bar */}
      <section className="analyzer-features-bar">
        <Container>
          <Row>
            {features.map((feature, index) => (
              <Col lg={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="analyzer-feature-item"
                >
                  {feature.icon}
                  <div>
                    <h6 className="feature-title-small">{feature.title}</h6>
                    <p className="feature-desc-small">{feature.description}</p>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Main Analyzer Section */}
      <section className="analyzer-main">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} xl={8}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <InputForm />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Security Notice */}
      <section className="security-notice">
        <Container>
          <Row>
            <Col lg={12} className="text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="security-badge"
              >
                <Shield size={20} />
                <span>
                  🔒 Your data is processed securely and never stored. 
                  We analyze your content and immediately discard it.
                </span>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default AnalyzerPage 