import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, RotateCcw } from 'lucide-react';
import { storyData } from '../data/storyContent';
import { playChime } from '../utils/audio';
import Heart from './Heart';

export default function WaxLetterSection() {
  const { chapter4 } = storyData;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    playChime(698.46, 2.5, 0.1);
    setIsOpen(true);
  };

  const handleClose = () => {
    playChime(392.00, 1.5, 0.06);
    setIsOpen(false);
  };

  return (
    <section
      id="letter"
      className="relative min-h-[100dvh] py-20 sm:py-28 px-5 sm:px-8 max-w-4xl mx-auto flex flex-col justify-center items-center text-center"
    >
      {/* Chapter Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="label text-[0.65rem] text-blush font-semibold tracking-widest uppercase">
          {chapter4.number}
        </span>
        <div className="h-[1px] w-8 bg-blush/40" />
        <span className="label text-[0.62rem] text-sky/60 tracking-wider">
          {chapter4.label}
        </span>
      </div>

      <h2 className="font-serif text-[clamp(2.1rem,6vw,4.5rem)] font-light leading-[1.08] text-sky mb-2">
        {chapter4.headline}
      </h2>
      <p className="text-xs sm:text-sm text-sky/70 mb-10 max-w-md">
        {isOpen
          ? 'Read slowly, for every word was written with all my heart.'
          : chapter4.instruction}
      </p>

      {/* Main Letter / Envelope Container */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Sealed Envelope */
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              onClick={handleOpen}
              className="group mx-auto max-w-md cursor-pointer"
            >
              <div className="relative rounded-3xl p-8 sm:p-12 border-2 border-blush/40 bg-gradient-to-b from-ivory via-ivory to-blush/20 shadow-xl group-hover:border-blush group-hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Envelope fold diagonal lines */}
                <div className="absolute inset-0 border border-blush/20 rounded-3xl pointer-events-none" />

                <div className="flex flex-col items-center gap-6">
                  {/* Wax Seal */}
                  <div className="relative p-6 rounded-full bg-gradient-to-br from-blush to-blush-dark shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Heart size={32} className="text-ivory animate-beat" />
                    <span className="absolute inset-0 flex items-center justify-center font-serif text-[0.65rem] tracking-widest font-bold text-ivory/90 pt-8">
                      K &amp; N
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="font-serif text-2xl text-sky font-normal italic">
                      For Neha, My Entire Heart
                    </p>
                    <p className="text-xs text-sky/60 font-sans tracking-wide">
                      Sealed with love by Kshitij · Tap to open
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-blush label text-[0.65rem] font-semibold tracking-widest pt-2">
                    <Mail size={13} />
                    <span>Unseal My Letter</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Unfolded Handwritten Letter */
            <motion.div
              key="letter-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative text-left rounded-3xl p-6 sm:p-10 md:p-14 border border-blush/40 bg-ivory shadow-2xl overflow-hidden max-w-3xl mx-auto"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(transparent 0 31px, rgba(242,167,181,.12) 31px 32px)',
                backgroundPositionY: '12px',
              }}
            >
              {/* Header inside letter */}
              <div className="flex items-center justify-between pb-6 border-b border-blush/25 mb-6">
                <span className="label text-[0.62rem] text-sky/50 tracking-widest uppercase">
                  Written for Neha
                </span>
                <Heart size={14} className="text-blush" />
              </div>

              {/* Salutation */}
              <p
                className="font-serif text-2xl sm:text-3xl text-sky mb-6"
                style={{ fontFamily: '"Dancing Script", cursive' }}
              >
                {chapter4.greeting}
              </p>

              {/* Paragraphs */}
              <div className="space-y-6">
                {chapter4.paragraphs.map((para, idx) => (
                  <p
                    key={idx}
                    className="font-serif text-base sm:text-lg leading-[32px] sm:leading-[32px] md:text-xl md:leading-[36px] text-sky/90"
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Signoff */}
              <div className="mt-10 pt-6 border-t border-blush/25 space-y-1">
                <p className="font-serif text-base sm:text-lg italic text-blush-dark">
                  {chapter4.signoff}
                </p>
                <p
                  className="font-serif text-2xl sm:text-3xl text-sky"
                  style={{ fontFamily: '"Dancing Script", cursive' }}
                >
                  {chapter4.signature}
                </p>
              </div>

              {/* Re-seal button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleClose}
                  className="glass flex items-center gap-2 rounded-full px-4 py-2 text-xs text-sky hover:border-blush active:scale-95 transition-all cursor-pointer"
                >
                  <RotateCcw size={12} />
                  <span>Fold Letter</span>
                </button>
              </div>

              {/* Decorative corners */}
              <div className="absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-blush/30 rounded-tl-lg" />
              <div className="absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-blush/30 rounded-tr-lg" />
              <div className="absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-blush/30 rounded-bl-lg" />
              <div className="absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-blush/30 rounded-br-lg" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
