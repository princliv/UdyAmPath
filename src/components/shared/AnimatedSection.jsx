import { motion } from 'framer-motion';

/**
 * AnimatedSection — Scroll-triggered animation wrapper
 * Reveals children when they come into view with staggered animations
 *
 * Props:
 *   - children: React node(s) to render inside the section
 *   - delay: Number (default: 0) — initial animation delay in seconds
 *   - direction: 'up' | 'left' | 'right' (default: 'up') — entrance direction
 *   - className: Optional additional className
 *   - staggerChildren: Boolean (default: false) — stagger child animations
 *   - amount: Number (default: 0.2) — viewport visibility threshold (0-1)
 *   - once: Boolean (default: true) — animate only once on scroll
 */

const AnimatedSection = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  staggerChildren = false,
  amount = 0.2,
  once = true,
}) => {
  // Direction variants
  const getInitialVariant = () => {
    switch (direction) {
      case 'left':
        return { opacity: 0, x: -50 };
      case 'right':
        return { opacity: 0, x: 50 };
      case 'up':
      default:
        return { opacity: 0, y: 50 };
    }
  };

  const getAnimateVariant = () => {
    switch (direction) {
      case 'left':
        return { opacity: 1, x: 0 };
      case 'right':
        return { opacity: 1, x: 0 };
      case 'up':
      default:
        return { opacity: 1, y: 0 };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: staggerChildren
        ? {
            staggerChildren: 0.1,
            delayChildren: delay,
          }
        : { delay },
    },
  };

  const itemVariants = {
    hidden: getInitialVariant(),
    visible: {
      ...getAnimateVariant(),
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  if (staggerChildren && Array.isArray(children)) {
    return (
      <motion.div
        className={`animated-section ${className}`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount }}
      >
        {Array.isArray(children) &&
          children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`animated-section ${className}`}
      initial={getInitialVariant()}
      whileInView={getAnimateVariant()}
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut',
      }}
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
