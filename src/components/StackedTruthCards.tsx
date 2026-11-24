import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';
import { storyData, type TruthCard } from '../data/storyContent';
import Heart from './Heart';

gsap.registerPlugin(ScrollTrigger);

export default function StackedTruthCards() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const truths: TruthCard[] = storyData.chapter2.truths;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;

      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;

        ScrollTrigger.create({
          trigger: cards[index + 1],
          start: 'top 75%',
          end: 'top 15%',
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(card, {
              scale: 1 - progress * 0.05,
              filter: `brightness(${1 - progress * 0.2})`,
              opacity: 1 - progress * 0.15,
            });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="truths"
      className="relative py-16 sm:py-28 px-3.5 sm:px-8 max-w-5xl mx-auto w-full"
    >
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-20 px-2">
        <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
          <span className="label text-[0.62rem] sm:text-[0.65rem] text-blush font-semibold tracking-widest uppercase">
            Chapter II
          </span>
          <div className="h-[1px] w-8 bg-blush/40" />
          <span className="label text-[0.6rem] sm:text-[0.62rem] text-sky/60 tracking-wider">
            Sacred Truths
          </span>
        </div>
        <h2 className="font-serif text-[clamp(2rem,6vw,4.5rem)] font-light leading-[1.08] text-sky">
          Three Truths I Keep in My Soul
        </h2>
        <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-sky/70 leading-relaxed max-w-md mx-auto">
          Scroll through the cards to uncover the vows that time can never erase.
        </p>
      </div>

      {/* Stacked Cards Container */}
      <div className="relative space-y-8 sm:space-y-16">
        {truths.map((truth, idx) => {
          const isLast = idx === 2;
          return (
            <div
              key={truth.id}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el;
              }}
              className="sticky top-14 sm:top-24 rounded-2xl sm:rounded-3xl p-5 sm:p-9 md:p-14 border transition-all duration-300 shadow-xl overflow-hidden w-full"
              style={{
                backgroundColor: isLast ? '#315C4C' : idx === 1 ? '#F7F0E3' : '#FFF7E8',
                borderColor: isLast ? 'rgba(242,167,181,.4)' : 'rgba(242,167,181,.35)',
                color: isLast ? '#FFF7E8' : '#315C4C',
                transformOrigin: 'center top',
                willChange: 'transform, filter, opacity',
              }}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-blush/25 mb-4 sm:mb-6">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span
                    className={`font-serif text-2xl sm:text-4xl font-light ${
                      isLast ? 'text-blush' : 'text-sky'
                    }`}
                  >
                    {truth.number}
                  </span>
                  <span
                    className={`label text-[0.6rem] sm:text-[0.65rem] tracking-widest uppercase font-semibold ${
                      isLast ? 'text-ivory/80' : 'text-sky/70'
                    }`}
                  >
                    {truth.subtitle}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Sparkles size={13} className="text-blush" />
                  <Heart size={9} className="text-blush" />
                </div>
              </div>

              {/* Title */}
              <h3
                className={`font-serif text-xl sm:text-3xl md:text-5xl font-light leading-snug sm:leading-tight mb-4 sm:mb-6 ${
                  isLast ? 'text-ivory' : 'text-sky'
                }`}
              >
                {truth.title}
              </h3>

              {/* Poetic Prose */}
              <div className="space-y-3 sm:space-y-4 max-w-3xl">
                {truth.poeticProse.map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    className={`font-serif text-sm sm:text-lg md:text-xl leading-relaxed italic ${
                      isLast ? 'text-ivory/90' : 'text-sky/85'
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Card Footer */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-blush/20 flex items-center justify-between text-[0.58rem] sm:text-[0.6rem] label">
                <span className={isLast ? 'text-ivory/60' : 'text-sky/50'}>
                  Dedicated to Neha
                </span>
                <span className="text-blush font-semibold">
                  By Kshitij
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
