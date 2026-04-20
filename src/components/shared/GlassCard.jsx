import { motion } from 'framer-motion';

/**
 * GlassCard — A reusable glass-morphism card component
 * with Framer Motion hover and lift effects
 *
 * Props:
 *   - children: React node(s) to render inside the card
 *   - style: Optional CSS style object to override defaults
 *   - onClick: Optional click handler
 *   - className: Optional additional className
 *   - hoverLift: Boolean (default: true) — enable hover lift animation
 *   - dark: Boolean (default: false) — use dark glass variant
 *   - delay: Number (default: 0) — animation delay in seconds
 */

const GlassCard = ({
  children,
  style = {},
  onClick,
  className = '',
  hoverLift = true,
  dark = false,
  delay = 0,
}) => {
  const baseStyle = {
    position: 'relative',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  };

  const glassStyle = dark
    ? {
        background: 'rgba(15, 23, 42, 0.5)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }
    : {
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border)',
        boxShadow: 'var(--glass-shadow)',
      };

  const hoverAnimation = hoverLift
    ? {
        whileHover: { y: -6, scale: 1.02 },
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
          duration: 0.3,
        },
      }
    : {};

  return (
    <motion.div
      className={`glass-card ${className}`}
      style={{ ...baseStyle, ...glassStyle }}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay,
        ease: 'easeOut',
      }}
      {...hoverAnimation}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
