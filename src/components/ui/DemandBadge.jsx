const tone = {
  high: 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30',
  medium: 'bg-amber-500/15 text-amber-200 ring-1 ring-amber-400/25',
  low: 'bg-slate-500/20 text-slate-200 ring-1 ring-slate-400/20',
};

export default function DemandBadge({ level }) {
  const label = level === 'high' ? 'Высокий' : level === 'medium' ? 'Средний' : 'Низкий';
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${tone[level] || tone.medium}`}>
      Спрос: {label}
    </span>
  );
}
