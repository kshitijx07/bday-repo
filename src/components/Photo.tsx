import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import type { Photo as PhotoT } from '../data/storyContent';

/** Photo frame: reveal, hover zoom, subtle parallax. Never crops beyond the photo's own ratio. */
export default function Photo({ photo, onClick, eager }: { photo: PhotoT; onClick?: () => void; eager?: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 80, damping: 18 }), sy = useSpring(y, { stiffness: 80, damping: 18 });
  const move = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width - 0.5) * -14);
    y.set(((e.clientY - r.top) / r.height - 0.5) * -14);
  };
  const Tag = onClick ? 'button' : 'div';
  return (
    <motion.div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ aspectRatio: photo.ratio }}
      className="relative h-[28dvh] sm:h-[35dvh] max-w-full overflow-hidden rounded-xl border border-blush/35 shadow-[0_20px_40px_-15px_rgba(49,92,76,.18),0_10px_20px_-8px_rgba(242,167,181,.15)] md:h-full mx-auto"
    >
      <Tag
        {...(onClick ? { onClick, type: 'button' as const, 'aria-label': `Enlarge photo: ${photo.alt}` } : {})}
        className="block h-full w-full active:scale-95 transition-transform"
      >
        <motion.img
          src={photo.src}
          alt={photo.alt}
          draggable={false}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          style={{ x: sx, y: sy }}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1.03 }}
          whileHover={reduce ? undefined : { scale: 1.08 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full object-cover"
        />
      </Tag>
    </motion.div>
  );
}
