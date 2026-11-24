import { useState } from 'react';
import { Heart, RotateCcw, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { AmbientFlowers } from './components/AmbientFlowers';
import { BrokenHeartFall, type BrokenDrop } from './components/BrokenHeartFall';
import { CatStoryScene } from './components/CatStoryScene';
import { FloatingHearts } from './components/FloatingHearts';
import { NightSkyBackdrop } from './components/NightSkyBackdrop';
import { ParticleHeart3D } from './components/ParticleHeart3D';
import { PinkEnvelopeLetter } from './components/PinkEnvelopeLetter';
import { ScreenParticles } from './components/ScreenParticles';
import { COUPLE_WISHES, NO_STEPS, SAD_CLOSING_LINES } from './data/storyContent';
import { romanticAudio, type MusicTrack } from './utils/romanticAudio';

type AppStage = 'SEALED' | 'LETTER' | 'QUESTION' | 'SAD' | 'ACCEPTED';

const MAX_NO_CLICKS = 11;

export default function App() {
  const [stage, setStage] = useState<AppStage>('SEALED');
  const [noCount, setNoCount] = useState(0);
  const [musicOn, setMusicOn] = useState(false);
  const [activeTrack, setActiveTrack] = useState<MusicTrack>('happy');
  const [burstKey, setBurstKey] = useState(0);
  const [brokenDrops, setBrokenDrops] = useState<BrokenDrop[]>([]);
  const [openedWishes, setOpenedWishes] = useState<Record<string, boolean>>({
    'wish-1': true,
    'wish-2': true,
  });

  const handleToggleMusic = () => {
    const next = romanticAudio.toggle();
    setMusicOn(next);
  };

  const handleOpenEnvelope = () => {
    setActiveTrack('happy');
    romanticAudio.start('happy');
    setMusicOn(true);
    romanticAudio.playGentleTap();
    setStage('LETTER');
  };

  const handleContinueToQuestion = () => {
    romanticAudio.playGentleTap();
    setStage('QUESTION');
  };

  const spawnBrokenHearts = () => {
    const baseId = Date.now() + Math.random();
    const created: BrokenDrop[] = Array.from({ length: 10 }, (_, i) => ({
      id: baseId + i,
      leftPercent: 18 + ((i * 7 + Math.random() * 14) % 64),
      sx: `${i % 2 === 0 ? '' : '-'}${14 + (i % 4) * 14}px`,
      srot: `${i % 2 === 0 ? '' : '-'}${95 + (i % 3) * 45}deg`,
      dur: `${1.8 + (i % 4) * 0.35}s`,
      size: 20 + (i % 3) * 6,
    }));
    setBrokenDrops((prev) => [...prev.slice(-14), ...created]);
    window.setTimeout(() => {
      setBrokenDrops((prev) => prev.filter((item) => !created.some((c) => c.id === item.id)));
    }, 3000);
  };

  const handleNoClick = () => {
    const nextCount = noCount + 1;
    // Switch to Track 2 (Sad Music) whenever "Không" is pressed
    setActiveTrack('sad');
    romanticAudio.setTrack('sad');
    if (!romanticAudio.isPlaying()) {
      romanticAudio.start('sad');
      setMusicOn(true);
    }

    spawnBrokenHearts();

    if (nextCount >= MAX_NO_CLICKS) {
      romanticAudio.playSadChord();
      setNoCount(MAX_NO_CLICKS);
      setStage('SAD');
      return;
    }

    romanticAudio.playBrokenHeartDrop();
    setNoCount(nextCount);
  };

  const handleYesClick = () => {
    // Switch back to Track 1 (Happy Romantic Music) when choosing Đồng ý
    setActiveTrack('happy');
    romanticAudio.setTrack('happy');
    if (!romanticAudio.isPlaying()) {
      romanticAudio.start('happy');
      setMusicOn(true);
    }
    romanticAudio.playCelebrationChime();
    setBrokenDrops([]);
    setBurstKey((prev) => prev + 1);
    setStage('ACCEPTED');
  };

  const handleReset = () => {
    romanticAudio.playGentleTap();
    setActiveTrack('happy');
    romanticAudio.setTrack('happy');
    setNoCount(0);
    setBurstKey(0);
    setBrokenDrops([]);
    setStage('SEALED');
  };

  const toggleWish = (id: string) => {
    romanticAudio.playGentleTap();
    setOpenedWishes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const currentNoStep = NO_STEPS[Math.min(noCount, NO_STEPS.length - 1)];
  const yesScale = Math.min(1 + noCount * 0.03, 1.24);
  const skyMood =
    stage === 'SAD' ? 'sad' : stage === 'ACCEPTED' ? 'celebration' : 'romantic';
  const particleMood =
    stage === 'SAD'
      ? 'sad'
      : stage === 'ACCEPTED'
        ? 'celebration'
        : stage === 'QUESTION' && noCount > 0
          ? 'heartbreak'
          : 'romantic';

  const trackLabel = activeTrack === 'happy' ? 'Bài 1: Khúc trăng tròn' : 'Bài 2: Nhạc buồn';

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden font-sans text-[#FDF2F8]">
      <NightSkyBackdrop mood={skyMood} />
      <ScreenParticles mood={particleMood} />

      {stage !== 'SAD' && (
        <>
          <AmbientFlowers density={stage === 'ACCEPTED' ? 'rich' : 'gentle'} />
          <FloatingHearts
            intensity={stage === 'ACCEPTED' ? 'abundant' : 'subtle'}
            burstKey={burstKey}
          />
        </>
      )}

      <BrokenHeartFall drops={brokenDrops} continuous={stage === 'SAD'} />

      {/* Top Bar Contract: Wordmark — Unboxed Stage Breadcrumb — 1 Music Toggle */}
      <header className="relative z-20 border-b border-white/10 bg-[#080B1A]/60 backdrop-blur-xs">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          <span className="font-serif text-xl font-semibold tracking-tight text-rose-100 whitespace-nowrap shrink-0">
            Ánh Trăng &amp; Lá Thư
          </span>

          <nav
            aria-label="Hành trình lá thư"
            className="hidden md:flex items-center gap-6 text-sm text-rose-200/65"
          >
            <span
              className={`whitespace-nowrap shrink-0 ${
                stage === 'SEALED' || stage === 'LETTER' ? 'font-semibold text-rose-300' : ''
              }`}
            >
              Lá thư
            </span>
            <span aria-hidden="true" className="text-rose-200/30">
              ·
            </span>
            <span
              className={`whitespace-nowrap shrink-0 ${
                stage === 'QUESTION' ? 'font-semibold text-rose-300' : ''
              }`}
            >
              Lời ngỏ
            </span>
            <span aria-hidden="true" className="text-rose-200/30">
              ·
            </span>
            <span
              className={`whitespace-nowrap shrink-0 ${
                stage === 'ACCEPTED' || stage === 'SAD' ? 'font-semibold text-rose-300' : ''
              }`}
            >
              Hồi âm
            </span>
          </nav>

          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleToggleMusic}
              className="min-h-10 px-4 py-2 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 text-xs font-medium text-rose-100 hover:bg-white/15 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-rose-400"
            >
              {musicOn ? (
                <>
                  <Volume2 className="w-4 h-4 text-rose-300" />
                  <span>Tắt · {trackLabel}</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-rose-200/75" />
                  <span>Bật · {trackLabel}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-20 flex-1 flex items-center justify-center px-4 sm:px-6 py-10 md:py-14">
        {(stage === 'SEALED' || stage === 'LETTER') && (
          <section aria-label="Lá thư tình màu hồng" className="w-full">
            <PinkEnvelopeLetter
              isOpen={stage === 'LETTER'}
              onOpenEnvelope={handleOpenEnvelope}
              onContinueToQuestion={handleContinueToQuestion}
            />
          </section>
        )}

        {stage === 'QUESTION' && (
          <section
            aria-label="Câu hỏi tỏ tình"
            className="w-full max-w-2xl rounded-2xl border border-rose-200/25 bg-[#12132B]/35 backdrop-blur-md p-7 sm:p-12 text-center shadow-2xl"
          >
            <div className="flex items-center justify-center gap-2.5 text-xs text-rose-200/80 tabular-nums tracking-wide">
              <span>Dưới ánh trăng tròn</span>
              {noCount > 0 && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    Lần từ chối {noCount}/{MAX_NO_CLICKS}
                  </span>
                </>
              )}
            </div>

            <div className="mt-4">
              <CatStoryScene
                mode={noCount > 0 ? 'moving' : 'reading'}
                moveStep={noCount}
              />
            </div>

            <h1
              className="font-serif text-3xl sm:text-5xl font-semibold text-white mt-6 leading-tight tracking-wide"
              style={{ textWrap: 'balance' }}
            >
              Bạn có muốn làm baybi của tôi không?
            </h1>

            <p className="mt-4 text-base sm:text-lg text-rose-100/90 max-w-xl mx-auto leading-relaxed">
              {currentNoStep.subline}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 min-h-[76px]">
              <button
                type="button"
                onClick={handleYesClick}
                style={{ transform: `scale(${yesScale})` }}
                className="min-h-12 px-8 py-3 inline-flex items-center justify-center gap-2 rounded-xl bg-rose-500 text-base font-semibold text-white hover:bg-rose-400 active:scale-95 transition-transform duration-200 shadow-lg shadow-rose-950/50 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>{currentNoStep.yesLabel}</span>
              </button>

              <button
                type="button"
                onClick={handleNoClick}
                className="min-h-12 px-7 py-3 inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 text-sm font-medium text-rose-100/90 hover:bg-white/10 active:scale-95 transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
              >
                {noCount > 0 && <span aria-hidden="true">💔</span>}
                <span>{currentNoStep.noLabel}</span>
              </button>
            </div>
          </section>
        )}

        {stage === 'SAD' && (
          <section
            aria-label="Lời xin lỗi dịu dàng"
            className="w-full max-w-2xl rounded-2xl border border-slate-400/25 bg-[#101524]/45 backdrop-blur-md p-7 sm:p-12 text-center shadow-2xl"
          >
            <CatStoryScene mode="bridgeCry" />

            <p className="mt-4 text-xs text-slate-300/80 tracking-wide">
              Sau 11 lần từ chối · Một đêm mưa buồn bên cây cầu
            </p>

            <h1
              className="font-serif text-2xl sm:text-4xl font-semibold text-slate-100 mt-3 leading-tight tracking-wide"
              style={{ textWrap: 'balance' }}
            >
              Xin lỗi vì đã làm lỡ thời gian của bạn...
            </h1>

            <div className="mt-6 space-y-4 text-left sm:text-center text-sm sm:text-base text-slate-200/90 leading-relaxed max-w-xl mx-auto">
              {SAD_CLOSING_LINES.map((line, idx) => (
                <p
                  key={idx}
                  className={idx === SAD_CLOSING_LINES.length - 1 ? 'italic text-slate-300 pt-2' : ''}
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-9 pt-6 border-t border-slate-300/15 flex justify-center">
              <button
                type="button"
                onClick={handleReset}
                className="min-h-11 px-6 py-2.5 inline-flex items-center gap-2 rounded-xl border border-slate-300/25 bg-white/5 text-sm font-medium text-slate-200 hover:bg-white/10 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Đọc lại lá thư từ đầu</span>
              </button>
            </div>
          </section>
        )}

        {stage === 'ACCEPTED' && (
          <section
            aria-label="Trái tim hạt 3D, lời cảm ơn và lời chúc tình yêu đôi lứa"
            className="w-full max-w-5xl space-y-8"
          >
            <div className="rounded-2xl border border-rose-300/25 bg-[#16122E]/35 backdrop-blur-md p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
              <div className="lg:col-span-5 flex items-center justify-center">
                <ParticleHeart3D />
              </div>

              <div className="lg:col-span-7 text-center lg:text-left">
                <p className="text-xs font-medium text-rose-300 tracking-wide">
                  Trăng tròn chứng giám · Khúc nhạc hạnh phúc
                </p>

                <h1
                  className="font-serif text-3xl sm:text-5xl font-semibold text-white mt-3 leading-tight tracking-wide"
                  style={{ textWrap: 'balance' }}
                >
                  Cảm ơn bạn đã đồng ý làm baybi của tôi!
                </h1>

                <p className="mt-5 text-base sm:text-lg text-rose-100/90 leading-relaxed">
                  Cảm ơn bạn vì đã không để lá thư màu hồng này phải chờ đợi trong cô đơn, cảm ơn vì cái gật đầu dịu dàng nhất đêm nay. Từ khoảnh khắc ánh mắt vô tình chạm nhau lần đầu cho đến giây phút này, trái tim tôi cuối cùng đã có một nơi bình yên để hướng về.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-between gap-6">
                  <button
                    type="button"
                    onClick={() => {
                      romanticAudio.playCelebrationChime();
                      setBurstKey((prev) => prev + 1);
                    }}
                    className="min-h-11 px-6 py-2.5 inline-flex items-center gap-2 rounded-xl bg-rose-500 text-sm font-semibold text-white hover:bg-rose-400 active:scale-95 transition-all whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Thả thêm ngàn trái tim</span>
                  </button>

                  <CatStoryScene mode="celebrate" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COUPLE_WISHES.map((wish) => {
                const isOpen = Boolean(openedWishes[wish.id]);
                return (
                  <button
                    key={wish.id}
                    type="button"
                    onClick={() => toggleWish(wish.id)}
                    className="text-left rounded-2xl border border-rose-200/25 bg-[#14132B]/32 backdrop-blur-md p-6 hover:border-rose-300/50 hover:bg-[#14132B]/42 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-rose-400"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-serif text-lg font-semibold text-rose-100">
                        {wish.title}
                      </span>
                      <span className="text-xs font-medium text-rose-300 whitespace-nowrap shrink-0">
                        {isOpen ? 'Đang mở' : 'Chạm để đọc'}
                      </span>
                    </div>
                    <p className="text-xs text-rose-200/70 mt-1">{wish.subtitle}</p>
                    {isOpen && (
                      <p className="mt-4 pt-4 border-t border-white/10 text-sm sm:text-base text-rose-100/90 leading-relaxed">
                        {wish.body}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        )}
      </main>

      <footer className="relative z-20 border-t border-white/10 py-5 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-rose-200/55">
          <span>Lá thư màu hồng dưới ánh trăng tròn</span>
          <button
            type="button"
            onClick={handleReset}
            className="hover:text-rose-200 underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Xem lại từ đầu
          </button>
        </div>
      </footer>
    </div>
  );
}
