import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', variant = 'default', noHover = false, ...rest }) {
  const base = variant === 'large' ? 'glass-lg p-8 sm:p-10' : 'glass p-6 sm:p-8';
  const hover = noHover ? '' : 'glass-hover';

  return (
    <motion.div
      className={`${base} ${hover} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
