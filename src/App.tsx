import { useEffect } from 'react';
import ParticleCanvas from './components/ParticleCanvas';
import CustomCursor from './components/CustomCursor';
import AudioToggle from './components/AudioToggle';
import PrologueSection from './components/PrologueSection';
import MarqueeBand from './components/MarqueeBand';
import StoryLightSection from './components/StoryLightSection';
import StackedTruthCards from './components/StackedTruthCards';
import MemoryReel from './components/MemoryReel';
import WaxLetterSection from './components/WaxLetterSection';
import ConstellationSection from './components/ConstellationSection';
import BirthdayWishesSection from './components/BirthdayWishesSection';
import { initSmoothScroll } from './utils/motion';

export default function App() {
  useEffect(() => {
    // Initialize butter-smooth Lenis scroll synchronized with GSAP ScrollTrigger
    const lenis = initSmoothScroll();
    return () => {
      lenis?.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-ivory via-ivory to-blush/20 text-sky overflow-x-hidden selection:bg-blush selection:text-sky">
      {/* Background Interactive Ambient Canvas */}
      <ParticleCanvas />

      {/* Luxury Custom Romantic Magnetic Cursor for Desktop */}
      <CustomCursor />

      {/* Floating Audio Controller (Minimal Top-Right) */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
        <AudioToggle />
      </div>

      {/* Cinematic Agency Motion Sections */}
      <main className="relative z-10 flex flex-col w-full">
        {/* 1. Mouse Lerped Parallax Hero with Split-Text Reveal */}
        <PrologueSection />

        {/* 2. Velocity-Sensitive Skewed Marquee Band */}
        <MarqueeBand />

        {/* 3. Word-By-Word Scroll Lighting Reveal & Animated Counters */}
        <StoryLightSection />

        {/* 4. Sticky Stacked Cards (Scale Down & Darken) */}
        <StackedTruthCards />

        {/* 5. 3D Tilt Memory Archive & Touch Lightbox */}
        <MemoryReel />

        {/* 6. Interactive Wax-Sealed Envelope & Sacred Letter */}
        <WaxLetterSection />

        {/* 7. Soul Resonance Constellation Sky */}
        <ConstellationSection />

        {/* 8. Birthday Candle Blowing & Celebration */}
        <BirthdayWishesSection />
      </main>
    </div>
  );
}
