import { useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { toggleAmbientMusic, getAudioState } from '../utils/audio';

export default function AudioToggle() {
  const [playing, setPlaying] = useState(getAudioState());

  const handleToggle = () => {
    const newState = toggleAmbientMusic();
    setPlaying(newState);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={playing ? 'Mute ambient melody' : 'Play romantic ambient melody'}
      className="glass group flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-sky border border-blush/40 hover:border-blush shadow-sm transition-all duration-300 active:scale-95 bg-ivory/80 backdrop-blur-md"
    >
      {playing ? (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blush opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blush" />
          </span>
          <Volume2 size={13} className="text-blush transition-transform group-hover:scale-110" />
          <span className="label text-[0.6rem] tracking-wider text-sky font-medium hidden sm:inline">Melody On</span>
        </>
      ) : (
        <>
          <Music size={12} className="text-sky/60" />
          <VolumeX size={13} className="text-sky/60" />
          <span className="label text-[0.6rem] tracking-wider text-sky/70 font-medium hidden sm:inline">Sound</span>
        </>
      )}
    </button>
  );
}
