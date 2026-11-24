/**
 * Ambient Audio Synthesizer & Sound Effects
 * Native Web Audio API: instrumental loop, paper-flip, flower pop, and blow-mic detection.
 */

let audioCtx: AudioContext | null = null;
let isPlaying = false;
let loopTimer: number | null = null;
let isMuted = false;

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

/** Play a delicate crystalline chime */
export function playChime(freq = 523.25, duration = 2.4, gainLevel = 0.08) {
  if (isMuted) return;
  try {
    const ctx = getContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(gainLevel, now + 0.05);
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

/** Soft paper-flip sound for 3D book and letter unfold */
export function playPaperFlip() {
  if (isMuted) return;
  try {
    const ctx = getContext();
    const now = ctx.currentTime;
    const bufferSize = ctx.sampleRate * 0.18;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Pink-noise flutter
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      data[i] = (b0 + b1 + b2) * 0.12;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, now);
    filter.Q.setValueAtTime(1.2, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
  } catch {
    // Ignore
  }
}

/** Soft "pop" sound when flowers bloom */
export function playFlowerPop() {
  if (isMuted) return;
  try {
    const ctx = getContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(640, now + 0.06);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.14);
  } catch {
    // Ignore
  }
}

/** Soft wind breath sound when candle is blown */
export function playBlowSound() {
  if (isMuted) return;
  try {
    const ctx = getContext();
    const now = ctx.currentTime;
    const bufferSize = ctx.sampleRate * 0.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.08;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);
    filter.frequency.exponentialRampToValueAtTime(180, now + 0.5);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
  } catch {
    // Ignore
  }
}

// Warm chord progressions for the continuous instrumental loop
const CHORDS = [
  [349.23, 440.0, 523.25, 880.0],  // Fmaj7
  [293.66, 440.0, 587.33, 880.0],  // Dm7
  [392.0, 440.0, 523.25, 698.46],  // Gsus
  [261.63, 392.0, 523.25, 659.25], // C add9
];

function playArpeggio() {
  if (!isPlaying || isMuted) return;
  const chord = CHORDS[Math.floor(Math.random() * CHORDS.length)];
  chord.forEach((freq, idx) => {
    setTimeout(() => {
      if (!isPlaying || isMuted) return;
      playChime(freq, 3.4, 0.04);
    }, idx * 340);
  });
}

export function startAmbientLoop() {
  try {
    isMuted = false;
    const ctx = getContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    isPlaying = true;
    playArpeggio();
    if (loopTimer) clearInterval(loopTimer);
    loopTimer = window.setInterval(() => {
      if (isPlaying && !isMuted) {
        playArpeggio();
      }
    }, 4400);
  } catch {
    // Ignore
  }
}

export function stopAmbientLoop() {
  isMuted = true;
  isPlaying = false;
  if (loopTimer) {
    clearInterval(loopTimer);
    loopTimer = null;
  }
}

export function toggleAudioMute(): boolean {
  if (isPlaying && !isMuted) {
    stopAmbientLoop();
    return false;
  } else {
    startAmbientLoop();
    return true;
  }
}

export function getAudioPlayingState(): boolean {
  return isPlaying && !isMuted;
}

/**
 * Microphone breath/blow detector using Web Audio API analyser
 * Analyzes RMS amplitude; when volume exceeds threshold, triggers onBlow.
 */
export async function listenForBlow(onBlow: () => void): Promise<() => void> {
  try {
    if (!navigator.mediaDevices?.getUserMedia) {
      return () => {};
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const ctx = getContext();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    const source = ctx.createMediaStreamSource(stream);
    source.connect(analyser);

    const buffer = new Uint8Array(analyser.fftSize);
    let active = true;

    const checkBlow = () => {
      if (!active) return;
      analyser.getByteTimeDomainData(buffer);
      let sum = 0;
      for (let i = 0; i < buffer.length; i++) {
        const d = buffer[i] - 128;
        sum += d * d;
      }
      const rms = Math.sqrt(sum / buffer.length);
      // Threshold for a direct blow/puff of air into microphone
      if (rms > 26) {
        active = false;
        stream.getTracks().forEach((track) => track.stop());
        playBlowSound();
        onBlow();
        return;
      }
      requestAnimationFrame(checkBlow);
    };

    checkBlow();

    // Return cleanup function
    return () => {
      active = false;
      stream.getTracks().forEach((track) => track.stop());
    };
  } catch {
    // User denied mic permission or not on HTTPS — caller will use press/hold fallback
    return () => {};
  }
}
