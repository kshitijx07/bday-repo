/**
 * Romantic Ambient Audio Synthesizer (Web Audio API)
 * Generates soft, meditative, harp-like arpeggios and chimes.
 * Works natively in all modern browsers without requiring external audio files.
 */

let audioCtx: AudioContext | null = null;
let isPlaying = true; // Enabled by default
let loopTimer: number | null = null;
let userMuted = false;

// Pentatonic warm scale (F Major / D Minor Pentatonic)
const CHORDS = [
  [349.23, 440.0, 523.25, 880.0], // Fmaj7
  [293.66, 440.0, 587.33, 880.0], // Dm7
  [392.0, 440.0, 523.25, 698.46], // Gsus
  [261.63, 392.0, 523.25, 659.25], // C add9
];

function getContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/** Play a single delicate crystalline chime */
export function playChime(freq = 523.25, duration = 2.4, gainLevel = 0.08) {
  try {
    const ctx = getContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Warm low-pass
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);

    // Envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(gainLevel, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  } catch {
    // Ignore audio policies
  }
}

/** Play a gentle arpeggio chord */
function playArpeggio() {
  if (!isPlaying || userMuted) return;
  const chord = CHORDS[Math.floor(Math.random() * CHORDS.length)];
  chord.forEach((freq, idx) => {
    setTimeout(() => {
      if (!isPlaying || userMuted) return;
      playChime(freq, 3.2, 0.05);
    }, idx * 320);
  });
}

export function startAmbientMusic(): boolean {
  try {
    userMuted = false;
    const ctx = getContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    isPlaying = true;
    playArpeggio();
    if (loopTimer) clearInterval(loopTimer);
    loopTimer = window.setInterval(() => {
      if (isPlaying && !userMuted) {
        playArpeggio();
      }
    }, 4200);
    return true;
  } catch {
    return false;
  }
}

export function stopAmbientMusic() {
  userMuted = true;
  isPlaying = false;
  if (loopTimer) {
    clearInterval(loopTimer);
    loopTimer = null;
  }
}

export function toggleAmbientMusic(): boolean {
  if (isPlaying) {
    stopAmbientMusic();
    return false;
  } else {
    return startAmbientMusic();
  }
}

export function getAudioState(): boolean {
  return isPlaying;
}

// Auto-start ambient music on page load or on first user gesture (to respect browser policies)
if (typeof window !== 'undefined') {
  const tryAutoPlay = () => {
    if (userMuted) return;
    try {
      const ctx = getContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      startAmbientMusic();
    } catch {
      // Will be triggered by user gesture
    }
  };

  // Attempt right away
  window.addEventListener('DOMContentLoaded', tryAutoPlay);

  // Resume immediately on any initial gesture if blocked by autoplay policy
  const onFirstInteraction = () => {
    if (!userMuted && !isPlaying) {
      startAmbientMusic();
    } else if (!userMuted) {
      try {
        const ctx = getContext();
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
      } catch {
        // Ignore
      }
    }
  };

  window.addEventListener('pointerdown', onFirstInteraction, { passive: true });
  window.addEventListener('scroll', onFirstInteraction, { passive: true, once: true });
  window.addEventListener('touchstart', onFirstInteraction, { passive: true, once: true });
  window.addEventListener('keydown', onFirstInteraction, { passive: true, once: true });
}
