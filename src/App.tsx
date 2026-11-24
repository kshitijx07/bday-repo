import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import BackgroundEffects from './components/BackgroundEffects';
import CustomCursor from './components/CustomCursor';
import HeroSection from './components/HeroSection';
import StoryBook from './components/StoryBook';

export default function App() {
  const [phase, setPhase] = useState<'hero' | 'book'>('hero');
  return (
    <div className="relative h-full w-full overflow-hidden">
      <BackgroundEffects />
      <CustomCursor />
      <AnimatePresence mode="wait">
        {phase === 'hero' ? <HeroSection key="hero" onOpen={() => setPhase('book')} /> : <StoryBook key="book" onExit={() => setPhase('hero')} />}
      </AnimatePresence>
    </div>
  );
}
