import { motion } from 'framer-motion';

/**
 * PageTransition — Wraps entire pages with entrance/exit animations
 * Provides smooth fade + slide transitions between routes
 *
 * Props:
 *   - children: React node(s) — the page content to animate
 *   - duration: Number (default: 0.4) — animation duration in seconds
 *   - direction: 'up' | 'down' (default: 'up') — slide direction
 *   - className: Optional additional className
 */

const PageTransition = ({
  children,
  duration = 0.4,
  direction = 'up',
  className = '',
}) => {
  const slideDistance = direction === 'up' ? 24 : -24;

  return (
    <motion.div
      className={`page-transition ${className}`}
      initial={{ opacity: 0, y: slideDistance }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -slideDistance }}
      transition={{
        duration,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
