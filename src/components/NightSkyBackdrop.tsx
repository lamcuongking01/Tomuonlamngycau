import { useMemo, type CSSProperties } from 'react';

interface NightSkyBackdropProps {
  mood: 'romantic' | 'sad' | 'celebration';
}

const STAR_SPECTRUM = [
  '#FFFFFF', // Pure white
  '#E0F2FE', // Cool blue-white (Sirius/Vega)
  '#FEF9C3', // Warm cream-yellow
  '#FDE68A', // Pale gold
  '#FCE7F3', // Soft rose-white
];

export function NightSkyBackdrop({ mood }: NightSkyBackdropProps) {
  // Realistic multi-magnitude starfield with authentic spectral colors & atmospheric glow
  const stars = useMemo(() => {
    return Array.from({ length: 140 }, (_, i) => {
      const magnitude = i % 14 === 0 ? 'bright' : i % 4 === 0 ? 'medium' : 'faint';
      const size =
        magnitude === 'bright'
          ? 2.4 + (i % 3) * 0.4
          : magnitude === 'medium'
            ? 1.5 + (i % 2) * 0.4
            : 0.9 + (i % 2) * 0.3;

      const color = STAR_SPECTRUM[i % STAR_SPECTRUM.length];
      return {
        id: i,
        left: `${((i * 37.7 + (i % 5) * 11.3) % 98).toFixed(2)}%`,
        top: `${((i * 23.1 + (i % 7) * 8.9) % 86).toFixed(2)}%`,
        size,
        magnitude,
        color,
        minOpacity: magnitude === 'bright' ? 0.55 : magnitude === 'medium' ? 0.25 : 0.12,
        maxOpacity: magnitude === 'bright' ? 1 : magnitude === 'medium' ? 0.85 : 0.55,
        duration: `${2.2 + (i % 7) * 0.85}s`,
        delay: `${-((i * 0.53) % 5)}s`,
      };
    });
  }, []);

  const fireflies = useMemo(() => {
    if (mood === 'sad') return [];
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: `${(i * 19 + 6) % 94}%`,
      top: `${16 + ((i * 29) % 76)}%`,
      size: i % 3 === 0 ? 7 : 5,
      dur: `${7 + (i % 6) * 1.6}s`,
      delay: `${-((i * 1.1) % 8)}s`,
      fx1: `${i % 2 === 0 ? 28 : -26}px`,
      fy1: `${i % 3 === 0 ? -32 : -18}px`,
      fx2: `${i % 2 === 0 ? -18 : 22}px`,
      fy2: `${-42 - (i % 3) * 12}px`,
      fx3: `${i % 2 === 0 ? 24 : -20}px`,
      fy3: `${-16 - (i % 4) * 6}px`,
    }));
  }, [mood]);

  const raindrops = useMemo(() => {
    if (mood !== 'sad') return [];
    return Array.from({ length: 42 }, (_, i) => ({
      id: i,
      left: `${(i * 23 + 3) % 98}%`,
      duration: `${1.3 + (i % 5) * 0.25}s`,
      delay: `${-((i * 0.4) % 2)}s`,
    }));
  }, [mood]);

  const bgGradient =
    mood === 'sad'
      ? 'bg-gradient-to-b from-[#060911] via-[#0C1220] to-[#131A29]'
      : mood === 'celebration'
        ? 'bg-gradient-to-b from-[#060816] via-[#131029] to-[#211230]'
        : 'bg-gradient-to-b from-[#050814] via-[#0E1026] to-[#19122E]';

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden transition-colors duration-700 ${bgGradient}`}
      aria-hidden="true"
    >
      {/* Subtle diagonal Milky Way stardust band */}
      {mood !== 'sad' && (
        <div
          className="absolute -inset-24 opacity-35"
          style={{
            background:
              'radial-gradient(ellipse 65% 22% at 50% 35%, rgba(196, 181, 253, 0.14), rgba(244, 114, 182, 0.06) 45%, transparent 75%)',
            transform: 'rotate(-22deg)',
          }}
        />
      )}

      {/* Realistic astronomical starfield */}
      {stars.map((star) => (
        <span
          key={star.id}
          style={
            {
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: mood === 'sad' ? '#CBD5E1' : star.color,
              boxShadow:
                mood === 'sad'
                  ? 'none'
                  : star.magnitude === 'bright'
                    ? `0 0 8px 2px ${star.color}CC, 0 0 18px 4px ${star.color}55`
                    : star.magnitude === 'medium'
                      ? `0 0 4px 1px ${star.color}88`
                      : 'none',
              '--twinkle-dur': star.duration,
              '--star-min': mood === 'sad' ? 0.15 : star.minOpacity,
              '--star-max': mood === 'sad' ? 0.45 : star.maxOpacity,
              animationDelay: star.delay,
            } as CSSProperties
          }
          className="animate-star-twinkle absolute rounded-full"
        />
      ))}

      {/* Luminous Full Moon */}
      <div className="animate-moon-float absolute top-12 right-8 sm:top-16 sm:right-20 md:right-28">
        <div
          className={`relative w-24 h-24 sm:w-32 sm:h-32 rounded-full transition-all duration-700 ${
            mood === 'sad'
              ? 'bg-slate-200/75 shadow-[0_0_55px_12px_rgba(148,163,184,0.22)] opacity-70'
              : 'bg-gradient-to-br from-[#FFFDF7] via-[#FEF3C7] to-[#FDE68A] shadow-[0_0_95px_30px_rgba(254,240,138,0.3)]'
          }`}
        >
          <span className="absolute top-5 left-6 w-5 h-5 rounded-full bg-amber-900/10" />
          <span className="absolute bottom-7 right-6 w-7 h-7 rounded-full bg-amber-900/10" />
          <span className="absolute top-12 right-9 w-3.5 h-3.5 rounded-full bg-amber-900/10" />
        </div>
      </div>

      {/* Glowing Fireflies drifting across the night sky */}
      {fireflies.map((fly) => (
        <span
          key={fly.id}
          style={
            {
              left: fly.left,
              top: fly.top,
              width: `${fly.size}px`,
              height: `${fly.size}px`,
              '--ff-dur': fly.dur,
              '--fx1': fly.fx1,
              '--fy1': fly.fy1,
              '--fx2': fly.fx2,
              '--fy2': fly.fy2,
              '--fx3': fly.fx3,
              '--fy3': fly.fy3,
              animationDelay: fly.delay,
            } as CSSProperties
          }
          className="animate-firefly-drift absolute rounded-full bg-[#FEF08A] shadow-[0_0_12px_4px_rgba(250,204,21,0.75)]"
        />
      ))}

      {/* Soft horizon moonlight glow */}
      <div
        className={`absolute inset-x-0 bottom-0 h-56 transition-opacity duration-700 ${
          mood === 'sad'
            ? 'bg-gradient-to-t from-slate-950/80 to-transparent'
            : 'bg-gradient-to-t from-rose-950/35 via-fuchsia-950/10 to-transparent'
        }`}
      />

      {/* Quiet falling rain for sad ending */}
      {mood === 'sad' &&
        raindrops.map((drop) => (
          <span
            key={drop.id}
            style={
              {
                left: drop.left,
                '--rain-dur': drop.duration,
                animationDelay: drop.delay,
              } as CSSProperties
            }
            className="animate-rain-fall absolute -top-12 w-px h-10 bg-gradient-to-b from-transparent via-slate-300/45 to-slate-200/70"
          />
        ))}
    </div>
  );
}
