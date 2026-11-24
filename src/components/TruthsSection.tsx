import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';
import { storyData } from '../data/storyContent';
import { playChime } from '../utils/audio';
import Heart from './Heart';

export default function TruthsSection() {
  const { chapter2 } = storyData;
  const [expandedId, setExpandedId] = useState<string>('truth-1');

  const handleToggle = (id: string, idx: number) => {
    playChime(440 + idx * 80, 2.0, 0.08);
    setExpandedId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      id="truths"
      className="relative min-h-[100dvh] py-20 sm:py-28 px-5 sm:px-8 max-w-6xl mx-auto flex flex-col justify-center"
    >
      {/* Chapter header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="label text-[0.65rem] text-blush font-semibold tracking-widest uppercase">
          {chapter2.number}
        </span>
        <div className="h-[1px] w-8 bg-blush/40" />
        <span className="label text-[0.62rem] text-sky/60 tracking-wider">
          {chapter2.label}
        </span>
      </div>

      <div className="max-w-2xl mb-10 sm:mb-14">
        <h2 className="font-serif text-[clamp(2.1rem,6vw,4.5rem)] font-light leading-[1.08] text-sky">
          {chapter2.headline}
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-sky/75 leading-relaxed">
          {chapter2.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: 3 Interactive Truth Cards */}
        <div className="lg:col-span-7 space-y-4">
          {chapter2.truths.map((truth, idx) => {
            const isExpanded = expandedId === truth.id;
            return (
              <motion.div
                key={truth.id}
                layout
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'border-blush bg-ivory/95 shadow-md'
                    : 'border-blush/30 bg-ivory/60 hover:border-blush/70 hover:bg-ivory/80'
                }`}
              >
                <button
                  onClick={() => handleToggle(truth.id, idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="label text-[0.65rem] text-blush font-bold tracking-wider">
                        Truth {truth.number}
                      </span>
                      <span className="text-sky/40 text-xs">·</span>
                      <span className="label text-[0.6rem] text-sky/60 tracking-widest">
                        {truth.subtitle}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-sky font-normal">
                      {truth.title}
                    </h3>
                    {!isExpanded && (
                      <p className="text-xs text-sky/70 line-clamp-1 pt-1 font-sans">
                        {truth.excerpt}
                      </p>
                    )}
                  </div>

                  <div
                    className={`p-2 rounded-full border border-blush/40 transition-transform duration-300 shrink-0 ${
                      isExpanded ? 'rotate-180 bg-blush/20 text-sky' : 'text-sky/60'
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="px-5 sm:px-6 pb-6 pt-2 border-t border-blush/20 space-y-3"
                    >
                      {truth.poeticProse.map((paragraph, pIdx) => (
                        <p
                          key={pIdx}
                          className="font-serif text-base sm:text-lg text-sky/90 leading-relaxed italic"
                        >
                          {paragraph}
                        </p>
                      ))}
                      <div className="pt-2 flex items-center gap-2 text-[0.62rem] label text-sky/50">
                        <Heart size={8} className="text-blush" />
                        <span>Kshitij’s vow to Neha</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Right: Featured Portrait */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-xs sm:max-w-sm rounded-2xl overflow-hidden border border-blush/35 shadow-lg bg-ivory">
            <img
              src={chapter2.photo.src}
              alt={chapter2.photo.alt}
              loading="lazy"
              draggable={false}
              className="w-full h-auto object-cover hover:scale-102 transition-transform duration-700"
            />
            <div className="p-4 bg-ivory/90 text-center border-t border-blush/20">
              <p className="font-serif text-sm italic text-sky">
                {chapter2.photo.caption}
              </p>
              <div className="flex items-center justify-center gap-1.5 mt-1 text-[0.6rem] label text-blush">
                <Sparkles size={10} />
                <span>My heart recognized you</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
