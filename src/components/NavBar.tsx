import { useEffect, useState } from 'react';
import Heart from './Heart';
import AudioToggle from './AudioToggle';

interface NavItem {
  id: string;
  label: string;
  short: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'prologue', label: 'Prologue', short: 'Intro' },
  { id: 'recognition', label: 'Recognition', short: 'I' },
  { id: 'truths', label: 'Three Truths', short: 'II' },
  { id: 'archive', label: 'Moments', short: 'III' },
  { id: 'letter', label: 'The Letter', short: 'IV' },
  { id: 'constellation', label: 'Constellation', short: 'V' },
  { id: 'wish', label: 'Birthday Wish', short: 'VI' },
];

export default function NavBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('prologue');

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Check active section
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            setActiveSection(NAV_ITEMS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-ivory/75 border-b border-blush/25 transition-all">
      <div className="max-w-6xl mx-auto px-4 py-2.5 sm:px-6 sm:py-3 flex items-center justify-between">
        {/* Brand / Couple monogram */}
        <button
          onClick={() => scrollTo('prologue')}
          className="flex items-center gap-2 group text-left cursor-pointer"
        >
          <span className="font-serif text-base sm:text-lg font-normal tracking-wide text-sky group-hover:text-blush transition-colors">
            Neha <span className="text-blush font-serif italic">&amp;</span> Kshitij
          </span>
          <Heart size={10} className="animate-beat text-blush" />
        </button>

        {/* Section Quick Jump Pill */}
        <nav className="hidden md:flex items-center gap-1 bg-ivory/90 rounded-full px-2.5 py-1 border border-blush/30 shadow-xs">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`px-3 py-1 rounded-full text-[0.65rem] tracking-wider uppercase font-medium transition-all duration-300 ${
                activeSection === item.id
                  ? 'bg-sky text-ivory shadow-xs scale-105'
                  : 'text-sky/70 hover:text-sky hover:bg-blush/15'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Audio Toggle */}
        <AudioToggle />
      </div>

      {/* 1px Scroll Progress Line */}
      <div className="h-[2px] w-full bg-blush/20">
        <div
          className="h-full bg-gradient-to-r from-blush via-blush-dark to-sky transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
}
