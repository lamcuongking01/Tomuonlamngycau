// @ts-check

const MAX_NO_CLICKS = 11;

const LETTER_PARAGRAPHS = [
  'Có một người từng nghĩ mình sẽ chỉ lặng lẽ bước qua những ngày bình thường như bao người khác, cho đến khoảnh khắc ánh mắt vô tình chạm nhau lần đầu tiên — ngắn ngủi thôi, nhưng đủ khiến cả bầu trời hôm ấy bỗng nhiên sáng rực hơn thường lệ.',
  'Từ lần gặp tình cờ ấy, người ta bắt đầu nhớ từng nụ cười thoáng qua, từng câu nói nhẹ bẫng mà lại làm tim mình lạc mất một nhịp. Không ồn ào, không vội vã, chỉ là mỗi buổi tối nhìn lên vầng trăng tròn lại khẽ mỉm cười vì nhớ đến một dáng hình quen thuộc.',
  'Lá thư màu hồng này được viết bằng tất cả sự chân thành, không dám mong gì quá lớn lao, chỉ mong người đang đọc những dòng chữ này luôn được bình yên, luôn rạng rỡ như ánh sao đêm và gặp thật nhiều dịu dàng trên từng chặng đường phía trước.',
  'Chúc bạn mỗi sáng thức dậy đều có một lý do để mỉm cười, mọi mệt mỏi rồi sẽ hóa thành gió nhẹ, và nếu có thể... cho phép người viết lá thư này được ở bên cạnh chăm sóc bạn thật lâu nhé.',
];

const NO_STEPS = [
  {
    subline: 'Chú mèo nhỏ vừa mở điện thoại lên, đang hồi hộp chờ cái gật đầu của bạn đó.',
    yesLabel: 'Đồng ý',
    noLabel: 'Cút',
  },
  {
    subline: 'Ơ kìa... vừa mới mở lời mà đã bảo cút rồi sao? Cho tôi thêm một cơ hội đi mà.',
    yesLabel: 'Đồng ý nha',
    noLabel: 'Cút',
  },
  {
    subline: 'Mắt chú mèo bắt đầu rưng rưng rồi kìa, ánh trăng đêm nay cũng buồn lây đó.',
    yesLabel: 'Đồng ý đi mà',
    noLabel: 'Cút',
  },
  {
    subline: 'Đừng phũ phàng vậy chứ, người ta đã gom hết can đảm viết cả lá thư màu hồng này rồi.',
    yesLabel: 'Thôi đồng ý nè',
    noLabel: 'Cút',
  },
  {
    subline: 'Trái tim đang rung lên từng nhịp yếu ớt rồi... bạn nỡ lòng nào từ chối tiếp sao?',
    yesLabel: 'Đồng ý liền',
    noLabel: 'Cút',
  },
  {
    subline: 'Chú mèo đã nhích chân bước đi thêm một đoạn nữa rồi đó, đừng để nó đi xa quá...',
    yesLabel: 'Gật đầu nhé',
    noLabel: 'Cút',
  },
  {
    subline: 'Dù bạn có nói cút thêm mấy lần, tình cảm trong lá thư này vẫn không hề vội tắt đâu.',
    yesLabel: 'Đồng ý làm baybi',
    noLabel: 'Cút',
  },
  {
    subline: 'Đom đóm cũng bay chậm lại chờ câu trả lời dịu dàng hơn từ bạn...',
    yesLabel: 'Chấp nhận nha',
    noLabel: 'Cút',
  },
  {
    subline: 'Chỉ còn vài bước nữa thôi là chú mèo ra tận cây cầu mất rồi đó bạn ơi.',
    yesLabel: 'Quay lại đồng ý đi',
    noLabel: 'Cút',
  },
  {
    subline: 'Tim vỡ gần hết rồi nè... một cái chạm vào nút Đồng ý là cứu cả bầu trời đêm nay luôn đó.',
    yesLabel: 'Đồng ý ngay bây giờ',
    noLabel: 'Cút',
  },
  {
    subline: 'Lần cuối cùng chú mèo ngoái lại nhìn màn hình điện thoại trước khi đi ra bờ sông...',
    yesLabel: 'Đồng ý làm baybi của tôi',
    noLabel: 'Cút',
  },
];

const SAD_CLOSING_LINES = [
  'Có lẽ đoạn đường chung đôi của chúng ta chỉ dừng lại ở một ánh nhìn thoáng qua trong lá thư màu hồng này.',
  'Cảm ơn bạn đã dành chút thời gian đọc hết những dòng tâm sự vụng về, dù câu trả lời cuối cùng không như điều tôi từng mơ.',
  'Chúc bạn từ nay về sau luôn hạnh phúc, luôn gặp được người thật sự khiến trái tim bạn rung động và giữ bạn lại thật chặt.',
  'Xin lỗi vì đã làm phiền bạn đêm nay... tôi xin phép lùi lại một bước để trả lại sự bình yên cho bạn.',
];

const COUPLE_WISHES = [
  {
    id: 'wish-1',
    title: 'Bình yên mỗi sớm mai',
    subtitle: 'Lời chúc đầu tiên cho hai đứa mình',
    body: 'Chúc cho mỗi ngày mới của tụi mình đều bắt đầu bằng những tin nhắn dịu dàng, những cái ôm thật chặt và tiếng cười giòn tan xua tan mọi bộn bề cuộc sống.',
  },
  {
    id: 'wish-2',
    title: 'Cùng nhau đi qua bốn mùa',
    subtitle: 'Từ đêm trăng tròn hôm nay về sau',
    body: 'Mong rằng dù nắng ấm hay mưa giông, dù bận rộn đến đâu thì bàn tay vẫn luôn đan chặt lấy nhau, không bao giờ để đối phương phải cô đơn một mình.',
  },
  {
    id: 'wish-3',
    title: 'Bao dung và thấu hiểu',
    subtitle: 'Giữ lửa yêu thương luôn ấm áp',
    body: 'Chúc cho tình yêu của hai đứa mình luôn đủ kiên nhẫn để lắng nghe, đủ dịu dàng để nhường nhịn sau những lúc giận hờn vu vơ, để càng bên nhau càng thương nhau nhiều hơn.',
  },
  {
    id: 'wish-4',
    title: 'Những kỷ niệm ngọt ngào',
    subtitle: 'Viết tiếp câu chuyện từ ánh mắt đầu tiên',
    body: 'Từ khoảnh khắc ánh mắt chạm nhau lần đầu cho đến ngàn ngày sau này, chúc mọi chuyến đi, mọi bữa ăn và từng mùa trăng tròn đều có bóng dáng của cả hai.',
  },
];

// ==========================================
// 1. Dual-Track Web Audio API Engine
// ==========================================
const HAPPY_TRACK = [
  { freq: 349.23, duration: 0.55, bass: 174.61 },
  { freq: 440.0, duration: 0.55 },
  { freq: 523.25, duration: 0.85 },
  { freq: 587.33, duration: 0.55, bass: 146.83 },
  { freq: 523.25, duration: 0.55 },
  { freq: 440.0, duration: 0.85 },
  { freq: 392.0, duration: 0.55, bass: 116.54 },
  { freq: 466.16, duration: 0.55 },
  { freq: 587.33, duration: 0.85 },
  { freq: 523.25, duration: 0.55, bass: 130.81 },
  { freq: 466.16, duration: 0.55 },
  { freq: 440.0, duration: 0.85 },
  { freq: 349.23, duration: 0.55, bass: 174.61 },
  { freq: 523.25, duration: 0.55 },
  { freq: 659.25, duration: 0.85 },
  { freq: 587.33, duration: 0.55, bass: 146.83 },
  { freq: 523.25, duration: 0.55 },
  { freq: 440.0, duration: 0.85 },
  { freq: 392.0, duration: 0.55, bass: 116.54 },
  { freq: 440.0, duration: 0.55, bass: 130.81 },
  { freq: 466.16, duration: 0.55 },
  { freq: 523.25, duration: 1.15, bass: 174.61 },
];

