import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function initSmoothScroll(): Lenis | null {
  if (typeof window === 'undefined') return null;

  // On touch devices (iPhone, Android, iPads), use 100% native hardware-accelerated 120Hz/60Hz scroll!
  // This completely eliminates touch input lag and micro-stutters.
  const isTouchDevice =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches;

  if (isTouchDevice) {
    ScrollTrigger.config({ ignoreMobileResize: true });
    return null;
  }

  if (lenisInstance) {
    return lenisInstance;
  }

  // On desktop with mouse wheel, enable butter-smooth Lenis easing
  lenisInstance = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
  });

  lenisInstance.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance?.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}
