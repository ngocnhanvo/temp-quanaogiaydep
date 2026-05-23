import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 700);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {/* Magazine flip effect - left page */}
      <motion.div
        initial={{ rotateY: 0, opacity: 0 }}
        animate={isTransitioning ? { rotateY: 90, opacity: 1 } : { rotateY: 0, opacity: 0 }}
        exit={{ rotateY: 0, opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="fixed left-0 top-0 w-1/2 h-screen bg-gradient-to-r from-primary to-foreground origin-right z-50 pointer-events-none"
        style={{ perspective: '1200px' }}
      />
      
      {/* Magazine flip effect - right page */}
      <motion.div
        initial={{ rotateY: 0, opacity: 0 }}
        animate={isTransitioning ? { rotateY: -90, opacity: 1 } : { rotateY: 0, opacity: 0 }}
        exit={{ rotateY: 0, opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.05 }}
        className="fixed right-0 top-0 w-1/2 h-screen bg-gradient-to-l from-secondary to-primary origin-left z-50 pointer-events-none"
        style={{ perspective: '1200px' }}
      />

      {/* Shimmer accent for fashion effect */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={isTransitioning ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
        exit={{ opacity: 0, scaleX: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.15 }}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/2 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 z-50 pointer-events-none"
      />
    </>
  );
}