const SAD_TRACK = [
  { freq: 440.0, duration: 0.85, bass: 110.0 },
  { freq: 392.0, duration: 0.75 },
  { freq: 329.63, duration: 1.25 },
  { freq: 349.23, duration: 0.85, bass: 87.31 },
  { freq: 329.63, duration: 0.75 },
  { freq: 293.66, duration: 1.25 },
  { freq: 261.63, duration: 0.85, bass: 130.81 },
  { freq: 293.66, duration: 0.75 },
  { freq: 329.63, duration: 1.25, bass: 98.0 },
  { freq: 293.66, duration: 0.85, bass: 146.83 },
  { freq: 261.63, duration: 0.75 },
  { freq: 246.94, duration: 1.35, bass: 82.41 },
  { freq: 329.63, duration: 0.85, bass: 110.0 },
  { freq: 293.66, duration: 0.8 },
  { freq: 261.63, duration: 0.8 },
  { freq: 220.0, duration: 1.65, bass: 110.0 },
];

class RomanticAudioEngine {
  constructor() {
    /** @type {AudioContext | null} */
    this.ctx = null;
    this.playing = false;
    /** @type {number | null} */
    this.timerId = null;
    this.noteIndex = 0;
    /** @type {'happy' | 'sad'} */
    this.track = 'happy';
  }

  ensureContext() {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const win = /** @type {any} */ (window);
      const AudioCtx = window.AudioContext || win.webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * @param {number} freq
   * @param {number} duration
   * @param {number} volume
   * @param {OscillatorType} type
   * @param {boolean} withHarmonic
   */
  playTone(freq, duration, volume, type = 'sine', withHarmonic = true) {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.035);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.06);

    if (withHarmonic) {
      const harmonic = ctx.createOscillator();
      const harmonicGain = ctx.createGain();
      harmonic.type = 'triangle';
      harmonic.frequency.setValueAtTime(freq * 2, now);
      harmonicGain.gain.setValueAtTime(0.0001, now);
      harmonicGain.gain.exponentialRampToValueAtTime(volume * 0.14, now + 0.02);
      harmonicGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.65);
      harmonic.connect(harmonicGain);
      harmonicGain.connect(ctx.destination);
      harmonic.start(now);
      harmonic.stop(now + duration + 0.06);
    }
  }

  scheduleNext() {
    if (!this.playing) return;
    const sequence = this.track === 'happy' ? HAPPY_TRACK : SAD_TRACK;
    const step = sequence[this.noteIndex % sequence.length];

    if (this.track === 'happy') {
      this.playTone(step.freq, step.duration * 1.15, 0.045, 'sine', true);
      if (step.bass) {
        this.playTone(step.bass, 1.5, 0.022, 'triangle', false);
      }
    } else {
      this.playTone(step.freq, step.duration * 1.25, 0.042, 'sine', false);
      if (step.bass) {
        this.playTone(step.bass, 1.9, 0.025, 'sine', false);
      }
    }

    this.noteIndex = (this.noteIndex + 1) % sequence.length;
    this.timerId = window.setTimeout(() => this.scheduleNext(), step.duration * 1000);
  }

  /** @param {'happy' | 'sad'} nextTrack */
  setTrack(nextTrack) {
    if (this.track === nextTrack) return;
    this.track = nextTrack;
    this.noteIndex = 0;
    if (this.playing) {
      if (this.timerId !== null) {
        window.clearTimeout(this.timerId);
        this.timerId = null;
      }
      this.scheduleNext();
    }
  }

  /** @param {'happy' | 'sad'} [track] */
  start(track) {
    if (track) this.track = track;
    const ctx = this.ensureContext();
    if (!ctx || this.playing) return;
    this.playing = true;
    this.scheduleNext();
  }

  stop() {
    this.playing = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  toggle() {
    if (this.playing) {
      this.stop();
      return false;
    }
    this.start();
    return true;
  }

  playTypewriterKey() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(720 + Math.random() * 140, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.025);
    gain.gain.setValueAtTime(0.016, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.03);
  }

  playGentleTap() {
    this.playTone(659.25, 0.2, 0.042, 'sine');
  }

  playBrokenHeartDrop() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(392.0, now);
    osc.frequency.exponentialRampToValueAtTime(220.0, now + 0.32);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.38);
  }

  playSadChord() {
    const notes = [440.0, 329.63, 261.63];
    notes.forEach((freq, idx) => {
      window.setTimeout(() => this.playTone(freq, 1.3, 0.045, 'sine', false), idx * 200);
    });
  }

  playCelebrationChime() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      window.setTimeout(() => this.playTone(freq, 0.75, 0.058, 'sine'), idx * 110);
    });
  }
}

const audio = new RomanticAudioEngine();

// ==========================================
// 2. App State & DOM References
// ==========================================
const state = {
  /** @type {'SEALED' | 'LETTER' | 'QUESTION' | 'SAD' | 'ACCEPTED'} */
  stage: 'SEALED',
  noCount: 0,
  musicOn: false,
  /** @type {'happy' | 'sad'} */
  activeTrack: 'happy',
  /** @type {Record<string, boolean>} */
  openedWishes: {
    'wish-1': true,
    'wish-2': true,
  },
  /** @type {number[]} */
  letterTimers: [],
  /** @type {number | null} */
  typingTimer: null,
  charCount: 0,
  typingStarted: false,
  /** @type {'romantic' | 'heartbreak' | 'celebration' | 'sad'} */
  particleMood: 'romantic',
};

const fullLetterText = LETTER_PARAGRAPHS.join('\n\n');

const el = {
  nightSky: /** @type {HTMLElement} */ (document.getElementById('night-sky')),
  milkyWay: /** @type {HTMLElement} */ (document.getElementById('milky-way')),
  starField: /** @type {HTMLElement} */ (document.getElementById('star-field')),
  fullMoon: /** @type {HTMLElement} */ (document.getElementById('full-moon')),
  fireflyField: /** @type {HTMLElement} */ (document.getElementById('firefly-field')),
  horizonGlow: /** @type {HTMLElement} */ (document.getElementById('horizon-glow')),
  rainField: /** @type {HTMLElement} */ (document.getElementById('rain-field')),
  screenParticles: /** @type {HTMLCanvasElement} */ (document.getElementById('screen-particles')),
  ambientFlowers: /** @type {HTMLElement} */ (document.getElementById('ambient-flowers')),
  floatingHearts: /** @type {HTMLElement} */ (document.getElementById('floating-hearts')),
  burstHearts: /** @type {HTMLElement} */ (document.getElementById('burst-hearts')),
  brokenHearts: /** @type {HTMLElement} */ (document.getElementById('broken-hearts')),

  navLetter: /** @type {HTMLElement} */ (document.getElementById('nav-letter')),
  navQuestion: /** @type {HTMLElement} */ (document.getElementById('nav-question')),
  navReply: /** @type {HTMLElement} */ (document.getElementById('nav-reply')),
  musicToggleBtn: /** @type {HTMLButtonElement} */ (document.getElementById('music-toggle-btn')),
  musicIcon: /** @type {HTMLElement} */ (document.getElementById('music-icon')),
  musicLabel: /** @type {HTMLElement} */ (document.getElementById('music-label')),

  stageEnvelope: /** @type {HTMLElement} */ (document.getElementById('stage-envelope')),
  sealedIntro: /** @type {HTMLElement} */ (document.getElementById('sealed-intro')),
  letterPaperWrap: /** @type {HTMLElement} */ (document.getElementById('letter-paper-wrap')),
  skipTypeBtn: /** @type {HTMLButtonElement} */ (document.getElementById('skip-type-btn')),
  typewriterBody: /** @type {HTMLElement} */ (document.getElementById('typewriter-body')),
  letterContinueWrap: /** @type {HTMLElement} */ (document.getElementById('letter-continue-wrap')),
  continueHeartBtn: /** @type {HTMLButtonElement} */ (document.getElementById('continue-heart-btn')),
  envelopeBox: /** @type {HTMLElement} */ (document.getElementById('envelope-box')),
  envelopeSealBtn: /** @type {HTMLButtonElement} */ (document.getElementById('envelope-seal-btn')),
  envelopeOpenedPocket: /** @type {HTMLElement} */ (document.getElementById('envelope-opened-pocket')),
  envelopeFlap: /** @type {HTMLElement} */ (document.getElementById('envelope-flap')),
  openBtnWrap: /** @type {HTMLElement} */ (document.getElementById('open-btn-wrap')),
  openLetterBtn: /** @type {HTMLButtonElement} */ (document.getElementById('open-letter-btn')),

  stageQuestion: /** @type {HTMLElement} */ (document.getElementById('stage-question')),
  noCounterWrap: /** @type {HTMLElement} */ (document.getElementById('no-counter-wrap')),
  noCounterText: /** @type {HTMLElement} */ (document.getElementById('no-counter-text')),
  questionCatSlot: /** @type {HTMLElement} */ (document.getElementById('question-cat-slot')),
  questionSubline: /** @type {HTMLElement} */ (document.getElementById('question-subline')),
  yesBtn: /** @type {HTMLButtonElement} */ (document.getElementById('yes-btn')),
  yesBtnLabel: /** @type {HTMLElement} */ (document.getElementById('yes-btn-label')),
  noBtn: /** @type {HTMLButtonElement} */ (document.getElementById('no-btn')),
  noBtnHeart: /** @type {HTMLElement} */ (document.getElementById('no-btn-heart')),
  noBtnLabel: /** @type {HTMLElement} */ (document.getElementById('no-btn-label')),

  stageSad: /** @type {HTMLElement} */ (document.getElementById('stage-sad')),
  sadCatSlot: /** @type {HTMLElement} */ (document.getElementById('sad-cat-slot')),
  sadLines: /** @type {HTMLElement} */ (document.getElementById('sad-lines')),
  sadResetBtn: /** @type {HTMLButtonElement} */ (document.getElementById('sad-reset-btn')),

  stageAccepted: /** @type {HTMLElement} */ (document.getElementById('stage-accepted')),
  heart3dCanvas: /** @type {HTMLCanvasElement} */ (document.getElementById('heart3d-canvas')),
  heart3dPhaseLabel: /** @type {HTMLElement} */ (document.getElementById('heart3d-phase-label')),
  moreHeartsBtn: /** @type {HTMLButtonElement} */ (document.getElementById('more-hearts-btn')),
  celebrateCatSlot: /** @type {HTMLElement} */ (document.getElementById('celebrate-cat-slot')),
  wishesGrid: /** @type {HTMLElement} */ (document.getElementById('wishes-grid')),
  footerResetBtn: /** @type {HTMLButtonElement} */ (document.getElementById('footer-reset-btn')),
};

