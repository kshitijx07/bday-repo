import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { toggleAudioMute, getAudioPlayingState } from '../utils/audio';

export default function AudioToggle() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaying(getAudioPlayingState());
    }, 800);
    return () => clearInterval(timer);
  }, []);

  const handleToggle = () => {
    const newState = toggleAudioMute();
    setPlaying(newState);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={playing ? 'Mute ambient soundtrack' : 'Unmute ambient soundtrack'}
      className="glass group flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-forest border border-forest/20 hover:border-forest/40 shadow-md transition-all duration-300 active:scale-95 bg-ivory-light/90 backdrop-blur-md cursor-pointer"
    >
      {playing ? (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blush opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blush" />
          </span>
          <Volume2 size={13} className="text-forest group-hover:text-blush transition-colors" />
          <span className="label text-[0.6rem] tracking-wider text-forest font-medium hidden sm:inline">
            Melody On
          </span>
        </>
      ) : (
        <>
          <VolumeX size={13} className="text-forest/50" />
          <span className="label text-[0.6rem] tracking-wider text-forest/50 font-medium hidden sm:inline">
            Muted
          </span>
        </>
      )}
    </button>
  );
}
