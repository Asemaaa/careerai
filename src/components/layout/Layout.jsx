import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

/**
 * Global chrome: gradient backdrop + sticky nav + footer on every page.
 */
export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-slate-950 bg-glow-radial" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid-fade" />
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">{children}</main>
      <Footer />
    </div>
  );
}
