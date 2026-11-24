import { useMemo, type CSSProperties } from 'react';

type FlowerVariety = 'rose' | 'tulip' | 'sakura' | 'hydrangea' | 'babysBreath' | 'wisteria';

interface AmbientFlowersProps {
  density?: 'gentle' | 'rich';
}

const FLOWER_POOL: FlowerVariety[] = [
  'rose',
  'babysBreath',
  'tulip',
  'sakura',
  'hydrangea',
  'wisteria',
];

function BlossomSvg({ variety, size }: { variety: FlowerVariety; size: number }) {
  switch (variety) {
    case 'rose':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
          <circle cx="20" cy="18" r="11" fill="#BE123C" />
          <path d="M12 16 Q20 8 28 16 Q24 26 20 26 Q16 26 12 16 Z" fill="#F43F5E" />
          <path d="M15 16 Q20 11 25 16 Q23 22 20 22 Q17 22 15 16 Z" fill="#FDA4AF" />
          <path d="M20 28 L20 38" stroke="#84CC16" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'tulip':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
          <path d="M20 25 L20 38" stroke="#84CC16" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 12 Q12 25 20 25 Q28 25 28 12 L24 16 L20 9 L16 16 Z" fill="#FB7185" />
          <path d="M16 16 L20 9 L24 16 Q22 24 20 24 Q18 24 16 16 Z" fill="#FECDD3" opacity="0.75" />
        </svg>
      );
    case 'sakura':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
          {[0, 72, 144, 216, 288].map((deg) => (
            <ellipse
              key={deg}
              cx="20"
              cy="11"
              rx="4.6"
              ry="7.5"
              fill="#FBCFE8"
              transform={`rotate(${deg} 20 20)`}
            />
          ))}
          <circle cx="20" cy="20" r="3" fill="#F472B6" />
        </svg>
      );
    case 'babysBreath':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
          <path
            d="M20 36 L20 20 M20 23 L12 15 M20 22 L28 14 M20 20 L20 10"
            stroke="#A3E635"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          {[
            { x: 12, y: 14 },
            { x: 20, y: 9 },
            { x: 28, y: 13 },
          ].map((pos, idx) => (
            <g key={idx} transform={`translate(${pos.x}, ${pos.y})`}>
              <circle cx="0" cy="-3" r="2.2" fill="#FFFFFF" />
              <circle cx="2.8" cy="-1" r="2.2" fill="#FFFFFF" />
              <circle cx="1.8" cy="2.6" r="2.2" fill="#FFFFFF" />
              <circle cx="-1.8" cy="2.6" r="2.2" fill="#FFFFFF" />
              <circle cx="-2.8" cy="-1" r="2.2" fill="#FFFFFF" />
              <circle cx="0" cy="0" r="1.3" fill="#FEF08A" />
            </g>
          ))}
        </svg>
      );
    case 'hydrangea':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
          {[
            { x: 15, y: 15, c: '#93C5FD' },
            { x: 25, y: 15, c: '#A5B4FC' },
            { x: 14, y: 24, c: '#C4B5FD' },
            { x: 24, y: 24, c: '#7DD3FC' },
          ].map((floret, idx) => (
            <g key={idx} transform={`translate(${floret.x}, ${floret.y})`}>
              <circle cx="0" cy="-2.8" r="2.6" fill={floret.c} />
              <circle cx="2.8" cy="0" r="2.6" fill={floret.c} />
              <circle cx="0" cy="2.8" r="2.6" fill={floret.c} />
              <circle cx="-2.8" cy="0" r="2.6" fill={floret.c} />
              <circle cx="0" cy="0" r="1.1" fill="#FEF9C3" />
            </g>
          ))}
        </svg>
      );
    case 'wisteria':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
          {[
            { x: 20, y: 10, r: 3.8, c: '#A78BFA' },
            { x: 16, y: 15, r: 3.6, c: '#C4B5FD' },
            { x: 24, y: 15, r: 3.6, c: '#C4B5FD' },
            { x: 18, y: 21, r: 3.2, c: '#DDD6FE' },
            { x: 22, y: 21, r: 3.2, c: '#DDD6FE' },
            { x: 20, y: 27, r: 2.8, c: '#EDE9FE' },
          ].map((p, idx) => (
            <circle key={idx} cx={p.x} cy={p.y} r={p.r} fill={p.c} />
          ))}
        </svg>
      );
  }
}

export function AmbientFlowers({ density = 'gentle' }: AmbientFlowersProps) {
  const count = density === 'rich' ? 24 : 12;

  const blossoms = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      variety: FLOWER_POOL[i % FLOWER_POOL.length],
      left: `${(i * 27 + 5) % 94}%`,
      size: density === 'rich' ? 28 + ((i * 5) % 16) : 24 + ((i * 4) % 12),
      duration: `${11 + ((i * 2.4) % 8)}s`,
      delay: `${-((i * 1.8) % 12)}s`,
      sway: `${i % 2 === 0 ? '' : '-'}${26 + (i % 4) * 10}px`,
      spin: `${i % 2 === 0 ? '' : '-'}${90 + (i % 3) * 50}deg`,
    }));
  }, [count, density]);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
      {blossoms.map((item) => (
        <div
          key={item.id}
          style={
            {
              left: item.left,
              '--f-dur': item.duration,
              '--f-sway': item.sway,
              '--f-spin': item.spin,
              animationDelay: item.delay,
            } as CSSProperties
          }
          className="animate-flower-float absolute -top-14"
        >
          <BlossomSvg variety={item.variety} size={item.size} />
        </div>
      ))}
    </div>
  );
}
