import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, ChevronRight, ChevronLeft, Heart, Eye, RotateCw } from 'lucide-react';
import { storyData } from '../data/storyContent';
import { playPaperFlip, playSparkle, playChime } from '../utils/audio';

export default function BookSection() {
  const { bookSection } = storyData;
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(0); // 0: Surprise Mystery Card / Polaroid, 1: Secret Coordinates & Love Note
  const [surpriseRevealed, setSurpriseRevealed] = useState(false);
  const [isPhotoFlipped, setIsPhotoFlipped] = useState(false);
  const [secretHeartCount, setSecretHeartCount] = useState(24);
  const [heartBeating, setHeartBeating] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Mouse / device orientation tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), {
    stiffness: 120,
    damping: 18,
  });

  useEffect(() => {
    // Mouse move on desktop
    const handlePointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;
      x.set(Math.max(-0.5, Math.min(0.5, normX)));
      y.set(Math.max(-0.5, Math.min(0.5, normY)));
    };

    // Device orientation tilt on phone (throttled to 25fps for battery & smoothness)
    let lastOri = 0;
    const handleOrientation = (e: DeviceOrientationEvent) => {
      const now = performance.now();
      if (now - lastOri < 40) return;
      lastOri = now;
      if (e.gamma !== null && e.beta !== null) {
        const tiltX = Math.max(-0.4, Math.min(0.4, e.gamma / 55));
        const tiltY = Math.max(-0.4, Math.min(0.4, (e.beta - 45) / 55));
        x.set(tiltX);
        y.set(tiltY);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('deviceorientation', handleOrientation, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [x, y]);

  const toggleBook = () => {
    playPaperFlip();
    setIsOpen(!isOpen);
  };

  const handleRevealSurprise = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSparkle();
    setSurpriseRevealed(true);
  };

  const handleFlipPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    playChime(659.25, 1.8, 0.08);
    setIsPhotoFlipped(!isPhotoFlipped);
  };

  const handleNextPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    playPaperFlip();
    setPage((p) => (p === 0 ? 1 : 0));
  };

  const handleTapHeart = (e: React.MouseEvent) => {
    e.stopPropagation();
    playChime(783.99, 1.5, 0.09);
    setSecretHeartCount((c) => c + 1);
    setHeartBeating(true);
    setTimeout(() => setHeartBeating(false), 300);
  };

  return (
    <section
      id="book-chapter"
      className="relative min-h-[100dvh] py-20 px-4 sm:px-8 max-w-4xl mx-auto flex flex-col justify-center items-center text-center overflow-hidden"
    >
      {/* Chapter header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="label text-[0.62rem] sm:text-xs text-blush font-semibold tracking-widest uppercase">
          {bookSection.label}
        </span>
        <div className="h-[1px] w-8 bg-forest/20" />
        <span className="label text-[0.6rem] sm:text-[0.62rem] text-forest/60 tracking-wider">
          {bookSection.year}
        </span>
      </div>

      <h2 className="font-serif text-[clamp(2.1rem,6vw,4.2rem)] font-light leading-tight text-forest-deep mb-2">
        {bookSection.title}
      </h2>
      <p className="text-xs sm:text-sm text-forest/70 max-w-md mb-8 sm:mb-12">
        {!isOpen
          ? 'Tap the book cover to open this private keepsake.'
          : 'A secret is kept inside. Tap the seal to unveil what’s hidden.'}
      </p>

      {/* 3D CSS Book Container */}
      <div
        ref={containerRef}
        style={{ perspective: 1600 }}
        className="relative select-none my-2 touch-manipulation"
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            width: 'min(84vw, 320px)',
            height: 'calc(min(84vw, 320px) * 1.42)',
          }}
          className="relative transition-transform duration-300"
        >
          {/* Back Cover: Rich Forest Green */}
          <div
            className="absolute inset-0 rounded-r-2xl bg-[#183127] border border-forest/30 shadow-2xl"
            style={{ transform: 'translateZ(-14px)' }}
          />

          {/* Realistic Stacked Paper Edges */}
          <div
            className="absolute inset-y-1.5 left-2 right-1 rounded-r-xl bg-[#FAF2E4] border border-[#EADBCC]"
            style={{ transform: 'translateZ(-2px)' }}
          />

          {/* INSIDE THE BOOK SPREAD (Active when book is open) */}
          <div
            className="absolute inset-y-2 left-3 right-2 rounded-r-xl bg-[#FFFDF9] p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-inner border border-forest/15"
            style={{ transform: 'translateZ(1px)' }}
          >
            {/* Top Navigation Bar Inside Book */}
            <div className="flex items-center justify-between border-b border-forest/10 pb-2.5">
              <span className="label text-[0.55rem] text-forest/60 tracking-widest uppercase">
                {page === 0 ? 'Keepsake · Vol. 01' : 'Coordinates · Vol. 02'}
              </span>
              <button
                onClick={handleNextPage}
                className="flex items-center gap-1 text-[0.58rem] label text-blush font-semibold tracking-wider hover:opacity-80 active:scale-95 transition-all cursor-pointer"
              >
                <span>{page === 0 ? 'Next Page' : 'Prev Page'}</span>
                {page === 0 ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
              </button>
            </div>

            {/* PAGE CONTENT */}
            <div className="flex-1 flex flex-col justify-center my-auto min-h-0 py-2">
              <AnimatePresence mode="wait">
                {page === 0 ? (
                  /* PAGE 1: SURPRISE MYSTERY CARD & DEVELOPING POLAROID */
                  <motion.div
                    key="page-0"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center h-full"
                  >
                    {!surpriseRevealed ? (
                      /* Sealed Mystery Parchment Envelope */
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-blush/60 bg-[#FAF3E6] text-center my-auto"
                      >
                        <div className="relative mb-3">
                          <div className="absolute -inset-2 rounded-full bg-blush/30 blur-md animate-pulse" />
                          <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-blush via-blush-deep to-blush-dark text-ivory flex items-center justify-center shadow-md">
                            <Sparkles size={20} className="animate-spin-slow" />
                          </div>
                        </div>

                        <span className="label text-[0.6rem] text-blush font-semibold tracking-widest uppercase mb-1">
                          Private Keepsake
                        </span>
                        <h4 className="font-serif text-base text-forest-deep font-normal leading-tight">
                          A secret kept from November 24
                        </h4>
                        <p className="text-[0.65rem] text-forest/70 italic mt-1 max-w-[200px]">
                          Tap the seal below to reveal the moment that changed everything.
                        </p>

                        <button
                          onClick={handleRevealSurprise}
                          className="mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-forest via-forest-deep to-[#183127] text-ivory text-[0.62rem] label font-semibold tracking-wider shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Eye size={12} className="text-blush" />
                          <span>Unlock Surprise</span>
                        </button>
                      </motion.div>
                    ) : (
                      /* Revealed Polaroid Keepsake with Tap-To-Flip Note */
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.6, type: 'spring' }}
                        className="w-full flex flex-col items-center justify-between h-full"
                      >
                        <div
                          onClick={handleFlipPhoto}
                          className="relative aspect-[3/4] w-full max-h-[190px] sm:max-h-[210px] overflow-hidden rounded-md border border-forest/20 shadow-md cursor-pointer group bg-forest-darker/5"
                        >
                          <AnimatePresence mode="wait">
                            {!isPhotoFlipped ? (
                              <motion.div
                                key="photo-front"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full h-full relative"
                              >
                                <img
                                  src={bookSection.previewPhoto}
                                  alt="Neha preview"
                                  className="w-full h-full object-cover"
                                  draggable={false}
                                />
                                <div className="absolute top-2 right-2 p-1.5 rounded-full bg-ivory/85 text-forest-deep shadow-xs opacity-90 group-hover:opacity-100 flex items-center gap-1 text-[0.55rem] label">
                                  <RotateCw size={10} className="text-blush" />
                                  <span className="hidden sm:inline">Flip</span>
                                </div>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="photo-back"
                                initial={{ opacity: 0, rotateY: 90 }}
                                animate={{ opacity: 1, rotateY: 0 }}
                                exit={{ opacity: 0, rotateY: -90 }}
                                className="w-full h-full bg-[#FAF2E4] p-4 flex flex-col justify-between text-left"
                              >
                                <span className="label text-[0.5rem] text-forest/50 tracking-widest">
                                  Handwritten Note · November 24
                                </span>
                                <p
                                  className="font-serif text-sm sm:text-base text-forest-deep italic leading-relaxed my-auto"
                                  style={{ fontFamily: '"Dancing Script", cursive' }}
                                >
                                  “The room was loud, but you were the only melody playing. I looked at you and knew forever wasn’t a concept—it was a person.”
                                </p>
                                <div className="flex justify-between items-center text-[0.55rem] label text-blush">
                                  <span>Tap photo to flip back</span>
                                  <span>— Kshitij</span>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <div className="text-center mt-2">
                          <p className="font-serif text-xs italic text-forest-deep tracking-wide leading-tight">
                            The exact frame where time forgot how to move ✨
                          </p>
                          <span className="label text-[0.5rem] text-forest/50 block mt-0.5">
                            Tap photo to read Kshitij’s note on the back
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  /* PAGE 2: INTERACTIVE COORDINATES & LOVE FREQUENCY */
                  <motion.div
                    key="page-1"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-between h-full p-2 text-center"
                  >
                    <div className="w-full space-y-1">
                      <span className="label text-[0.55rem] text-blush tracking-widest uppercase font-semibold">
                        Celestial Alignment
                      </span>
                      <h4 className="font-serif text-lg text-forest-deep leading-tight">
                        Our Private Frequency
                      </h4>
                    </div>

                    {/* Interactive Heart Beat Meter */}
                    <div className="my-auto flex flex-col items-center py-2">
                      <button
                        onClick={handleTapHeart}
                        className={`relative p-3.5 rounded-full border border-blush/40 bg-blush/10 shadow-sm cursor-pointer transition-transform ${
                          heartBeating ? 'scale-125 bg-blush/30' : 'hover:scale-110 active:scale-95'
                        }`}
                        aria-label="Tap to send a heartbeat"
                      >
                        <Heart
                          size={24}
                          className="fill-blush text-blush animate-pulse"
                        />
                        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-forest text-ivory text-[0.55rem] font-bold">
                          {secretHeartCount}
                        </span>
                      </button>
                      <p className="label text-[0.55rem] text-forest/70 mt-2 tracking-wider">
                        Tap heart to send love
                      </p>
                    </div>

                    <div className="w-full bg-[#FAF3E6] p-2.5 rounded-lg border border-forest/10 text-center">
                      <p className="font-serif text-xs italic text-forest-deep leading-relaxed">
                        “You are my favorite thought in the morning, and my deepest peace at midnight.”
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Controls Inside Book */}
            <div className="flex items-center justify-between border-t border-forest/10 pt-2 text-[0.55rem] label text-forest/50">
              <button
                onClick={toggleBook}
                className="hover:text-forest underline cursor-pointer"
              >
                Close Book
              </button>
              <span className="text-blush">Page {page + 1} of 2</span>
            </div>
          </div>

          {/* Front Cover: Deep Forest Green with Blush Foil Monogram (Opens with paper flip) */}
          <motion.div
            initial={false}
            animate={{ rotateY: isOpen ? -145 : 0 }}
            transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
            onClick={toggleBook}
            style={{
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
              transform: 'translateZ(14px)',
              pointerEvents: isOpen ? 'none' : 'auto',
            }}
            className="absolute inset-0 rounded-r-2xl border border-forest-light/30 shadow-2xl bg-gradient-to-br from-[#244538] via-[#2F5849] to-[#1A372D] flex flex-col justify-between p-6 sm:p-8 cursor-pointer group"
          >
            <div className="flex justify-between items-start">
              <span className="label text-[0.55rem] text-ivory/70 tracking-widest uppercase">
                Kept In Secret
              </span>
              <div className="h-2 w-2 rounded-full bg-blush shadow-[0_0_8px_#F2A7B5] animate-ping" />
            </div>

            <div className="my-auto py-4 text-center">
              <div className="h-[1px] w-8 bg-blush/60 mx-auto mb-3" />
              <h3 className="font-serif text-3xl sm:text-4xl text-ivory font-light italic leading-tight tracking-wider">
                {bookSection.coverTitle}
              </h3>
              <p className="label text-[0.55rem] text-blush tracking-widest mt-1">
                A Private Surprise
              </p>
              <div className="h-[1px] w-8 bg-blush/60 mx-auto mt-3" />
            </div>

            <div className="flex items-center justify-between text-[0.58rem] label text-ivory/70">
              <span>By Kshitij</span>
              <span className="text-blush font-semibold group-hover:translate-x-1 transition-transform">
                Tap to Open →
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Ambient Drop Shadow on Floor */}
        <div
          className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-6 rounded-full blur-xl bg-forest-darker/25"
          aria-hidden="true"
        />
      </div>

      <p className="mt-8 label text-[0.6rem] text-forest/50 tracking-widest italic">
        {bookSection.microcopy}
      </p>
    </section>
  );
}
