export function ServicesStrip() {
  return (
    <section className="services-strip" aria-label="Services">
      <div className="services-strip-glow" aria-hidden="true" />
      <p className="services-strip-label">What we build</p>
      <div className="services-orbit">
        <span className="services-orbit-tag services-orbit-tag--tl services-orbit-tag--accent">
          AI Agents
        </span>
        <span className="services-orbit-tag services-orbit-tag--tr services-orbit-tag--accent">
          AI Workflows
        </span>
        <div className="services-orbit-dot" aria-hidden="true" />
        <span className="services-orbit-tag services-orbit-tag--bl">Fullstack Web Application</span>
        <span className="services-orbit-tag services-orbit-tag--br">Frontend Application</span>
      </div>
    </section>
  );
}
