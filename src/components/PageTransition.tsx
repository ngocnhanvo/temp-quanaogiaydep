import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 600);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {/* Curtain effect - left side */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isTransitioning ? { scaleX: 1 } : { scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="fixed left-0 top-0 w-1/2 h-screen bg-primary origin-left z-50 pointer-events-none"
      />
      
      {/* Curtain effect - right side */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isTransitioning ? { scaleX: 1 } : { scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.1 }}
        className="fixed right-0 top-0 w-1/2 h-screen bg-secondary origin-right z-50 pointer-events-none"
      />
    </>
  );
}
