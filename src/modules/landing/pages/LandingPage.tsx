import { ServicesStrip } from '../components/ServicesStrip';

export function LandingPage() {
  return (
    <div className="page-root">
      <div className="landing-root">
        <div className="landing-orb" aria-hidden="true" />
        <div className="landing-orb-2" aria-hidden="true" />

        <main className="landing-content">
          <div className="landing-badge">
            <span className="landing-badge-dot" aria-hidden="true" />
            Underwolf Studio
          </div>

          <h1 className="landing-headline">
            Welcome to
            <br />
            the AI Era
          </h1>

          <p className="landing-subtitle">Intelligent solutions built for tomorrow.</p>

          <div className="landing-line" aria-hidden="true" />
        </main>

        <footer className="landing-footer">
          <span>Est. 2025</span>
          <span className="landing-footer-sep" aria-hidden="true" />
          <span>Warsaw, Poland</span>
          <span className="landing-footer-sep" aria-hidden="true" />
          <span>AI First</span>
        </footer>
      </div>
      <ServicesStrip />
    </div>
  );
}
