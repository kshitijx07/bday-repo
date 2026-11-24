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
    <div className="relative min-h-screen w-full max-w-full bg-ivory text-forest overflow-x-hidden selection:bg-blush/30 selection:text-forest">
      {/* Delicate Smooth Paper Grain & Soft Edge Vignette */}
      <FilmGrainOverlay />

      {/* Floating Ambient Botanical Dust & Blush Rose Petals */}
      <ParticleCanvas />

      {/* Luxury Custom Cursor (Forest dot to Blush Pink heart / Mobile touch ripples) */}
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
        {/* 1. Gate Section: Name with Blush Doodle Underline, Floating Dust, Blush Wax Seal */}
        <GateSection />

        {/* 2. 3D Book Section: Forest & Ivory Cover, Gyroscope/Pointer Tilt, Paper-Flip */}
        <BookSection />

        {/* 3. Poem Section: Giant Outlined Parallax Words, Scroll-Lit Text, Paper Plane */}
        <PoemSection />

        {/* 4. Memories Section: Polaroid Cards, Washi Tape, 3D Tilt & Lightbox */}
        <MemoriesSection />

        {/* 5. Garden Section: 4 Self-Drawing Flowers & Tap-to-Bloom Love Reasons */}
        <GardenSection />

        {/* 6. Letter Section: Luxury Envelope, 3D Parchment Unfold & Blush Signature */}
        <LetterSection />

        {/* 7. Cake Finale Section: SVG Cake, Mic Breath Blow Detection, Falling Petals */}
        <CakeSection />
      </main>
    </div>
  );
}
