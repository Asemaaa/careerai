import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-navy-950">
      <div className="orb -left-32 top-0 h-[500px] w-[500px] bg-sky-500/15 animate-pulse-glow" aria-hidden />
      <div className="orb -right-24 top-1/4 h-[400px] w-[400px] bg-blue-600/10 animate-float-slow" aria-hidden />
      <div className="orb bottom-0 left-1/3 h-[350px] w-[350px] bg-sky-400/8 animate-float" aria-hidden />

      <div className="pointer-events-none fixed inset-0 -z-10 bg-mesh-hero" aria-hidden />
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage: `linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
        aria-hidden
      />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 -z-10 h-48 bg-slide-fade" aria-hidden />

      <Navbar />
      <main className="relative mx-auto w-full max-w-[1400px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">{children}</main>
      <Footer />
    </div>
  );
}
