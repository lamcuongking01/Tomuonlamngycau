import { useMemo, type CSSProperties } from 'react';

interface FloatingHeartsProps {
  intensity?: 'subtle' | 'abundant';
  burstKey?: number;
}

const HEART_COLORS = [
  '#FB7185',
  '#F43F5E',
  '#F472B6',
  '#FDA4AF',
  '#E11D48',
];

export function FloatingHearts({ intensity = 'subtle', burstKey = 0 }: FloatingHeartsProps) {
  const count = intensity === 'abundant' ? 38 : 12;

  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      leftPercent: (i * 31 + 4) % 96,
      size: intensity === 'abundant' ? 14 + ((i * 7) % 22) : 12 + ((i * 5) % 12),
      duration: intensity === 'abundant' ? 8 + ((i * 2.1) % 7) : 12 + ((i * 3) % 8),
      delay: -((i * 1.7) % 12),
      color: HEART_COLORS[i % HEART_COLORS.length],
    }));
  }, [count, intensity]);

  const burstParticles = useMemo(() => {
    if (burstKey === 0) return [];
    return Array.from({ length: 24 }, (_, i) => {
      const angle = (i / 24) * Math.PI * 2;
      const radius = 95 + (i % 4) * 48;
      return {
        id: `${burstKey}-${i}`,
        tx: `${Math.round(Math.cos(angle) * radius)}px`,
        ty: `${Math.round(Math.sin(angle) * radius - 35)}px`,
        size: 16 + (i % 4) * 5,
        color: HEART_COLORS[i % HEART_COLORS.length],
      };
    });
  }, [burstKey]);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          style={
            {
              left: `${heart.leftPercent}%`,
              '--duration': `${heart.duration}s`,
              animationDelay: `${heart.delay}s`,
            } as CSSProperties
          }
          className="animate-float-up absolute -bottom-10"
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill={heart.color}
            className={intensity === 'abundant' ? 'opacity-80' : 'opacity-40'}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}

      {burstKey > 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          {burstParticles.map((p) => (
            <div
              key={p.id}
              style={{ '--tx': p.tx, '--ty': p.ty } as CSSProperties}
              className="animate-burst-heart absolute"
            >
              <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill={p.color}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
