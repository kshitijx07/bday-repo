import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { storyData } from '../data/storyContent';
import Heart from './Heart';

gsap.registerPlugin(ScrollTrigger);

const PARAGRAPH =
  "I have never loved anyone before you, Neha, and I don’t ever want to love anyone after you. For me, there is no one beyond you, no one who could ever take your place. You are the one my heart chose, the one my soul recognizes, and the one I want to love in every lifetime.";

export default function StoryLightSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const counter1Ref = useRef<HTMLSpanElement | null>(null);
  const counter3Ref = useRef<HTMLSpanElement | null>(null);

  const words = PARAGRAPH.split(' ');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word by word lighting reveal
      if (wordsRef.current.length > 0) {
        gsap.fromTo(
          wordsRef.current,
          { opacity: 0.2, color: 'rgba(49, 92, 76, 0.25)' },
          {
            opacity: 1,
            color: '#315C4C',
            stagger: 0.04,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              end: 'bottom 85%',
              scrub: 0.8,
            },
          },
        );
      }

      // Parallax image scrub
      if (visualRef.current) {
        gsap.to(visualRef.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Counter animation for 1 and 100
      if (counter1Ref.current) {
        const obj1 = { val: 0 };
        gsap.to(obj1, {
          val: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
          },
          onUpdate: () => {
            if (counter1Ref.current) counter1Ref.current.textContent = Math.round(obj1.val).toString();
          },
        });
      }

      if (counter3Ref.current) {
        const obj3 = { val: 0 };
        gsap.to(obj3, {
          val: 100,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
          },
          onUpdate: () => {
            if (counter3Ref.current) counter3Ref.current.textContent = `${Math.round(obj3.val)}%`;
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story-light"
      ref={containerRef}
      className="relative min-h-[95dvh] py-20 sm:py-28 px-5 sm:px-8 max-w-6xl mx-auto flex flex-col justify-center"
    >
      <div className="flex items-center gap-2 mb-6">
        <span className="label text-[0.65rem] text-blush font-semibold tracking-widest uppercase">
          The Revelation
        </span>
        <div className="h-[1px] w-8 bg-blush/40" />
        <span className="label text-[0.62rem] text-sky/60 tracking-wider">
          Soul Recognition
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left: Word by Word Lit Paragraph */}
        <div className="lg:col-span-7 space-y-8">
          <p className="font-serif text-[clamp(1.6rem,4vw,3.2rem)] font-light leading-[1.25] text-sky">
            {words.map((word, idx) => (
              <span
                key={idx}
                ref={(el) => {
                  if (el) wordsRef.current[idx] = el;
                }}
                className={`inline-block mr-[0.26em] transition-opacity ${
                  word.includes('Neha') ? 'font-normal italic text-blush' : ''
                }`}
                style={{ opacity: 0.25 }}
              >
                {word}
              </span>
            ))}
          </p>

          {/* 3 Animated Number Counters */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-blush/25">
            <div>
              <span
                ref={counter1Ref}
                className="font-serif text-3xl sm:text-5xl font-light text-sky tabular-nums"
              >
                1
              </span>
              <p className="label text-[0.6rem] sm:text-xs text-sky/60 mt-1 uppercase">
                Soul Recognized
              </p>
            </div>
            <div>
              <span className="font-serif text-3xl sm:text-5xl font-light text-blush">
                &infin;
              </span>
              <p className="label text-[0.6rem] sm:text-xs text-sky/60 mt-1 uppercase">
                Lifetimes Promised
              </p>
            </div>
            <div>
              <span
                ref={counter3Ref}
                className="font-serif text-3xl sm:text-5xl font-light text-sky tabular-nums"
              >
                100%
              </span>
              <p className="label text-[0.6rem] sm:text-xs text-sky/60 mt-1 uppercase">
                Heart Surrendered
              </p>
            </div>
          </div>
        </div>

        {/* Right: Parallax Framed Portrait */}
        <div className="lg:col-span-5 flex justify-center">
          <div ref={visualRef} className="relative w-full max-w-xs sm:max-w-sm">
            <div
              className="absolute -inset-4 rounded-3xl opacity-50 blur-2xl"
              style={{
                background: 'radial-gradient(circle, rgba(242,167,181,.45), rgba(49,92,76,.15))',
              }}
            />
            <div className="relative rounded-2xl overflow-hidden border border-blush/40 shadow-xl bg-ivory">
              <img
                src={storyData.chapter1.photo.src}
                alt={storyData.chapter1.photo.alt}
                loading="lazy"
                draggable={false}
                className="w-full h-auto object-cover hover:scale-104 transition-transform duration-700"
              />
              <div className="p-4 bg-ivory/95 border-t border-blush/20 text-center">
                <p className="font-serif text-sm italic text-sky/90">
                  {storyData.chapter1.photo.caption}
                </p>
                <div className="flex items-center justify-center gap-1.5 mt-1 text-[0.6rem] label text-blush">
                  <Heart size={8} />
                  <span>Kshitij’s sanctuary</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
