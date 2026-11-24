import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Heart as HeartIcon } from 'lucide-react';
import type { Page } from '../data/storyContent';
import Photo from './Photo';
import Heart from './Heart';

type M = Extract<Page, { kind: 'memories' }>;
const pad = (n: number) => String(n).padStart(2, '0');

function Lightbox({ photos, index, setIndex, onClose }: { photos: M['photos']; index: number; setIndex: (i: number) => void; onClose: () => void }) {
  const n = photos.length;
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (!['Escape', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
      e.stopImmediatePropagation();
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setIndex((index + n - 1) % n);
      if (e.key === 'ArrowRight') setIndex((index + 1) % n);
    };
    window.addEventListener('keydown', h, true);
    return () => window.removeEventListener('keydown', h, true);
  }, [index, n, onClose, setIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) {
      setIndex((index + n - 1) % n);
    } else if (diff < -50) {
      setIndex((index + 1) % n);
    }
    touchStartX.current = null;
  };

  const b = 'glass flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full text-sky hover:border-blush hover:text-blush active:scale-95 transition-all';

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[60] flex flex-col items-center justify-between p-4 sm:p-6 backdrop-blur-2xl"
      style={{
        background: 'rgba(255,247,232,.94)',
        paddingTop: 'max(1.2rem, env(safe-area-inset-top))',
        paddingBottom: 'max(1.2rem, env(safe-area-inset-bottom))',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-full flex justify-between items-center px-2">
        <span className="label flex items-center gap-1.5 tabular-nums text-sky/70 text-[0.62rem] sm:text-xs">
          <Heart size={8} /> {pad(index + 1)} / {pad(n)}
        </span>
        <button className={b} onClick={onClose} aria-label="Close photo viewer">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center my-auto w-full max-w-lg min-h-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={photos[index].src}
            alt={photos[index].alt}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-h-[65dvh] max-w-full rounded-2xl border border-blush/35 object-contain shadow-2xl"
          />
        </AnimatePresence>
        <p className="mt-3 sm:mt-4 font-serif text-base sm:text-xl italic text-sky text-center px-4">
          {photos[index].caption}
        </p>
      </div>

      <div className="flex items-center gap-6 pb-2">
        <button className={b} onClick={() => setIndex((index + n - 1) % n)} aria-label="Previous photo">
          <ChevronLeft size={18} />
        </button>
        <span className="text-[0.62rem] text-sky/50 tracking-wider uppercase font-medium">Swipe to browse</span>
        <button className={b} onClick={() => setIndex((index + 1) % n)} aria-label="Next photo">
          <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>,
    document.body,
  );
}

export default function MemoryGallery({ page }: { page: M }) {
  const [idx, setIdx] = useState(0);
  const [light, setLight] = useState(false);
  const p = page.photos[idx];

  return (
    <div className="grid h-full grid-cols-1 overflow-y-auto overscroll-contain md:grid-cols-[auto_1fr] md:grid-rows-[minmax(0,1fr)] md:overflow-hidden">
      <div className="flex items-center justify-center p-3 sm:p-5 md:h-full md:p-8 shrink-0">
        <div className="w-full flex justify-center md:h-full">
          <Photo key={idx} photo={p} onClick={() => setLight(true)} eager />
        </div>
      </div>

      <div className="flex min-w-0 flex-col justify-between gap-3 sm:gap-6 p-4 sm:p-6 md:p-10">
        <div>
          <p className="label flex items-center gap-1.5 text-sky/60 text-[0.62rem] sm:text-xs">
            <HeartIcon size={10} className="text-blush" fill="#F2A7B5" /> {page.label}
          </p>
          <h2 className="mt-1.5 sm:mt-3 font-serif text-2xl sm:text-4xl md:text-6xl font-light leading-tight text-sky">
            {page.title}
          </h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4 }}
            className="border-t border-blush/25 pt-2 sm:pt-4"
          >
            <p className="label text-blush text-[0.62rem] sm:text-xs">
              Memory {pad(idx + 1)} <span className="text-sky/50">/ {pad(page.photos.length)}</span>
            </p>
            <p className="mt-1 sm:mt-2 font-serif text-lg sm:text-2xl md:text-3xl italic text-sky">{p.caption}</p>
          </motion.div>
        </AnimatePresence>

        <div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1" role="tablist" aria-label="Choose a memory">
            {page.photos.map((ph, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === idx}
                aria-label={`Memory ${i + 1}: ${ph.caption ?? ph.alt}`}
                onClick={() => setIdx(i)}
                className={`h-14 w-11 sm:h-16 sm:w-12 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 ${
                  i === idx
                    ? 'border-blush scale-105 shadow-[0_4px_15px_-3px_rgba(242,167,181,.6)]'
                    : 'border-blush/25 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={ph.src} alt="" loading="lazy" className="h-full w-full object-cover" draggable={false} />
              </button>
            ))}
          </div>
          <p className="label mt-2.5 text-sky/50 text-[0.58rem] sm:text-xs">Tap or swipe photo to view larger ❤️</p>
        </div>
      </div>

      <AnimatePresence>
        {light && <Lightbox photos={page.photos} index={idx} setIndex={setIdx} onClose={() => setLight(false)} />}
      </AnimatePresence>
    </div>
  );
}
