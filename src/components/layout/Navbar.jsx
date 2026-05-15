import { NavLink } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import Button from '../ui/Button.jsx';

const linkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
  }`;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2 font-display text-lg font-semibold text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 shadow-glow">
            <Sparkles className="h-5 w-5 text-white" aria-hidden />
          </span>
          CareerAI
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/career-test" className={linkClass}>
            Career Test
          </NavLink>
          <NavLink to="/results" className={linkClass}>
            Results
          </NavLink>
          <NavLink to="/demanded" className={linkClass}>
            Demand
          </NavLink>
          <NavLink to="/tours" className={linkClass}>
            Tours
          </NavLink>
          <NavLink to="/excursions" className={linkClass}>
            Excursions
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Button to="/career-test" className="hidden sm:inline-flex">
            Start Career Test
          </Button>
        </div>
      </div>

      {/* Mobile nav strip */}
      <div className="flex gap-1 overflow-x-auto border-t border-white/5 px-3 py-2 md:hidden">
        <NavLink to="/" className={linkClass} end>
          Home
        </NavLink>
        <NavLink to="/career-test" className={linkClass}>
          Test
        </NavLink>
        <NavLink to="/results" className={linkClass}>
          Results
        </NavLink>
        <NavLink to="/demanded" className={linkClass}>
          Demand
        </NavLink>
        <NavLink to="/tours" className={linkClass}>
          Tours
        </NavLink>
        <NavLink to="/excursions" className={linkClass}>
          Trips
        </NavLink>
      </div>
    </header>
  );
}
