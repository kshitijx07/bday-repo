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

  const handleUnlock = () => {
    playChime(659.25, 2.5, 0.1);
    startAmbientLoop();
    requestTiltPermission();
    setUnsealed(true);

    setTimeout(() => {
      const bookEl = document.getElementById('book-chapter');
      if (bookEl) {
        const lenis = getLenis();
        if (lenis && typeof lenis.scrollTo === 'function') {
          lenis.scrollTo(bookEl, { offset: -10, duration: 1.4 });
        } else {
          bookEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
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
      className="relative min-h-[100dvh] flex flex-col justify-between items-center text-center px-4 overflow-hidden max-w-full"
      style={{
        paddingTop: 'max(4rem, calc(env(safe-area-inset-top, 1rem) + 2rem))',
        paddingBottom: 'max(2.5rem, calc(env(safe-area-inset-bottom, 1rem) + 1.5rem))',
      }}
    >
      {/* Top Editorial Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="relative z-10 flex flex-col items-center gap-2"
      >
        <div className="flex items-center gap-2 text-forest/70 label text-[0.62rem] sm:text-xs tracking-widest">
          <Sparkles size={11} className="text-blush" />
          <span>{gate.label}</span>
          <Sparkles size={11} className="text-blush" />
        </div>
        <div className="h-4 w-[1px] bg-forest/20" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto my-auto py-6 w-full flex flex-col items-center">
        {/* Name with Animated SVG Doodle Underline */}
        <div className="relative inline-block mb-4">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="font-serif text-[clamp(2.8rem,9vw,6rem)] font-light leading-none text-forest-deep tracking-tight"
          >
            {gate.headline} <span className="text-blush italic font-normal">{herName}</span>
          </motion.h1>

          {/* Self-drawing hand-drawn doodle underline in Blush Pink */}
          <svg
            viewBox="0 0 280 24"
            className="w-full h-5 mt-1 overflow-visible stroke-blush fill-none"
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
          className="font-serif text-lg sm:text-2xl text-forest/80 italic max-w-md px-4 mt-2"
        >
          {gate.subheadline}
        </motion.p>

        {/* Blush Pink Wax Seal (Press & Hold or Tap to unlock) */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="my-10 flex flex-col items-center"
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
              <svg className="absolute -inset-3 w-28 h-28 -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="50"
                  fill="none"
                  stroke="#F2A7B5"
                  strokeWidth="3.5"
                  strokeDasharray="314"
                  strokeDashoffset={314 - (314 * holdProgress) / 100}
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
            <div className="relative w-22 h-22 rounded-full bg-gradient-to-br from-[#F2A7B5] via-[#E28698] to-[#CE687D] border-2 border-blush-light/80 shadow-[0_10px_28px_rgba(242,167,181,0.5)] flex flex-col items-center justify-center transform active:scale-95 transition-transform duration-200">
              {/* Inner Stamp Rim */}
              <div className="w-17 h-17 rounded-full border border-ivory/50 flex flex-col items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  width={22}
                  height={22}
                  className="fill-ivory animate-beat drop-shadow-sm"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="font-serif text-[0.62rem] tracking-widest uppercase font-semibold text-ivory mt-1">
                  K &amp; N
                </span>
              </div>
            </div>
          </div>

          <p className="mt-4 label text-[0.65rem] sm:text-xs text-forest/70 font-medium tracking-widest">
            {unsealed ? 'The Seal Has Been Broken' : gate.prompt}
          </p>
        </motion.div>

        {unsealed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-blush label text-[0.62rem] tracking-widest uppercase font-semibold"
          >
            <span>Scroll gently to begin</span>
            <ArrowDown size={13} className="animate-bounce" />
          </motion.div>
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
