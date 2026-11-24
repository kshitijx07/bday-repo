import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Heart from './Heart';

type Props = { index: number; total: number; onPrev: () => void; onNext: () => void; onJump: (i: number) => void };
const pad = (n: number) => String(n).padStart(2, '0');

export default function PageNavigation({ index, total, onPrev, onNext, onJump }: Props) {
  const btn =
    'glass flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full text-sky transition-all duration-300 hover:border-blush hover:text-blush active:scale-90 disabled:pointer-events-none disabled:opacity-25 shrink-0';

  return (
    <nav
      aria-label="Page navigation"
      className="flex items-center gap-3 px-3.5 pt-1.5 md:px-10 shrink-0"
      style={{ paddingBottom: 'max(0.6rem, env(safe-area-inset-bottom, 0px))' }}
    >
      <button className={btn} onClick={onPrev} disabled={index === 0} aria-label="Previous page">
        <ChevronLeft size={17} />
      </button>

      <div className="flex flex-1 flex-col gap-2">
        <div className="label flex items-center justify-between text-sky/70 text-[0.62rem] sm:text-xs">
          <span className="tabular-nums">
            {pad(index + 1)} <span className="text-sky/40">/ {pad(total)}</span>
          </span>
          <div className="flex gap-1.5 sm:gap-2">
            {Array.from({ length: total }, (_, i) => (
              <button
                key={i}
                onClick={() => onJump(i)}
                aria-label={`Go to page ${i + 1}`}
                aria-current={i === index}
                className="flex h-5 w-4 sm:h-6 sm:w-4 items-center justify-center active:scale-90"
              >
                <span
                  className={`block transition-all duration-300 ${
                    i === index ? 'scale-125' : 'opacity-40 hover:opacity-80'
                  }`}
                >
                  <Heart size={i === index ? 9 : 6} />
                </span>
              </button>
            ))}
          </div>
        </div>

        <div
          className="h-1 w-full bg-blush/20 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={index + 1}
        >
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-blush to-sky rounded-full"
            animate={{ width: `${((index + 1) / total) * 100}%` }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <button className={btn} onClick={onNext} disabled={index === total - 1} aria-label="Next page">
        <ChevronRight size={17} />
      </button>
    </nav>
  );
}
