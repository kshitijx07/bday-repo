import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowLeft, X, Heart as HeartIcon } from 'lucide-react';
import { story } from '../data/storyContent';
import BookCover from './BookCover';
import BookPage from './BookPage';
import PageNavigation from './PageNavigation';

type Stage = 'closed' | 'opening' | 'reading';

export default function StoryBook({ onExit }: { onExit: () => void }) {
  const reduce = useReducedMotion();
  const { pages } = story;
  const [stage, setStage] = useState<Stage>('closed');
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const timer = useRef<number>();
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const open = () => {
    setStage('opening');
    timer.current = window.setTimeout(() => setStage('reading'), reduce ? 400 : 2100);
  };
  const close = () => {
    setStage('opening');
    timer.current = window.setTimeout(() => setStage('closed'), 700);
  };
  const go = useCallback(
    (n: number) => {
      if (n < 0 || n >= pages.length) return;
      setDir(n > i ? 1 : -1);
      setI(n);
    },
    [i, pages.length],
  );

  useEffect(() => {
    if (stage !== 'reading') return;
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(i + 1);
      else if (e.key === 'ArrowLeft') go(i - 1);
      else if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [stage, i, go]);

  const v: Variants = reduce
    ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        enter: (d: number) => ({ opacity: 0, rotateY: d > 0 ? -28 : 28, x: d > 0 ? 50 : -50 }),
        center: { opacity: 1, rotateY: 0, x: 0 },
        exit: (d: number) => ({ opacity: 0, rotateY: d > 0 ? 28 : -28, x: d > 0 ? -50 : 50 }),
      };

  return (
    <AnimatePresence mode="wait">
      {stage !== 'reading' ? (
        <motion.div
          key="book"
          className="relative z-10 flex h-full flex-col items-center justify-center px-4 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.9 }}
        >
          <button
            onClick={onExit}
            className="label absolute left-4 top-4 sm:left-8 sm:top-7 flex items-center gap-1.5 text-sky/75 hover:text-sky active:scale-95 transition-all text-[0.62rem] sm:text-xs"
          >
            <ArrowLeft size={13} /> Back
          </button>

          <BookCover open={stage === 'opening'} onOpen={open} previewSrc={(pages[0] as { photo: { src: string } }).photo.src} />

          <p className="label mt-8 sm:mt-14 text-sky/70 text-[0.65rem] sm:text-xs text-center" aria-live="polite">
            {stage === 'closed' ? 'Tap the book to open it ❤️' : '\u00A0'}
          </p>
        </motion.div>
      ) : (
        <motion.div
          key="reader"
          className="relative z-10 flex h-full flex-col justify-between overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <header className="label flex items-center justify-between px-3.5 py-2.5 sm:px-6 sm:py-3.5 text-sky/60 md:px-10 shrink-0">
            <span className="flex items-center gap-1.5 text-[0.6rem] sm:text-xs">
              <HeartIcon size={9} className="text-blush" fill="#F2A7B5" /> {story.opening.label}
            </span>
            <button
              onClick={close}
              className="flex items-center gap-1.5 text-sky/80 hover:text-sky active:scale-95 transition-colors text-[0.6rem] sm:text-xs"
              aria-label="Close the book"
            >
              <X size={13} /> Close book
            </button>
          </header>

          <main className="relative min-h-0 flex-1 px-2.5 sm:px-5 md:px-10 py-1 overflow-hidden" style={{ perspective: 2000 }}>
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.section
                key={i}
                custom={dir}
                variants={v}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: reduce ? 0.2 : 0.65, ease: [0.65, 0, 0.35, 1] }}
                drag="x"
                dragDirectionLock
                dragSnapToOrigin
                dragElastic={0.15}
                dragConstraints={{ left: 0, right: 0 }}
                style={{ touchAction: 'pan-y', transformOrigin: dir > 0 ? 'left center' : 'right center' }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(i + 1);
                  else if (info.offset.x > 60) go(i - 1);
                }}
                className="glass h-full w-full overflow-hidden rounded-2xl bg-ivory/70 shadow-[0_30px_70px_-25px_rgba(49,92,76,.2),0_15px_35px_-12px_rgba(242,167,181,.2)]"
              >
                <BookPage page={pages[i]} n={i + 1} total={pages.length} onRestart={() => go(0)} />
              </motion.section>
            </AnimatePresence>
          </main>

          <PageNavigation index={i} total={pages.length} onPrev={() => go(i - 1)} onNext={() => go(i + 1)} onJump={go} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
