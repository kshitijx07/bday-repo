import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';
import { storyData } from '../data/storyContent';
import { startAmbientLoop, playChime } from '../utils/audio';
import { getLenis } from '../utils/motion';

export default function GateSection() {
  const { gate, herName } = storyData;
  const [unsealed, setUnsealed] = useState(false);
  const [holding, setHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdIntervalRef = useRef<number | null>(null);

  // Request iOS device orientation permission on user gesture
  const requestTiltPermission = async () => {
    if (
      typeof window !== 'undefined' &&
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> })
        .requestPermission === 'function'
    ) {
      try {
        await (
          DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }
        ).requestPermission();
      } catch {
        // Ignore denial
      }
    }
  };

  const scrollToBook = () => {
    const bookEl = document.getElementById('book-chapter');
    if (bookEl) {
      const top = bookEl.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleUnlock = () => {
    playChime(659.25, 2.5, 0.1);
    startAmbientLoop();
    requestTiltPermission();
    setUnsealed(true);

    setTimeout(() => {
      scrollToBook();
    }, 450);
  };

  const startHold = () => {
    if (unsealed) return;
    setHolding(true);
    let p = 0;
    holdIntervalRef.current = window.setInterval(() => {
      p += 5;
      setHoldProgress(p);
      if (p >= 100) {
        clearInterval(holdIntervalRef.current!);
        setHolding(false);
        handleUnlock();
      }
    }, 25);
  };

  const endHold = () => {
    if (unsealed) return;
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    setHolding(false);
    setHoldProgress(0);
  };

  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  return (
    <section
      id="gate"
      className="relative min-h-[100dvh] h-[100dvh] flex flex-col justify-between items-center text-center px-4 overflow-hidden max-w-full"
      style={{
        paddingTop: 'max(3rem, calc(env(safe-area-inset-top, 1rem) + 1.2rem))',
        paddingBottom: 'max(1.8rem, calc(env(safe-area-inset-bottom, 1rem) + 0.8rem))',
      }}
    >


      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto my-auto py-2 sm:py-6 w-full flex flex-col items-center">
        {/* Name with Animated SVG Doodle Underline */}
        <div className="relative inline-block mb-2 sm:mb-4">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="font-serif text-[clamp(2.5rem,8.5vw,5.5rem)] font-light leading-none text-forest-deep tracking-tight"
          >
            {gate.headline} <span className="text-blush italic font-normal">{herName}</span>
          </motion.h1>

          {/* Self-drawing hand-drawn doodle underline in Blush Pink */}
          <svg
            viewBox="0 0 280 24"
            className="w-48 sm:w-64 h-4 sm:h-5 mt-1 mx-auto overflow-visible stroke-blush fill-none"
            strokeWidth={2.4}
            strokeLinecap="round"
          >
            <motion.path
              d="M 5,16 Q 70,6 140,14 Q 210,22 275,10"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.6, delay: 0.9, ease: 'easeInOut' }}
            />
          </svg>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="font-serif text-sm sm:text-xl text-forest/80 italic max-w-sm px-4 mt-1 sm:mt-2 leading-relaxed"
        >
          {gate.subheadline}
        </motion.p>

        {/* Blush Pink Wax Seal (Press & Hold or Tap to unlock) */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="my-5 sm:my-8 flex flex-col items-center"
        >
          <div
            onMouseDown={startHold}
            onMouseUp={endHold}
            onMouseLeave={endHold}
            onTouchStart={startHold}
            onTouchEnd={endHold}
            onClick={handleUnlock}
            className="relative cursor-pointer select-none group touch-manipulation"
            role="button"
            tabIndex={0}
            aria-label="Press and hold wax seal to open story"
          >
            {/* Progress Circular Ring when holding */}
            {holding && (
              <svg className="absolute -inset-3 w-26 sm:w-28 h-26 sm:h-28 -rotate-90">
                <circle
                  cx="52"
                  cy="52"
                  r="46"
                  fill="none"
                  stroke="#F2A7B5"
                  strokeWidth="3.5"
                  strokeDasharray="289"
                  strokeDashoffset={289 - (289 * holdProgress) / 100}
                  className="transition-all duration-75"
                />
              </svg>
            )}

            {/* Glowing Blush Aura */}
            <div
              className={`absolute -inset-4 rounded-full blur-xl transition-opacity duration-500 ${
                holding || unsealed ? 'opacity-80 bg-blush/60' : 'opacity-40 bg-blush/30'
              }`}
            />

            {/* Wax Seal Body in Romantic Blush Pink */}
            <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#F2A7B5] via-[#E28698] to-[#CE687D] border-2 border-blush-light/80 shadow-[0_10px_28px_rgba(242,167,181,0.5)] flex flex-col items-center justify-center transform active:scale-95 transition-transform duration-200">
              {/* Inner Stamp Rim */}
              <div className="w-15 h-15 sm:w-17 sm:h-17 rounded-full border border-ivory/50 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  className="fill-ivory animate-beat drop-shadow-sm"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
          </div>

          <p className="mt-3 sm:mt-4 label text-[0.62rem] sm:text-xs text-forest/70 font-medium tracking-widest">
            {unsealed ? 'The Seal Has Been Broken' : gate.prompt}
          </p>
        </motion.div>

        {unsealed && (
          <motion.button
            onClick={scrollToBook}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-forest-deep label text-[0.65rem] sm:text-[0.68rem] tracking-widest uppercase font-semibold mt-1 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-blush/20 border border-blush/50 hover:bg-blush/30 active:scale-95 transition-all cursor-pointer touch-manipulation min-h-[44px]"
          >
            <span>Begin The Journey</span>
            <ArrowDown size={14} className="text-blush animate-bounce" />
          </motion.button>
        )}
      </div>

      {/* Footer Microcopy */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.5 }}
        className="relative z-10 label text-[0.6rem] text-forest/50 tracking-widest text-center"
      >
        {storyData.tagline}
      </motion.p>
    </section>
  );
}
