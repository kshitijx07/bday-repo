import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import Heart from './Heart';
import { storyData } from '../data/storyContent';
import { playChime } from '../utils/audio';

export default function PrologueSection() {
  const { prologue } = storyData;

  const handleBegin = () => {
    playChime(659.25, 2.0, 0.09);
    const target = document.getElementById('recognition');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="prologue"
      className="relative min-h-[100dvh] flex flex-col justify-between items-center text-center px-5 pt-28 pb-12 sm:pt-32 sm:pb-16 overflow-hidden"
    >
      {/* Top Monogram Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="flex flex-col items-center gap-2"
      >
        <div className="flex items-center gap-2 text-sky/70 label text-[0.62rem] sm:text-xs">
          <Sparkles size={11} className="text-blush" />
          <span>{prologue.tagline}</span>
          <Sparkles size={11} className="text-blush" />
        </div>
        <div className="h-4 w-[1px] bg-blush/30" />
      </motion.div>

      {/* Hero Core */}
      <div className="max-w-3xl mx-auto my-auto py-6">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mx-auto mb-6 flex justify-center"
        >
          <div className="relative p-3.5 rounded-full border border-blush/40 bg-ivory/60 shadow-sm">
            <Heart size={28} className="animate-beat drop-shadow-sm text-blush" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.3, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[clamp(2.5rem,8vw,5.8rem)] font-light leading-[1.04] text-sky"
        >
          Across Every <span className="text-blush italic font-normal">Lifetime</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="mt-4 sm:mt-6 font-serif text-lg sm:text-2xl text-sky/80 italic"
        >
          {prologue.subtitle}
        </motion.p>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.6 }}
          className="mt-6 sm:mt-8 max-w-xl mx-auto text-xs sm:text-sm font-sans tracking-wide leading-relaxed text-sky/70 px-4"
        >
          {prologue.quote}
        </motion.p>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.0 }}
          className="mt-8 sm:mt-12"
        >
          <button
            onClick={handleBegin}
            className="glass group inline-flex items-center gap-3 rounded-full border-blush/50 bg-gradient-to-r from-ivory via-ivory to-blush-light/35 px-7 py-3.5 sm:px-8 sm:py-4 text-sky shadow-md hover:border-blush hover:shadow-lg active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span className="label text-[0.68rem] sm:text-xs font-semibold tracking-widest text-sky">
              Begin The Journey
            </span>
            <ArrowDown
              size={14}
              className="text-blush transition-transform duration-300 group-hover:translate-y-1"
            />
          </button>
        </motion.div>
      </div>

      {/* Footer hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 2.4 }}
        className="label flex items-center gap-3 text-sky/50 text-[0.6rem] tracking-widest"
      >
        <span>{prologue.coordinates}</span>
      </motion.div>
    </section>
  );
}
