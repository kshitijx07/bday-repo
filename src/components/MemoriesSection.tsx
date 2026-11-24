import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Heart } from 'lucide-react';
import { storyData, type MemoryPhoto } from '../data/storyContent';
import { playChime, playSparkle } from '../utils/audio';

function PolaroidCard({
  photo,
  idx,
  onOpen,
  likes,
  onLike,
}: {
  photo: MemoryPhoto;
  idx: number;
  onOpen: () => void;
  likes: number;
  onLike: (e: React.MouseEvent) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 140,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 140,
    damping: 18,
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return; // Pure native scroll on mobile
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 900,
        }}
        initial={{ rotate: photo.rotation }}
        whileHover={{ scale: 1.03, rotate: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onOpen}
        className="relative max-w-[290px] sm:max-w-none mx-auto w-full bg-[#FFFDF9] p-3 pb-5 rounded-md shadow-md hover:shadow-xl border border-forest/15 cursor-pointer select-none group flex flex-col will-change-transform touch-manipulation"
      >
        {/* Washi Tape Strip at top in Blush Pink */}
        <div
          aria-hidden="true"
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-blush/35 border border-blush/50 rounded-xs shadow-xs backdrop-blur-xs rotate-[-3deg] z-20 pointer-events-none"
        />

        {/* Photo Image Frame */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAF2E4] rounded-xs border border-forest/10">
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            draggable={false}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-forest-darker/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-2.5">
            <span className="p-2 rounded-full bg-ivory-light/90 text-forest shadow-md">
              <Maximize2 size={14} />
            </span>
          </div>

          {/* Floating Interactive Like Button */}
          <button
            onClick={onLike}
            className="absolute top-2.5 right-2.5 p-2 rounded-full bg-ivory/90 backdrop-blur-xs border border-forest/15 shadow-sm text-forest-deep hover:text-blush active:scale-125 transition-all flex items-center gap-1.5 z-20 cursor-pointer"
            aria-label="Love this photo"
          >
            <Heart size={14} className={likes > 0 ? 'fill-blush text-blush animate-pulse' : 'text-forest/60'} />
            <span className="text-[0.6rem] font-bold text-forest-deep">{likes}</span>
          </button>
        </div>

        {/* Handwritten Polaroid Caption in Forest Green */}
        <div className="pt-3 px-1 text-left">
          <h4 className="font-serif text-sm sm:text-base font-normal text-forest-deep">
            {photo.caption}
          </h4>
          <p className="font-serif text-xs italic text-forest/75 line-clamp-1 mt-0.5">
            {photo.poeticNote}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function MemoriesSection() {
  const { memoriesSection } = storyData;
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [likes, setLikes] = useState<number[]>([14, 21, 18, 29, 32]);

  const handleLike = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    playChime(659.25, 1.2, 0.08);
    setLikes((prev) => {
      const next = [...prev];
      next[index] = (next[index] || 0) + 1;
      return next;
    });
  };

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
    setSelectedIdx((selectedIdx + 1) % memoriesSection.photos.length);
  };

  const prevPhoto = () => {
    if (selectedIdx === null) return;
    playChime(523.25, 1.8, 0.06);
    setSelectedIdx(
      (selectedIdx + memoriesSection.photos.length - 1) %
        memoriesSection.photos.length,
    );
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedIdx === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedIdx]);

  return (
    <section
      id="memories-chapter"
      className="relative min-h-[100dvh] py-24 px-4 sm:px-8 max-w-6xl mx-auto flex flex-col justify-center"
    >
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="label text-[0.62rem] sm:text-xs text-blush font-semibold tracking-widest uppercase">
            {memoriesSection.label}
          </span>
          <div className="h-[1px] w-8 bg-forest/20" />
          <span className="label text-[0.6rem] text-forest/60 tracking-wider">
            {memoriesSection.title}
          </span>
        </div>
        <h2 className="font-serif text-[clamp(2rem,6vw,4.2rem)] font-light leading-tight text-forest-deep">
          {memoriesSection.title}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-forest/70">
          {memoriesSection.subtitle}
        </p>
      </div>

      {/* Grid of Polaroid Cards with Interactive Hearts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {memoriesSection.photos.map((photo, idx) => (
          <PolaroidCard
            key={idx}
            photo={photo}
            idx={idx}
            likes={likes[idx] || 0}
            onLike={(e) => handleLike(idx, e)}
            onOpen={() => openLightbox(idx)}
          />
        ))}
      </div>

      <p className="text-center mt-12 label text-[0.6rem] text-forest/50 tracking-widest italic">
        {memoriesSection.microcopy}
      </p>

      {/* Fullscreen Lightbox */}
      {selectedIdx !== null &&
        createPortal(
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 sm:p-8 backdrop-blur-2xl bg-[#1A372D]/95"
            style={{
              paddingTop: 'max(1.8rem, calc(env(safe-area-inset-top, 1rem) + 1.2rem))',
              paddingBottom: 'max(2.2rem, calc(env(safe-area-inset-bottom, 1rem) + 1.8rem))',
            }}
          >
            <div className="w-full max-w-4xl flex items-center justify-between">
              <span className="label text-ivory/80 text-xs">
                Memory {selectedIdx + 1} of {memoriesSection.photos.length}
              </span>
              <button
                onClick={closeLightbox}
                className="glass min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full text-ivory hover:text-blush active:scale-95 transition-all cursor-pointer bg-forest-darker/60 border-forest-light/30 touch-manipulation"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center my-auto max-w-2xl w-full min-h-0">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedIdx}
                  src={memoriesSection.photos[selectedIdx].src}
                  alt={memoriesSection.photos[selectedIdx].alt}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="max-h-[46dvh] sm:max-h-[58dvh] max-w-full rounded-md border border-ivory/30 object-contain shadow-2xl"
                />
              </AnimatePresence>
              <h4 className="mt-3 font-serif text-lg sm:text-2xl text-ivory text-center tracking-wide">
                {memoriesSection.photos[selectedIdx].caption}
              </h4>
              <p className="mt-1 font-serif text-xs sm:text-sm italic text-ivory/80 text-center max-w-md px-4">
                {memoriesSection.photos[selectedIdx].poeticNote}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={prevPhoto}
                className="glass min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full text-ivory hover:text-blush active:scale-90 transition-all cursor-pointer bg-forest-darker/60 border-forest-light/30 touch-manipulation"
                aria-label="Previous"
              >
                <ChevronLeft size={22} />
              </button>
              <span className="text-[0.62rem] label text-ivory/60 tracking-widest uppercase font-semibold">
                {selectedIdx + 1} / {memoriesSection.photos.length}
              </span>
              <button
                onClick={nextPhoto}
                className="glass min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full text-ivory hover:text-blush active:scale-90 transition-all cursor-pointer bg-forest-darker/60 border-forest-light/30 touch-manipulation"
                aria-label="Next"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </motion.div>,
          document.body,
        )}
    </section>
  );
}
