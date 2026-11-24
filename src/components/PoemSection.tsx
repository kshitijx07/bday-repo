import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { storyData } from '../data/storyContent';

function Word({
  w,
  p,
  range,
}: {
  w: string;
  p: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(p, range, [0.18, 1]);
  const y = useTransform(p, range, [12, 0]);
  const isHighlighted = w.includes('Neha') || w.includes('lifetime') || w.includes('love');

  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block mr-[0.28em] ${
        isHighlighted ? 'text-blush font-normal italic' : 'text-forest-deep'
      }`}
    >
      {w}
    </motion.span>
  );
}

function ParallaxWord({
  children,
  speed = 100,
}: {
  children: string;
  speed?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.h2
      ref={ref}
      style={{
        y,
        WebkitTextStroke: '1.2px rgba(49, 92, 76, 0.16)',
      }}
      className="text-[16vw] font-serif text-transparent select-none leading-none pointer-events-none whitespace-nowrap"
    >
      {children}
    </motion.h2>
  );
}

export default function PoemSection() {
  const { poemSection } = storyData;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.4'],
  });

  // Paper plane animation across screen
  const planeX = useTransform(scrollYProgress, [0.1, 0.85], [-60, 480]);
  const planeY = useTransform(scrollYProgress, [0.1, 0.85], [40, -40]);

  const words = poemSection.text.split(' ');

  return (
    <section
      id="poem-chapter"
      ref={sectionRef}
      className="relative min-h-[160vh] py-24 overflow-hidden flex flex-col justify-start"
    >
      {/* Background Giant Parallax Outlined Words */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex flex-col justify-between py-12 opacity-80 overflow-hidden"
      >
        <ParallaxWord speed={110}>ETERNITY</ParallaxWord>
        <div className="flex justify-end">
          <ParallaxWord speed={-120}>DEVOTION</ParallaxWord>
        </div>
        <ParallaxWord speed={90}>SANCTUARY</ParallaxWord>
        <div className="flex justify-end">
          <ParallaxWord speed={-140}>FOREVER</ParallaxWord>
        </div>
      </div>

      {/* Floating Paper Plane (SVG line-art in Forest Green with Blush Pink tail dot) */}
      <motion.div
        aria-hidden="true"
        style={{ x: planeX, y: planeY }}
        className="pointer-events-none absolute top-1/4 left-4 z-20 hidden sm:flex items-center gap-1.5 opacity-80"
      >
        <svg
          viewBox="0 0 24 24"
          width={28}
          height={28}
          className="stroke-forest fill-none -rotate-12"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
        <div className="h-2 w-2 rounded-full bg-blush shadow-[0_0_6px_#F2A7B5]" />
      </motion.div>

      {/* Sticky Scroll-Lit Poetic Paragraph */}
      <div className="sticky top-1/4 sm:top-1/3 z-10 mx-auto max-w-3xl px-5 sm:px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="label text-[0.62rem] sm:text-xs text-blush font-semibold tracking-widest uppercase">
            {poemSection.label}
          </span>
          <div className="h-[1px] w-8 bg-forest/20" />
          <span className="label text-[0.6rem] text-forest/60 tracking-wider">
            {poemSection.title}
          </span>
        </div>

        <p className="font-serif text-[clamp(1.75rem,5.2vw,3.6rem)] font-light leading-snug sm:leading-tight">
          {words.map((w, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word
                key={i}
                w={w}
                p={scrollYProgress}
                range={[start, end]}
              />
            );
          })}
        </p>

        <p className="mt-8 label text-[0.6rem] text-forest/50 tracking-widest italic">
          {poemSection.microcopy}
        </p>
      </div>
    </section>
  );
}
