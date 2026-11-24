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
      className="glass group flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-silver border border-silver/20 hover:border-silver/40 shadow-lg transition-all duration-300 active:scale-95 bg-charcoal-deep/80 backdrop-blur-md cursor-pointer"
    >
      {playing ? (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-signal" />
          </span>
          <Volume2 size={13} className="text-silver-light group-hover:text-signal transition-colors" />
          <span className="label text-[0.6rem] tracking-wider text-silver-light font-medium hidden sm:inline">
            Sound On
          </span>
        </>
      ) : (
        <>
          <VolumeX size={13} className="text-silver/50" />
          <span className="label text-[0.6rem] tracking-wider text-silver/50 font-medium hidden sm:inline">
            Muted
          </span>
        </>
      )}
    </button>
  );
}
