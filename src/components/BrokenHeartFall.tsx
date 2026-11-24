import type { CSSProperties } from 'react';

export interface BrokenDrop {
  id: number;
  leftPercent: number;
  sx: string;
  srot: string;
  dur: string;
  size: number;
}

interface BrokenHeartFallProps {
  drops: BrokenDrop[];
  continuous?: boolean;
}

export function BrokenHeartFall({ drops, continuous = false }: BrokenHeartFallProps) {
  const ambientSadDrops = continuous
    ? Array.from({ length: 14 }, (_, i) => ({
        id: 9000 + i,
        leftPercent: (i * 29 + 6) % 94,
        sx: `${i % 2 === 0 ? '' : '-'}${14 + (i % 4) * 10}px`,
        srot: `${i % 2 === 0 ? '' : '-'}${90 + (i % 3) * 50}deg`,
        dur: `${4.5 + (i % 4) * 0.9}s`,
        delay: `${-((i * 0.9) % 4)}s`,
        size: 18 + (i % 3) * 5,
      }))
    : [];

  if (drops.length === 0 && !continuous) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      aria-hidden="true"
    >
      {drops.map((drop) => (
        <span
          key={drop.id}
          style={
            {
              left: `${drop.leftPercent}%`,
              top: '28%',
              fontSize: `${drop.size}px`,
              '--sx': drop.sx,
              '--srot': drop.srot,
              '--sdur': drop.dur,
            } as CSSProperties
          }
          className="animate-shatter-fall absolute select-none"
        >
          💔
        </span>
      ))}

      {ambientSadDrops.map((drop) => (
        <span
          key={drop.id}
          style={
            {
              left: `${drop.leftPercent}%`,
              top: '-6%',
              fontSize: `${drop.size}px`,
              '--sx': drop.sx,
              '--srot': drop.srot,
              '--sdur': drop.dur,
              animationDelay: drop.delay,
              animationIterationCount: 'infinite',
            } as CSSProperties
          }
          className="animate-shatter-fall absolute opacity-70 select-none"
        >
          💔
        </span>
      ))}
    </div>
  );
}