// ==========================================
// 3. Night Sky (Realistic Stars, Fireflies, Rain)
// ==========================================
const STAR_SPECTRUM = ['#FFFFFF', '#E0F2FE', '#FEF9C3', '#FDE68A', '#FCE7F3'];

function initStarField() {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 140; i++) {
    const span = document.createElement('span');
    const magnitude = i % 14 === 0 ? 'bright' : i % 4 === 0 ? 'medium' : 'faint';
    const size =
      magnitude === 'bright'
        ? 2.4 + (i % 3) * 0.4
        : magnitude === 'medium'
          ? 1.5 + (i % 2) * 0.4
          : 0.9 + (i % 2) * 0.3;
    const color = STAR_SPECTRUM[i % STAR_SPECTRUM.length];

    span.className = 'star-dot animate-star-twinkle';
    span.dataset.color = color;
    span.dataset.magnitude = magnitude;
    span.dataset.minOp = String(magnitude === 'bright' ? 0.55 : magnitude === 'medium' ? 0.25 : 0.12);
    span.dataset.maxOp = String(magnitude === 'bright' ? 1 : magnitude === 'medium' ? 0.85 : 0.55);

    span.style.left = `${((i * 37.7 + (i % 5) * 11.3) % 98).toFixed(2)}%`;
    span.style.top = `${((i * 23.1 + (i % 7) * 8.9) % 86).toFixed(2)}%`;
    span.style.width = `${size}px`;
    span.style.height = `${size}px`;
    span.style.setProperty('--twinkle-dur', `${2.2 + (i % 7) * 0.85}s`);
    span.style.animationDelay = `${-((i * 0.53) % 5)}s`;
    frag.appendChild(span);
  }
  el.starField.appendChild(frag);
}

/** @param {'romantic' | 'sad' | 'celebration'} mood */
function updateSkyMood(mood) {
  el.nightSky.classList.remove('mood-romantic', 'mood-sad', 'mood-celebration');
  el.nightSky.classList.add(`mood-${mood}`);
  el.milkyWay.classList.toggle('hidden', mood === 'sad');
  el.fullMoon.classList.toggle('is-sad', mood === 'sad');
  el.horizonGlow.classList.toggle('is-sad', mood === 'sad');

  // Update stars for sad vs starry night
  const starNodes = el.starField.children;
  for (let i = 0; i < starNodes.length; i++) {
    const s = /** @type {HTMLElement} */ (starNodes[i]);
    const color = s.dataset.color || '#FFFFFF';
    const mag = s.dataset.magnitude || 'faint';
    if (mood === 'sad') {
      s.style.backgroundColor = '#CBD5E1';
      s.style.boxShadow = 'none';
      s.style.setProperty('--star-min', '0.15');
      s.style.setProperty('--star-max', '0.45');
    } else {
      s.style.backgroundColor = color;
      s.style.boxShadow =
        mag === 'bright'
          ? `0 0 8px 2px ${color}CC, 0 0 18px 4px ${color}55`
          : mag === 'medium'
            ? `0 0 4px 1px ${color}88`
            : 'none';
      s.style.setProperty('--star-min', s.dataset.minOp || '0.2');
      s.style.setProperty('--star-max', s.dataset.maxOp || '0.9');
    }
  }

  // Fireflies (hidden in sad rain)
  el.fireflyField.innerHTML = '';
  if (mood !== 'sad') {
    const ffFrag = document.createDocumentFragment();
    for (let i = 0; i < 24; i++) {
      const fly = document.createElement('span');
      const size = i % 3 === 0 ? 7 : 5;
      fly.className = 'firefly-dot animate-firefly-drift';
      fly.style.left = `${(i * 19 + 6) % 94}%`;
      fly.style.top = `${16 + ((i * 29) % 76)}%`;
      fly.style.width = `${size}px`;
      fly.style.height = `${size}px`;
      fly.style.setProperty('--ff-dur', `${7 + (i % 6) * 1.6}s`);
      fly.style.setProperty('--fx1', `${i % 2 === 0 ? 28 : -26}px`);
      fly.style.setProperty('--fy1', `${i % 3 === 0 ? -32 : -18}px`);
      fly.style.setProperty('--fx2', `${i % 2 === 0 ? -18 : 22}px`);
      fly.style.setProperty('--fy2', `${-42 - (i % 3) * 12}px`);
      fly.style.setProperty('--fx3', `${i % 2 === 0 ? 24 : -20}px`);
      fly.style.setProperty('--fy3', `${-16 - (i % 4) * 6}px`);
      fly.style.animationDelay = `${-((i * 1.1) % 8)}s`;
      ffFrag.appendChild(fly);
    }
    el.fireflyField.appendChild(ffFrag);
  }

  // Raindrops (active only in sad ending)
  el.rainField.innerHTML = '';
  if (mood === 'sad') {
    const rainFrag = document.createDocumentFragment();
    for (let i = 0; i < 42; i++) {
      const drop = document.createElement('span');
      drop.className = 'rain-drop animate-rain-fall';
      drop.style.left = `${(i * 23 + 3) % 98}%`;
      drop.style.setProperty('--rain-dur', `${1.3 + (i % 5) * 0.25}s`);
      drop.style.animationDelay = `${-((i * 0.4) % 2)}s`;
      rainFrag.appendChild(drop);
    }
    el.rainField.appendChild(rainFrag);
  }
}

// ==========================================
// 4. Full-Screen Luminous Particles Canvas
// ==========================================
const PALETTES = {
  romantic: ['#FDA4AF', '#F9A8D4', '#FDE68A', '#FFF1F2', '#F472B6'],
  celebration: ['#FB7185', '#F43F5E', '#FDE68A', '#F9A8D4', '#FFFFFF'],
  heartbreak: ['#FDA4AF', '#94A3B8', '#CBD5E1', '#F43F5E'],
  sad: ['#94A3B8', '#CBD5E1', '#64748B', '#E2E8F0'],
};

