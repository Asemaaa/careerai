import { motion } from 'framer-motion';

/**
 * Reusable glass panel — used across marketing sections and cards.
 */
export default function GlassCard({ children, className = '', ...rest }) {
  return (
    <motion.div
      className={`glass rounded-2xl p-6 glass-hover ${className}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
