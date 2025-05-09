import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  const Home = getIcon('Home');
  const AlertTriangle = getIcon('AlertTriangle');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
    >
      <div className="mb-8">
        <motion.div 
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ 
            scale: [0.8, 1.2, 1],
            rotate: [-10, 10, 0]
          }}
          transition={{ 
            duration: 0.8,
            ease: "easeInOut" 
          }}
          className="inline-block p-6 bg-surface-100 dark:bg-surface-800 rounded-full mb-6"
        >
          <AlertTriangle className="w-16 h-16 text-accent" />
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Page Not Found</h1>
        <p className="text-surface-600 dark:text-surface-300 text-lg mb-8 max-w-md mx-auto">
          Oops! It seems the task you're looking for has disappeared into the productivity void.
        </p>
        
        <Link to="/" className="btn-primary inline-flex items-center space-x-2">
          <Home className="w-5 h-5" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFound;