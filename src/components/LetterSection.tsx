import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Mail, RotateCcw, Sparkles } from 'lucide-react';
import { storyData } from '../data/storyContent';
import { playPaperFlip, playChime, playSparkle } from '../utils/audio';
import CelebrationBalloons from './CelebrationBalloons';

export default function LetterSection() {
  const { letterSection } = storyData;
  const [isOpen, setIsOpen] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);
  const [showShine, setShowShine] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });

  const envelopeY = useTransform(scrollYProgress, [0, 1], [60, 0]);

  const handleOpen = () => {
    playPaperFlip();
    playChime(698.46, 2.5, 0.09);
    playSparkle();
    setIsOpen(true);
    setShowBalloons(true);
    setShowShine(true);

    // Keep balloons active for the 7 second ascent
    setTimeout(() => {
      setShowBalloons(false);
    }, 7500);

    // Shine effect fades naturally
    setTimeout(() => {
      setShowShine(false);
    }, 3500);
  };

  const handleClose = () => {
    playPaperFlip();
    setIsOpen(false);
    setShowBalloons(false);
    setShowShine(false);
  };

  return (
    <section
      id="letter-chapter"
      ref={sectionRef}
      className="relative min-h-[100dvh] py-16 sm:py-24 px-3 sm:px-8 max-w-4xl mx-auto flex flex-col justify-center items-center text-center"
    >
      <div className="flex items-center gap-2 mb-2 sm:mb-3">
        <span className="label text-[0.6rem] sm:text-xs text-blush font-semibold tracking-widest uppercase">
          {letterSection.label}
        </span>
        <div className="h-[1px] w-6 sm:w-8 bg-forest/20" />
        <span className="label text-[0.58rem] sm:text-[0.6rem] text-forest/60 tracking-wider">
          Birthday Letter
        </span>
      </div>

      <h2 className="font-serif text-[clamp(1.9rem,5.5vw,4.4rem)] font-light leading-tight text-forest-deep mb-1.5 sm:mb-2">
        {letterSection.title}
      </h2>
      <p className="text-xs sm:text-sm text-forest/70 mb-8 sm:mb-12">
        {isOpen ? 'Every word written from the bottom of my heart.' : letterSection.subtitle}
      </p>

      {/* Envelope / 3D Unfolding Parchment */}
      <motion.div style={{ y: envelopeY }} className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Sealed Forest Green Envelope with Blush Wax Seal */
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              onClick={handleOpen}
              className="mx-auto max-w-md cursor-pointer select-none group touch-manipulation"
              role="button"
              tabIndex={0}
              aria-label="Open the birthday letter"
            >
              <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-12 border border-forest-light/30 bg-gradient-to-br from-[#244538] via-[#2F5A4B] to-[#1A372D] shadow-2xl group-hover:shadow-[0_12px_36px_rgba(49,92,76,0.3)] transition-all duration-500 overflow-hidden">
                <div className="flex flex-col items-center gap-4 sm:gap-6">
                  {/* Wax Seal with Blush Pink glow */}
                  <div className="relative w-15 h-15 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-[#F2A7B5] via-[#E28698] to-[#CE687D] border-2 border-blush-light/80 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      viewBox="0 0 24 24"
                      width={22}
                      height={22}
                      className="fill-ivory animate-beat drop-shadow-sm"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>

                  <div className="space-y-1">
                    <p className="font-serif text-lg sm:text-2xl text-ivory italic tracking-wide">
                      For Neha · A Birthday Letter
                    </p>
                    <p className="text-xs text-ivory/70 font-sans tracking-wide">
                      Tap the seal to unfold Kshitij’s birthday letter
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-blush label text-[0.6rem] sm:text-[0.62rem] font-semibold tracking-widest pt-1">
                    <Mail size={13} />
                    <span>Unfold Birthday Letter</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Unfolded Vintage Warm Ivory Parchment with Forest Inked Reveal */
            <div className="relative">
              {/* Golden & Blush Celestial Shine Halo Behind Letter */}
              {showShine && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: [0, 0.9, 0], scale: [0.7, 1.25, 1.5] }}
                  transition={{ duration: 2.6, ease: 'easeOut' }}
                  className="pointer-events-none absolute -inset-8 sm:-inset-14 rounded-3xl bg-gradient-to-r from-amber-200/50 via-[#F2A7B5]/45 to-amber-100/40 blur-2xl z-0"
                />
              )}

              {/* Floating Star Sparkles Radiating Outward */}
              {showShine && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-6 sm:-inset-10 z-30 overflow-hidden"
                >
                  {[
                    { x: 12, y: 15, delay: 0.1, size: 20 },
                    { x: 88, y: 22, delay: 0.25, size: 24 },
                    { x: 20, y: 80, delay: 0.4, size: 18 },
                    { x: 82, y: 75, delay: 0.2, size: 22 },
                    { x: 50, y: -5, delay: 0.35, size: 26 },
                    { x: 95, y: 48, delay: 0.15, size: 19 },
                    { x: 6, y: 52, delay: 0.3, size: 21 },
                  ].map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, rotate: -30 }}
                      animate={{
                        opacity: [0, 1, 0.8, 0],
                        scale: [0, 1.25, 1, 0],
                        rotate: [0, 90, 180],
                      }}
                      transition={{
                        duration: 2.2,
                        delay: s.delay,
                        ease: 'easeOut',
                      }}
                      style={{
                        top: `${s.y}%`,
                        left: `${s.x}%`,
                      }}
                      className="absolute text-blush drop-shadow-[0_0_10px_#F2A7B5]"
                    >
                      <Sparkles size={s.size} />
                    </motion.div>
                  ))}
                </div>
              )}

              <motion.div
                key="parchment"
                initial={{ opacity: 0, rotateX: 30, scale: 0.9 }}
                animate={{ opacity: 1, rotateX: 0, scale: 1 }}
                exit={{ opacity: 0, rotateX: -20, scale: 0.9 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformPerspective: 1200 }}
                className="relative text-left rounded-2xl p-5 sm:p-10 md:p-12 bg-[#FFFDF9] text-forest-deep shadow-2xl border border-forest/15 overflow-hidden z-10"
              >
                {/* Diagonal Glass Shimmer Glaze across parchment */}
                <motion.div
                  initial={{ x: '-150%', opacity: 0.7 }}
                  animate={{ x: '250%', opacity: 0 }}
                  transition={{ duration: 2.0, delay: 0.25, ease: 'easeInOut' }}
                  className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/55 to-transparent z-20"
                />

                {/* Header */}
                <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-forest/15 mb-4 sm:mb-6">
                  <span className="label text-[0.58rem] sm:text-[0.6rem] text-forest/60 tracking-widest uppercase font-semibold">
                    Happy Birthday Neha · Inked with Love
                  </span>
                  <div className="h-2 w-2 rounded-full bg-blush shadow-[0_0_6px_#F2A7B5]" />
                </div>

                {/* Salutation */}
                <p
                  className="font-serif text-xl sm:text-3xl text-forest-deep mb-4 sm:mb-6"
                  style={{ fontFamily: '"Dancing Script", cursive' }}
                >
                  {letterSection.greeting}
                </p>

                {/* Inked Paragraphs in Timeless Forest Green */}
                <div className="space-y-3.5 sm:space-y-5">
                  {letterSection.paragraphs.map((para, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.15, duration: 0.8 }}
                      className="font-serif text-sm sm:text-lg md:text-xl leading-relaxed text-forest-deep/90"
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>

                {/* Blush Signoff & Signature */}
                <div className="mt-8 pt-6 border-t border-forest/15 space-y-1">
                  <p className="font-serif text-base sm:text-lg italic text-forest/75">
                    {letterSection.signoff}
                  </p>
                  <p
                    className="font-serif text-2xl sm:text-3xl text-blush-deep font-normal"
                    style={{ fontFamily: '"Dancing Script", cursive' }}
                  >
                    {letterSection.signature}
                  </p>
                </div>

                {/* Close / Fold Button */}
                <div className="mt-8 flex justify-center sm:justify-end">
                  <button
                    onClick={handleClose}
                    className="flex items-center gap-2 rounded-full px-5 py-2.5 text-xs text-forest/70 hover:text-forest border border-forest/20 hover:border-forest/40 active:scale-95 transition-all cursor-pointer min-h-[44px] touch-manipulation"
                  >
                    <RotateCcw size={12} />
                    <span>Fold Letter</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating Birthday Balloons that rise from bottom to top across the screen */}
      <CelebrationBalloons active={showBalloons} count={16} />
    </section>
  );
}
