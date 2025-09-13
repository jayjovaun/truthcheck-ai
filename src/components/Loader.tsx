import { Spinner } from 'react-bootstrap'
import { motion } from 'framer-motion'

const Loader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="loading-spinner my-5"
    >
      <div className="text-center">
        <Spinner 
          animation="border" 
          variant="primary" 
          style={{ width: '3rem', height: '3rem' }}
        />
        <div className="mt-3">
          <p className="mb-1" style={{ fontSize: '1.1rem', fontWeight: '500' }}>
            AI is analyzing your content...
          </p>
          <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
            This may take a few seconds
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default Loader 