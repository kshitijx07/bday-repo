import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { storyData } from '../data/storyContent';
import { playPaperFlip } from '../utils/audio';

export default function BookSection() {
  const { bookSection } = storyData;
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Mouse / device orientation tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-16, 16]), {
    stiffness: 120,
    damping: 18,
  });

  useEffect(() => {
    // Mouse move on desktop
    const handlePointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;
      x.set(Math.max(-0.5, Math.min(0.5, normX)));
      y.set(Math.max(-0.5, Math.min(0.5, normY)));
    };

    // Device orientation tilt on phone (gyroscope)
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma: left-to-right (-90 to 90), beta: front-to-back (-180 to 180)
        const tiltX = Math.max(-0.5, Math.min(0.5, e.gamma / 60));
        const tiltY = Math.max(-0.5, Math.min(0.5, (e.beta - 45) / 60));
        x.set(tiltX);
        y.set(tiltY);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('deviceorientation', handleOrientation, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [x, y]);

  const toggleBook = () => {
    playPaperFlip();
    setIsOpen(!isOpen);
  };

  return (
    <section
      id="book-chapter"
      className="relative min-h-[100dvh] py-20 px-4 sm:px-8 max-w-4xl mx-auto flex flex-col justify-center items-center text-center"
    >
      {/* Chapter header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="label text-[0.62rem] sm:text-xs text-signal font-semibold tracking-widest uppercase">
          {bookSection.label}
        </span>
        <div className="h-[1px] w-8 bg-silver/20" />
        <span className="label text-[0.6rem] sm:text-[0.62rem] text-silver/60 tracking-wider">
          {bookSection.year}
        </span>
      </div>

      <h2 className="font-serif text-[clamp(2rem,6vw,4.2rem)] font-light leading-tight text-silver-light mb-2">
        {bookSection.title}
      </h2>
      <p className="text-xs sm:text-sm text-silver/60 mb-12">
        {bookSection.subtitle}
      </p>

      {/* 3D CSS Book Container */}
      <div
        ref={containerRef}
        onClick={toggleBook}
        style={{ perspective: 1600 }}
        className="relative cursor-pointer select-none group touch-manipulation my-4"
        role="button"
        tabIndex={0}
        aria-label="3D Storybook - Tap to open"
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            width: 'min(76vw, 300px)',
            height: 'calc(min(76vw, 300px) * 1.4)',
          }}
          className="relative transition-transform duration-300"
        >
          {/* Back Cover */}
          <div
            className="absolute inset-0 rounded-r-lg bg-charcoal-deep border border-silver/20"
            style={{ transform: 'translateZ(-14px)' }}
          />

          {/* Realistic Paper Edges (Ivory/Silver layers) */}
          <div
            className="absolute inset-y-1 left-2 right-1 rounded-r-md bg-[#F4EDE0]"
            style={{ transform: 'translateZ(-2px)' }}
          />

          {/* Under Page Content (Revealed when book opens) */}
          <div
            className="absolute inset-y-2 left-3 right-2 rounded-r-md bg-[#FFF7E8] p-4 flex flex-col justify-between overflow-hidden shadow-inner"
            style={{ transform: 'translateZ(1px)' }}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md border border-charcoal/20">
              <img
                src={bookSection.previewPhoto}
                alt="Neha preview"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
            <p className="font-serif text-xs italic text-charcoal-deep text-center mt-2">
              The moment I knew my heart was yours ❤️
            </p>
          </div>

          {/* Front Cover (Hinged at the left spine, opens outward) */}
          <motion.div
            initial={false}
            animate={{ rotateY: isOpen ? -160 : 0 }}
            transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
            style={{
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
              transform: 'translateZ(14px)',
            }}
            className="absolute inset-0 rounded-r-lg border border-silver/30 shadow-2xl bg-gradient-to-br from-charcoal via-charcoal-deep to-charcoal-darker flex flex-col justify-between p-6 sm:p-8"
          >
            <div className="flex justify-between items-start">
              <span className="label text-[0.55rem] text-silver/60 tracking-widest uppercase">
                Kept Forever
              </span>
              <div className="h-2 w-2 rounded-full bg-signal shadow-[0_0_8px_#E10600]" />
            </div>

            <div className="my-auto py-4">
              <div className="h-[1px] w-8 bg-signal/60 mx-auto mb-3" />
              <h3 className="font-serif text-2xl sm:text-3xl text-silver-light font-light italic leading-tight">
                {bookSection.coverTitle}
              </h3>
              <div className="h-[1px] w-8 bg-signal/60 mx-auto mt-3" />
            </div>

            <div className="flex items-center justify-between text-[0.58rem] label text-silver/50">
              <span>By Kshitij</span>
              <span className="text-signal">Tap to Open</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Ambient Drop Shadow on Floor */}
        <div
          className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-6 rounded-full blur-xl bg-black/60"
          aria-hidden="true"
        />
      </div>

      <p className="mt-8 label text-[0.6rem] text-silver/40 tracking-widest italic">
        {bookSection.microcopy}
      </p>
    </section>
  );
}
