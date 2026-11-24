import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Mail, RotateCcw } from 'lucide-react';
import { storyData } from '../data/storyContent';
import { playPaperFlip, playChime } from '../utils/audio';

export default function LetterSection() {
  const { letterSection } = storyData;
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });

  const envelopeY = useTransform(scrollYProgress, [0, 1], [60, 0]);

  const handleOpen = () => {
    playPaperFlip();
    playChime(698.46, 2.5, 0.09);
    setIsOpen(true);
  };

  const handleClose = () => {
    playPaperFlip();
    setIsOpen(false);
  };

  return (
    <section
      id="letter-chapter"
      ref={sectionRef}
      className="relative min-h-[100dvh] py-24 px-4 sm:px-8 max-w-4xl mx-auto flex flex-col justify-center items-center text-center"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="label text-[0.62rem] sm:text-xs text-blush font-semibold tracking-widest uppercase">
          {letterSection.label}
        </span>
        <div className="h-[1px] w-8 bg-forest/20" />
        <span className="label text-[0.6rem] text-forest/60 tracking-wider">
          Unspoken Truth
        </span>
      </div>

      <h2 className="font-serif text-[clamp(2.1rem,6vw,4.4rem)] font-light leading-tight text-forest-deep mb-2">
        {letterSection.title}
      </h2>
      <p className="text-xs sm:text-sm text-forest/70 mb-12">
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
              aria-label="Open the love letter"
            >
              <div className="relative rounded-3xl p-6 sm:p-12 border border-forest-light/30 bg-gradient-to-br from-[#244538] via-[#2F5A4B] to-[#1A372D] shadow-2xl group-hover:shadow-[0_12px_36px_rgba(49,92,76,0.3)] transition-all duration-500 overflow-hidden">
                <div className="flex flex-col items-center gap-5 sm:gap-6">
                  {/* Wax Seal with Blush Pink glow */}
                  <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-[#F2A7B5] via-[#E28698] to-[#CE687D] border-2 border-blush-light/80 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="font-serif text-sm tracking-widest font-semibold text-ivory">
                      K &amp; N
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="font-serif text-xl sm:text-2xl text-ivory italic tracking-wide">
                      For Neha · In Quiet Devotion
                    </p>
                    <p className="text-xs text-ivory/70 font-sans tracking-wide">
                      Tap the seal to unfold what’s unsaid
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-blush label text-[0.62rem] font-semibold tracking-widest pt-1">
                    <Mail size={13} />
                    <span>Unfold Monologue</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Unfolded Vintage Warm Ivory Parchment with Forest Inked Reveal */
            <motion.div
              key="parchment"
              initial={{ opacity: 0, rotateX: 30, scale: 0.9 }}
              animate={{ opacity: 1, rotateX: 0, scale: 1 }}
              exit={{ opacity: 0, rotateX: -20, scale: 0.9 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformPerspective: 1200 }}
              className="relative text-left rounded-2xl p-6 sm:p-10 md:p-12 bg-[#FFFDF9] text-forest-deep shadow-2xl border border-forest/15 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-forest/15 mb-6">
                <span className="label text-[0.6rem] text-forest/60 tracking-widest uppercase font-semibold">
                  Written for Neha
                </span>
                <div className="h-2 w-2 rounded-full bg-blush shadow-[0_0_6px_#F2A7B5]" />
              </div>

              {/* Salutation */}
              <p
                className="font-serif text-2xl sm:text-3xl text-forest-deep mb-6"
                style={{ fontFamily: '"Dancing Script", cursive' }}
              >
                {letterSection.greeting}
              </p>

              {/* Inked Paragraphs in Timeless Forest Green */}
              <div className="space-y-5">
                {letterSection.paragraphs.map((para, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.15, duration: 0.8 }}
                    className="font-serif text-base sm:text-lg md:text-xl leading-relaxed text-forest-deep/90"
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
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
