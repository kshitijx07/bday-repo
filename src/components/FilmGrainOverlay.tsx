export default function FilmGrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
    >
      {/* 5% Film Grain Texture */}
      <div className="film-grain absolute inset-0 opacity-[0.05] mix-blend-screen" />

      {/* Soft Vignette around screen edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, transparent 65%, rgba(10, 10, 10, 0.6) 100%)',
        }}
      />
    </div>
  );
}
