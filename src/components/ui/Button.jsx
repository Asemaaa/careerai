import { Link } from 'react-router-dom';

const variants = {
  primary:
    'bg-gradient-to-r from-sky-400 to-blue-600 text-white shadow-glow hover:shadow-glow-lg hover:brightness-110 border border-sky-400/30',
  ghost:
    'bg-white/[0.04] text-slate-200 border border-white/[0.1] hover:bg-white/[0.08] hover:border-white/[0.18] hover:text-white',
  subtle:
    'bg-navy-800/80 text-slate-200 border border-white/[0.08] hover:border-sky-400/30 hover:bg-navy-800 hover:text-white',
};

export default function Button({ to, href, children, variant = 'primary', className = '', disabled, ...props }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400/60';

  const disabledCls = disabled ? 'pointer-events-none opacity-40' : '';

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
