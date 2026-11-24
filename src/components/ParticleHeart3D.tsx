import { useEffect, useRef, useState } from 'react';

interface Particle {
  // Target 3D volumetric heart coordinates
  hx: number;
  hy: number;
  hz: number;
  // Scattered 3D cloud coordinates
  sx: number;
  sy: number;
  sz: number;
  // Current interpolated 3D position
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  phaseOffset: number;
}

type HeartPhase = 'BEATING' | 'DISSOLVING' | 'REASSEMBLING';

const BEAT_DURATION_MS = 5000;       // 5s đập
const DISSOLVE_DURATION_MS = 6000;   // 6s tan ra
const REASSEMBLE_DURATION_MS = 10000; // 10s hợp lại
const CYCLE_MS = BEAT_DURATION_MS + DISSOLVE_DURATION_MS + REASSEMBLE_DURATION_MS;

const PARTICLE_COLORS = [
  '#FB7185',
  '#F43F5E',
  '#E11D48',
  '#F472B6',
  '#FDA4AF',
  '#FDE68A',
];

function createHeartParticles(count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const t = Math.random() * Math.PI * 2;
    // Classic 2D parametric heart curve
    const baseX = 16 * Math.pow(Math.sin(t), 3);
    const baseY = -(
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
    );

    // Fill volume inside & around shell for true 3D depth
    const shellBias = Math.pow(Math.random(), 0.38);
    const thickness = (1 - Math.abs(baseX) / 22) * 5.2 + 1.8;
    const zDepth = (Math.random() * 2 - 1) * thickness * (0.4 + 0.6 * Math.sin(Math.random() * Math.PI));

    const hx = baseX * shellBias * 7.2;
    const hy = (baseY - 1.5) * shellBias * 7.2;
    const hz = zDepth * 7.2;

    // Scattered 3D stardust positions
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const scatterRadius = 180 + Math.random() * 220;

    particles.push({
      hx,
      hy,
      hz,
      sx: scatterRadius * Math.sin(phi) * Math.cos(theta),
      sy: scatterRadius * Math.sin(phi) * Math.sin(theta),
      sz: scatterRadius * Math.cos(phi),
      x: hx,
      y: hy,
      z: hz,
      size: 1.5 + Math.random() * 2.4,
      color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
      phaseOffset: Math.random() * Math.PI * 2,
    });
  }
  return particles;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function ParticleHeart3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState<HeartPhase>('BEATING');
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const particles = createHeartParticles(1100);
    const startTime = performance.now();
    let frameId = 0;
    let lastPhase: HeartPhase = 'BEATING';
    let lastSec = 5;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const render = (now: number) => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const cx = width / 2;
      const cy = height / 2;

      const elapsed = prefersReduced ? 0 : (now - startTime) % CYCLE_MS;

      let currentPhase: HeartPhase = 'BEATING';
      let scatterMix = 0; // 0 = intact 3D heart, 1 = fully dissolved particles
      let remainingSec = 5;

      if (elapsed < BEAT_DURATION_MS) {
        currentPhase = 'BEATING';
        scatterMix = 0;
        remainingSec = Math.ceil((BEAT_DURATION_MS - elapsed) / 1000);
      } else if (elapsed < BEAT_DURATION_MS + DISSOLVE_DURATION_MS) {
        currentPhase = 'DISSOLVING';
        const p = (elapsed - BEAT_DURATION_MS) / DISSOLVE_DURATION_MS;
        scatterMix = easeOutCubic(p);
        remainingSec = Math.ceil(
          (BEAT_DURATION_MS + DISSOLVE_DURATION_MS - elapsed) / 1000
        );
      } else {
        currentPhase = 'REASSEMBLING';
        const p =
          (elapsed - BEAT_DURATION_MS - DISSOLVE_DURATION_MS) /
          REASSEMBLE_DURATION_MS;
        scatterMix = 1 - easeInOutCubic(p);
        remainingSec = Math.ceil((CYCLE_MS - elapsed) / 1000);
      }

      if (currentPhase !== lastPhase) {
        lastPhase = currentPhase;
        setPhase(currentPhase);
      }
      if (remainingSec !== lastSec) {
        lastSec = remainingSec;
        setSecondsLeft(remainingSec);
      }

      ctx.clearRect(0, 0, width, height);

      // Realistic double-pulse heartbeat when intact or reforming
      const beatWave = Math.sin(now * 0.0055);
      const secondaryBeat = Math.sin(now * 0.011) * 0.35;
      const beatFactor = 1 + (1 - scatterMix * 0.85) * 0.095 * Math.max(0, beatWave + secondaryBeat);

      // Smooth 3D rotation around Y and slight tilt on X
      const rotY = now * 0.00075;
      const rotX = Math.sin(now * 0.0005) * 0.16;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const scaleResponsive = Math.min(width, height) / 310;
      const fov = 420;

      // Project particles into 2D screen coordinates with depth sorting
      const projected: Array<{
        px: number;
        py: number;
        pz: number;
        r: number;
        alpha: number;
        color: string;
      }> = [];

      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];
        const swirlAngle = scatterMix * 1.6 + pt.phaseOffset * 0.15;
        const swirlCos = Math.cos(swirlAngle * scatterMix);
        const swirlSin = Math.sin(swirlAngle * scatterMix);

        const targetSx = pt.sx * swirlCos - pt.sz * swirlSin;
        const targetSz = pt.sx * swirlSin + pt.sz * swirlCos;

        const mx = (pt.hx * (1 - scatterMix) + targetSx * scatterMix) * beatFactor;
        const my = (pt.hy * (1 - scatterMix) + pt.sy * scatterMix) * beatFactor;
        const mz = (pt.hz * (1 - scatterMix) + targetSz * scatterMix) * beatFactor;

        // 3D rotation Y then X
        const rx = mx * cosY - mz * sinY;
        const rz1 = mx * sinY + mz * cosY;
        const ry = my * cosX - rz1 * sinX;
        const rz = my * sinX + rz1 * cosX;

        const perspective = fov / (fov + rz + 120);
        const px = cx + rx * perspective * scaleResponsive;
        const py = cy + ry * perspective * scaleResponsive;

        const shimmer = 0.65 + 0.35 * Math.sin(now * 0.004 + pt.phaseOffset);
        const alpha = Math.max(0.18, Math.min(1, perspective * shimmer * (1 - scatterMix * 0.25)));

        projected.push({
          px,
          py,
          pz: rz,
          r: Math.max(0.9, pt.size * perspective * scaleResponsive),
          alpha,
          color: pt.color,
        });
      }

      projected.sort((a, b) => b.pz - a.pz);

      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.px, p.py, p.r, 0, Math.PI * 2);
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
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  const phaseLabel =
    phase === 'BEATING'
      ? `Trái tim 3D đang đập (${secondsLeft}s)`
      : phase === 'DISSOLVING'
        ? `Đang tan thành ngàn hạt sáng (${secondsLeft}s)`
        : `Đang hợp lại thành trái tim (${secondsLeft}s)`;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-full max-w-[380px] aspect-square">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          aria-label="Hiệu ứng hạt trái tim 3D đập 5 giây, tan trong 6 giây và hợp lại trong 10 giây"
        />
      </div>
      <p className="text-xs font-medium text-pink-200/85 tabular-nums tracking-wide">
        {phaseLabel}
      </p>
    </div>
  );
}
