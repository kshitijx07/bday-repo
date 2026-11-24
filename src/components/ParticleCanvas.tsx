import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  type: 'petal' | 'dust';
  color: string;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize, { passive: true });

    const particles: Particle[] = [];
    // Strict lightweight cap: 10 particles on mobile for 120Hz iPhone smoothness, 22 on desktop
    const count = isTouch ? 10 : 22;

    const colors = [
      'rgba(242, 167, 181, 0.6)', // Blush Pink petal
      'rgba(226, 134, 152, 0.5)', // Deeper blush rose
      'rgba(49, 92, 76, 0.22)',   // Forest green botanical dust
      'rgba(235, 205, 155, 0.4)', // Warm golden dust
    ];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3.5 + 2,
        speedY: Math.random() * 0.3 + 0.12,
        speedX: Math.sin(i) * 0.15,
        opacity: Math.random() * 0.4 + 0.25,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.012,
        type: i % 3 === 0 ? 'petal' : 'dust',
        color: colors[i % colors.length],
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    if (!isTouch) {
      const onPointerMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      };
      window.addEventListener('mousemove', onPointerMove, { passive: true });
    }

    const drawPetal = (x: number, y: number, size: number, rotation: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-size / 2, -size / 2, -size, size / 3, 0, size);
      ctx.bezierCurveTo(size, size / 3, size / 2, -size / 2, 0, 0);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    };

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    let lastFrameTime = 0;
    const targetFpsInterval = isTouch ? 1000 / 40 : 1000 / 60; // 40fps on mobile to save GPU battery, 60fps on desktop

    const render = (currentTime: number) => {
      animId = requestAnimationFrame(render);

      if (!isVisible) return;

      const elapsed = currentTime - lastFrameTime;
      if (elapsed < targetFpsInterval) return;
      lastFrameTime = currentTime - (elapsed % targetFpsInterval);

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.25 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (!isTouch) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            p.x += (dx / dist) * 1.0;
            p.y += (dy / dist) * 1.0;
          }
        }

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        if (p.type === 'petal') {
          drawPetal(p.x, p.y, p.size, p.rotation, p.color);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60 will-change-transform"
      aria-hidden="true"
    />
  );
}
