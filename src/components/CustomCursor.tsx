import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export default function CustomCursor() {
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 32 }), sy = useSpring(y, { stiffness: 380, damping: 32 });

  useEffect(() => {
    if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    setFine(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      setHover(!!(e.target as HTMLElement | null)?.closest('button,a,[role="button"]'));
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [reduce, x, y]);

  if (!fine) return null;
  return (
    <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center" style={{ x: sx, y: sy }}>
      <motion.div animate={{ width: hover ? 46 : 26, height: hover ? 46 : 26, borderColor: hover ? 'rgba(242,167,181,.9)' : 'rgba(49,92,76,.5)' }} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2" style={{ transition: 'width .3s, height .3s, border-color .3s' }} />
      <span className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blush" />
    </motion.div>
  );
}