function initScreenParticles() {
  const canvas = el.screenParticles;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize);

  const dots = Array.from({ length: 95 }, (_, i) => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.45,
    vy: -0.25 - Math.random() * 0.45,
    radius: 1.2 + Math.random() * 2.6,
    alpha: 0.3 + Math.random() * 0.6,
    twinkleSpeed: 0.002 + Math.random() * 0.004,
    phase: i * 0.7,
    color: PALETTES.romantic[i % PALETTES.romantic.length],
  }));

  let lastMood = state.particleMood;

  /** @param {number} now */
  const render = (now) => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (state.particleMood !== lastMood) {
      lastMood = state.particleMood;
      const pal = PALETTES[lastMood];
      dots.forEach((d, idx) => {
        d.color = pal[idx % pal.length];
      });
    }

    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      if (!prefersReduced) {
        const dirY =
          state.particleMood === 'sad' || state.particleMood === 'heartbreak'
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
      window.requestAnimationFrame(render);
    }
  };

  window.requestAnimationFrame(render);
}

// ==========================================
// 5. Ambient 6 Flowers, Floating Hearts, Broken Hearts
// ==========================================
const FLOWER_POOL = ['rose', 'babysBreath', 'tulip', 'sakura', 'hydrangea', 'wisteria'];

/**
 * @param {string} variety
 * @param {number} size
 */
function flowerSvgMarkup(variety, size) {
  switch (variety) {
    case 'rose':
      return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="18" r="11" fill="#BE123C" />
        <path d="M12 16 Q20 8 28 16 Q24 26 20 26 Q16 26 12 16 Z" fill="#F43F5E" />
        <path d="M15 16 Q20 11 25 16 Q23 22 20 22 Q17 22 15 16 Z" fill="#FDA4AF" />
        <path d="M20 28 L20 38" stroke="#84CC16" stroke-width="2" stroke-linecap="round" />
      </svg>`;
    case 'tulip':
      return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" aria-hidden="true">
        <path d="M20 25 L20 38" stroke="#84CC16" stroke-width="2" stroke-linecap="round" />
        <path d="M12 12 Q12 25 20 25 Q28 25 28 12 L24 16 L20 9 L16 16 Z" fill="#FB7185" />
        <path d="M16 16 L20 9 L24 16 Q22 24 20 24 Q18 24 16 16 Z" fill="#FECDD3" opacity="0.75" />
      </svg>`;
    case 'sakura':
      return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" aria-hidden="true">
        ${[0, 72, 144, 216, 288]
          .map((deg) => `<ellipse cx="20" cy="11" rx="4.6" ry="7.5" fill="#FBCFE8" transform="rotate(${deg} 20 20)" />`)
          .join('')}
        <circle cx="20" cy="20" r="3" fill="#F472B6" />
      </svg>`;
    case 'babysBreath':
      return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" aria-hidden="true">
        <path d="M20 36 L20 20 M20 23 L12 15 M20 22 L28 14 M20 20 L20 10" stroke="#A3E635" stroke-width="1.5" stroke-linecap="round" fill="none" />
        ${[
          { x: 12, y: 14 },
          { x: 20, y: 9 },
          { x: 28, y: 13 },
        ]
          .map(
            (p) => `<g transform="translate(${p.x}, ${p.y})">
              <circle cx="0" cy="-3" r="2.2" fill="#FFFFFF" />
              <circle cx="2.8" cy="-1" r="2.2" fill="#FFFFFF" />
              <circle cx="1.8" cy="2.6" r="2.2" fill="#FFFFFF" />
              <circle cx="-1.8" cy="2.6" r="2.2" fill="#FFFFFF" />
              <circle cx="-2.8" cy="-1" r="2.2" fill="#FFFFFF" />
              <circle cx="0" cy="0" r="1.3" fill="#FEF08A" />
            </g>`
          )
          .join('')}
      </svg>`;
    case 'hydrangea':
      return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" aria-hidden="true">
        ${[
          { x: 15, y: 15, c: '#93C5FD' },
          { x: 25, y: 15, c: '#A5B4FC' },
          { x: 14, y: 24, c: '#C4B5FD' },
          { x: 24, y: 24, c: '#7DD3FC' },
        ]
          .map(
            (f) => `<g transform="translate(${f.x}, ${f.y})">
              <circle cx="0" cy="-2.8" r="2.6" fill="${f.c}" />
              <circle cx="2.8" cy="0" r="2.6" fill="${f.c}" />
              <circle cx="0" cy="2.8" r="2.6" fill="${f.c}" />
              <circle cx="-2.8" cy="0" r="2.6" fill="${f.c}" />
              <circle cx="0" cy="0" r="1.1" fill="#FEF9C3" />
            </g>`
          )
          .join('')}
      </svg>`;
    default:
      return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="10" r="3.8" fill="#A78BFA" />
        <circle cx="16" cy="15" r="3.6" fill="#C4B5FD" />
        <circle cx="24" cy="15" r="3.6" fill="#C4B5FD" />
        <circle cx="18" cy="21" r="3.2" fill="#DDD6FE" />
        <circle cx="22" cy="21" r="3.2" fill="#DDD6FE" />
        <circle cx="20" cy="27" r="2.8" fill="#EDE9FE" />
      </svg>`;
  }
}

const HEART_COLORS = ['#FB7185', '#F43F5E', '#F472B6', '#FDA4AF', '#E11D48'];

/** @param {'none' | 'gentle' | 'rich'} density */
function renderAmbientFlowers(density) {
  el.ambientFlowers.innerHTML = '';
  if (density === 'none') return;
  const count = density === 'rich' ? 24 : 12;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const div = document.createElement('div');
    div.className = 'flower-item animate-flower-float';
    div.style.left = `${(i * 27 + 5) % 94}%`;
    div.style.setProperty('--f-dur', `${11 + ((i * 2.4) % 8)}s`);
    div.style.setProperty('--f-sway', `${i % 2 === 0 ? '' : '-'}${26 + (i % 4) * 10}px`);
    div.style.setProperty('--f-spin', `${i % 2 === 0 ? '' : '-'}${90 + (i % 3) * 50}deg`);
    div.style.animationDelay = `${-((i * 1.8) % 12)}s`;
    const size = density === 'rich' ? 28 + ((i * 5) % 16) : 24 + ((i * 4) % 12);
    div.innerHTML = flowerSvgMarkup(FLOWER_POOL[i % FLOWER_POOL.length], size);
    frag.appendChild(div);
  }
  el.ambientFlowers.appendChild(frag);
}

/** @param {'none' | 'subtle' | 'abundant'} intensity */
function renderFloatingHearts(intensity) {
  el.floatingHearts.innerHTML = '';
  if (intensity === 'none') return;
  const count = intensity === 'abundant' ? 38 : 12;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const div = document.createElement('div');
    div.className = 'heart-float-item animate-float-up';
    div.style.left = `${(i * 31 + 4) % 96}%`;
    div.style.setProperty('--duration', `${intensity === 'abundant' ? 8 + ((i * 2.1) % 7) : 12 + ((i * 3) % 8)}s`);
    div.style.animationDelay = `${-((i * 1.7) % 12)}s`;
    const size = intensity === 'abundant' ? 14 + ((i * 7) % 22) : 12 + ((i * 5) % 12);
    const color = HEART_COLORS[i % HEART_COLORS.length];
    const opacity = intensity === 'abundant' ? '0.8' : '0.4';
    div.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" style="opacity:${opacity}">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>`;
    frag.appendChild(div);
  }
  el.floatingHearts.appendChild(frag);
}

