import { useEffect, useRef } from 'react';

interface ScreenParticlesProps {
  mood: 'romantic' | 'heartbreak' | 'celebration' | 'sad';
}

interface AmbientDot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  twinkleSpeed: number;
  phase: number;
  color: string;
}

const ROMANTIC_COLORS = ['#FDA4AF', '#F9A8D4', '#FDE68A', '#FFF1F2', '#F472B6'];
const CELEBRATION_COLORS = ['#FB7185', '#F43F5E', '#FDE68A', '#F9A8D4', '#FFFFFF'];
const HEARTBREAK_COLORS = ['#FDA4AF', '#94A3B8', '#CBD5E1', '#F43F5E'];
const SAD_COLORS = ['#94A3B8', '#CBD5E1', '#64748B', '#E2E8F0'];

export function ScreenParticles({ mood }: ScreenParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const moodRef = useRef(mood);
  moodRef.current = mood;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const paletteForMood = (m: ScreenParticlesProps['mood']) => {
      switch (m) {
        case 'celebration':
          return CELEBRATION_COLORS;
        case 'heartbreak':
          return HEARTBREAK_COLORS;
        case 'sad':
          return SAD_COLORS;
        default:
          return ROMANTIC_COLORS;
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const count = 95;
    const dots: AmbientDot[] = Array.from({ length: count }, (_, i) => {
      const colors = paletteForMood(moodRef.current);
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -0.25 - Math.random() * 0.45,
        radius: 1.2 + Math.random() * 2.6,
        alpha: 0.3 + Math.random() * 0.6,
        twinkleSpeed: 0.002 + Math.random() * 0.004,
        phase: i * 0.7,
        color: colors[i % colors.length],
      };
    });

    let frameId = 0;
    let prevMood = moodRef.current;

    const render = (now: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const currentMood = moodRef.current;

      if (currentMood !== prevMood) {
        prevMood = currentMood;
        const colors = paletteForMood(currentMood);
        dots.forEach((d, i) => {
          d.color = colors[i % colors.length];
        });
      }

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        if (!prefersReduced) {
          // Drift gently upward in romantic/celebration, downward in heartbreak/sad
          const dirY =
            currentMood === 'sad' || currentMood === 'heartbreak'
              ? Math.abs(d.vy) * 0.95
              : -Math.abs(d.vy);
          d.x += d.vx + Math.sin(now * 0.001 + d.phase) * 0.18;
          d.y += dirY;

          if (d.y < -12) d.y = h + 12;
          if (d.y > h + 12) d.y = -12;
          if (d.x < -12) d.x = w + 12;
          if (d.x > w + 12) d.x = -12;
        }

        const pulse = 0.45 + 0.55 * Math.sin(now * d.twinkleSpeed + d.phase);
        ctx.globalAlpha = d.alpha * pulse;
        ctx.fillStyle = d.color;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (!prefersReduced) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    frameId = window.requestAnimationFrame(render);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 w-full h-full"
    />
  );
}
