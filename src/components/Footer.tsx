import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', path: '/features' },
        { label: 'Analyzer', path: '/analyzer' },
        { label: 'About', path: '/about' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'How It Works', path: '/features' },
        { label: 'Get Started', path: '/analyzer' },
        
      ]
    }
  ]

  return (
    <footer className="footer-wrapper">
      <Container>
        <Row className="footer-main">
          <Col lg={6} className="footer-brand">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="footer-logo">
                <Shield className="footer-logo-icon" />
                <span className="footer-brand-text">TruthCheck AI</span>
              </div>
              <p className="footer-description">
                AI-powered protection against scams, phishing, and fake news. 
                Safeguarding your digital world with cutting-edge technology.
              </p>
            </motion.div>
          </Col>

          {footerSections.map((section, index) => (
            <Col lg={3} md={4} sm={6} key={section.title} className="footer-section">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h6 className="footer-section-title">{section.title}</h6>
                <ul className="footer-links">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.path} className="footer-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Col>
          ))}
        </Row>

        <hr className="footer-divider" />

        <Row className="footer-bottom">
          <Col md={6}>
            <p className="footer-copyright">
              © {currentYear} TruthCheck AI. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="footer-made-with">
              Professional AI-powered security solutions
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer 