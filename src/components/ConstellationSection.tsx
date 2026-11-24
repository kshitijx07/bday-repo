import { useRef, useEffect, useState } from 'react';
import { storyData } from '../data/storyContent';
import { playChime } from '../utils/audio';
import Heart from './Heart';

interface StarPoint {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  vx: number;
  vy: number;
}

export default function ConstellationSection() {
  const { chapter5, herName, hisName } = storyData;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<StarPoint[]>([]);
  const [touchCount, setTouchCount] = useState(0);

  const addStar = (x: number, y: number) => {
    const freqs = [349.23, 440.0, 523.25, 659.25, 880.0];
    const f = freqs[Math.floor(Math.random() * freqs.length)];
    playChime(f, 2.0, 0.07);

    starsRef.current.push({
      x,
      y,
      radius: Math.random() * 3 + 2.5,
      alpha: 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    });

    if (starsRef.current.length > 28) {
      starsRef.current.shift();
    }
    setTouchCount((c) => c + 1);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const onResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', onResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const stars = starsRef.current;

      // Update positions
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.0025; // fade slowly
      }

      // Filter dead stars
      starsRef.current = stars.filter((s) => s.alpha > 0.05);

      // Connect stars with soft glowing threads
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(242, 167, 181, ${(1 - dist / 130) * Math.min(stars[i].alpha, stars[j].alpha) * 0.8})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw each star with soft aura
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        // Aura
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius * 3);
        grad.addColorStop(0, `rgba(242, 167, 181, ${s.alpha * 0.7})`);
        grad.addColorStop(1, 'rgba(242, 167, 181, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `rgba(49, 92, 76, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    addStar(e.clientX - rect.left, e.clientY - rect.top);
  };

  return (
    <section
      id="constellation"
      className="relative min-h-[90dvh] py-20 px-5 sm:px-8 max-w-5xl mx-auto flex flex-col justify-center items-center text-center"
    >
      {/* Chapter Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="label text-[0.65rem] text-blush font-semibold tracking-widest uppercase">
          {chapter5.number}
        </span>
        <div className="h-[1px] w-8 bg-blush/40" />
        <span className="label text-[0.62rem] text-sky/60 tracking-wider">
          {chapter5.label}
        </span>
      </div>

      <h2 className="font-serif text-[clamp(2.1rem,6vw,4.5rem)] font-light leading-[1.08] text-sky mb-2">
        {chapter5.headline}
      </h2>
      <p className="text-xs sm:text-sm text-sky/75 max-w-md mb-8">
        {chapter5.prompt}
      </p>

      {/* Interactive Sky Canvas Box */}
      <div className="relative w-full h-[380px] sm:h-[440px] rounded-3xl overflow-hidden border border-blush/40 shadow-xl bg-gradient-to-b from-ivory via-ivory/80 to-blush/20">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
        />

        {/* Central Couple Resonance Monogram Nodes */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-12 sm:gap-24">
          {/* Node 1: Kshitij */}
          <div className="flex flex-col items-center gap-2 animate-float">
            <div className="p-4 sm:p-5 rounded-full border border-sky/30 bg-ivory/90 shadow-md">
              <span className="font-serif text-lg sm:text-2xl text-sky font-normal">
                {hisName}
              </span>
            </div>
            <span className="text-[0.6rem] label text-sky/60">My Soul</span>
          </div>

          {/* Golden/Blush Connecting Heart */}
          <div className="flex flex-col items-center">
            <Heart size={20} className="animate-beat text-blush drop-shadow-md" />
            <span className="text-[0.55rem] label text-blush mt-1">Eternity</span>
          </div>

          {/* Node 2: Neha */}
          <div
            className="flex flex-col items-center gap-2 animate-float"
            style={{ animationDelay: '1.5s' }}
          >
            <div className="p-4 sm:p-5 rounded-full border border-blush bg-ivory/90 shadow-md">
              <span className="font-serif text-lg sm:text-2xl text-blush font-normal">
                {herName}
              </span>
            </div>
            <span className="text-[0.6rem] label text-blush">My Home</span>
          </div>
        </div>

        {/* Helper Badge */}
        <div className="pointer-events-none absolute bottom-4 inset-x-0 flex justify-center">
          <span className="label text-[0.62rem] text-sky/60 bg-ivory/85 px-4 py-1.5 rounded-full border border-blush/30 shadow-xs">
            {touchCount === 0 ? 'Tap anywhere inside to ignite stars' : `${touchCount} stars connected across eternity`}
          </span>
        </div>
      </div>

      <p className="text-[0.7rem] text-sky/60 max-w-md mt-6 italic font-serif">
        {chapter5.subtext}
      </p>
    </section>
  );
}
