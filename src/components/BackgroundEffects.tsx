import { useReducedMotion } from 'framer-motion';

const hearts = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 61 + 7) % 100}%`,
  delay: `${(i * 1.3) % 12}s`,
  size: 8 + (i % 5) * 4,
  opacity: 0.15 + (i % 4) * 0.08,
  duration: `${10 + (i % 5) * 3}s`,
}));

const petals = Array.from({ length: 12 }, (_, i) => ({
  left: `${(i * 83 + 5) % 100}%`,
  delay: `${(i * 2.1) % 10}s`,
  size: 6 + (i % 3) * 3,
}));

const sparkles = Array.from({ length: 8 }, (_, i) => ({
  left: `${(i * 97 + 13) % 100}%`,
  top: `${(i * 71 + 11) % 100}%`,
  delay: `${(i * 0.8) % 5}s`,
}));

export default function BackgroundEffects() {
  const reduce = useReducedMotion();
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Warm gradient overlay */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 30% 20%, rgba(242,167,181,.18), transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(49,92,76,.12), transparent 55%), radial-gradient(ellipse at 50% 50%, rgba(255,247,232,.3), transparent 70%)'
      }} />
      {/* Floating hearts */}
      {!reduce && hearts.map((h, i) => (
        <span key={`h${i}`} className="absolute bottom-0 animate-rise" style={{
          left: h.left,
          animationDelay: h.delay,
          animationDuration: h.duration,
          opacity: 0,
        }}>
          <svg viewBox="0 0 24 24" width={h.size} height={h.size} fill="#F2A7B5" opacity={h.opacity * 3}>
            <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 4.5 6.5 4.5c2 0 3.5 1.1 4.5 2.6l1 1.4 1-1.4c1-1.5 2.5-2.6 4.5-2.6 3.8 0 5.6 3.9 4.1 7.3C19.5 16.4 12 21 12 21z" />
          </svg>
        </span>
      ))}
      {/* Falling petals */}
      {!reduce && petals.map((p, i) => (
        <span key={`p${i}`} className="absolute top-0 animate-petal-fall rounded-full" style={{
          left: p.left,
          width: p.size,
          height: p.size,
          background: `radial-gradient(circle, rgba(242,167,181,${0.3 + (i % 3) * 0.1}), rgba(242,167,181,0))`,
          animationDelay: p.delay,
          animationDuration: `${12 + (i % 4) * 3}s`,
          opacity: 0,
        }} />
      ))}
      {/* Sparkles */}
      {!reduce && sparkles.map((s, i) => (
        <span key={`s${i}`} className="absolute animate-sparkle" style={{
          left: s.left,
          top: s.top,
          animationDelay: s.delay,
          animationDuration: `${2 + (i % 3)}s`,
        }}>
          <svg viewBox="0 0 24 24" width={6} height={6} fill="rgba(242,167,181,0.5)">
            <polygon points="12,0 15,9 24,12 15,15 12,24 9,15 0,12 9,9" />
          </svg>
        </span>
      ))}
      {/* Soft grain texture */}
      <div className="grain absolute inset-0 opacity-[.04] mix-blend-overlay" />
    </div>
  );
}
