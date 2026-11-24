import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export default function CustomCursor() {
  const reduce = useReducedMotion();
  const [isFine, setIsFine] = useState(false);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const smoothX = useSpring(mouseX, { stiffness: 450, damping: 32 });
  const smoothY = useSpring(mouseY, { stiffness: 450, damping: 32 });

  useEffect(() => {
    if (reduce) return;

    // Only activate on devices with fine pointer (mouse / trackpad)
    const fine = window.matchMedia('(pointer: fine)').matches;
    setIsFine(fine);

    if (!fine) return; // Completely bail out on touch devices (zero overhead on mobile)

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
  }, [reduce, mouseX, mouseY]);

  // On mobile / touch devices or reduced motion, render nothing (pure 120Hz native touch response)
  if (reduce || !isFine) return null;

  // Desktop Cursor: Forest Green dot that turns into Blush Pink Heart on clickable hover
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center will-change-transform"
      style={{ x: smoothX, y: smoothY }}
    >
      {hovered ? (
        // Blush Pink Heart on Hover
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.18 }}
          className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        >
          <svg
            viewBox="0 0 24 24"
            width={20}
            height={20}
            className="fill-blush drop-shadow-[0_0_10px_rgba(242,167,181,0.7)]"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ) : (
        // Timeless Forest Green Dot
        <div className="h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-forest shadow-[0_0_5px_rgba(49,92,76,0.4)]" />
      )}
    </motion.div>
  );
}
