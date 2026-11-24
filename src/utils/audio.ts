/**
 * Romantic Ambient Audio Synthesizer (Web Audio API)
 * Generates soft, meditative, harp-like arpeggios and chimes.
 * Works natively in all modern browsers without requiring external audio files.
 */

let audioCtx: AudioContext | null = null;
let isPlaying = false;
let loopTimer: number | null = null;

// Pentatonic warm scale (F Major / D Minor Pentatonic)
const SCALE = [
  349.23, // F4
  392.00, // G4
  440.00, // A4
  523.25, // C5
  587.33, // D5
  698.46, // F5
  880.00, // A5
  1046.50, // C6
];

const CHORDS = [
  [349.23, 440.00, 523.25, 880.00], // Fmaj7
  [293.66, 440.00, 587.33, 880.00], // Dm7
  [392.00, 440.00, 523.25, 698.46], // Gsus
  [261.63, 392.00, 523.25, 659.25], // C add9
];

function getContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
  if (!isPlaying) return;
  const chord = CHORDS[Math.floor(Math.random() * CHORDS.length)];
  chord.forEach((freq, idx) => {
    setTimeout(() => {
      if (!isPlaying) return;
      playChime(freq, 3.2, 0.05);
    }, idx * 320);
  });
}

export function startAmbientMusic(): boolean {
  try {
    const ctx = getContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    isPlaying = true;
    playArpeggio();
    if (loopTimer) clearInterval(loopTimer);
    loopTimer = window.setInterval(() => {
      if (isPlaying) {
        playArpeggio();
      }
    }, 4200);
    return true;
  } catch {
    return false;
  }
}

export function stopAmbientMusic() {
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
