import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { storyData, type MemoryPhoto } from '../data/storyContent';
import { playChime } from '../utils/audio';

function PolaroidCard({
  photo,
  onOpen,
}: {
  photo: MemoryPhoto;
  idx: number;
  onOpen: () => void;
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
        className="relative bg-[#FFFDF9] p-3 pb-6 rounded-md shadow-md hover:shadow-xl border border-forest/15 cursor-pointer select-none group flex flex-col will-change-transform"
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
        </div>

        {/* Handwritten Polaroid Caption in Forest Green */}
        <div className="pt-3 px-1">
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

      {/* Grid of Polaroid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {memoriesSection.photos.map((photo, idx) => (
          <PolaroidCard
            key={idx}
            photo={photo}
            idx={idx}
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
              paddingTop: 'max(1.2rem, env(safe-area-inset-top))',
              paddingBottom: 'max(1.2rem, env(safe-area-inset-bottom))',
            }}
          >
            <div className="w-full max-w-4xl flex items-center justify-between">
              <span className="label text-ivory/80 text-xs">
                Memory {selectedIdx + 1} of {memoriesSection.photos.length}
              </span>
              <button
                onClick={closeLightbox}
                className="glass p-2.5 rounded-full text-ivory hover:text-blush active:scale-95 transition-all cursor-pointer bg-forest-darker/60 border-forest-light/30"
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
                  className="max-h-[62dvh] max-w-full rounded-md border border-ivory/30 object-contain shadow-2xl"
                />
              </AnimatePresence>
              <h4 className="mt-4 font-serif text-xl sm:text-2xl text-ivory text-center">
                {memoriesSection.photos[selectedIdx].caption}
              </h4>
              <p className="mt-1 font-serif text-xs sm:text-sm italic text-ivory/80 text-center max-w-md px-4">
                {memoriesSection.photos[selectedIdx].poeticNote}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={prevPhoto}
                className="glass p-3 rounded-full text-ivory hover:text-blush active:scale-90 transition-all cursor-pointer bg-forest-darker/60 border-forest-light/30"
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-[0.62rem] label text-ivory/60 tracking-widest uppercase">
                {selectedIdx + 1} / {memoriesSection.photos.length}
              </span>
              <button
                onClick={nextPhoto}
                className="glass p-3 rounded-full text-ivory hover:text-blush active:scale-90 transition-all cursor-pointer bg-forest-darker/60 border-forest-light/30"
                aria-label="Next"
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
