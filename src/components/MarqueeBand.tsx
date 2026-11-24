import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Heart from './Heart';

gsap.registerPlugin(ScrollTrigger);

const PHRASES = [
  'NEHA & KSHITIJ',
  'IN EVERY LIFETIME',
  'FOREVER DOESN’T FEEL LONG ENOUGH',
  'MY COMPANION & MY HOME',
  'BEYOND PHYSICAL LOGIC',
  'MY WHOLE WORLD',
  'HAPPY BIRTHDAY BEAUTIFUL',
  'SOUL ALREADY RECOGNIZED',
];

export default function MarqueeBand() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Continuous scroll animation
    const tween = gsap.to(track, {
      xPercent: -50,
      repeat: -1,
      duration: 24,
      ease: 'none',
    });

    // Speed up and skew based on scroll velocity
    let skewSetter = gsap.quickTo(track, 'skewX');
    let clamp = gsap.utils.clamp(-8, 8);

    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        const vel = self.getVelocity() / 300;
        skewSetter(clamp(vel));
        gsap.to(tween, {
          timeScale: 1 + Math.abs(vel) * 0.4,
          duration: 0.4,
          overwrite: 'auto',
        });
      },
    });

    return () => {
      tween.kill();
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-4 sm:py-6 my-10 sm:my-16 bg-gradient-to-r from-sky via-sky-light to-sky text-ivory transform -rotate-1 shadow-lg"
      style={{ willChange: 'transform' }}
    >
      <div
        ref={trackRef}
        className="flex items-center gap-6 sm:gap-10 whitespace-nowrap will-change-transform font-serif text-sm sm:text-lg tracking-widest font-normal uppercase"
      >
        {/* Repeated twice for infinite loop */}
        {[...PHRASES, ...PHRASES].map((phrase, idx) => (
          <div key={idx} className="flex items-center gap-6 sm:gap-10">
            <span className="hover:text-blush transition-colors cursor-default">
              {phrase}
            </span>
            <Heart size={10} className="text-blush inline-block" />
          </div>
        ))}
      </div>
    </div>
  );
}
