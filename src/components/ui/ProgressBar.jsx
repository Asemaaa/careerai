export default function ProgressBar({ value }) {
  const pct = Math.min(100, Math.max(0, Math.round(value * 100)));
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10">
      <div
        className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-sky-400 to-fuchsia-400 transition-all duration-500"
        style={{ width: `${pct}%` }}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
