import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, Flame, Mic } from 'lucide-react';
import { storyData } from '../data/storyContent';
import { listenForBlow, playBlowSound, playChime } from '../utils/audio';

export default function CakeSection() {
  const { cakeSection, hisName, herName } = storyData;
  const [blown, setBlown] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const cleanupMicRef = useRef<(() => void) | null>(null);

  // Handle blowing out the candle
  const handleBlow = () => {
    if (blown) return;
    playBlowSound();

    // Celebratory celestial chime sequence
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      setTimeout(() => playChime(freq, 2.5, 0.08), idx * 160);
    });

    setBlown(true);
    if (cleanupMicRef.current) {
      cleanupMicRef.current();
    }
  };

  // Listen to mic for breath/blow when in viewport
  useEffect(() => {
    if (blown) return;

    let mounted = true;
    listenForBlow(() => {
      if (mounted) handleBlow();
    }).then((cleanup) => {
      if (mounted) {
        cleanupMicRef.current = cleanup;
        setMicActive(true);
      }
    });

    return () => {
      mounted = false;
      if (cleanupMicRef.current) cleanupMicRef.current();
    };
  }, [blown]);

  const handleRelight = () => {
    playChime(440, 1.5, 0.06);
    setBlown(false);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="cake-chapter"
      className="relative min-h-[100dvh] pt-20 pb-28 px-4 sm:px-8 max-w-4xl mx-auto flex flex-col justify-center items-center text-center overflow-hidden"
    >
      {/* Dim Screen Aura when candle blown */}
      {blown && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="pointer-events-none fixed inset-0 z-20 bg-charcoal-darker/60 backdrop-blur-xs"
        />
      )}

      {/* Chapter header */}
      <div className="relative z-30 flex items-center gap-2 mb-3">
        <span className="label text-[0.62rem] sm:text-xs text-signal font-semibold tracking-widest uppercase">
          {cakeSection.label}
        </span>
        <div className="h-[1px] w-8 bg-silver/20" />
        <span className="label text-[0.6rem] text-silver/50 tracking-wider">
          Make A Wish
        </span>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="relative z-30 font-serif text-[clamp(2.4rem,8vw,5.5rem)] font-light leading-[1.04] text-silver-light mb-2"
      >
        {cakeSection.headline[0]}{' '}
        <span className="text-signal italic font-normal">{cakeSection.headline[1]}</span>
      </motion.h2>

      <p className="relative z-30 mt-2 max-w-md text-sm sm:text-base font-serif italic text-silver/80 leading-relaxed px-4">
        {cakeSection.message}
      </p>

      {/* SVG Line-Art Cake with Candle */}
      <div className="relative z-30 my-10 flex flex-col items-center">
        {/* Flame with Tap/Hold or Mic interaction */}
        <div className="relative flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!blown ? (
              <motion.div
                key="flame"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.9, 1, 0.9] }}
                exit={{ scale: 0.1, opacity: 0, y: -25 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                onClick={handleBlow}
                className="relative flex justify-center mb-1 cursor-pointer select-none group"
                role="button"
                tabIndex={0}
                aria-label="Blow out the candle flame"
              >
                {/* Red Aura Pulse */}
                <div className="absolute -inset-3 bg-signal rounded-full blur-md opacity-60 animate-pulse" />
                <div className="relative p-2 rounded-full bg-gradient-to-t from-signal to-amber-200 text-signal shadow-[0_0_15px_#E10600]">
                  <Flame size={26} className="fill-signal" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="smoke"
                initial={{ opacity: 0.9, y: 0 }}
                animate={{ opacity: 0, y: -40, scale: 1.8 }}
                transition={{ duration: 1.6 }}
                className="mb-2 label text-xs text-signal flex items-center gap-1.5"
              >
                <Sparkles size={12} />
                <span>Wish Made ✨</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Inline SVG Line-Art Birthday Cake */}
          <svg
            viewBox="0 0 160 140"
            className="w-48 sm:w-56 h-auto stroke-silver fill-none overflow-visible"
            strokeWidth={1.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Candle Body */}
            <line x1="80" y1="36" x2="80" y2="10" stroke="#C0C0C0" strokeWidth={2.5} />
            <line x1="80" y1="10" x2="80" y2="4" stroke="#808080" strokeWidth={1.5} />

            {/* Top Cake Tier */}
            <rect x="50" y="36" width="60" height="28" rx="4" />
            <path d="M50 48 Q65 52 80 48 Q95 52 110 48" stroke="#E10600" strokeWidth={1.5} />

            {/* Cake Base Tier */}
            <rect x="30" y="64" width="100" height="42" rx="6" />
            <path d="M30 80 Q55 86 80 80 Q105 86 130 80" stroke="#E10600" strokeWidth={1.5} />
            <path d="M30 96 Q55 102 80 96 Q105 102 130 96" stroke="rgba(192,192,192,0.4)" strokeWidth={1} />

            {/* Cake Plate Stand */}
            <path d="M15 108 L145 108" stroke="#C0C0C0" strokeWidth={2} />
            <path d="M40 108 Q80 124 120 108" stroke="#C0C0C0" strokeWidth={1.5} />
            <line x1="60" y1="120" x2="100" y2="120" stroke="#C0C0C0" strokeWidth={2} />
          </svg>
        </div>

        {/* Mic Instruction & Action */}
        {!blown ? (
          <div className="flex flex-col items-center gap-2 mt-4">
            <button
              onClick={handleBlow}
              className="glass label group inline-flex items-center gap-2 rounded-full border border-signal/40 bg-charcoal-card px-6 py-3 text-silver-light shadow-lg hover:border-signal active:scale-95 transition-all cursor-pointer"
            >
              <Flame size={14} className="text-signal" />
              <span className="text-xs font-semibold tracking-wider">Tap to Blow Candle</span>
            </button>
            <p className="flex items-center gap-1.5 label text-[0.6rem] text-silver/50 tracking-wider mt-1">
              {micActive && <Mic size={10} className="text-signal animate-pulse" />}
              <span>{cakeSection.blowInstruction}</span>
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={handleRelight}
              className="glass label flex items-center gap-2 rounded-full px-5 py-2.5 text-xs text-silver hover:text-signal border border-silver/20 hover:border-signal/40 active:scale-95 transition-all cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Light Candle Again</span>
            </button>
          </div>
        )}
      </div>

      {/* Featured Celebration Photo */}
      <div className="relative z-30 w-full max-w-xs sm:max-w-sm rounded-2xl overflow-hidden border border-silver/20 shadow-2xl bg-charcoal-card mb-10">
        <img
          src={cakeSection.photo}
          alt="Neha birthday celebration"
          loading="lazy"
          draggable={false}
          className="w-full h-auto object-cover"
        />
        <div className="p-4 bg-charcoal-card border-t border-silver/15 text-center">
          <p className="font-serif text-lg text-silver-light font-normal">
            For Neha, The Queen of My Heart
          </p>
          <p className="label text-[0.62rem] text-signal mt-1">
            Happy Birthday · Forever &amp; Always
          </p>
        </div>
      </div>

      {/* Final Closing Signoff */}
      <div className="relative z-30 border-t border-silver/20 pt-8 w-full max-w-md space-y-4">
        <p
          className="font-serif text-2xl sm:text-3xl italic text-silver-light"
          style={{ fontFamily: '"Dancing Script", cursive' }}
        >
          {cakeSection.closing}
        </p>

        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={handleScrollToTop}
            className="glass flex items-center gap-2 rounded-full px-5 py-2.5 text-xs text-silver hover:text-signal border border-silver/20 hover:border-silver/40 active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw size={12} />
            <span className="label text-[0.65rem] tracking-wider font-semibold">
              Read Our Story Again
            </span>
          </button>
        </div>

        <p className="label text-[0.58rem] text-silver/40 tracking-widest pt-4">
          Crafted with love by {hisName} for {herName}
        </p>
      </div>
    </section>
  );
}
