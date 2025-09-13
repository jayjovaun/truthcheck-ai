import { useEffect, useState } from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Menu, X } from 'lucide-react'
import { checkServerHealth } from '../lib/api'

const Header = () => {
  const [expanded, setExpanded] = useState(false)
  const location = useLocation()
  const [serverHealthy, setServerHealthy] = useState<boolean | null>(null)

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/features', label: 'Features' },
    { path: '/about', label: 'About' },
  ]

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      try {
        const ok = await checkServerHealth()
        if (isMounted) setServerHealthy(ok)
      } catch {
        if (isMounted) setServerHealthy(false)
      }
    })()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="header-wrapper"
    >
      <Navbar expand="lg" className="custom-navbar" expanded={expanded}>
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand-logo">
            <motion.div
              className="logo-container"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Shield className="logo-icon" />
              <span className="brand-text">TruthCheck AI</span>
            </motion.div>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="custom-toggler"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <X size={24} /> : <Menu size={24} />}
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Nav.Link
                    as={Link as any}
                    to={item.path}
                    className={`nav-link-custom ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={() => setExpanded(false)}
                  >
                    {item.label}
                  </Nav.Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="ms-3"
              >
                <Button
                  as={Link as any}
                  to="/analyzer"
                  variant="primary"
                  className="cta-button"
                  onClick={() => setExpanded(false)}
                >
                  Try Free Analyzer
                </Button>
              </motion.div>

              {/* Health status chip */}
              <div className="ms-3" aria-label="server-health" title="Server health">
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 12px',
                    borderRadius: 999,
                    background: 'rgba(255,255,255,0.15)',
                    color: 'white',
                    fontSize: 12,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 999,
                      background: serverHealthy == null ? 'gold' : serverHealthy ? '#27ca3f' : '#ff5f56',
                    }}
                  />
                  {serverHealthy == null ? 'Checking...' : serverHealthy ? 'Server: OK' : 'Server: Down'}
                </span>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.header>
  )
}

export default Header 