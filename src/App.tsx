import { useEffect } from 'react';
import ParticleCanvas from './components/ParticleCanvas';
import FilmGrainOverlay from './components/FilmGrainOverlay';
import CustomCursor from './components/CustomCursor';
import AudioToggle from './components/AudioToggle';
import GateSection from './components/GateSection';
import BookSection from './components/BookSection';
import PoemSection from './components/PoemSection';
import MemoriesSection from './components/MemoriesSection';
import GardenSection from './components/GardenSection';
import LetterSection from './components/LetterSection';
import CakeSection from './components/CakeSection';
import { initSmoothScroll } from './utils/motion';

export default function App() {
  useEffect(() => {
    // Lenis smooth scroll on desktop, native hardware 120Hz/60Hz on mobile
    const lenis = initSmoothScroll();
    return () => {
      lenis?.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full max-w-full bg-charcoal text-silver overflow-x-hidden selection:bg-signal selection:text-silver-light">
      {/* 5% Film Grain & Soft Vignette Overlay */}
      <FilmGrainOverlay />

      {/* Floating Ambient Dust & Petals */}
      <ParticleCanvas />

      {/* Luxury Custom Cursor (Silver dot to red heart / Mobile touch ripples) */}
      <CustomCursor />

      {/* Floating Audio Controller (Minimal Top-Right) */}
      <div
        className="fixed z-50 pointer-events-auto"
        style={{
          top: 'max(0.75rem, env(safe-area-inset-top, 0.75rem))',
          right: 'max(0.75rem, env(safe-area-inset-right, 0.75rem))',
        }}
      >
        <AudioToggle />
      </div>

      {/* 7 Continuous Film Scroll Sections */}
      <main className="relative z-10 flex flex-col w-full max-w-full overflow-x-hidden">
        {/* 1. Gate Section: Name with Doodle Underline, Floating Dust, Hold Red Wax Seal */}
        <GateSection />

        {/* 2. 3D Book Section: Gyroscope/Pointer Tilt, Scroll/Tap Open with Paper-Flip */}
        <BookSection />

        {/* 3. Poem Section: Giant Outlined Parallax Words, Scroll-Lit Text, Paper Plane */}
        <PoemSection />

        {/* 4. Memories Section: Polaroid Cards, Washi Tape, 3D Tilt & Lightbox */}
        <MemoriesSection />

        {/* 5. Garden Section: 4 Self-Drawing Flowers & Tap-to-Bloom Love Reasons */}
        <GardenSection />

        {/* 6. Letter Section: Sliding Envelope, 3D Parchment Unfold & Red Signature */}
        <LetterSection />

        {/* 7. Cake Finale Section: SVG Cake, Mic Breath Blow Detection, Falling Petals */}
        <CakeSection />
      </main>
    </div>
  );
}
