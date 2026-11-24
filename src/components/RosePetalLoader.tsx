import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const getImgPath = (f: string) => `${import.meta.env.BASE_URL}images/${f}`;

const IMAGES_TO_PRELOAD = [
  'intro.jpg',
  'memory-01.jpg',
  'memory-02.jpg',
  'memory-03.jpg',
  'memory-04.jpg',
  'memory-06.jpg',
  'finale.jpg',
  'special.jpg',
];

interface Petal {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  scale: number;
  rotation: number;
}

export default function RosePetalLoader({ onLoaded }: { onLoaded: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Floating ambient rose petals for loader background
  const petals: Petal[] = [
    { id: 1, x: 18, y: -10, delay: 0.1, duration: 4.5, scale: 0.9, rotation: 25 },
    { id: 2, x: 78, y: -20, delay: 0.6, duration: 5.2, scale: 1.1, rotation: -40 },
    { id: 3, x: 42, y: -15, delay: 1.2, duration: 4.8, scale: 0.8, rotation: 65 },
    { id: 4, x: 88, y: -10, delay: 1.8, duration: 5.0, scale: 1.0, rotation: -15 },
    { id: 5, x: 10, y: -25, delay: 2.2, duration: 4.6, scale: 1.2, rotation: 50 },
    { id: 6, x: 62, y: -20, delay: 2.7, duration: 5.4, scale: 0.85, rotation: -60 },
  ];

  useEffect(() => {
    let loadedCount = 0;
    const total = IMAGES_TO_PRELOAD.length;
    let timer: number | null = null;

    // Minimum display time for aesthetic petal animation (1.4s)
    const startTime = performance.now();

    const handleSingleLoaded = () => {
      loadedCount++;
      const currentPercent = Math.round((loadedCount / total) * 100);
      setProgress((prev) => Math.max(prev, currentPercent));

      if (loadedCount >= total) {
        finishLoading();
      }
    };

    const finishLoading = () => {
      const elapsed = performance.now() - startTime;
      const remainingTime = Math.max(0, 1400 - elapsed);

      timer = window.setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            onLoaded();
          }, 600); // Allow fade-out animation to complete
        }, 350);
      }, remainingTime);
    };

    // Preload all critical images
    IMAGES_TO_PRELOAD.forEach((filename) => {
      const image = new Image();
      image.src = getImgPath(filename);
      image.onload = handleSingleLoaded;
      image.onerror = handleSingleLoaded; // Don't block loading if an image fails
    });

    // Failsafe timeout: maximum 4.0s so user is never stuck
    const failsafe = window.setTimeout(() => {
      if (!isFinished) {
        setProgress(100);
        setIsFinished(true);
        onLoaded();
      }
    }, 4000);

    return () => {
      if (timer) clearTimeout(timer);
      clearTimeout(failsafe);
    };
  }, [isFinished, onLoaded]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="rose-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-between bg-ivory text-forest px-6 py-12 select-none overflow-hidden"
          style={{
            paddingTop: 'max(3rem, env(safe-area-inset-top, 2rem))',
            paddingBottom: 'max(3rem, env(safe-area-inset-bottom, 2rem))',
          }}
        >
          {/* Falling Ambient Rose Petals */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            {petals.map((p) => (
              <motion.div
                key={p.id}
                initial={{
                  top: `${p.y}%`,
                  left: `${p.x}%`,
                  opacity: 0,
                  rotate: p.rotation,
                  scale: p.scale,
                }}
                animate={{
                  top: '110%',
                  opacity: [0, 0.7, 0.8, 0],
                  rotate: p.rotation + 180,
                  x: [0, 15, -15, 0],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute w-5 h-7"
              >
                {/* SVG Rose Petal */}
                <svg viewBox="0 0 30 42" className="w-full h-full fill-blush/60 stroke-blush-deep/30">
                  <path d="M15 2 C25 2, 28 16, 26 28 C24 38, 18 40, 15 40 C12 40, 6 38, 4 28 C2 16, 5 2, 15 2 Z" />
                </svg>
              </motion.div>
            ))}
          </div>



          {/* Central Blooming Rose & Progress */}
          <div className="relative z-10 flex flex-col items-center my-auto">
            {/* Blooming Rose SVG */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 mb-6 flex items-center justify-center">
              {/* Soft Pulsing Blush Aura */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.35, 0.65, 0.35],
                }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-blush/40 blur-xl"
              />

              <svg
                viewBox="0 0 100 100"
                className="w-full h-full overflow-visible drop-shadow-[0_4px_16px_rgba(242,167,181,0.35)]"
              >
                {/* Outer Petals that unfold with progress */}
                {[0, 72, 144, 216, 288].map((angle, idx) => {
                  const petalThreshold = idx * 18;
                  const isPetalActive = progress >= petalThreshold;
                  return (
                    <motion.path
                      key={angle}
                      d="M 50,50 C 35,28 38,12 50,6 C 62,12 65,28 50,50 Z"
                      transform={`rotate(${angle} 50 50)`}
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{
                        scale: isPetalActive ? 1 : 0.6,
                        opacity: isPetalActive ? 0.9 : 0.2,
                      }}
                      transition={{ duration: 0.5 }}
                      fill={isPetalActive ? 'url(#petalGrad)' : 'rgba(242,167,181,0.15)'}
                      stroke="#315C4C"
                      strokeWidth="0.8"
                    />
                  );
                })}

                {/* Inner Spiraling Rose Petals */}
                {[36, 108, 180, 252, 324].map((angle, idx) => {
                  const innerThreshold = 30 + idx * 14;
                  const isInnerActive = progress >= innerThreshold;
                  return (
                    <motion.path
                      key={`inner-${angle}`}
                      d="M 50,50 C 42,35 44,22 50,18 C 56,22 58,35 50,50 Z"
                      transform={`rotate(${angle} 50 50)`}
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={{
                        scale: isInnerActive ? 0.95 : 0.4,
                        opacity: isInnerActive ? 1 : 0.1,
                      }}
                      transition={{ duration: 0.4 }}
                      fill="url(#innerPetalGrad)"
                      stroke="#315C4C"
                      strokeWidth="0.7"
                    />
                  );
                })}

                {/* Center Core Petal */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="7"
                  fill="#F2A7B5"
                  stroke="#315C4C"
                  strokeWidth="1"
                  animate={{
                    scale: progress >= 85 ? [1, 1.25, 1] : 1,
                  }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />

                {/* SVG Color Gradients */}
                <defs>
                  <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFDF9" />
                    <stop offset="60%" stopColor="#F2A7B5" />
                    <stop offset="100%" stopColor="#E28698" />
                  </linearGradient>
                  <linearGradient id="innerPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FCE6EB" />
                    <stop offset="70%" stopColor="#F2A7B5" />
                    <stop offset="100%" stopColor="#CE687D" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Typography */}
            <h3 className="font-serif text-2xl sm:text-3xl text-forest-deep font-light italic tracking-tight">
              Curating Memories for Neha
            </h3>
            <p className="font-serif text-xs sm:text-sm text-forest/70 italic mt-1">
              {progress < 100 ? 'Gathering rose petals in the light...' : 'Ready for you ✨'}
            </p>

            {/* Elegant Hairline Progress Bar */}
            <div className="w-48 sm:w-56 h-[3px] bg-forest/15 rounded-full mt-6 overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-blush via-blush-deep to-forest rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
            </div>

            {/* Percentage Display */}
            <span className="label text-[0.62rem] text-forest/60 tracking-widest mt-2 font-mono">
              {progress}%
            </span>
          </div>

          {/* Bottom Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative z-10 label text-[0.58rem] text-forest/45 tracking-widest text-center"
          >
            designed slowly · dedicated to you
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
