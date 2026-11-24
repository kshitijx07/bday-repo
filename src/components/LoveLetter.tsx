import { motion, useReducedMotion } from 'framer-motion';
import type { Page } from '../data/storyContent';
import Heart from './Heart';

type L = Extract<Page, { kind: 'letter' }>;

export default function LoveLetter({ page }: { page: L }) {
  const reduce = useReducedMotion();
  const t = (i: number) => (reduce ? 0 : 0.6 + i * 0.45);
  const line = (i: number) =>
    ({
      initial: reduce ? false : { opacity: 0, y: 10, filter: 'blur(4px)' },
      animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
      transition: { delay: t(i), duration: 0.8 },
    } as const);

  return (
    <div className="flex h-full items-start justify-center overflow-y-auto overscroll-contain p-2.5 sm:p-5 md:p-10">
      <motion.article
        initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: 'inset(0 0 0% 0)' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl rounded-2xl p-4 sm:p-7 md:p-12 shadow-[0_30px_70px_-25px_rgba(49,92,76,.18),0_15px_30px_-10px_rgba(242,167,181,.2)] my-auto"
        style={{
          backgroundColor: 'rgba(255,247,232,.92)',
          backgroundImage: 'repeating-linear-gradient(transparent 0 29px, rgba(242,167,181,.13) 29px 30px)',
          backgroundPositionY: '8px',
          border: '1px solid rgba(242,167,181,.35)',
        }}
      >
        <div className="mb-4 sm:mb-8 flex items-center justify-between">
          <span className="label text-sky/60 text-[0.62rem] sm:text-xs">{page.label}</span>
          <Heart size={15} className="animate-beat" />
        </div>

        <motion.p
          {...line(0)}
          className="font-serif text-2xl sm:text-3xl italic text-sky"
          style={{ fontFamily: '"Dancing Script", cursive' }}
        >
          {page.greeting}
        </motion.p>

        <div className="mt-4 sm:mt-6 space-y-[30px]">
          {page.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              {...line(i + 1)}
              className="font-serif text-sm sm:text-lg leading-[30px] sm:leading-[30px] md:text-xl md:leading-[36px] text-sky/90"
            >
              {p}
            </motion.p>
          ))}
        </div>

        <motion.div {...line(page.paragraphs.length + 1)} className="mt-8 sm:mt-12">
          <p className="font-serif text-base sm:text-lg italic text-blush-dark">{page.signoff}</p>
          <p
            className="mt-1 font-serif text-xl sm:text-2xl text-sky"
            style={{ fontFamily: '"Dancing Script", cursive' }}
          >
            {page.signature}
          </p>
        </motion.div>

        {/* Decorative corner motifs */}
        <div className="absolute left-2.5 top-2.5 h-4 w-4 sm:h-6 sm:w-6 border-l-2 border-t-2 border-blush/30 rounded-tl-md sm:rounded-tl-lg" />
        <div className="absolute right-2.5 top-2.5 h-4 w-4 sm:h-6 sm:w-6 border-r-2 border-t-2 border-blush/30 rounded-tr-md sm:rounded-tr-lg" />
        <div className="absolute bottom-2.5 left-2.5 h-4 w-4 sm:h-6 sm:w-6 border-b-2 border-l-2 border-blush/30 rounded-bl-md sm:rounded-bl-lg" />
        <div className="absolute bottom-2.5 right-2.5 h-4 w-4 sm:h-6 sm:w-6 border-b-2 border-r-2 border-blush/30 rounded-br-md sm:rounded-br-lg" />
      </motion.article>
    </div>
  );
}
