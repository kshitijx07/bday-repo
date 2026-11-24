import { motion, useReducedMotion } from 'framer-motion';
import { RotateCcw, Sparkles } from 'lucide-react';
import type { Page } from '../data/storyContent';
import Heart from './Heart';

type F = Extract<Page, { kind: 'finale' }>;

const floatingHearts = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 37 + 8) % 100}%`,
  delay: `${(i * 1.1) % 8}s`,
  size: 8 + (i % 5) * 3,
  duration: `${8 + (i % 5) * 2}s`,
}));

const sparkles = Array.from({ length: 8 }, (_, i) => ({
  left: `${(i * 73 + 15) % 100}%`,
  top: `${(i * 47 + 10) % 100}%`,
  delay: `${(i * 0.7) % 4}s`,
  size: 4 + (i % 3) * 2,
}));

export default function BirthdayFinale({ page, onRestart }: { page: F; onRestart: () => void }) {
  const reduce = useReducedMotion();
  const words = page.headline.flatMap((l, li) => l.split(' ').map((w) => ({ w, li })));

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden">
      <motion.img
        src={page.photo.src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        draggable={false}
        initial={{ opacity: 0, scale: 1.12 }}
        animate={{ opacity: 0.18, scale: 1.02 }}
        transition={{ duration: 3, ease: 'easeOut' }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, rgba(255,247,232,.55), rgba(255,247,232,.9) 70%)' }}
      />

      {/* Animated glow */}
      {!reduce && (
        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(242,167,181,.25), transparent 65%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      )}

      {/* Floating hearts */}
      {!reduce &&
        floatingHearts.map((h, i) => (
          <span
            key={`fh${i}`}
            aria-hidden="true"
            className="absolute bottom-0 animate-rise"
            style={{ left: h.left, animationDelay: h.delay, animationDuration: h.duration, opacity: 0 }}
          >
            <svg viewBox="0 0 24 24" width={h.size} height={h.size} fill="#F2A7B5" opacity={0.35 + (i % 3) * 0.15}>
              <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 4.5 6.5 4.5c2 0 3.5 1.1 4.5 2.6l1 1.4 1-1.4c1-1.5 2.5-2.6 4.5-2.6 3.8 0 5.6 3.9 4.1 7.3C19.5 16.4 12 21 12 21z" />
            </svg>
          </span>
        ))}

      {/* Sparkles */}
      {!reduce &&
        sparkles.map((s, i) => (
          <span
            key={`sp${i}`}
            aria-hidden="true"
            className="absolute animate-sparkle"
            style={{ left: s.left, top: s.top, animationDelay: s.delay, animationDuration: `${2 + (i % 3)}s` }}
          >
            <svg viewBox="0 0 24 24" width={s.size} height={s.size} fill="rgba(49,92,76,0.3)">
              <polygon points="12,0 15,9 24,12 15,15 12,24 9,15 0,12 9,9" />
            </svg>
          </span>
        ))}

      <div className="relative z-10 flex max-h-full flex-col items-center overflow-y-auto overscroll-contain px-4 py-6 sm:px-6 sm:py-8 text-center my-auto">
        <p className="label flex items-center gap-1.5 text-sky/60 text-[0.62rem] sm:text-xs">
          <Sparkles size={11} className="text-blush" /> {page.label}
        </p>

        <motion.div
          className="mt-4 sm:mt-6"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.2 }}
        >
          <Heart size={28} className="animate-beat drop-shadow-md" />
        </motion.div>

        <h2 className="mt-4 sm:mt-6 font-serif text-[clamp(2.1rem,8.5vw,6rem)] font-light leading-[1.02] text-sky">
          {words.map(({ w, li }, i) => (
            <motion.span
              key={i}
              className={`mr-[.2em] inline-block ${li === 1 ? 'text-blush italic font-normal' : ''}`}
              initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.7 + i * 0.22, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {w}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1.4 }}
          className="mt-5 sm:mt-7 max-w-md font-serif text-sm sm:text-lg leading-relaxed text-sky/85 md:text-xl px-2"
        >
          {page.message}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0, duration: 1.2 }}
          className="label mt-5 sm:mt-7 text-blush text-[0.65rem] sm:text-xs"
        >
          {page.closing}
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.6, duration: 1 }}
          onClick={onRestart}
          whileHover={{ scale: 1.04, boxShadow: '0 15px 40px -10px rgba(242,167,181,.5)' }}
          whileTap={{ scale: 0.96 }}
          className="glass label mt-6 sm:mt-9 inline-flex items-center gap-2.5 rounded-full border-blush/40 px-6 py-3.5 sm:px-7 sm:py-4 text-sky transition-all hover:border-blush active:scale-95 text-[0.65rem] sm:text-xs font-semibold"
        >
          <RotateCcw size={13} /> Read it again ❤️
        </motion.button>
      </div>
    </div>
  );
}
