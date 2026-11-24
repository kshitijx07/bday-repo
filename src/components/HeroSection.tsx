import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { story } from '../data/storyContent';
import Heart from './Heart';

export default function HeroSection({ onOpen }: { onOpen: () => void }) {
  const { opening, birthday } = story;
  const words = opening.headline.split(' ');
  return (
    <motion.main
      className="relative z-10 flex h-full flex-col justify-between px-5 py-5 sm:px-8 sm:py-6 md:px-12 md:py-10"
      exit={{ opacity: 0, filter: 'blur(16px)', scale: 1.05 }}
      transition={{ duration: 1.1 }}
    >
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1.4 }}
        className="label flex items-start justify-between gap-3 text-sky"
      >
        <span className="flex items-center gap-1.5 text-[0.62rem] sm:text-xs">
          <Sparkles size={11} className="text-blush" /> {opening.label}
        </span>
        <span className="text-right text-[0.62rem] sm:text-xs text-blush font-medium">
          {birthday.display}
        </span>
      </motion.header>

      <section className="mx-auto flex w-full max-w-4xl flex-col items-center text-center my-auto py-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.4 }}
        >
          <Heart size={26} className="animate-beat drop-shadow-md" />
        </motion.div>

        <h1 className="mt-5 sm:mt-7 font-serif text-[clamp(2.1rem,8vw,5.5rem)] font-light leading-[1.05] text-sky max-w-xl">
          {words.map((w, i) => (
            <motion.span
              key={i}
              className={`mr-[.22em] inline-block ${w === 'Nehaa,' || w === 'world.' ? 'text-blush italic font-normal' : ''}`}
              initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.6 + i * 0.12, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1.2 }}
          className="label mt-5 sm:mt-7 text-sky/80 text-[0.68rem] sm:text-xs"
        >
          {opening.subtitle}
        </motion.p>

        <motion.button
          onClick={onOpen}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1 }}
          whileHover={{ scale: 1.03, boxShadow: '0 20px 50px -15px rgba(242,167,181,.5)' }}
          whileTap={{ scale: 0.96 }}
          className="glass label group mt-8 sm:mt-11 inline-flex items-center gap-2.5 rounded-full border-blush/50 bg-gradient-to-r from-ivory via-ivory to-blush-light/30 px-6 py-3.5 sm:px-8 sm:py-4 text-sky shadow-lg transition-all duration-300 hover:border-blush active:scale-95"
        >
          <span className="text-[0.68rem] sm:text-xs font-semibold tracking-widest">{opening.button}</span>
          <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blush" />
        </motion.button>
      </section>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.4 }}
        className="label flex items-center justify-between border-t border-blush/25 pt-3.5 text-sky/60 text-[0.6rem] sm:text-xs"
      >
        <span>{opening.footer}</span>
        <span className="flex items-center gap-1.5"><Heart size={8} /> With Love</span>
      </motion.footer>
    </motion.main>
  );
}
