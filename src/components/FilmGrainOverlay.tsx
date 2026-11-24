export default function FilmGrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
    >
      {/* Delicate Smooth Paper Grain Texture */}
      <div className="film-grain absolute inset-0 opacity-[0.04] mix-blend-multiply" />

      {/* Soft Luxury Stationery Edge Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, transparent 62%, rgba(226, 209, 185, 0.42) 100%)',
        }}
      />
    </div>
  );
}
