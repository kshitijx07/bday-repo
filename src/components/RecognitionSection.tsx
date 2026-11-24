import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { storyData } from '../data/storyContent';
import Heart from './Heart';

export default function RecognitionSection() {
  const { chapter1 } = storyData;
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const textY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section
      id="recognition"
      ref={sectionRef}
      className="relative min-h-[100dvh] py-20 sm:py-28 px-5 sm:px-8 max-w-6xl mx-auto flex flex-col justify-center"
    >
      {/* Chapter Index */}
      <div className="flex items-center gap-2 mb-6 sm:mb-8">
        <span className="label text-[0.65rem] text-blush font-semibold tracking-widest uppercase">
          {chapter1.number}
        </span>
        <div className="h-[1px] w-8 bg-blush/40" />
        <span className="label text-[0.62rem] text-sky/60 tracking-wider">
          {chapter1.label}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left: Poetic Text & Verses */}
        <motion.div style={{ y: textY }} className="lg:col-span-7 space-y-6 sm:space-y-8">
          <h2 className="font-serif text-[clamp(2.1rem,6vw,4.5rem)] font-light leading-[1.08] text-sky">
            {chapter1.headline}
          </h2>

          {/* Verses */}
          <div className="space-y-3 sm:space-y-4 border-l-2 border-blush/40 pl-5 sm:pl-7">
            {chapter1.verses.map((verse, idx) => (
              <p
                key={idx}
                className="font-serif text-lg sm:text-2xl text-sky/90 leading-relaxed font-light italic"
              >
                {verse}
              </p>
            ))}
          </div>

          {/* Reflection */}
          <p className="font-sans text-xs sm:text-sm leading-relaxed text-sky/75 max-w-xl">
            {chapter1.reflection}
          </p>

          <div className="flex items-center gap-2 pt-2 text-sky/50 text-[0.65rem] label">
            <Heart size={9} className="text-blush" />
            <span>Sole partner of my soul · Kshitij</span>
          </div>
        </motion.div>

        {/* Right: Floating Portrait with Parallax */}
        <motion.div style={{ y: imgY }} className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-xs sm:max-w-sm">
            {/* Soft glowing aura */}
            <div
              className="absolute -inset-4 rounded-3xl opacity-50 blur-2xl"
              style={{
                background: 'radial-gradient(circle, rgba(242,167,181,.4), rgba(49,92,76,.15))',
              }}
            />

            {/* Frame */}
            <div className="relative rounded-2xl overflow-hidden border border-blush/40 shadow-xl bg-ivory">
              <img
                src={chapter1.photo.src}
                alt={chapter1.photo.alt}
                loading="lazy"
                draggable={false}
                className="w-full h-auto object-cover transform hover:scale-103 transition-transform duration-700 ease-out"
              />
              <div className="p-4 bg-gradient-to-t from-ivory via-ivory/90 to-transparent">
                <p className="font-serif text-sm italic text-sky/90 text-center">
                  {chapter1.photo.caption}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
