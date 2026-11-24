import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, Flame, Mic, Gift, Check } from 'lucide-react';
import { storyData } from '../data/storyContent';
import { listenForBlow, playBlowSound, playChime, playSparkle } from '../utils/audio';

export default function CakeSection() {
  const { cakeSection, hisName, herName } = storyData;
  const [blown, setBlown] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [voucherClaimed, setVoucherClaimed] = useState(false);
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

  // Listen to mic for breath/blow ONLY when CakeSection is actually in viewport
  useEffect(() => {
    if (blown) return;

    const sectionEl = document.getElementById('cake-chapter');
    if (!sectionEl) return;

    let mounted = true;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !blown && !cleanupMicRef.current) {
          listenForBlow(() => {
            if (mounted) handleBlow();
          }).then((cleanup) => {
            if (mounted) {
              cleanupMicRef.current = cleanup;
              setMicActive(true);
            }
          });
        } else if (!entry.isIntersecting && cleanupMicRef.current) {
          cleanupMicRef.current();
          cleanupMicRef.current = null;
          setMicActive(false);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(sectionEl);

    return () => {
      mounted = false;
      observer.disconnect();
      if (cleanupMicRef.current) {
        cleanupMicRef.current();
        cleanupMicRef.current = null;
      }
    };
  }, [blown]);

  const handleRelight = () => {
    playChime(440, 1.5, 0.06);
    setBlown(false);
    setVoucherClaimed(false);
  };

  const handleClaimVoucher = () => {
    playSparkle();
    setVoucherClaimed(true);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="cake-chapter"
      className="relative min-h-[100dvh] pt-14 sm:pt-20 px-3 sm:px-8 max-w-4xl mx-auto flex flex-col justify-center items-center text-center overflow-hidden"
      style={{
        paddingBottom: 'max(4.5rem, calc(env(safe-area-inset-bottom, 2rem) + 2.5rem))',
      }}
    >
      {/* Dim Screen Aura when candle blown */}
      {blown && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="pointer-events-none fixed inset-0 z-20 bg-forest-darker/40 backdrop-blur-xs"
        />
      )}

      {/* Chapter header */}
      <div className="relative z-30 flex items-center gap-2 mb-2 sm:mb-3">
        <span className="label text-[0.6rem] sm:text-xs text-blush font-semibold tracking-widest uppercase">
          {cakeSection.label}
        </span>
        <div className="h-[1px] w-6 sm:w-8 bg-forest/20" />
        <span className="label text-[0.58rem] sm:text-[0.6rem] text-forest/60 tracking-wider">
          Make A Wish
        </span>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="relative z-30 font-serif text-[clamp(2.1rem,7.5vw,5.5rem)] font-light leading-[1.04] text-forest-deep mb-2"
      >
        {cakeSection.headline[0]}{' '}
        <span className="text-blush italic font-normal">{cakeSection.headline[1]}</span>
      </motion.h2>

      <p className="relative z-30 mt-1 sm:mt-2 max-w-md text-xs sm:text-base font-serif italic text-forest/80 leading-relaxed px-4">
        {cakeSection.message}
      </p>

      {/* SVG Line-Art Cake with Candle */}
      <div className="relative z-30 my-6 sm:my-10 flex flex-col items-center">
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
                className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 mb-1 cursor-pointer select-none group touch-manipulation"
                role="button"
                tabIndex={0}
                aria-label="Blow out the candle flame"
              >
                {/* Blush Pink Aura Pulse */}
                <div className="absolute inset-1 bg-blush rounded-full blur-md opacity-70 animate-pulse pointer-events-none" />
                <div className="relative p-2 sm:p-2.5 rounded-full bg-gradient-to-t from-blush to-amber-100 text-blush-dark shadow-[0_0_18px_#F2A7B5] transform active:scale-90 transition-transform">
                  <Flame size={24} className="fill-blush-deep sm:w-7 sm:h-7" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="smoke"
                initial={{ opacity: 0.9, y: 0 }}
                animate={{ opacity: 0, y: -40, scale: 1.8 }}
                transition={{ duration: 1.6 }}
                className="mb-2 label text-xs text-blush flex items-center gap-1.5 font-semibold"
              >
                <Sparkles size={12} />
                <span>Wish Made · Stardust Released ✨</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Inline SVG Line-Art Birthday Cake in Forest Green and Blush Pink */}
          <svg
            viewBox="0 0 160 140"
            className="w-40 sm:w-56 h-auto stroke-forest fill-none overflow-visible"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Candle Body */}
            <line x1="80" y1="36" x2="80" y2="10" stroke="#315C4C" strokeWidth={2.5} />
            <line x1="80" y1="10" x2="80" y2="4" stroke="#204034" strokeWidth={1.5} />

            {/* Top Cake Tier */}
            <rect x="50" y="36" width="60" height="28" rx="4" />
            <path d="M50 48 Q65 52 80 48 Q95 52 110 48" stroke="#F2A7B5" strokeWidth={1.8} />

            {/* Cake Base Tier */}
            <rect x="30" y="64" width="100" height="42" rx="6" />
            <path d="M30 80 Q55 86 80 80 Q105 86 130 80" stroke="#F2A7B5" strokeWidth={1.8} />
            <path d="M30 96 Q55 102 80 96 Q105 102 130 96" stroke="rgba(49,92,76,0.3)" strokeWidth={1} />

            {/* Cake Plate Stand */}
            <path d="M15 108 L145 108" stroke="#315C4C" strokeWidth={2} />
            <path d="M40 108 Q80 124 120 108" stroke="#315C4C" strokeWidth={1.5} />
            <line x1="60" y1="120" x2="100" y2="120" stroke="#315C4C" strokeWidth={2} />
          </svg>
        </div>

        {/* Mic Instruction & Action */}
        {!blown ? (
          <div className="flex flex-col items-center gap-2 mt-4">
            <button
              onClick={handleBlow}
              className="glass label group inline-flex items-center gap-2.5 rounded-full border border-blush/60 bg-[#FFFDF9] px-7 py-3.5 text-forest-deep shadow-md hover:border-blush active:scale-95 transition-all cursor-pointer min-h-[48px] touch-manipulation"
            >
              <Flame size={15} className="text-blush" />
              <span className="text-xs font-semibold tracking-wider">Tap to Blow Candle</span>
            </button>
            <p className="flex items-center gap-1.5 label text-[0.62rem] text-forest/60 tracking-wider mt-1 px-4 text-center">
              {micActive && <Mic size={11} className="text-blush animate-pulse shrink-0" />}
              <span>{cakeSection.blowInstruction}</span>
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 mt-6 w-full max-w-sm">
            {/* SURPRISE GOLDEN BIRTHDAY VOUCHER UNLOCKED */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full bg-[#FFFDF9] border border-blush/60 rounded-2xl p-5 shadow-xl text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-blush/10 rounded-bl-full pointer-events-none" />
              <div className="flex items-center justify-center gap-2 text-blush mb-1.5">
                <Gift size={16} />
                <span className="label text-[0.6rem] font-bold tracking-widest uppercase">
                  Birthday Surprise Unlocked
                </span>
              </div>
              <h4 className="font-serif text-lg text-forest-deep font-normal leading-tight">
                Voucher No. 1124 · Valid Forever
              </h4>
              <p
                className="font-serif text-sm italic text-forest/80 leading-relaxed mt-2"
                style={{ fontFamily: '"Dancing Script", cursive' }}
              >
                “Redeemable for: One spontaneous midnight drive, unlimited ice cream, and my undivided attention anytime your heart asks for it.”
              </p>

              <div className="mt-4 pt-3 border-t border-forest/10 flex items-center justify-between">
                <span className="label text-[0.55rem] text-forest/50">Issued with all my love</span>
                <button
                  onClick={handleClaimVoucher}
                  className={`px-4 py-1.5 rounded-full text-xs font-serif font-normal transition-all flex items-center gap-1 cursor-pointer ${
                    voucherClaimed
                      ? 'bg-forest text-ivory'
                      : 'bg-blush text-forest-darker hover:bg-blush-deep active:scale-95'
                  }`}
                >
                  {voucherClaimed ? (
                    <>
                      <Check size={12} />
                      <span>Claimed by Neha ♥</span>
                    </>
                  ) : (
                    <span>Claim Voucher</span>
                  )}
                </button>
              </div>
            </motion.div>

            <button
              onClick={handleRelight}
              className="glass label flex items-center gap-2 rounded-full px-6 py-2.5 text-xs text-forest/70 hover:text-blush border border-forest/20 hover:border-blush active:scale-95 transition-all cursor-pointer bg-[#FFFDF9] min-h-[40px] touch-manipulation mt-2"
            >
              <RotateCcw size={12} />
              <span>Light Candle Again</span>
            </button>
          </div>
        )}
      </div>

      {/* Featured Celebration Photo */}
      <div className="relative z-30 w-full max-w-[260px] sm:max-w-sm rounded-xl sm:rounded-2xl overflow-hidden border border-forest/15 shadow-xl bg-[#FFFDF9] mb-8 sm:mb-10">
        <img
          src={cakeSection.photo}
          alt="Neha birthday celebration"
          loading="lazy"
          draggable={false}
          className="w-full h-auto object-cover"
        />
        <div className="p-4 bg-[#FFFDF9] border-t border-forest/10 text-center">
          <p className="font-serif text-lg sm:text-xl text-forest-deep font-normal tracking-wide">
            Happy Birthday Neha · My Muse &amp; Endless Light
          </p>
          <p className="label text-[0.62rem] text-blush font-semibold tracking-widest mt-1">
            November 24 · Endless Devotion
          </p>
        </div>
      </div>

      {/* Final Closing Signoff */}
      <div className="relative z-30 border-t border-forest/15 pt-8 w-full max-w-md space-y-4">
        <p
          className="font-serif text-2xl sm:text-3xl italic text-forest-deep"
          style={{ fontFamily: '"Dancing Script", cursive' }}
        >
          {cakeSection.closing}
        </p>

        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={handleScrollToTop}
            className="glass flex items-center gap-2 rounded-full px-6 py-3 text-xs text-forest hover:text-blush border border-forest/20 hover:border-forest/40 active:scale-95 transition-all cursor-pointer bg-[#FFFDF9] min-h-[44px] touch-manipulation"
          >
            <RotateCcw size={12} />
            <span className="label text-[0.65rem] tracking-wider font-semibold">
              Read Our Story Again
            </span>
          </button>
        </div>

        <p className="label text-[0.58rem] text-forest/50 tracking-widest pt-4">
          Crafted with love by {hisName} for {herName}
        </p>
      </div>
    </section>
  );
}
