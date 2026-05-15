import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-lg font-semibold text-white">CareerAI</p>
          <p className="mt-1 max-w-md text-sm text-slate-400">
            Mock frontend demo — swap copy, routes, and JSON data as you connect a real backend later.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-300">
          <Link className="hover:text-white" to="/demanded">
            Market demand
          </Link>
          <Link className="hover:text-white" to="/tours">
            Profession tours
          </Link>
          <Link className="hover:text-white" to="/excursions">
            Company excursions
          </Link>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} CareerAI — built with React, Vite & Tailwind.
      </div>
    </footer>
  );
}
