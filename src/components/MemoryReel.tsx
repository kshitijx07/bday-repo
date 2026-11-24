import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { storyData, type MemoryPhoto } from '../data/storyContent';
import { playChime } from '../utils/audio';
import Heart from './Heart';

function MemoryCard({
  photo,
  idx,
  onOpen,
}: {
  photo: MemoryPhoto;
  idx: number;
  onOpen: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotate({
      x: ((y - centerY) / centerY) * -6,
      y: ((x - centerX) / centerX) * 6,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: rotate.x, rotateY: rotate.y }}
        transition={{ type: 'spring', stiffness: 240, damping: 22 }}
        className="group relative rounded-2xl overflow-hidden border border-blush/35 bg-ivory shadow-sm hover:shadow-2xl hover:border-blush transition-shadow duration-300 flex flex-col h-full will-change-transform"
      >
        {/* Image Container */}
        <div
          onClick={onOpen}
          className="relative aspect-[3/4] overflow-hidden cursor-pointer"
        >
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            draggable={false}
            className="w-full h-full object-cover transform group-hover:scale-106 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sky/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="glass rounded-full p-2.5 text-ivory hover:text-blush">
              <Maximize2 size={16} />
            </span>
          </div>
        </div>

        {/* Caption & Poetic Note */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2 bg-ivory/95">
          <div>
            <div className="flex items-center justify-between text-[0.62rem] label text-sky/50 mb-1">
              <span>Moment 0{idx + 1}</span>
              <Heart size={8} className="text-blush" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl text-sky font-normal">
              {photo.caption}
            </h3>
            <p className="mt-1 font-serif text-xs sm:text-sm text-sky/75 italic leading-relaxed">
              {photo.poeticNote}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function MemoryReel() {
  const { chapter3 } = storyData;
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const openLightbox = (index: number) => {
    playChime(587.33, 2.2, 0.08);
    setSelectedIdx(index);
  };

  const closeLightbox = () => {
    setSelectedIdx(null);
  };

  const nextPhoto = () => {
    if (selectedIdx === null) return;
    playChime(523.25, 1.8, 0.06);
    setSelectedIdx((selectedIdx + 1) % chapter3.photos.length);
  };

  const prevPhoto = () => {
    if (selectedIdx === null) return;
    playChime(523.25, 1.8, 0.06);
    setSelectedIdx((selectedIdx + chapter3.photos.length - 1) % chapter3.photos.length);
  };

  // Keyboard navigation
  useEffect(() => {
    if (selectedIdx === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx]);

  return (
    <section
      id="archive"
      className="relative min-h-[100dvh] py-20 sm:py-28 px-5 sm:px-8 max-w-6xl mx-auto flex flex-col justify-center"
    >
      {/* Chapter Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="label text-[0.65rem] text-blush font-semibold tracking-widest uppercase">
          {chapter3.number}
        </span>
        <div className="h-[1px] w-8 bg-blush/40" />
        <span className="label text-[0.62rem] text-sky/60 tracking-wider">
          {chapter3.label}
        </span>
      </div>

      <div className="max-w-2xl mb-10 sm:mb-14">
        <h2 className="font-serif text-[clamp(2.1rem,6vw,4.5rem)] font-light leading-[1.08] text-sky">
          {chapter3.headline}
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-sky/75 leading-relaxed">
          {chapter3.subtext}
        </p>
      </div>

      {/* Grid of 5 Curated Memories with 3D Tilt */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {chapter3.photos.map((photo, idx) => (
          <MemoryCard
            key={idx}
            photo={photo}
            idx={idx}
            onOpen={() => openLightbox(idx)}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIdx !== null &&
        createPortal(
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const diff = e.changedTouches[0].clientX - touchStartX.current;
              if (diff > 50) prevPhoto();
              else if (diff < -50) nextPhoto();
              touchStartX.current = null;
            }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 sm:p-8 backdrop-blur-2xl bg-ivory/95"
            style={{
              paddingTop: 'max(1.2rem, env(safe-area-inset-top))',
              paddingBottom: 'max(1.2rem, env(safe-area-inset-bottom))',
            }}
          >
            {/* Top Bar */}
            <div className="w-full max-w-4xl flex items-center justify-between">
              <span className="label text-sky/70 text-xs flex items-center gap-2">
                <Heart size={9} className="text-blush" />
                Memory {selectedIdx + 1} of {chapter3.photos.length}
              </span>
              <button
                onClick={closeLightbox}
                className="glass p-2.5 rounded-full text-sky hover:border-blush hover:text-blush active:scale-95 transition-all cursor-pointer"
                aria-label="Close lightbox"
              >
                <X size={20} />
              </button>
            </div>

            {/* Photo Center */}
            <div className="flex-1 flex flex-col items-center justify-center my-auto max-w-2xl w-full min-h-0">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedIdx}
                  src={chapter3.photos[selectedIdx].src}
                  alt={chapter3.photos[selectedIdx].alt}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="max-h-[60dvh] max-w-full rounded-2xl border border-blush/40 object-contain shadow-2xl"
                />
              </AnimatePresence>
              <h4 className="mt-4 font-serif text-xl sm:text-2xl text-sky text-center">
                {chapter3.photos[selectedIdx].caption}
              </h4>
              <p className="mt-1 font-serif text-sm sm:text-base italic text-sky/80 text-center max-w-md px-4">
                {chapter3.photos[selectedIdx].poeticNote}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6">
              <button
                onClick={prevPhoto}
                className="glass p-3 rounded-full text-sky hover:border-blush hover:text-blush active:scale-90 transition-all cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-[0.62rem] label text-sky/50 tracking-widest uppercase">
                Swipe or use keys
              </span>
              <button
                onClick={nextPhoto}
                className="glass p-3 rounded-full text-sky hover:border-blush hover:text-blush active:scale-90 transition-all cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>,
          document.body,
        )}
    </section>
  );
}
