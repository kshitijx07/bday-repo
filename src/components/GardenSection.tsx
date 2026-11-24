import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { storyData, type FlowerReason } from '../data/storyContent';
import { playFlowerPop } from '../utils/audio';

const flowerDrawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 1.6, ease: 'easeInOut' } },
};

// Self-drawing SVG Flower Components in silver line-art with one signal-red detail
function RoseSVG({ isBloomed }: { isBloomed: boolean }) {
  const draw = flowerDrawVariants;

  return (
    <svg
      viewBox="0 0 100 160"
      className="w-24 sm:w-28 h-36 fill-none stroke-silver"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Stem & Leaves */}
      <motion.path variants={draw} d="M50 160 C50 120 48 95 50 75" />
      <motion.path variants={draw} d="M50 125 C32 120 25 106 28 94 C42 96 48 108 50 125" />
      <motion.path variants={draw} d="M50 105 C68 100 75 86 72 74 C58 76 52 88 50 105" />

      {/* Petals */}
      <motion.path variants={draw} d="M50 75 C34 60 36 35 50 25 C64 35 66 60 50 75" />
      <motion.path variants={draw} d="M42 55 C30 40 40 20 50 18" />
      <motion.path variants={draw} d="M58 55 C70 40 60 20 50 18" />

      {/* Red accent center petal */}
      <motion.path
        variants={draw}
        d="M48 38 C45 30 55 30 52 38"
        stroke="#E10600"
        strokeWidth={1.8}
        className={isBloomed ? 'animate-pulse' : ''}
      />
    </svg>
  );
}

function DaisySVG({ isBloomed }: { isBloomed: boolean }) {
  const draw = flowerDrawVariants;

  return (
    <svg
      viewBox="0 0 100 160"
      className="w-24 sm:w-28 h-36 fill-none stroke-silver"
      strokeWidth={1.3}
      strokeLinecap="round"
    >
      <motion.path variants={draw} d="M50 160 C50 120 48 100 50 70" />
      <motion.path variants={draw} d="M50 120 C30 115 22 100 24 90 C38 92 48 104 50 120" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <motion.path
          key={a}
          variants={draw}
          transform={`rotate(${a} 50 55)`}
          d="M50 55 C40 38 42 20 50 14 C58 20 60 38 50 55"
        />
      ))}
      {/* Center in Signal Red */}
      <motion.circle
        variants={draw}
        cx="50"
        cy="55"
        r="5.5"
        stroke="#E10600"
        strokeWidth={1.8}
        className={isBloomed ? 'fill-signal/30' : 'fill-none'}
      />
    </svg>
  );
}

function TulipSVG({ isBloomed }: { isBloomed: boolean }) {
  const draw = flowerDrawVariants;

  return (
    <svg
      viewBox="0 0 100 160"
      className="w-24 sm:w-28 h-36 fill-none stroke-silver"
      strokeWidth={1.3}
      strokeLinecap="round"
    >
      <motion.path variants={draw} d="M50 160 C50 120 48 95 50 75" />
      {/* Long curving tulip leaves */}
      <motion.path variants={draw} d="M50 135 C28 120 20 90 26 65 C32 85 42 110 50 135" />
      <motion.path variants={draw} d="M50 125 C72 110 80 80 74 55 C68 75 58 100 50 125" />

      {/* Tulip Cup */}
      <motion.path variants={draw} d="M35 75 C30 50 40 30 50 30 C60 30 70 50 65 75 Z" />
      <motion.path variants={draw} d="M42 45 C46 32 54 32 58 45" />

      {/* Red heart-like stamen */}
      <motion.path
        variants={draw}
        d="M50 32 L50 22"
        stroke="#E10600"
        strokeWidth={2}
        className={isBloomed ? 'animate-bounce' : ''}
      />
    </svg>
  );
}

