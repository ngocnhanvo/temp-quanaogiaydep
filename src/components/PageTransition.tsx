import {AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
export const handlePageLink = (e: React.MouseEvent, path: string, navigate: any) => {
    e.preventDefault();
    console.log(`window.location.pathname`, window.location.pathname, `path`, path);
    
    if(window.location.pathname != path)
      window.dispatchEvent(new Event('app:nav-start'));
    
    setTimeout(() => {
      navigate(path);
      //window.scrollTo(0, 0);
    }, 0);
};

export const PageTransition = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let startTime = 0;
    const MIN_DURATION = 500; // Đảm bảo hiệu ứng tránh nhấp nháy

    const start = () => {
      startTime = Date.now();
      setIsAnimating(true);
    };

    const stop = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_DURATION - elapsed);
      
      // Đợi cho đến khi đủ thời gian tối thiểu mới tắt hiệu ứng
      setTimeout(() => {
        setIsAnimating(false);
      }, remaining);
    };

    window.addEventListener('app:nav-start', start);
    window.addEventListener('app:nav-end', stop);

    return () => {
      window.removeEventListener('app:nav-start', start);
      window.removeEventListener('app:nav-end', stop);
    };
  }, []);

  return (
    <>
      {/* Magazine flip effect - left page */}
      <motion.div
        initial={{ rotateY: 0, opacity: 0 }}
        animate={isAnimating ? { rotateY: 90, opacity: 1 } : { rotateY: 0, opacity: 0 }}
        exit={{ rotateY: 0, opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="fixed left-0 top-0 w-1/2 h-screen bg-gradient-to-r from-primary to-foreground origin-right z-50 pointer-events-none"
        style={{ perspective: '1200px' }}
      />
      
      {/* Magazine flip effect - right page */}
      <motion.div
        initial={{ rotateY: 0, opacity: 0 }}
        animate={isAnimating ? { rotateY: -90, opacity: 1 } : { rotateY: 0, opacity: 0 }}
        exit={{ rotateY: 0, opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.05 }}
        className="fixed right-0 top-0 w-1/2 h-screen bg-gradient-to-l from-secondary to-primary origin-left z-50 pointer-events-none"
        style={{ perspective: '1200px' }}
      />

      {/* Shimmer accent for fashion effect */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={isAnimating ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
        exit={{ opacity: 0, scaleX: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.15 }}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/2 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 z-50 pointer-events-none"
      />
    </>
  );
}
