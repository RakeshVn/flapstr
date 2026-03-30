export default function Hero() {
  return (
    <section className="hero">
      <h1>Turn any TV into a Vestaboard.</h1>
      <p className="subtitle">
        Control it from your phone. No hardware. No subscription. Just open and flip.
      </p>
      <div className="scroll-indicator">
        <span>Scroll</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