function WildflowerSVG({ isBloomed }: { isBloomed: boolean }) {
  const draw = flowerDrawVariants;

  return (
    <svg
      viewBox="0 0 100 160"
      className="w-24 sm:w-28 h-36 fill-none stroke-silver"
      strokeWidth={1.3}
      strokeLinecap="round"
    >
      <motion.path variants={draw} d="M50 160 C52 130 46 95 50 65" />
      <motion.path variants={draw} d="M50 130 C38 122 34 112 36 104 C44 106 48 114 50 130" />
      <motion.path variants={draw} d="M50 100 C62 92 66 82 64 74 C56 76 52 84 50 100" />

      {/* Delicate Wildflower bells */}
      <motion.path variants={draw} d="M44 65 C38 52 48 44 50 44 C52 44 62 52 56 65" />
      <motion.path variants={draw} d="M46 44 C42 34 49 28 50 28 C51 28 58 34 54 44" />

      {/* Signal Red tip */}
      <motion.circle
        variants={draw}
        cx="50"
        cy="18"
        r="3"
        stroke="#E10600"
        strokeWidth={1.8}
        className={isBloomed ? 'fill-signal' : 'fill-none'}
      />
    </svg>
  );
}

export default function GardenSection() {
  const { gardenSection } = storyData;
  const [activeFlowerId, setActiveFlowerId] = useState<string>('rose');

  const handleBloom = (id: string) => {
    playFlowerPop();
    setActiveFlowerId(id);
  };

  const activeFlower =
    gardenSection.flowers.find((f) => f.id === activeFlowerId) ||
    gardenSection.flowers[0];

  return (
    <section
      id="garden-chapter"
      className="relative min-h-[100dvh] py-24 px-4 sm:px-8 max-w-5xl mx-auto flex flex-col justify-center items-center text-center"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="label text-[0.62rem] sm:text-xs text-signal font-semibold tracking-widest uppercase">
          {gardenSection.label}
        </span>
        <div className="h-[1px] w-8 bg-silver/20" />
        <span className="label text-[0.6rem] text-silver/50 tracking-wider">
          Self-Drawing Blooms
        </span>
      </div>

      <h2 className="font-serif text-[clamp(2.1rem,6vw,4.4rem)] font-light leading-tight text-silver-light mb-2">
        {gardenSection.title}
      </h2>
      <p className="text-xs sm:text-sm text-silver/60 mb-12 max-w-md">
        {gardenSection.subtitle}
      </p>

      {/* Row of 4 Self-Drawing Flowers */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 w-full max-w-3xl mb-10"
      >
        {gardenSection.flowers.map((flower) => {
          const isSelected = activeFlowerId === flower.id;
          return (
            <motion.div
              key={flower.id}
              onClick={() => handleBloom(flower.id)}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center cursor-pointer select-none ${
                isSelected
                  ? 'border-signal bg-charcoal-card/90 shadow-[0_0_20px_rgba(225,6,0,0.25)]'
                  : 'border-silver/15 bg-charcoal-card/40 hover:border-silver/40 hover:bg-charcoal-card/70'
              }`}
            >
              {flower.flowerType === 'rose' && <RoseSVG isBloomed={isSelected} />}
              {flower.flowerType === 'daisy' && <DaisySVG isBloomed={isSelected} />}
              {flower.flowerType === 'tulip' && <TulipSVG isBloomed={isSelected} />}
              {flower.flowerType === 'wildflower' && (
                <WildflowerSVG isBloomed={isSelected} />
              )}

              <p
                className={`font-serif text-base sm:text-lg mt-3 transition-colors ${
                  isSelected ? 'text-signal font-medium' : 'text-silver'
                }`}
              >
                {flower.name}
              </p>
              <span className="label text-[0.55rem] text-silver/40 uppercase mt-0.5">
                {flower.meaning}
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Blooming Love Reason Card */}
      <div className="w-full max-w-2xl min-h-[140px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFlower.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-2xl p-6 sm:p-8 border border-silver/20 w-full text-center relative"
          >
            <div className="flex items-center justify-center gap-2 mb-2 text-[0.62rem] label text-signal font-semibold uppercase">
              <span>Why My Soul Chose You</span>
            </div>
            <p className="font-serif text-lg sm:text-2xl text-silver-light italic leading-relaxed">
              &ldquo;{activeFlower.reason}&rdquo;
            </p>
            <div className="mt-4 flex items-center justify-center gap-1.5 text-[0.6rem] label text-silver/50">
              <span>— With all my love, Kshitij</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="mt-8 label text-[0.6rem] text-silver/40 tracking-widest italic">
        {gardenSection.microcopy}
      </p>
    </section>
  );
}
