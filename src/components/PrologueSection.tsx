import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import Heart from './Heart';
import { storyData } from '../data/storyContent';
import { playChime } from '../utils/audio';

export default function PrologueSection() {
  const { prologue } = storyData;
  const heroRef = useRef<HTMLElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  // Smooth lerped mouse movement for parallax (desktop only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Magnetic button displacement (desktop only)
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handlePointerMove = (e: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30;
      const y = (e.clientY / innerHeight - 0.5) * 30;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [mouseX, mouseY]);

  // Magnetic button handler (strictly desktop)
  const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current || !window.matchMedia('(pointer: fine)').matches) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.3;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.3;
    setBtnOffset({ x, y });
  };

  const handleBtnMouseLeave = () => {
    setBtnOffset({ x: 0, y: 0 });
  };

  const handleBegin = () => {
    playChime(659.25, 2.0, 0.09);
    const target = document.getElementById('story-light') || document.getElementById('recognition');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const titleWords = ['Across', 'Every', 'Lifetime'];

  return (
    <section
      id="prologue"
      ref={heroRef}
      className="relative min-h-[100dvh] flex flex-col justify-between items-center text-center px-4 sm:px-6 pt-16 pb-12 sm:pt-20 sm:pb-16 overflow-hidden max-w-full"
    >
      {/* Background Interactive Ambient Glow Orb (desktop moves with mouse, mobile static soft glow) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vmin] h-[65vmin] rounded-full blur-3xl opacity-35"
        style={{
          x: smoothX,
          y: smoothY,
          background:
            'radial-gradient(circle, rgba(242,167,181,.55) 0%, rgba(49,92,76,.15) 60%, transparent 80%)',
        }}
      />

      {/* Top Monogram Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="relative z-10 flex flex-col items-center gap-2 max-w-full px-2"
      >
        <div className="flex items-center gap-1.5 sm:gap-2 text-sky/70 label text-[0.6rem] sm:text-xs">
          <Sparkles size={11} className="text-blush shrink-0" />
          <span className="truncate">{prologue.tagline}</span>
          <Sparkles size={11} className="text-blush shrink-0" />
        </div>
        <div className="h-4 w-[1px] bg-blush/30" />
      </motion.div>

      {/* Hero Core */}
      <div className="relative z-10 max-w-4xl mx-auto my-auto py-4 sm:py-6 w-full px-2">
        {/* Floating Heart Monogram */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          style={{ x: smoothX, y: smoothY }}
          className="mx-auto mb-5 sm:mb-6 flex justify-center"
        >
          <div className="relative p-3 sm:p-3.5 rounded-full border border-blush/40 bg-ivory/80 shadow-md">
            <Heart size={26} className="animate-beat drop-shadow-sm text-blush" />
          </div>
        </motion.div>

        {/* Huge Split-Text Headline with Overflow Mask */}
        <h1 className="font-serif text-[clamp(2.3rem,8vw,6.4rem)] font-light leading-[1.04] text-sky tracking-tight max-w-full">
          {titleWords.map((word, wIdx) => (
            <span key={wIdx} className="inline-block overflow-hidden mr-[0.2em] pb-1">
              <motion.span
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 0.6 + wIdx * 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`inline-block ${
                  word === 'Lifetime' ? 'text-blush italic font-normal' : ''
                }`}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="mt-3 sm:mt-6 font-serif text-base sm:text-2xl text-sky/80 italic px-2"
        >
          {prologue.subtitle}
        </motion.p>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5 }}
          className="mt-5 sm:mt-8 max-w-lg sm:max-w-xl mx-auto text-xs sm:text-sm font-sans tracking-wide leading-relaxed text-sky/70 px-4"
        >
          {prologue.quote}
        </motion.p>

        {/* Centered Action Button (no accidental side jumps on mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.8 }}
          className="mt-7 sm:mt-12 flex justify-center w-full"
        >
          <motion.button
            ref={btnRef}
            onClick={handleBegin}
            onMouseMove={handleBtnMouseMove}
            onMouseLeave={handleBtnMouseLeave}
            animate={{ x: btnOffset.x, y: btnOffset.y }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            className="glass group inline-flex items-center justify-center gap-2.5 sm:gap-3 rounded-full border-blush/50 bg-gradient-to-r from-ivory via-ivory to-blush-light/35 px-6 py-3.5 sm:px-8 sm:py-4 text-sky shadow-lg hover:border-blush hover:shadow-2xl active:scale-95 transition-all duration-300 cursor-pointer max-w-[calc(100vw-2.5rem)]"
          >
            <span className="label text-[0.65rem] sm:text-xs font-semibold tracking-widest text-sky">
              Begin The Journey
            </span>
            <ArrowDown
              size={13}
              className="text-blush transition-transform duration-300 group-hover:translate-y-1 shrink-0"
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Footer hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 2.2 }}
        className="relative z-10 label flex items-center justify-center gap-2 text-sky/50 text-[0.58rem] sm:text-[0.6rem] tracking-widest px-2"
      >
        <span>{prologue.coordinates}</span>
      </motion.div>
    </section>
  );
}
