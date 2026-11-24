import { useEffect, useMemo, useState } from 'react';
import { Heart } from 'lucide-react';
import { LETTER_PARAGRAPHS } from '../data/storyContent';
import { romanticAudio } from '../utils/romanticAudio';

interface PinkEnvelopeLetterProps {
  isOpen: boolean;
  onOpenEnvelope: () => void;
  onContinueToQuestion: () => void;
}

export function PinkEnvelopeLetter({
  isOpen,
  onOpenEnvelope,
  onContinueToQuestion,
}: PinkEnvelopeLetterProps) {
  const [flapOpened, setFlapOpened] = useState(false);
  const [paperEmerged, setPaperEmerged] = useState(false);
  const [typingStarted, setTypingStarted] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const fullText = useMemo(() => LETTER_PARAGRAPHS.join('\n\n'), []);
  const isTypingDone = charCount >= fullText.length;

  useEffect(() => {
    if (!isOpen) {
      setFlapOpened(false);
      setPaperEmerged(false);
      setTypingStarted(false);
      setCharCount(0);
      return;
    }

    // Slow, smooth 3-step envelope reveal:
    // 1. Open top pink flap slowly
    const flapTimer = window.setTimeout(() => setFlapOpened(true), 120);
    // 2. Slide translucent letter sheet slowly upward out of envelope
    const paperTimer = window.setTimeout(() => setPaperEmerged(true), 880);
    // 3. Begin PC typewriter animation once paper rises into view
    const typeTimer = window.setTimeout(() => setTypingStarted(true), 1950);

    return () => {
      window.clearTimeout(flapTimer);
      window.clearTimeout(paperTimer);
      window.clearTimeout(typeTimer);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!typingStarted || isTypingDone) return;

    const currentChar = fullText[charCount];
    const delay =
      currentChar === '\n'
        ? 240
        : currentChar === '.' || currentChar === ',' || currentChar === '—'
          ? 95
          : 28;

    const timer = window.setTimeout(() => {
      if (charCount % 3 === 0 && currentChar !== ' ' && currentChar !== '\n') {
        romanticAudio.playTypewriterKey();
      }
      setCharCount((prev) => prev + 1);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [typingStarted, isTypingDone, charCount, fullText]);

  const visibleText = fullText.slice(0, charCount);
  const visibleParagraphs = visibleText.split('\n\n');

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {!isOpen && (
        <p className="text-sm text-rose-200/85 tracking-wide mb-8 text-center">
          Dưới ánh trăng tròn đêm nay · Có một lá thư màu hồng gửi riêng cho bạn
        </p>
      )}

      {/* Continuous In-Place Pink Envelope + Slow Rising See-Through Letter */}
      <div className="relative w-full flex flex-col items-center">
        {/* Rising Translucent Frosted Letter Paper */}
        <div
          className={`relative z-20 w-full transition-all duration-[1150ms] ease-out ${
            !isOpen
              ? 'max-h-0 opacity-0 translate-y-24 scale-90 overflow-hidden pointer-events-none'
              : paperEmerged
                ? 'max-h-[1400px] opacity-100 translate-y-0 scale-100'
                : 'max-h-[120px] opacity-25 translate-y-20 scale-95 overflow-hidden'
          }`}
        >
          {/* Frosted translucent glass card so stars, moon, flowers, and fireflies shine through */}
          <div className="rounded-2xl border border-pink-200/30 bg-[#121028]/40 backdrop-blur-md p-6 sm:p-10 shadow-2xl text-rose-50">
            <div className="flex items-center justify-between gap-4 border-b border-pink-200/20 pb-4">
              <span className="font-serif text-lg sm:text-xl font-semibold text-pink-200">
                Thư gửi từ một người thầm thương
              </span>
              {typingStarted && !isTypingDone && (
                <button
                  type="button"
                  onClick={() => setCharCount(fullText.length)}
                  className="min-h-9 px-3 py-1.5 rounded-lg border border-pink-200/30 bg-white/10 text-xs font-medium text-pink-100 hover:bg-white/20 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Hiện hết chữ
                </button>
              )}
            </div>

            {/* PC Typewriter Body */}
            <div className="mt-6 space-y-4 min-h-[250px] text-base sm:text-[17px] leading-relaxed text-rose-50/95">
              {typingStarted ? (
                visibleParagraphs.map((paragraph, index) => {
                  const isLastVisible = index === visibleParagraphs.length - 1;
                  return (
                    <p
                      key={index}
                      className={
                        index === LETTER_PARAGRAPHS.length - 1
                          ? 'italic text-pink-200'
                          : ''
                      }
                    >
                      {paragraph}
                      {isLastVisible && !isTypingDone && (
                        <span
                          aria-hidden="true"
                          className="animate-cursor-blink inline-block w-0.5 h-5 bg-pink-300 align-middle ml-1"
                        />
                      )}
                    </p>
                  );
                })
              ) : (
                <p className="text-sm text-pink-200/75 italic">
                  Trang thư đang mở ra dưới ánh trăng tròn...
                </p>
              )}
            </div>

            {/* Heart Next Button once PC typing finishes */}
            {isTypingDone && (
              <div className="mt-8 pt-6 border-t border-pink-200/20 flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={onContinueToQuestion}
                  aria-label="Chạm vào trái tim để tiếp tục"
                  className="group flex flex-col items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-300 cursor-pointer"
                >
                  <span className="animate-heart-beat w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg shadow-rose-900/60 border border-pink-200/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Heart className="w-8 h-8 text-white fill-white" />
                  </span>
                  <span className="text-sm font-semibold text-pink-200 group-hover:text-white whitespace-nowrap">
                    Chạm vào trái tim để tiếp tục
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Pink Envelope (Animated Flap + Pocket Base) */}
        <div
          className={`relative w-full transition-all duration-1000 ease-out ${
            !isOpen
              ? 'max-w-[350px] aspect-[16/11] animate-envelope-bob'
              : 'max-w-[540px] h-20 -mt-5 z-10'
          }`}
          style={{ perspective: '1200px' }}
        >
          {!isOpen ? (
            <button
              type="button"
              onClick={onOpenEnvelope}
              aria-label="Mở lá thư màu hồng"
              className="group relative w-full h-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-400"
            >
              <div className="absolute -inset-3 rounded-3xl bg-pink-500/25 blur-xl group-hover:bg-pink-400/35 transition-colors duration-300" />
              <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#FBCFE8] via-[#F9A8D4] to-[#F472B6] shadow-2xl border border-pink-200/75 overflow-hidden">
                <svg
                  viewBox="0 0 320 220"
                  preserveAspectRatio="none"
                  className="absolute inset-0 w-full h-full"
                  aria-hidden="true"
                >
                  <polygon points="0,0 160,118 0,220" fill="#F9A8D4" opacity="0.72" />
                  <polygon points="320,0 160,118 320,220" fill="#F472B6" opacity="0.78" />
                  <polygon points="0,220 160,104 320,220" fill="#EC4899" opacity="0.38" />
                  <polygon
                    points="0,0 160,126 320,0"
                    fill="#FDF2F8"
                    opacity="0.68"
                    stroke="#F472B6"
                    strokeWidth="1.5"
                  />
                </svg>

                <div className="absolute left-1/2 top-[53%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 shadow-lg border-2 border-rose-200/75 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
              </div>
            </button>
          ) : (
            <div className="relative w-full h-full">
              {/* Unfolding Top Flap (hinges slowly upward) */}
              <div
                aria-hidden="true"
                className={`absolute inset-x-4 -top-8 h-10 bg-gradient-to-b from-[#F472B6] to-[#FBCFE8] border-x border-t border-pink-200/60 transition-transform duration-[900ms] ease-out origin-bottom ${
                  flapOpened ? 'opacity-85 scale-y-100' : 'opacity-40 scale-y-0'
                }`}
                style={{
                  clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                }}
              />

              {/* Pink Envelope Base Pocket */}
              <div className="relative w-full h-full rounded-b-2xl rounded-t-md bg-gradient-to-r from-[#F9A8D4]/90 via-[#F472B6]/95 to-[#F9A8D4]/90 backdrop-blur-xs border border-pink-200/60 shadow-2xl flex items-center justify-center">
                <div className="flex items-center gap-2 text-xs font-medium text-white tracking-wide">
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>Lá thư màu hồng · Đang mở dưới ánh trăng tròn</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {!isOpen && (
        <div className="mt-9">
          <button
            type="button"
            onClick={onOpenEnvelope}
            className="min-h-12 px-8 py-3 inline-flex items-center justify-center gap-2.5 rounded-xl bg-rose-500 text-base font-semibold text-white hover:bg-rose-400 active:scale-95 transition-all shadow-lg shadow-rose-950/40 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Mở lá thư</span>
          </button>
        </div>
      )}
    </div>
  );
}
