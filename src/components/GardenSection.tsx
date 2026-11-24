import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { storyData, type FlowerReason } from '../data/storyContent';
import { playFlowerPop } from '../utils/audio';

const flowerDrawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 1.6, ease: 'easeInOut' } },
};

// Self-drawing SVG Flower Components in Forest Green line-art with Blush Pink accents
function RoseSVG({ isBloomed }: { isBloomed: boolean }) {
  const draw = flowerDrawVariants;

  return (
    <svg
      viewBox="0 0 100 160"
      className="w-24 sm:w-28 h-36 fill-none stroke-forest"
      strokeWidth={1.4}
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

      {/* Romantic Blush Pink center petal */}
      <motion.path
        variants={draw}
        d="M48 38 C45 30 55 30 52 38"
        stroke="#F2A7B5"
        strokeWidth={2}
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
      className="w-24 sm:w-28 h-36 fill-none stroke-forest"
      strokeWidth={1.4}
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
      {/* Center in Blush Pink */}
      <motion.circle
        variants={draw}
        cx="50"
        cy="55"
        r="5.5"
        stroke="#F2A7B5"
        strokeWidth={2}
        className={isBloomed ? 'fill-blush/40' : 'fill-none'}
      />
    </svg>
  );
}

function TulipSVG({ isBloomed }: { isBloomed: boolean }) {
  const draw = flowerDrawVariants;

  return (
    <svg
      viewBox="0 0 100 160"
      className="w-24 sm:w-28 h-36 fill-none stroke-forest"
      strokeWidth={1.4}
      strokeLinecap="round"
    >
      <motion.path variants={draw} d="M50 160 C50 120 48 95 50 75" />
      {/* Long curving tulip leaves */}
      <motion.path variants={draw} d="M50 135 C28 120 20 90 26 65 C32 85 42 110 50 135" />
      <motion.path variants={draw} d="M50 125 C72 110 80 80 74 55 C68 75 58 100 50 125" />

      {/* Tulip Cup */}
      <motion.path variants={draw} d="M35 75 C30 50 40 30 50 30 C60 30 70 50 65 75 Z" />
      <motion.path variants={draw} d="M42 45 C46 32 54 32 58 45" />

      {/* Blush Pink heart-like stamen */}
      <motion.path
        variants={draw}
        d="M50 32 L50 22"
        stroke="#F2A7B5"
        strokeWidth={2.4}
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
      className="w-24 sm:w-28 h-36 fill-none stroke-forest"
      strokeWidth={1.4}
      strokeLinecap="round"
    >
      <motion.path variants={draw} d="M50 160 C52 130 46 95 50 65" />
      <motion.path variants={draw} d="M50 130 C38 122 34 112 36 104 C44 106 48 114 50 130" />
      <motion.path variants={draw} d="M50 100 C62 92 66 82 64 74 C56 76 52 84 50 100" />

      {/* Delicate Wildflower bells */}
      <motion.path variants={draw} d="M44 65 C38 52 48 44 50 44 C52 44 62 52 56 65" />
      <motion.path variants={draw} d="M46 44 C42 34 49 28 50 28 C51 28 58 34 54 44" />

      {/* Blush Pink tip */}
      <motion.circle
        variants={draw}
        cx="50"
        cy="18"
        r="3.5"
        stroke="#F2A7B5"
        strokeWidth={2}
        className={isBloomed ? 'fill-blush' : 'fill-none'}
      />
    </svg>
  );
}

export default function GardenSection() {
  const { gardenSection } = storyData;
  const [activeFlowerId, setActiveFlowerId] = useState<string>('rose');
  const [bloomedFlowers, setBloomedFlowers] = useState<string[]>(['rose']);

  const handleBloom = (id: string) => {
    playFlowerPop();
    setActiveFlowerId(id);
    if (!bloomedFlowers.includes(id)) {
      setBloomedFlowers((prev) => [...prev, id]);
    }
  };

  const allBloomed = bloomedFlowers.length >= 4;

  const activeFlower =
    gardenSection.flowers.find((f) => f.id === activeFlowerId) ||
    gardenSection.flowers[0];

  return (
    <section
      id="garden-chapter"
      className="relative min-h-[100dvh] py-24 px-4 sm:px-8 max-w-5xl mx-auto flex flex-col justify-center items-center text-center"
    >
      {/* Chapter Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="label text-[0.62rem] sm:text-xs text-blush font-semibold tracking-widest uppercase">
          {gardenSection.label}
        </span>
        <div className="h-[1px] w-8 bg-forest/20" />
        <span className="label text-[0.6rem] text-forest/60 tracking-wider">
          {gardenSection.title}
        </span>
      </div>

      <h2 className="font-serif text-[clamp(2.1rem,6vw,4.4rem)] font-light leading-tight text-forest-deep mb-2">
        {gardenSection.title}
      </h2>
      <p className="text-xs sm:text-sm text-forest/70 max-w-md mb-12">
        {gardenSection.subtitle}
      </p>

      {/* The 4 Self-Drawing Flowers 2x2 on Mobile, 4x1 on Desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 w-full max-w-3xl mb-10 px-1">
        {gardenSection.flowers.map((f: FlowerReason) => {
          const isSelected = f.id === activeFlowerId;
          return (
            <button
              key={f.id}
              onClick={() => handleBloom(f.id)}
              className={`flex flex-col items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer touch-manipulation active:scale-95 ${
                isSelected
                  ? 'bg-ivory-light border-blush shadow-[0_8px_20px_rgba(242,167,181,0.25)]'
                  : 'bg-[#FFFDF9] border-forest/15 hover:border-forest/30 shadow-xs'
              }`}
            >
              <div className="mb-1 flex items-center justify-center">
                {f.id === 'rose' && <RoseSVG isBloomed={isSelected} />}
                {f.id === 'daisy' && <DaisySVG isBloomed={isSelected} />}
                {f.id === 'tulip' && <TulipSVG isBloomed={isSelected} />}
                {f.id === 'wildflower' && <WildflowerSVG isBloomed={isSelected} />}
              </div>
              <div className="text-center w-full">
                <span className="font-serif text-sm sm:text-base text-forest-deep block leading-tight">
                  {f.name}
                </span>
                <span className="label text-[0.55rem] text-blush tracking-wider mt-1 block">
                  {f.meaning}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Reason Card Reveal */}
      <div className="w-full max-w-xl mx-auto min-h-[140px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFlower.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl p-6 sm:p-8 bg-[#FFFDF9] border border-forest/15 shadow-lg text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blush" />
              <span className="label text-[0.6rem] text-blush tracking-widest uppercase font-semibold">
                {activeFlower.name} · {activeFlower.meaning}
              </span>
              <div className="h-1.5 w-1.5 rounded-full bg-blush" />
            </div>
            <p className="font-serif text-lg sm:text-2xl text-forest-deep italic leading-relaxed mt-2">
              “{activeFlower.reason}”
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Special Bouquet Completion Banner */}
      {allBloomed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="mt-6 px-4 py-2 rounded-full bg-blush/20 border border-blush/50 text-forest-deep text-xs font-serif italic flex items-center gap-2 shadow-xs"
        >
          <span>🌸</span>
          <span>Bouquet Complete · All 4 devotions unlocked for Neha ✨</span>
        </motion.div>
      )}

      <p className="mt-8 label text-[0.6rem] text-forest/50 tracking-widest italic">
        {gardenSection.microcopy}
      </p>
    </section>
  );
}