function triggerHeartBurst() {
  const frag = document.createDocumentFragment();
  /** @type {HTMLElement[]} */
  const created = [];
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    const radius = 95 + (i % 4) * 48;
    const div = document.createElement('div');
    div.className = 'heart-burst-item animate-burst-heart';
    div.style.setProperty('--tx', `${Math.round(Math.cos(angle) * radius)}px`);
    div.style.setProperty('--ty', `${Math.round(Math.sin(angle) * radius - 35)}px`);
    const size = 16 + (i % 4) * 5;
    const color = HEART_COLORS[i % HEART_COLORS.length];
    div.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>`;
    frag.appendChild(div);
    created.push(div);
  }
  el.burstHearts.appendChild(frag);
  window.setTimeout(() => {
    created.forEach((node) => node.remove());
  }, 1500);
}

function spawnBrokenHearts() {
  const frag = document.createDocumentFragment();
  /** @type {HTMLElement[]} */
  const created = [];
  for (let i = 0; i < 10; i++) {
    const span = document.createElement('span');
    span.className = 'broken-drop-item animate-shatter-fall';
    span.textContent = '💔';
    span.style.left = `${18 + ((i * 7 + Math.random() * 14) % 64)}%`;
    span.style.top = '28%';
    span.style.fontSize = `${20 + (i % 3) * 6}px`;
    span.style.setProperty('--sx', `${i % 2 === 0 ? '' : '-'}${14 + (i % 4) * 14}px`);
    span.style.setProperty('--srot', `${i % 2 === 0 ? '' : '-'}${95 + (i % 3) * 45}deg`);
    span.style.setProperty('--sdur', `${1.8 + (i % 4) * 0.35}s`);
    frag.appendChild(span);
    created.push(span);
  }
  el.brokenHearts.appendChild(frag);
  window.setTimeout(() => {
    created.forEach((node) => node.remove());
  }, 3000);
}

/** @param {boolean} active */
function setContinuousBrokenHearts(active) {
  const existing = el.brokenHearts.querySelectorAll('.is-continuous-sad');
  existing.forEach((n) => n.remove());
  if (!active) return;

  const frag = document.createDocumentFragment();
  for (let i = 0; i < 14; i++) {
    const span = document.createElement('span');
    span.className = 'broken-drop-item animate-shatter-fall is-continuous-sad';
    span.textContent = '💔';
    span.style.left = `${(i * 29 + 6) % 94}%`;
    span.style.top = '-6%';
    span.style.fontSize = `${18 + (i % 3) * 5}px`;
    span.style.opacity = '0.7';
    span.style.setProperty('--sx', `${i % 2 === 0 ? '' : '-'}${14 + (i % 4) * 10}px`);
    span.style.setProperty('--srot', `${i % 2 === 0 ? '' : '-'}${90 + (i % 3) * 50}deg`);
    span.style.setProperty('--sdur', `${4.5 + (i % 4) * 0.9}s`);
    span.style.animationDelay = `${-((i * 0.9) % 4)}s`;
    span.style.animationIterationCount = 'infinite';
    frag.appendChild(span);
  }
  el.brokenHearts.appendChild(frag);
}

// ==========================================
// 6. Cat Story Scenes (Reading / Moving / Celebrate / Bridge Cry)
// ==========================================
/**
 * @param {'reading' | 'moving' | 'celebrate' | 'bridgeCry'} mode
 * @param {number} moveStep
 */
function renderCatScene(mode, moveStep = 0) {
  if (mode === 'celebrate') {
    return `
      <div class="cat-scene-wrap">
        <div class="cat-celebrate-box">
          <div class="animate-cat-jump">
            <svg viewBox="0 0 260 175" class="cat-celebrate-svg" role="img" aria-label="Hai chú mèo dễ thương nhảy tưng lên ăn mừng và ôm nhau hạnh phúc">
              <ellipse cx="130" cy="164" rx="78" ry="9" fill="#FDA4AF" opacity="0.25" />
              <g class="animate-cats-hug-sway" style="transform-origin: 96px 145px">
                <path d="M66 138 Q36 115 48 92 Q58 76 74 92" stroke="#FDBA74" stroke-width="10" stroke-linecap="round" fill="none" />
                <ellipse cx="98" cy="128" rx="30" ry="32" fill="#FED7AA" />
                <ellipse cx="102" cy="132" rx="18" ry="20" fill="#FFF7ED" />
                <polygon points="74,68 68,40 92,56" fill="#FDBA74" />
                <polygon points="75,62 72,46 87,56" fill="#FDA4AF" />
                <polygon points="118,56 128,38 126,68" fill="#FDBA74" />
                <polygon points="118,57 125,44 124,64" fill="#FDA4AF" />
                <ellipse cx="99" cy="78" rx="31" ry="27" fill="#FED7AA" />
                <path d="M82 76 Q87 70 92 76" stroke="#2D1B22" stroke-width="2.5" stroke-linecap="round" fill="none" />
                <path d="M104 76 Q109 70 114 76" stroke="#2D1B22" stroke-width="2.5" stroke-linecap="round" fill="none" />
                <ellipse cx="78" cy="83" rx="5.5" ry="3.5" fill="#FB7185" opacity="0.7" />
                <ellipse cx="118" cy="83" rx="5.5" ry="3.5" fill="#FB7185" opacity="0.7" />
                <polygon points="97,81 101,81 99,84" fill="#E11D48" />
                <path d="M93 86 Q99 92 105 86" stroke="#2D1B22" stroke-width="2" stroke-linecap="round" fill="none" />
                <ellipse cx="127" cy="118" rx="13" ry="8" transform="rotate(-14 127 118)" fill="#FDBA74" />
                <ellipse cx="83" cy="157" rx="10" ry="6" fill="#FDBA74" />
                <ellipse cx="110" cy="157" rx="10" ry="6" fill="#FDBA74" />
              </g>
              <g class="animate-cat-walk-in">
                <g class="animate-cats-hug-sway" style="transform-origin: 162px 145px; animation-delay: 0.2s">
                  <path d="M194 138 Q224 115 212 92 Q202 76 186 92" stroke="#CBD5E1" stroke-width="10" stroke-linecap="round" fill="none" />
                  <ellipse cx="160" cy="128" rx="30" ry="32" fill="#E2E8F0" />
                  <ellipse cx="156" cy="132" rx="18" ry="20" fill="#FFFFFF" />
                  <polygon points="134,68 132,38 148,56" fill="#CBD5E1" />
                  <polygon points="136,64 135,45 145,57" fill="#FDA4AF" />
                  <polygon points="168,56 192,40 186,68" fill="#CBD5E1" />
                  <polygon points="172,56 187,46 184,62" fill="#FDA4AF" />
                  <ellipse cx="159" cy="78" rx="31" ry="27" fill="#F1F5F9" />
                  <path d="M144 76 Q149 70 154 76" stroke="#2D1B22" stroke-width="2.5" stroke-linecap="round" fill="none" />
                  <path d="M166 76 Q171 70 176 76" stroke="#2D1B22" stroke-width="2.5" stroke-linecap="round" fill="none" />
                  <ellipse cx="141" cy="83" rx="5.5" ry="3.5" fill="#FB7185" opacity="0.7" />
                  <ellipse cx="180" cy="83" rx="5.5" ry="3.5" fill="#FB7185" opacity="0.7" />
                  <polygon points="157,81 161,81 159,84" fill="#E11D48" />
                  <path d="M153 86 Q159 92 165 86" stroke="#2D1B22" stroke-width="2" stroke-linecap="round" fill="none" />
                  <ellipse cx="132" cy="126" rx="13" ry="8" transform="rotate(14 132 126)" fill="#E2E8F0" />
                  <ellipse cx="148" cy="157" rx="10" ry="6" fill="#CBD5E1" />
                  <ellipse cx="174" cy="157" rx="10" ry="6" fill="#CBD5E1" />
                </g>
              </g>
              <path d="M129 36 C129 31 122 28 120 33 C118 28 111 31 111 36 C111 43 120 49 120 49 C120 49 129 43 129 36 Z" fill="#F43F5E" transform="translate(10, -4)" />
            </svg>
          </div>
        </div>
        <p class="cat-caption">Hai chú mèo đang nhảy tưng lên ăn mừng và ôm nhau nè!</p>
      </div>
    `;
  }

  if (mode === 'bridgeCry') {
    const posts = [35, 95, 155, 215, 275, 335]
      .map((px) => `<line x1="${px}" y1="108" x2="${px}" y2="152" stroke="#475569" stroke-width="3.5" />`)
      .join('');

    return `
      <div class="cat-scene-wrap">
        <div class="bridge-scene-box">
          <svg viewBox="0 0 380 210" class="bridge-svg" role="img" aria-label="Chú mèo buồn ngồi trên cây cầu đêm mưa uống bia và khóc">
            <rect x="0" y="152" width="380" height="58" fill="#060D1A" />
            <g class="animate-water-ripple" style="transform-origin: 295px 175px">
              <ellipse cx="295" cy="166" rx="34" ry="2.2" fill="#CBD5E1" opacity="0.35" />
              <ellipse cx="290" cy="176" rx="46" ry="2.5" fill="#CBD5E1" opacity="0.25" />
              <ellipse cx="300" cy="187" rx="28" ry="2" fill="#CBD5E1" opacity="0.2" />
            </g>
            <line x1="64" y1="54" x2="64" y2="148" stroke="#475569" stroke-width="4" />
            <circle cx="64" cy="52" r="18" fill="#FDE68A" opacity="0.16" />
            <circle cx="64" cy="52" r="6" fill="#FEF3C7" />
            <path d="M-10 156 Q190 128 390 156 L390 170 Q190 142 -10 170 Z" fill="#334155" />
            <path d="M-10 120 Q190 92 390 120" stroke="#475569" stroke-width="4" fill="none" />
            ${posts}
            <g class="animate-cat-sob" transform="translate(155, 72)">
              <path d="M15 62 Q-4 72 4 86" stroke="#E2A46D" stroke-width="7.5" stroke-linecap="round" fill="none" />
              <ellipse cx="32" cy="54" rx="20" ry="22" fill="#FDBA74" />
              <ellipse cx="34" cy="57" rx="12" ry="13" fill="#FFF7ED" />
              <polygon points="14,22 2,14 20,12" fill="#E2A46D" />
              <polygon points="44,12 62,14 50,22" fill="#E2A46D" />
              <ellipse cx="32" cy="24" rx="22" ry="19" fill="#FED7AA" />
              <circle cx="23" cy="23" r="3.2" fill="#1E293B" />
              <circle cx="22" cy="22" r="1.1" fill="#FFFFFF" />
              <circle cx="41" cy="23" r="3.2" fill="#1E293B" />
              <circle cx="40" cy="22" r="1.1" fill="#FFFFFF" />
              <path d="M18 18 L27 20" stroke="#7C2D12" stroke-width="1.6" stroke-linecap="round" />
              <path d="M46 18 L37 20" stroke="#7C2D12" stroke-width="1.6" stroke-linecap="round" />
              <path d="M27 32 Q32 28 37 32" stroke="#2D1B22" stroke-width="1.8" stroke-linecap="round" fill="none" />
              <circle cx="21" cy="27" r="2.3" fill="#7DD3FC" class="animate-tear-drop" style="--tx:-3px" />
              <circle cx="43" cy="27" r="2.3" fill="#7DD3FC" class="animate-tear-drop" style="--tx:3px; animation-delay:0.6s" />
              <g transform="translate(46, 36) rotate(-18)">
                <rect x="0" y="6" width="11" height="22" rx="3" fill="#92400E" stroke="#FDE68A" stroke-width="0.7" />
                <rect x="3" y="0" width="5" height="8" rx="1.5" fill="#92400E" />
                <rect x="0" y="13" width="11" height="6" fill="#FDE68A" />
                <circle cx="5.5" cy="16" r="1.5" fill="#B45309" />
              </g>
              <ellipse cx="48" cy="52" rx="8" ry="5.5" fill="#FDBA74" />
              <g transform="translate(-8, 60)">
                <rect x="0" y="0" width="10" height="15" rx="2" fill="#F59E0B" />
                <rect x="0" y="4" width="10" height="5" fill="#FEF3C7" />
              </g>
              <ellipse cx="24" cy="76" rx="6" ry="9" fill="#FDBA74" />
              <ellipse cx="40" cy="76" rx="6" ry="9" fill="#FDBA74" />
            </g>
          </svg>
        </div>
        <p class="cat-caption-sad">Chú mèo buồn bã ra ngồi trên cây cầu uống bia và khóc dưới mưa...</p>
      </div>
    `;
  }

  // reading / moving
  const offsetPx = mode === 'moving' ? Math.min(moveStep * 14, 130) : 0;
  const isSadMoving = mode === 'moving' && moveStep > 0;

  return `
    <div class="cat-scene-wrap">
      <div class="cat-mover" style="transform: translate3d(${offsetPx}px, 0, 0)">
        <svg viewBox="0 0 180 145" class="cat-svg-small" role="img" aria-label="${
          isSadMoving ? 'Chú mèo đang buồn bã di chuyển ra xa' : 'Chú mèo dễ thương đang đọc tin nhắn trên điện thoại'
        }">
          <ellipse cx="90" cy="134" rx="46" ry="7" fill="#FB7185" opacity="0.2" />
          <g class="animate-tail-swish" style="transform-origin: 58px 114px">
            <path d="M58 114 Q30 100 36 78 Q40 66 49 74" stroke="#FDBA74" stroke-width="8" stroke-linecap="round" fill="none" />
          </g>
          <ellipse cx="90" cy="102" rx="34" ry="30" fill="#FED7AA" />
          <ellipse cx="90" cy="106" rx="20" ry="20" fill="#FFF7ED" />
          <g class="animate-ear-twitch" style="transform-origin: 66px 48px">
            <polygon points="${isSadMoving ? '64,52 46,34 78,42' : '64,52 56,22 82,42'}" fill="#FDBA74" />
            <polygon points="${isSadMoving ? '65,49 52,36 75,43' : '65,49 60,29 77,42'}" fill="#FDA4AF" />
          </g>
          <polygon points="${isSadMoving ? '116,52 134,34 102,42' : '116,52 124,22 98,42'}" fill="#FDBA74" />
          <polygon points="${isSadMoving ? '115,49 128,36 105,43' : '115,49 120,29 103,42'}" fill="#FDA4AF" />
          <ellipse cx="90" cy="60" rx="35" ry="29" fill="#FED7AA" />
          <g stroke="#9A3412" stroke-width="1.2" opacity="0.55" stroke-linecap="round">
            <line x1="50" y1="62" x2="64" y2="64" />
            <line x1="49" y1="68" x2="64" y2="68" />
            <line x1="116" y1="64" x2="130" y2="62" />
            <line x1="116" y1="68" x2="131" y2="68" />
          </g>
          <g class="animate-cat-blink" style="transform-origin: 90px 56px">
            <circle cx="76" cy="56" r="4.5" fill="#2D1B22" />
            <circle cx="74.5" cy="54.3" r="1.5" fill="#FFFFFF" />
            <circle cx="104" cy="56" r="4.5" fill="#2D1B22" />
            <circle cx="102.5" cy="54.3" r="1.5" fill="#FFFFFF" />
          </g>
          ${
            isSadMoving
              ? '<circle cx="74" cy="61" r="2.2" fill="#7DD3FC" class="animate-tear-drop" style="--tx:-2px" />'
              : ''
          }
          <ellipse cx="66" cy="65" rx="6" ry="3.5" fill="#FB7185" opacity="0.55" />
          <ellipse cx="114" cy="65" rx="6" ry="3.5" fill="#FB7185" opacity="0.55" />
          <polygon points="87,63 93,63 90,66.5" fill="#E11D48" />
          ${
            isSadMoving
              ? '<path d="M84 72 Q90 68 96 72" stroke="#2D1B22" stroke-width="1.8" stroke-linecap="round" fill="none" />'
              : '<path d="M84 69 Q87 73 90 69 Q93 73 96 69" stroke="#2D1B22" stroke-width="1.8" stroke-linecap="round" fill="none" />'
          }
          <g transform="translate(73, 84)">
            <rect x="0" y="0" width="34" height="44" rx="6" fill="#1E1B4B" stroke="#F9A8D4" stroke-width="1.6" />
            <rect x="3" y="4" width="28" height="35" rx="3.5" fill="#FFF1F2" />
            <rect x="6" y="9" width="18" height="5" rx="2.5" fill="#FDA4AF" />
            <rect x="10" y="17" width="18" height="5" rx="2.5" fill="#E11D48" />
            <rect x="6" y="25" width="14" height="5" rx="2.5" fill="#FBCFE8" />
          </g>
          <ellipse cx="71" cy="108" rx="9" ry="6.5" transform="rotate(-15 71 108)" fill="#FDBA74" />
          <ellipse cx="109" cy="108" rx="9" ry="6.5" transform="rotate(15 109 108)" fill="#FDBA74" />
        </svg>
      </div>
      <p class="cat-caption">${
        isSadMoving
          ? `Chú mèo đang buồn bã bước đi xa (${moveStep}/${MAX_NO_CLICKS})...`
          : 'Chú mèo nhỏ đang chăm chú đọc tin nhắn chờ hồi âm'
      }</p>
    </div>
  `;
}

// ==========================================
// 7. 3D Volumetric Particle Heart (5s beat -> 6s dissolve -> 10s reassemble)
// ==========================================
const HEART3D_CONTROLLER = {
  /** @type {number | null} */
  rafId: null,
  active: false,
};

function startHeart3D() {
  if (HEART3D_CONTROLLER.active) return;
  const canvas = el.heart3dCanvas;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  HEART3D_CONTROLLER.active = true;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const BEAT_MS = 5000;
  const DISSOLVE_MS = 6000;
  const REASSEMBLE_MS = 10000;
  const CYCLE_MS = BEAT_MS + DISSOLVE_MS + REASSEMBLE_MS;
  const COLORS = ['#FB7185', '#F43F5E', '#E11D48', '#F472B6', '#FDA4AF', '#FDE68A'];

  const particles = Array.from({ length: 1100 }, (_, i) => {
    const t = Math.random() * Math.PI * 2;
    const baseX = 16 * Math.pow(Math.sin(t), 3);
    const baseY = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    const shellBias = Math.pow(Math.random(), 0.38);
    const thickness = (1 - Math.abs(baseX) / 22) * 5.2 + 1.8;
    const zDepth = (Math.random() * 2 - 1) * thickness * (0.4 + 0.6 * Math.sin(Math.random() * Math.PI));

    const hx = baseX * shellBias * 7.2;
    const hy = (baseY - 1.5) * shellBias * 7.2;
    const hz = zDepth * 7.2;

    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 180 + Math.random() * 220;

    return {
      hx,
      hy,
      hz,
      sx: r * Math.sin(phi) * Math.cos(theta),
      sy: r * Math.sin(phi) * Math.sin(theta),
      sz: r * Math.cos(phi),
      size: 1.5 + Math.random() * 2.4,
      color: COLORS[i % COLORS.length],
      phaseOffset: Math.random() * Math.PI * 2,
    };
  });

  const updateSize = () => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  updateSize();
  window.addEventListener('resize', updateSize);

  const startTime = performance.now();
  let lastLabel = '';

  /** @param {number} now */
  const render = (now) => {
    if (!HEART3D_CONTROLLER.active) return;

    const rect = canvas.getBoundingClientRect();
    const w = rect.width || 320;
    const h = rect.height || 320;
    const cx = w / 2;
    const cy = h / 2;

    const elapsed = prefersReduced ? 0 : (now - startTime) % CYCLE_MS;
    let scatterMix = 0;
    let label = '';

    if (elapsed < BEAT_MS) {
      scatterMix = 0;
      const sec = Math.ceil((BEAT_MS - elapsed) / 1000);
      label = `Trái tim 3D đang đập (${sec}s)`;
    } else if (elapsed < BEAT_MS + DISSOLVE_MS) {
      const p = (elapsed - BEAT_MS) / DISSOLVE_MS;
      scatterMix = 1 - Math.pow(1 - p, 3);
      const sec = Math.ceil((BEAT_MS + DISSOLVE_MS - elapsed) / 1000);
      label = `Đang tan thành ngàn hạt sáng (${sec}s)`;
    } else {
      const p = (elapsed - BEAT_MS - DISSOLVE_MS) / REASSEMBLE_MS;
      const easeInOut = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      scatterMix = 1 - easeInOut;
      const sec = Math.ceil((CYCLE_MS - elapsed) / 1000);
      label = `Đang hợp lại thành trái tim (${sec}s)`;
    }

    if (label !== lastLabel) {
      lastLabel = label;
      el.heart3dPhaseLabel.textContent = label;
    }

    ctx.clearRect(0, 0, w, h);

    const beatWave = Math.sin(now * 0.0055);
    const secondary = Math.sin(now * 0.011) * 0.35;
    const beatFactor = 1 + (1 - scatterMix * 0.85) * 0.095 * Math.max(0, beatWave + secondary);

    const rotY = now * 0.00075;
    const rotX = Math.sin(now * 0.0005) * 0.16;
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);

    const scaleResp = Math.min(w, h) / 310;
    const fov = 420;

    const projected = [];
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

      const rx = mx * cosY - mz * sinY;
      const rz1 = mx * sinY + mz * cosY;
      const ry = my * cosX - rz1 * sinX;
      const rz = my * sinX + rz1 * cosX;

      const perspective = fov / (fov + rz + 120);
      const px = cx + rx * perspective * scaleResp;
      const py = cy + ry * perspective * scaleResp;

      const shimmer = 0.65 + 0.35 * Math.sin(now * 0.004 + pt.phaseOffset);
      const alpha = Math.max(0.18, Math.min(1, perspective * shimmer * (1 - scatterMix * 0.25)));

      projected.push({
        px,
        py,
        pz: rz,
        r: Math.max(0.9, pt.size * perspective * scaleResp),
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
      HEART3D_CONTROLLER.rafId = window.requestAnimationFrame(render);
    }
  };

  HEART3D_CONTROLLER.rafId = window.requestAnimationFrame(render);
}

function stopHeart3D() {
  HEART3D_CONTROLLER.active = false;
  if (HEART3D_CONTROLLER.rafId !== null) {
    window.cancelAnimationFrame(HEART3D_CONTROLLER.rafId);
    HEART3D_CONTROLLER.rafId = null;
  }
}

// ==========================================
// 8. Envelope & Typewriter Logic
// ==========================================
function clearLetterTimers() {
  state.letterTimers.forEach((id) => window.clearTimeout(id));
  state.letterTimers = [];
  if (state.typingTimer !== null) {
    window.clearTimeout(state.typingTimer);
    state.typingTimer = null;
  }
}

function renderTypedLetter() {
  const isDone = state.charCount >= fullLetterText.length;
  el.skipTypeBtn.classList.toggle('hidden', !state.typingStarted || isDone);
  el.letterContinueWrap.classList.toggle('hidden', !isDone);

  if (!state.typingStarted) {
    el.typewriterBody.innerHTML =
      '<p class="typing-placeholder">Trang thư đang mở ra dưới ánh trăng tròn...</p>';
    return;
  }

  const visibleText = fullLetterText.slice(0, state.charCount);
  const paragraphs = visibleText.split('\n\n');
  el.typewriterBody.innerHTML = '';

  paragraphs.forEach((pText, idx) => {
    const p = document.createElement('p');
    if (idx === LETTER_PARAGRAPHS.length - 1) {
      p.className = 'is-last-wish';
    }
    p.textContent = pText;
    if (idx === paragraphs.length - 1 && !isDone) {
      const caret = document.createElement('span');
      caret.className = 'typing-caret animate-cursor-blink';
      caret.setAttribute('aria-hidden', 'true');
      p.appendChild(caret);
    }
    el.typewriterBody.appendChild(p);
  });
}

function stepTypewriter() {
  if (!state.typingStarted || state.charCount >= fullLetterText.length) {
    renderTypedLetter();
    return;
  }

  const currentChar = fullLetterText[state.charCount];
  const delay =
    currentChar === '\n'
      ? 240
      : currentChar === '.' || currentChar === ',' || currentChar === '—'
        ? 95
        : 28;

  state.typingTimer = window.setTimeout(() => {
    if (state.charCount % 3 === 0 && currentChar !== ' ' && currentChar !== '\n') {
      audio.playTypewriterKey();
    }
    state.charCount += 1;
    renderTypedLetter();
    stepTypewriter();
  }, delay);
}

function openEnvelopeSequence() {
  clearLetterTimers();
  state.activeTrack = 'happy';
  audio.start('happy');
  state.musicOn = true;
  audio.playGentleTap();

  state.stage = 'LETTER';
  state.charCount = 0;
  state.typingStarted = false;

  el.sealedIntro.classList.add('hidden');
  el.openBtnWrap.classList.add('hidden');
  el.envelopeSealBtn.classList.add('hidden');
  el.envelopeOpenedPocket.classList.remove('hidden');
  el.envelopeBox.classList.remove('animate-envelope-bob');
  el.envelopeBox.classList.add('is-open');

  el.letterPaperWrap.classList.remove('is-closed', 'is-emerged');
  el.letterPaperWrap.classList.add('is-rising');
  renderTypedLetter();
  syncUI();

  state.letterTimers.push(
    window.setTimeout(() => {
      el.envelopeFlap.classList.add('is-unfolded');
    }, 120),
    window.setTimeout(() => {
      el.letterPaperWrap.classList.remove('is-rising');
      el.letterPaperWrap.classList.add('is-emerged');
    }, 880),
    window.setTimeout(() => {
      state.typingStarted = true;
      renderTypedLetter();
      stepTypewriter();
    }, 1950)
  );
}

// ==========================================
// 9. Wishes, Music Button, & Stage Sync
// ==========================================
function renderMusicButton() {
  const trackLabel = state.activeTrack === 'happy' ? 'Bài 1: Khúc trăng tròn' : 'Bài 2: Nhạc buồn';
  if (state.musicOn) {
    el.musicIcon.innerHTML = `<svg viewBox="0 0 24 24" class="icon-sm" style="color:#fda4af" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>`;
    el.musicLabel.textContent = `Tắt · ${trackLabel}`;
  } else {
    el.musicIcon.innerHTML = `<svg viewBox="0 0 24 24" class="icon-sm" style="color:rgba(254,205,211,0.75)" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="22" x2="16" y1="9" y2="15" />
      <line x1="16" x2="22" y1="9" y2="15" />
    </svg>`;
    el.musicLabel.textContent = `Bật · ${trackLabel}`;
  }
}

function renderWishes() {
  el.wishesGrid.innerHTML = '';
  COUPLE_WISHES.forEach((wish) => {
    const isOpen = Boolean(state.openedWishes[wish.id]);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'wish-card';
    btn.innerHTML = `
      <div class="wish-top">
        <span class="wish-title">${wish.title}</span>
        <span class="wish-status">${isOpen ? 'Đang mở' : 'Chạm để đọc'}</span>
      </div>
      <p class="wish-subtitle">${wish.subtitle}</p>
      ${isOpen ? `<p class="wish-body">${wish.body}</p>` : ''}
    `;
    btn.addEventListener('click', () => {
      audio.playGentleTap();
      state.openedWishes[wish.id] = !state.openedWishes[wish.id];
      renderWishes();
    });
    el.wishesGrid.appendChild(btn);
  });
}

function renderSadLines() {
  el.sadLines.innerHTML = '';
  SAD_CLOSING_LINES.forEach((line, idx) => {
    const p = document.createElement('p');
    if (idx === SAD_CLOSING_LINES.length - 1) {
      p.className = 'is-last-sad';
    }
    p.textContent = line;
    el.sadLines.appendChild(p);
  });
}

function updateQuestionView() {
  const step = NO_STEPS[Math.min(state.noCount, NO_STEPS.length - 1)];
  const yesScale = Math.min(1 + state.noCount * 0.03, 1.24);

  el.noCounterWrap.classList.toggle('hidden', state.noCount === 0);
  if (state.noCount > 0) {
    el.noCounterText.textContent = `Lần từ chối ${state.noCount}/${MAX_NO_CLICKS}`;
  }

  el.questionCatSlot.innerHTML = renderCatScene(
    state.noCount > 0 ? 'moving' : 'reading',
    state.noCount
  );
  el.questionSubline.textContent = step.subline;
  el.yesBtn.style.transform = `scale(${yesScale})`;
  el.yesBtnLabel.textContent = step.yesLabel;
  el.noBtnHeart.classList.toggle('hidden', state.noCount === 0);
  el.noBtnLabel.textContent = step.noLabel;
}

function syncUI() {
  // Nav highlight
  el.navLetter.classList.toggle('is-active', state.stage === 'SEALED' || state.stage === 'LETTER');
  el.navQuestion.classList.toggle('is-active', state.stage === 'QUESTION');
  el.navReply.classList.toggle('is-active', state.stage === 'ACCEPTED' || state.stage === 'SAD');

  // Stage panels
  const showEnvelope = state.stage === 'SEALED' || state.stage === 'LETTER';
  el.stageEnvelope.classList.toggle('hidden', !showEnvelope);
  el.stageQuestion.classList.toggle('hidden', state.stage !== 'QUESTION');
  el.stageSad.classList.toggle('hidden', state.stage !== 'SAD');
  el.stageAccepted.classList.toggle('hidden', state.stage !== 'ACCEPTED');

  // Sky & particles & flowers & hearts
  const skyMood =
    state.stage === 'SAD' ? 'sad' : state.stage === 'ACCEPTED' ? 'celebration' : 'romantic';
  state.particleMood =
    state.stage === 'SAD'
      ? 'sad'
      : state.stage === 'ACCEPTED'
        ? 'celebration'
        : state.stage === 'QUESTION' && state.noCount > 0
          ? 'heartbreak'
          : 'romantic';

  updateSkyMood(skyMood);
  renderAmbientFlowers(
    state.stage === 'SAD' ? 'none' : state.stage === 'ACCEPTED' ? 'rich' : 'gentle'
  );
  renderFloatingHearts(
    state.stage === 'SAD' ? 'none' : state.stage === 'ACCEPTED' ? 'abundant' : 'subtle'
  );
  setContinuousBrokenHearts(state.stage === 'SAD');
  renderMusicButton();

  if (state.stage === 'QUESTION') {
    updateQuestionView();
  }
  if (state.stage === 'SAD') {
    el.sadCatSlot.innerHTML = renderCatScene('bridgeCry');
  }
  if (state.stage === 'ACCEPTED') {
    el.celebrateCatSlot.innerHTML = renderCatScene('celebrate');
    startHeart3D();
  } else {
    stopHeart3D();
  }
}

function resetApp() {
  clearLetterTimers();
  stopHeart3D();
  audio.playGentleTap();
  state.activeTrack = 'happy';
  audio.setTrack('happy');
  state.stage = 'SEALED';
  state.noCount = 0;
  state.charCount = 0;
  state.typingStarted = false;

  el.sealedIntro.classList.remove('hidden');
  el.openBtnWrap.classList.remove('hidden');
  el.envelopeSealBtn.classList.remove('hidden');
  el.envelopeOpenedPocket.classList.add('hidden');
  el.envelopeFlap.classList.remove('is-unfolded');
  el.envelopeBox.classList.remove('is-open');
  el.envelopeBox.classList.add('animate-envelope-bob');

  el.letterPaperWrap.classList.remove('is-rising', 'is-emerged');
  el.letterPaperWrap.classList.add('is-closed');
  el.brokenHearts.innerHTML = '';
  renderTypedLetter();
  syncUI();
}

// ==========================================
// 10. Event Bindings & Bootstrap
// ==========================================
function bindEvents() {
  el.musicToggleBtn.addEventListener('click', () => {
    state.musicOn = audio.toggle();
    renderMusicButton();
  });

  el.envelopeSealBtn.addEventListener('click', openEnvelopeSequence);
  el.openLetterBtn.addEventListener('click', openEnvelopeSequence);

  el.skipTypeBtn.addEventListener('click', () => {
    if (state.typingTimer !== null) {
      window.clearTimeout(state.typingTimer);
      state.typingTimer = null;
    }
    state.charCount = fullLetterText.length;
    renderTypedLetter();
  });

  el.continueHeartBtn.addEventListener('click', () => {
    audio.playGentleTap();
    state.stage = 'QUESTION';
    syncUI();
  });

  el.noBtn.addEventListener('click', () => {
    const nextCount = state.noCount + 1;
    state.activeTrack = 'sad';
    audio.setTrack('sad');
    if (!audio.playing) {
      audio.start('sad');
      state.musicOn = true;
    }

    spawnBrokenHearts();

    if (nextCount >= MAX_NO_CLICKS) {
      audio.playSadChord();
      state.noCount = MAX_NO_CLICKS;
      state.stage = 'SAD';
      syncUI();
      return;
    }

    audio.playBrokenHeartDrop();
    state.noCount = nextCount;
    state.particleMood = 'heartbreak';
    updateQuestionView();
    renderMusicButton();
  });

  el.yesBtn.addEventListener('click', () => {
    state.activeTrack = 'happy';
    audio.setTrack('happy');
    if (!audio.playing) {
      audio.start('happy');
      state.musicOn = true;
    }
    audio.playCelebrationChime();
    el.brokenHearts.innerHTML = '';
    state.stage = 'ACCEPTED';
    syncUI();
    triggerHeartBurst();
  });

  el.moreHeartsBtn.addEventListener('click', () => {
    audio.playCelebrationChime();
    triggerHeartBurst();
  });

  el.sadResetBtn.addEventListener('click', resetApp);
  el.footerResetBtn.addEventListener('click', resetApp);
}

// Boot
initStarField();
initScreenParticles();
renderSadLines();
renderWishes();
bindEvents();
syncUI();
