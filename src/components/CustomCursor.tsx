import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export default function CustomCursor() {
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);
  const [hover, setHover] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth lagging follower ring
  const ringX = useSpring(mouseX, { stiffness: 220, damping: 28 });
  const ringY = useSpring(mouseY, { stiffness: 220, damping: 28 });

  useEffect(() => {
    if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    setFine(true);

    const move = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setHover(!!target?.closest('button, a, [role="button"], canvas, input'));
    };

    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [reduce, mouseX, mouseY]);

  if (!fine) return null;

  return (
    <>
      {/* Outer Follower Ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center will-change-transform"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          animate={{
            width: hover ? 54 : 32,
            height: hover ? 54 : 32,
            borderColor: hover ? 'rgba(242, 167, 181, 0.95)' : 'rgba(49, 92, 76, 0.4)',
            backgroundColor: hover ? 'rgba(242, 167, 181, 0.08)' : 'transparent',
          }}
          transition={{ duration: 0.2 }}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
        />
      </motion.div>

      {/* Instant Central Dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] will-change-transform"
        style={{ x: mouseX, y: mouseY }}
      >
        <motion.span
          animate={{
            scale: hover ? 1.6 : 1,
            backgroundColor: hover ? '#F2A7B5' : '#315C4C',
          }}
          transition={{ duration: 0.15 }}
          className="block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        />
      </motion.div>
    </>
  );
}
