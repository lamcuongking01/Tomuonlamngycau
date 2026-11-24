// Dual-track Web Audio API synthesizer:
// Track 1 ('happy'): Romantic bright music-box melody (start + accepted celebration)
// Track 2 ('sad'): Slow melancholic minor piano ballad (when clicking No / sad ending)

export type MusicTrack = 'happy' | 'sad';

interface NoteStep {
  freq: number;
  duration: number;
  bass?: number;
}

// Track 1: Warm hopeful F-major romantic waltz
const HAPPY_TRACK: NoteStep[] = [
  { freq: 349.23, duration: 0.55, bass: 174.61 }, // F4
  { freq: 440.0, duration: 0.55 },                // A4
  { freq: 523.25, duration: 0.85 },               // C5
  { freq: 587.33, duration: 0.55, bass: 146.83 }, // D5
  { freq: 523.25, duration: 0.55 },               // C5
  { freq: 440.0, duration: 0.85 },                // A4

  { freq: 392.0, duration: 0.55, bass: 116.54 },  // G4
  { freq: 466.16, duration: 0.55 },               // Bb4
  { freq: 587.33, duration: 0.85 },               // D5
  { freq: 523.25, duration: 0.55, bass: 130.81 }, // C5
  { freq: 466.16, duration: 0.55 },               // Bb4
  { freq: 440.0, duration: 0.85 },                // A4

  { freq: 349.23, duration: 0.55, bass: 174.61 }, // F4
  { freq: 523.25, duration: 0.55 },               // C5
  { freq: 659.25, duration: 0.85 },               // E5
  { freq: 587.33, duration: 0.55, bass: 146.83 }, // D5
  { freq: 523.25, duration: 0.55 },               // C5
  { freq: 440.0, duration: 0.85 },                // A4

  { freq: 392.0, duration: 0.55, bass: 116.54 },  // G4
  { freq: 440.0, duration: 0.55, bass: 130.81 },  // A4
  { freq: 466.16, duration: 0.55 },               // Bb4
  { freq: 523.25, duration: 1.15, bass: 174.61 }, // C5
];

// Track 2: Gentle melancholic A-minor sad rain ballad
const SAD_TRACK: NoteStep[] = [
  { freq: 440.0, duration: 0.85, bass: 110.0 },   // A4 (Am)
  { freq: 392.0, duration: 0.75 },                // G4
  { freq: 329.63, duration: 1.25 },               // E4
  { freq: 349.23, duration: 0.85, bass: 87.31 },  // F4 (F)
  { freq: 329.63, duration: 0.75 },               // E4
  { freq: 293.66, duration: 1.25 },               // D4

  { freq: 261.63, duration: 0.85, bass: 130.81 }, // C4 (C)
  { freq: 293.66, duration: 0.75 },               // D4
  { freq: 329.63, duration: 1.25, bass: 98.0 },   // E4 (G)
  { freq: 293.66, duration: 0.85, bass: 146.83 }, // D4 (Dm)
  { freq: 261.63, duration: 0.75 },               // C4
  { freq: 246.94, duration: 1.35, bass: 82.41 },  // B3 (E7)

  { freq: 329.63, duration: 0.85, bass: 110.0 },  // E4 (Am)
  { freq: 293.66, duration: 0.8 },                // D4
  { freq: 261.63, duration: 0.8 },                // C4
  { freq: 220.0, duration: 1.65, bass: 110.0 },   // A3
];

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private playing = false;
  private timerId: number | null = null;
  private noteIndex = 0;
  private track: MusicTrack = 'happy';

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  private playTone(
    freq: number,
    duration: number,
    volume: number,
    type: OscillatorType = 'sine',
    withHarmonic = true
  ): void {
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

  private scheduleNext = (): void => {
    if (!this.playing) return;

    const sequence = this.track === 'happy' ? HAPPY_TRACK : SAD_TRACK;
    const step = sequence[this.noteIndex % sequence.length];

    if (this.track === 'happy') {
      this.playTone(step.freq, step.duration * 1.15, 0.045, 'sine', true);
      if (step.bass) {
        this.playTone(step.bass, 1.5, 0.022, 'triangle', false);
      }
    } else {
      // Softer, warmer low-pass feel for sad ballad
      this.playTone(step.freq, step.duration * 1.25, 0.042, 'sine', false);
      if (step.bass) {
        this.playTone(step.bass, 1.9, 0.025, 'sine', false);
      }
    }

    this.noteIndex = (this.noteIndex + 1) % sequence.length;
    this.timerId = window.setTimeout(this.scheduleNext, step.duration * 1000);
  };

  public setTrack(nextTrack: MusicTrack): void {
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

  public getTrack(): MusicTrack {
    return this.track;
  }

  public start(track?: MusicTrack): void {
    if (track) {
      this.track = track;
    }
    const ctx = this.ensureContext();
    if (!ctx) return;
    if (this.playing) return;
    this.playing = true;
    this.scheduleNext();
  }

  public stop(): void {
    this.playing = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.playing) {
      this.stop();
      return false;
    }
    this.start();
    return true;
  }

  public isPlaying(): boolean {
    return this.playing;
  }

  public playTypewriterKey(): void {
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

  public playGentleTap(): void {
    this.playTone(659.25, 0.2, 0.042, 'sine');
  }

  public playBrokenHeartDrop(): void {
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

  public playSadChord(): void {
    const notes = [440.0, 329.63, 261.63];
    notes.forEach((freq, idx) => {
      window.setTimeout(() => {
        this.playTone(freq, 1.3, 0.045, 'sine', false);
      }, idx * 200);
    });
  }

  public playCelebrationChime(): void {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      window.setTimeout(() => {
        this.playTone(freq, 0.75, 0.058, 'sine');
      }, idx * 110);
    });
  }
}

export const romanticAudio = new RomanticAudioEngine();
