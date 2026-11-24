import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const reduce = useReducedMotion();
  const [isFine, setIsFine] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const smoothX = useSpring(mouseX, { stiffness: 450, damping: 32 });
  const smoothY = useSpring(mouseY, { stiffness: 450, damping: 32 });

  useEffect(() => {
    if (reduce) return;

    const fine = window.matchMedia('(pointer: fine)').matches;
    setIsFine(fine);

    if (fine) {
      // Desktop mouse tracker
      const onMove = (e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        const target = e.target as HTMLElement | null;
        setHovered(
          !!target?.closest('button, a, [role="button"], [data-clickable], input'),
        );
      };
      window.addEventListener('mousemove', onMove, { passive: true });
      return () => window.removeEventListener('mousemove', onMove);
    } else {
      // Mobile touch ripples
      const onTouch = (e: TouchEvent) => {
        if (!e.touches[0]) return;
        const newRipple: Ripple = {
          id: Date.now(),
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
        setRipples((prev) => [...prev.slice(-3), newRipple]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 650);
      };
      window.addEventListener('touchstart', onTouch, { passive: true });
      return () => window.removeEventListener('touchstart', onTouch);
    }
  }, [reduce, mouseX, mouseY]);

  if (reduce) return null;

  // Mobile Touch Ripples
  if (!isFine) {
    return (
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ scale: 0.2, opacity: 0.6 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ left: r.x, top: r.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/50 bg-signal/15 w-8 h-8 pointer-events-none"
          />
        ))}
      </div>
    );
  }

  // Desktop Cursor: Small silver dot that turns into a red heart on clickable hover
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center will-change-transform"
      style={{ x: smoothX, y: smoothY }}
    >
      {hovered ? (
        // Signal Red Heart on Hover
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.18 }}
          className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        >
          <svg
            viewBox="0 0 24 24"
            width={18}
            height={18}
            className="fill-signal drop-shadow-[0_0_8px_rgba(225,6,0,0.6)]"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ) : (
        // Minimal Silver Dot
        <div className="h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-silver shadow-[0_0_4px_rgba(192,192,192,0.8)]" />
      )}
    </motion.div>
  );
}
