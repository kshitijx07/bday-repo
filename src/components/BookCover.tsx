import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { story } from '../data/storyContent';
import Heart from './Heart';

type Props = { open: boolean; onOpen: () => void; previewSrc: string };
const LAYERS = 7;

export default function BookCover({ open, onOpen, previewSrc }: Props) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0), my = useMotionValue(0);
  const ry = useSpring(useTransform(mx, [-1, 1], [-12, 12]), { stiffness: 90, damping: 16 });
  const rx = useSpring(useTransform(my, [-1, 1], [8, -8]), { stiffness: 90, damping: 16 });

  useEffect(() => {
    if (reduce) return;
    const h = (e: PointerEvent) => {
      mx.set((e.clientX / innerWidth) * 2 - 1);
      my.set((e.clientY / innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', h);
    return () => window.removeEventListener('pointermove', h);
  }, [reduce, mx, my]);

  const { cover } = story;
  const ease = [0.65, 0, 0.35, 1] as const;
  const face = { backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' } as const;

  // Optimized specifically for iPhone 15 portrait (393px width, 852px height) & responsive desktop
  const vars = {
    '--w': 'min(70vw, 300px, 36dvh)',
    '--h': 'calc(var(--w) * 1.42)',
    '--d': '22px',
    width: 'var(--w)',
    height: 'var(--h)',
  } as React.CSSProperties;

  return (
    <div style={{ perspective: 1800 }}>
      <div
        role="button"
        tabIndex={open ? -1 : 0}
        aria-label="Open the storybook"
        onClick={() => !open && onOpen()}
        onKeyDown={(e) => {
          if (!open && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onOpen();
          }
        }}
        style={vars}
        className="relative cursor-pointer select-none outline-none active:scale-[0.98] transition-transform duration-200"
      >
        <motion.div
          initial={false}
          animate={{ rotateY: open ? -4 : -22, x: open ? '50%' : '0%' }}
          transition={{ duration: reduce ? 0.2 : 1.4, ease }}
          style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%' }}
        >
          <motion.div
            style={{ rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry, transformStyle: 'preserve-3d', width: '100%', height: '100%' }}
            animate={reduce ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* back cover */}
            <div className="absolute inset-0 rounded-r-[3px]" style={{ transform: 'translateZ(calc(var(--d) / -2))', background: 'linear-gradient(135deg, #315C4C, #264a3c)' }} />

            {/* page block */}
            {Array.from({ length: LAYERS }, (_, i) => (
              <div
                key={i}
                className="absolute rounded-r-[2px]"
                style={{
                  inset: '3px 5px 3px 0',
                  background: '#FFF7E8',
                  filter: `brightness(${0.92 + i * 0.01})`,
                  transform: `translateZ(calc(var(--d) / -2 + 3px + ${i} * (var(--d) - 8px) / ${LAYERS}))`,
                }}
              />
            ))}

            {/* right page edge */}
            <div
              className="absolute"
              style={{
                top: 3,
                bottom: 3,
                right: 'calc(var(--d) / -2 + 5px)',
                width: 'var(--d)',
                transform: 'rotateY(90deg)',
                background: 'repeating-linear-gradient(90deg, #f5ecd8 0 1px, #FFF7E8 1px 3px)',
              }}
            />

            {/* spine */}
            <div
              className="absolute inset-y-0"
              style={{
                left: 'calc(var(--d) / -2)',
                width: 'var(--d)',
                transform: 'rotateY(-90deg)',
                background: 'linear-gradient(180deg, #315C4C, #3d7360)',
                borderLeft: '1px solid rgba(242,167,181,.3)',
                borderRight: '1px solid rgba(242,167,181,.3)',
              }}
            />

            {/* first page, revealed when the cover opens */}
            <div
              className="absolute overflow-hidden"
              style={{ inset: '3px 5px 3px 0', transform: 'translateZ(calc(var(--d) / 2 - 5px))', background: '#FFF7E8' }}
            >
              <img src={previewSrc} alt="" draggable={false} className="h-full w-full object-cover opacity-85" />
              <div className="absolute inset-0 bg-gradient-to-r from-sky/40 via-transparent to-transparent" />
              <div className="label absolute bottom-3 left-4 text-sky font-semibold">Chapter 01</div>
            </div>

            {/* front cover (hinged on the spine) */}
            <motion.div
              initial={false}
              animate={{ rotateY: open ? -168 : 0 }}
              transition={{ duration: reduce ? 0.2 : 1.5, ease }}
              className="absolute inset-0"
              style={{ transformOrigin: '0% 50%', transformStyle: 'preserve-3d', transform: 'translateZ(calc(var(--d) / 2))' }}
            >
              <div
                className="absolute inset-0 flex flex-col justify-between rounded-r-[3px] p-[9%] text-center shadow-2xl"
                style={{
                  ...face,
                  background: 'linear-gradient(135deg, #315C4C 0%, #3d7360 50%, #264a3c 100%)',
                  boxShadow: 'inset 0 0 0 1px rgba(242,167,181,.25), 0 25px 50px -15px rgba(49,92,76,.45)',
                }}
              >
                <p className="label text-ivory/70 text-[0.55rem] tracking-widest">{cover.label}</p>
                <div>
                  <div className="mx-auto mb-4 h-px w-8 bg-gradient-to-r from-transparent via-blush to-transparent" />
                  <h1 className="font-serif text-[clamp(1.4rem,4.5vw,2.2rem)] font-light italic leading-tight text-ivory">{cover.title}</h1>
                  <div className="mx-auto mt-4 h-px w-8 bg-gradient-to-r from-transparent via-blush to-transparent" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Heart size={13} className="animate-beat" />
                  <p className="label text-ivory/60 text-[0.55rem] tracking-wider">{cover.year}</p>
                </div>
              </div>
              <div
                className="absolute inset-0 rounded-l-[3px]"
                style={{ ...face, transform: 'rotateY(180deg)', background: 'linear-gradient(135deg, #264a3c, #315C4C)', boxShadow: 'inset 0 0 0 1px rgba(242,167,181,.15)' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-8 left-[5%] h-6 w-[90%] rounded-full blur-lg" style={{ background: 'rgba(49,92,76,.28)' }} />
      </div>
    </div>
  );
}
