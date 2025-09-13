import { Container, Row, Col, Card } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { Shield, Globe, Award, Target, Heart } from 'lucide-react'

const AboutPage = () => {
  const values = [
   
    {
      icon: <Globe className="value-icon" />,
      title: "Accessible Technology",
      description: "Making advanced AI protection available to everyone, everywhere."
    },
    {
      icon: <Award className="value-icon" />,
      title: "Continuous Innovation",
      description: "Constantly improving our AI to stay ahead of emerging threats."
    },
    {
      icon: <Target className="value-icon" />,
      title: "User-Focused Design",
      description: "Building tools that are powerful yet simple to use."
    }
  ]

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <Container>
          <Row>
            <Col lg={12} className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="about-title">
                  About <span className="gradient-text">TruthCheck AI</span>
                </h1>
                <p className="about-subtitle">
                  AI-powered protection against digital threats, scams, and misinformation
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="story-title">Our Mission</h2>
                <p className="story-text">
                  TruthCheck AI was created to help people navigate the increasingly complex digital landscape safely. 
                  With the rise of sophisticated scams, phishing attacks, and misinformation, we believe everyone 
                  deserves access to powerful AI protection tools.
                </p>
                <p className="story-text">
                  Our goal is to make advanced threat detection accessible to everyone, regardless of their technical 
                  background. We're committed to privacy, accuracy, and making the internet a safer place for all.
                </p>
              </motion.div>
            </Col>
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="mission-highlight">
                  <Heart className="mission-icon" />
                  <h3>Building a Safer Internet</h3>
                  <p>One analysis at a time</p>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <Container>
          <Row>
            <Col lg={12} className="text-center mb-5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="section-title">Our Values</h2>
                <p className="section-subtitle">
                  The principles that guide everything we do
                </p>
              </motion.div>
            </Col>
          </Row>
          <Row>
            {values.map((value, index) => (
              <Col lg={6} key={index} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="value-card">
                    <Card.Body>
                      <div className="value-header">
                        {value.icon}
                        <h4 className="value-title">{value.title}</h4>
                      </div>
                      <p className="value-description">{value.description}</p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Creator Section */}
      <section className="team-section">
        <Container>
          <Row>
            <Col lg={12} className="text-center mb-5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="section-title">Creator</h2>
                <p className="section-subtitle">
                  Meet the person behind TruthCheck AI
                </p>
              </motion.div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={6} md={8}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="team-card">
                  <Card.Body className="text-center">
                    <div className="team-avatar">
                      <Shield size={48} />
                    </div>
                    <h4 className="team-name">Josh Ivan Sartin</h4>
                    <p className="team-role">Creator & Developer</p>
                 
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission Statement */}
      <section className="mission-section">
        <Container>
          <Row>
            <Col lg={12} className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="mission-title">Our Commitment</h2>
                <p className="mission-text">
                  We're committed to providing free, accessible AI-powered protection against digital threats. 
                  Your privacy is our priority - we never store your data, and our tools are designed to be 
                  simple yet powerful.
                </p>
                <p className="mission-text">
                  TruthCheck AI represents our dedication to making the internet a safer place through 
                  innovative technology and user-focused design.
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default AboutPage 