import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BalloonItem {
  id: number;
  x: number; // percentage from left
  size: number; // width in px
  delay: number;
  duration: number;
  swayX: number;
  colorGrad: {
    base: string;
    dark: string;
    highlight: string;
  };
  rotation: number;
}

const BALLOON_PALETTE = [
  // Blush Pink
  { base: '#F2A7B5', dark: '#DB7D91', highlight: '#FFF0F3' },
  // Rose Velvet
  { base: '#E28698', dark: '#C45D72', highlight: '#FFE9EE' },
  // Champagne Gold
  { base: '#E8D3A7', dark: '#C8B07D', highlight: '#FFF9ED' },
  // Soft Forest Emerald
  { base: '#3D6C5A', dark: '#244538', highlight: '#8FB4A4' },
  // Pearl Cream
  { base: '#FFF7E8', dark: '#EAD9BC', highlight: '#FFFFFF' },
  // Vibrant Blush
  { base: '#F596AA', dark: '#DE6E86', highlight: '#FFF5F7' },
];

export default function CelebrationBalloons({
  active,
  count = 14,
}: {
  active: boolean;
  count?: number;
}) {
  const balloons = useMemo<BalloonItem[]>(() => {
    return Array.from({ length: count }, (_, i) => {
      const palette = BALLOON_PALETTE[i % BALLOON_PALETTE.length];
      return {
        id: i,
        x: Math.round(5 + (i * 90) / count + (Math.random() * 8 - 4)),
        size: Math.round(44 + Math.random() * 22),
        delay: Number((Math.random() * 1.6).toFixed(2)),
        duration: Number((4.8 + Math.random() * 2.2).toFixed(2)),
        swayX: Math.round((Math.random() > 0.5 ? 1 : -1) * (18 + Math.random() * 20)),
        colorGrad: palette,
        rotation: Math.round((Math.random() - 0.5) * 22),
      };
    });
  }, [count]);

  return (
    <AnimatePresence>
      {active && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
        >
          {balloons.map((b) => (
            <motion.div
              key={b.id}
              initial={{
                top: '105vh',
                left: `${b.x}%`,
                x: 0,
                rotate: b.rotation,
                opacity: 0,
                scale: 0.85,
              }}
              animate={{
                top: '-25vh',
                opacity: [0, 0.95, 1, 1, 0.85, 0],
                x: [0, b.swayX, -b.swayX * 0.7, b.swayX * 0.5, 0],
                rotate: [b.rotation, b.rotation + 8, b.rotation - 6, b.rotation],
                scale: 1,
              }}
              transition={{
                duration: b.duration,
                delay: b.delay,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{
                width: b.size,
                height: b.size * 2.1,
              }}
              className="absolute will-change-transform"
            >
              <svg
                viewBox="0 0 50 105"
                className="w-full h-full overflow-visible drop-shadow-[0_6px_14px_rgba(49,92,76,0.18)]"
              >
                <defs>
                  <radialGradient
                    id={`balloon-grad-${b.id}`}
                    cx="36%"
                    cy="28%"
                    r="68%"
                  >
                    <stop offset="0%" stopColor={b.colorGrad.highlight} stopOpacity="0.85" />
                    <stop offset="35%" stopColor={b.colorGrad.base} />
                    <stop offset="100%" stopColor={b.colorGrad.dark} />
                  </radialGradient>
                </defs>

                {/* Balloon Oval Body */}
                <path
                  d="M 25,4 C 41,4 49,20 49,42 C 49,60 36,73 25,75 C 14,73 1,60 1,42 C 1,20 9,4 25,4 Z"
                  fill={`url(#balloon-grad-${b.id})`}
                />

                {/* Delicate Gloss Reflection */}
                <ellipse
                  cx="16"
                  cy="20"
                  rx="4.5"
                  ry="10"
                  fill="#FFFFFF"
                  opacity="0.45"
                  transform="rotate(-22 16 20)"
                />

                {/* Tied Balloon Knot */}
                <polygon
                  points="22,75 28,75 29,79 21,79"
                  fill={b.colorGrad.dark}
                />

                {/* Floating Ribbon String */}
                <path
                  d="M 25,79 Q 20,90 28,98 T 22,112"
                  fill="none"
                  stroke="rgba(49,92,76,0.38)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
