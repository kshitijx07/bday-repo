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

    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    // Continuous marquee scroll animation
    const tween = gsap.to(track, {
      xPercent: -50,
      repeat: -1,
      duration: isTouch ? 28 : 22,
      ease: 'none',
    });

    // Speed up slightly based on scroll velocity (desktop/fine pointer only)
    let trigger: ScrollTrigger | undefined;

    if (!isTouch) {
      let skewSetter = gsap.quickTo(track, 'skewX');
      let clamp = gsap.utils.clamp(-6, 6);

      trigger = ScrollTrigger.create({
        onUpdate: (self) => {
          const vel = self.getVelocity() / 350;
          skewSetter(clamp(vel));
          gsap.to(tween, {
            timeScale: 1 + Math.min(Math.abs(vel) * 0.3, 2),
            duration: 0.4,
            overwrite: 'auto',
          });
        },
      });
    }

    return () => {
      tween.kill();
      trigger?.kill();
    };
  }, []);

  return (
    <div className="relative w-full max-w-full overflow-hidden py-3">
      <div
        ref={containerRef}
        className="w-[105%] -ml-[2.5%] overflow-hidden py-3.5 sm:py-5 bg-gradient-to-r from-sky via-sky-light to-sky text-ivory transform -rotate-1 shadow-md"
        style={{ willChange: 'transform' }}
      >
        <div
          ref={trackRef}
          className="flex items-center gap-6 sm:gap-10 whitespace-nowrap will-change-transform font-serif text-xs sm:text-base tracking-widest font-normal uppercase"
        >
          {/* Repeated twice for seamless loop */}
          {[...PHRASES, ...PHRASES].map((phrase, idx) => (
            <div key={idx} className="flex items-center gap-6 sm:gap-10">
              <span className="hover:text-blush transition-colors cursor-default">
                {phrase}
              </span>
              <Heart size={9} className="text-blush shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
