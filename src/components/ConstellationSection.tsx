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
      radius: Math.random() * 2.5 + 2,
      alpha: 1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    });

    if (starsRef.current.length > 24) {
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
    let height = (canvas.height = canvas.parentElement?.clientHeight || 340);

    const onResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', onResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const stars = starsRef.current;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.003;
      }

      starsRef.current = stars.filter((s) => s.alpha > 0.05);

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(242, 167, 181, ${(1 - dist / 120) * Math.min(stars[i].alpha, stars[j].alpha) * 0.75})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius * 2.8);
        grad.addColorStop(0, `rgba(242, 167, 181, ${s.alpha * 0.7})`);
        grad.addColorStop(1, 'rgba(242, 167, 181, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius * 2.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(49, 92, 76, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius * 0.55, 0, Math.PI * 2);
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
      className="relative min-h-[85dvh] py-16 sm:py-24 px-4 sm:px-8 max-w-5xl mx-auto flex flex-col justify-center items-center text-center w-full"
    >
      {/* Chapter Header */}
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <span className="label text-[0.62rem] sm:text-[0.65rem] text-blush font-semibold tracking-widest uppercase">
          {chapter5.number}
        </span>
        <div className="h-[1px] w-8 bg-blush/40" />
        <span className="label text-[0.6rem] sm:text-[0.62rem] text-sky/60 tracking-wider">
          {chapter5.label}
        </span>
      </div>

      <h2 className="font-serif text-[clamp(2rem,6vw,4.5rem)] font-light leading-[1.08] text-sky mb-2">
        {chapter5.headline}
      </h2>
      <p className="text-xs sm:text-sm text-sky/75 max-w-md mb-6 sm:mb-8 px-2">
        {chapter5.prompt}
      </p>

      {/* Interactive Sky Canvas Box (Responsive Dimensions) */}
      <div className="relative w-full h-[320px] sm:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden border border-blush/40 shadow-xl bg-gradient-to-b from-ivory via-ivory/80 to-blush/20">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
        />

        {/* Central Couple Resonance Monogram Nodes (Comfortably Spaced on Mobile) */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-4 sm:gap-20 px-3">
          {/* Node 1: Kshitij */}
          <div className="flex flex-col items-center gap-1.5 animate-float">
            <div className="p-3 sm:p-5 rounded-full border border-sky/30 bg-ivory/95 shadow-md">
              <span className="font-serif text-base sm:text-2xl text-sky font-normal">
                {hisName}
              </span>
            </div>
            <span className="text-[0.55rem] sm:text-[0.6rem] label text-sky/60">My Soul</span>
          </div>

          {/* Central Connecting Heart */}
          <div className="flex flex-col items-center shrink-0">
            <Heart size={18} className="animate-beat text-blush drop-shadow-md" />
            <span className="text-[0.5rem] sm:text-[0.55rem] label text-blush mt-1">Eternity</span>
          </div>

          {/* Node 2: Neha */}
          <div
            className="flex flex-col items-center gap-1.5 animate-float"
            style={{ animationDelay: '1.5s' }}
          >
            <div className="p-3 sm:p-5 rounded-full border border-blush bg-ivory/95 shadow-md">
              <span className="font-serif text-base sm:text-2xl text-blush font-normal">
                {herName}
              </span>
            </div>
            <span className="text-[0.55rem] sm:text-[0.6rem] label text-blush">My Home</span>
          </div>
        </div>

        {/* Helper Badge */}
        <div className="pointer-events-none absolute bottom-3 sm:bottom-4 inset-x-0 flex justify-center px-2">
          <span className="label text-[0.58rem] sm:text-[0.62rem] text-sky/70 bg-ivory/90 px-3 sm:px-4 py-1.5 rounded-full border border-blush/30 shadow-xs truncate max-w-[90%]">
            {touchCount === 0 ? 'Tap anywhere inside to ignite stars ✨' : `${touchCount} stars connected across eternity`}
          </span>
        </div>
      </div>

      <p className="text-[0.68rem] sm:text-[0.7rem] text-sky/60 max-w-md mt-4 sm:mt-6 italic font-serif px-2">
        {chapter5.subtext}
      </p>
    </section>
  );
}
