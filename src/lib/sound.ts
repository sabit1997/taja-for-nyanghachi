// 8비트 효과음 — 파일 없이 Web Audio 사각파로 합성한다.

let ctx: AudioContext | null = null;
let enabled = true;

export function setSoundEnabled(on: boolean) {
  enabled = on;
}

function audio(): AudioContext | null {
  if (!enabled) return null;
  try {
    ctx ??= new AudioContext();
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq: number, durationMs: number, opts: { type?: OscillatorType; volume?: number; delayMs?: number } = {}) {
  const ac = audio();
  if (!ac) return;
  const start = ac.currentTime + (opts.delayMs ?? 0) / 1000;
  const end = start + durationMs / 1000;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = opts.type ?? 'square';
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(opts.volume ?? 0.05, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, end);
  osc.connect(gain).connect(ac.destination);
  osc.start(start);
  osc.stop(end);
}

export const sound = {
  key: () => tone(1400 + Math.random() * 200, 18, { volume: 0.03 }),
  error: () => tone(110, 160, { type: 'sawtooth', volume: 0.06 }),
  move: () => tone(660, 30, { volume: 0.03 }),
  select: () => {
    tone(880, 40, { volume: 0.04 });
    tone(1320, 60, { volume: 0.04, delayMs: 40 });
  },
  fanfare: () => {
    const notes = [523, 659, 784, 1047, 784, 1047];
    const lengths = [90, 90, 90, 180, 90, 320];
    let at = 0;
    notes.forEach((freq, i) => {
      tone(freq, lengths[i], { volume: 0.05, delayMs: at });
      at += lengths[i] + 10;
    });
  },
};
