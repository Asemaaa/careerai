import { Link } from 'react-router-dom';

const variants = {
  primary:
    'bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 text-white shadow-glow hover:brightness-110',
  ghost: 'bg-white/5 text-slate-100 border border-white/10 hover:bg-white/10',
  subtle: 'bg-slate-900/60 text-slate-100 border border-white/10 hover:border-white/20',
};

/**
 * Primary CTA / secondary buttons with consistent sizing.
 */
export default function Button({ to, href, children, variant = 'primary', className = '', disabled, ...props }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400';

  const disabledCls = disabled ? 'cursor-not-allowed opacity-40' : '';

  if (to) {
    return (
      <Link to={to} className={`${base} ${variants[variant]} ${disabledCls} ${className}`} aria-disabled={disabled || undefined} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={`${base} ${variants[variant]} ${disabledCls} ${className}`} aria-disabled={disabled || undefined} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" disabled={disabled} className={`${base} ${variants[variant]} ${disabledCls} ${className}`} {...props}>
      {children}
    </button>
  );
}
