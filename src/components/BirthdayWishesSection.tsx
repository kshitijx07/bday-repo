import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, Flame } from 'lucide-react';
import { storyData } from '../data/storyContent';
import { playChime } from '../utils/audio';
import Heart from './Heart';

export default function BirthdayWishesSection() {
  const { chapter6, herName, hisName } = storyData;
  const [blown, setBlown] = useState(false);

  const handleBlowCandle = () => {
    // Play celebratory chord sequence
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, idx) => {
      setTimeout(() => playChime(n, 2.5, 0.1), idx * 180);
    });
    setBlown(true);
  };

  const handleRelight = () => {
    playChime(440, 1.5, 0.07);
    setBlown(false);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="wish"
      className="relative min-h-[100dvh] py-20 sm:py-28 px-5 sm:px-8 max-w-4xl mx-auto flex flex-col justify-center items-center text-center overflow-hidden"
    >
      {/* Chapter Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="label text-[0.65rem] text-blush font-semibold tracking-widest uppercase">
          {chapter6.number}
        </span>
        <div className="h-[1px] w-8 bg-blush/40" />
        <span className="label text-[0.62rem] text-sky/60 tracking-wider">
          {chapter6.label}
        </span>
      </div>

      {/* Main Birthday Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="font-serif text-[clamp(2.4rem,7.5vw,5.5rem)] font-light leading-[1.04] text-sky"
      >
        {chapter6.headline[0]}{' '}
        <span className="text-blush italic font-normal">{chapter6.headline[1]}</span>
      </motion.h2>

      <p className="mt-4 max-w-lg text-sm sm:text-base font-serif italic text-sky/80 leading-relaxed">
        {chapter6.blessing}
      </p>

      {/* Interactive Birthday Candle */}
      <div className="my-10 sm:my-14 flex flex-col items-center">
        <div className="relative flex flex-col items-center">
          {/* Flame / Spark */}
          <AnimatePresence mode="wait">
            {!blown ? (
              <motion.div
                key="flame"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.9, 1, 0.9] }}
                exit={{ scale: 0.2, opacity: 0, y: -20 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative flex justify-center mb-1 cursor-pointer"
                onClick={handleBlowCandle}
              >
                {/* Glow aura */}
                <div className="absolute -inset-3 bg-blush rounded-full blur-md opacity-60 animate-pulse" />
                <div className="relative p-2 rounded-full bg-gradient-to-t from-blush to-ivory shadow-lg text-blush-dark">
                  <Flame size={26} className="fill-blush" />
                </div>
              </motion.div>
            ) : (
              /* Soft Smoke after blowing out */
              <motion.div
                key="smoke"
                initial={{ opacity: 0.8, y: 0 }}
                animate={{ opacity: 0, y: -30, scale: 1.5 }}
                transition={{ duration: 1.5 }}
                className="mb-2 text-sky/40 text-xs label"
              >
                💨 Wish Granted ✨
              </motion.div>
            )}
          </AnimatePresence>

          {/* Candle Body */}
          <div className="w-6 h-20 sm:h-24 rounded-t-sm rounded-b-md bg-gradient-to-b from-ivory to-blush/30 border border-blush/40 shadow-md relative">
            {/* Wax drips */}
            <div className="absolute top-1 left-1 w-1.5 h-3 rounded-full bg-blush/40" />
            <div className="absolute top-2 right-1.5 w-1 h-2 rounded-full bg-blush/30" />
          </div>

          {/* Candle Stand / Base */}
          <div className="w-16 h-3 rounded-full bg-gradient-to-r from-sky via-sky-light to-sky shadow-sm mt-[-2px]" />
        </div>

        {/* Action Button */}
        {!blown ? (
          <button
            onClick={handleBlowCandle}
            className="glass label group mt-6 inline-flex items-center gap-2 rounded-full border-blush/50 bg-gradient-to-r from-ivory to-blush-light/35 px-6 py-3 text-sky shadow-md hover:border-blush active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles size={13} className="text-blush" />
            <span className="text-xs font-semibold tracking-wider">Blow Out The Candle</span>
          </button>
        ) : (
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={handleRelight}
              className="glass label flex items-center gap-2 rounded-full px-4 py-2 text-xs text-sky/80 hover:text-sky active:scale-95 transition-all cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Light Candle Again</span>
            </button>
          </div>
        )}
      </div>

      {/* Featured Celebration Photo */}
      <div className="relative w-full max-w-xs sm:max-w-sm rounded-2xl overflow-hidden border border-blush/40 shadow-xl bg-ivory mb-10">
        <img
          src={chapter6.photo.src}
          alt={chapter6.photo.alt}
          loading="lazy"
          draggable={false}
          className="w-full h-auto object-cover"
        />
        <div className="p-4 bg-ivory/95 border-t border-blush/25 text-center">
          <p className="font-serif text-lg text-sky font-normal">
            For Neha, The Queen of My Heart
          </p>
          <p className="label text-[0.62rem] text-blush mt-1">
            Happy Birthday · Forever &amp; Always
          </p>
        </div>
      </div>

      {/* Final Closing Signoff */}
      <div className="border-t border-blush/30 pt-8 w-full max-w-md space-y-4">
        <p className="font-serif text-2xl sm:text-3xl italic text-sky" style={{ fontFamily: '"Dancing Script", cursive' }}>
          {chapter6.closing}
        </p>

        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={handleScrollToTop}
            className="glass flex items-center gap-2 rounded-full px-5 py-2.5 text-xs text-sky hover:border-blush active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw size={12} />
            <span className="label text-[0.65rem] tracking-wider font-semibold">
              Read Our Story Again
            </span>
          </button>
        </div>

        <p className="label text-[0.58rem] text-sky/50 tracking-widest pt-4">
          Crafted with love by {hisName} for {herName}
        </p>
      </div>
    </section>
  );
}
