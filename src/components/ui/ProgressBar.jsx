export default function ProgressBar({ value }) {
  const pct = Math.min(100, Math.max(0, Math.round(value * 100)));
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
      <div
        className="h-full rounded-full bg-gradient-to-r from-sky-500 via-sky-300 to-white shadow-[0_0_12px_rgba(56,189,248,0.5)] transition-all duration-700 ease-out"
        style={{ width: `${pct}%` }}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
