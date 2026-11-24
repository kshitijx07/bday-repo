import ParticleCanvas from './components/ParticleCanvas';
import CustomCursor from './components/CustomCursor';
import AudioToggle from './components/AudioToggle';
import PrologueSection from './components/PrologueSection';
import RecognitionSection from './components/RecognitionSection';
import TruthsSection from './components/TruthsSection';
import MemoryReel from './components/MemoryReel';
import WaxLetterSection from './components/WaxLetterSection';
import ConstellationSection from './components/ConstellationSection';
import BirthdayWishesSection from './components/BirthdayWishesSection';

export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-ivory via-ivory to-blush/20 text-sky overflow-x-hidden selection:bg-blush selection:text-sky">
      {/* Background Interactive Ambient Canvas */}
      <ParticleCanvas />

      {/* Custom Romantic Magnetic Cursor for Desktop */}
      <CustomCursor />

      {/* Floating Audio Controller (Minimal Top-Right) */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
        <AudioToggle />
      </div>

      {/* Poetic Parallax Chapters */}
      <main className="relative z-10 flex flex-col w-full">
        <PrologueSection />
        <RecognitionSection />
        <TruthsSection />
        <MemoryReel />
        <WaxLetterSection />
        <ConstellationSection />
        <BirthdayWishesSection />
      </main>
    </div>
  );
}
