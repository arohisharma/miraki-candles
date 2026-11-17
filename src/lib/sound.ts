import { useSyncExternalStore } from "react";

/**
 * Opt-in ambient sound, synthesised with the Web Audio API so there are no audio files
 * to license or download. Nothing plays until the visitor turns sound on.
 *
 * - Fireplace: a low rumble, a soft hiss and randomly timed crackles and pops.
 * - Chime: a short two-note bell, played on add-to-bag while sound is on.
 */

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let noise: AudioBuffer | null = null;
let beds: AudioBufferSourceNode[] = [];
let crackleTimer: ReturnType<typeof setInterval> | null = null;
let on = false;
const listeners = new Set<() => void>();

function setup() {
  if (ctx) return;
  ctx = new AudioContext();
  master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);
  noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
}

function bed(type: BiquadFilterType, frequency: number, gain: number) {
  if (!ctx || !master || !noise) return;
  const src = ctx.createBufferSource();
  src.buffer = noise;
  src.loop = true;
  const filter = ctx.createBiquadFilter();
  filter.type = type;
  filter.frequency.value = frequency;
  const g = ctx.createGain();
  g.gain.value = gain;
  src.connect(filter).connect(g).connect(master);
  src.start();
  beds.push(src);
}

function crackle() {
  if (!ctx || !master || !noise) return;
  const pop = Math.random() < 0.12;
  const t = ctx.currentTime;
  const src = ctx.createBufferSource();
  src.buffer = noise;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = pop ? 500 + Math.random() * 400 : 1800 + Math.random() * 3500;
  filter.Q.value = pop ? 1.5 : 1 + Math.random() * 3;
  const g = ctx.createGain();
  const peak = pop ? 0.5 + Math.random() * 0.4 : 0.05 + Math.random() * 0.3;
  const length = pop ? 0.09 + Math.random() * 0.08 : 0.01 + Math.random() * 0.04;
  g.gain.setValueAtTime(peak, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + length);
  src.connect(filter).connect(g).connect(master);
  src.start(t, Math.random() * 1.5, length + 0.02);
}

export async function setSound(next: boolean) {
  if (next === on) return;
  on = next;
  listeners.forEach((l) => l());

  if (next) {
    setup();
    if (!ctx || !master) return;
    await ctx.resume();
    bed("lowpass", 320, 0.55); // rumble
    bed("highpass", 5000, 0.025); // hiss
    crackleTimer = setInterval(() => {
      if (Math.random() < 0.4) crackle();
    }, 55);
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(0.55, ctx.currentTime, 0.5);
  } else if (ctx && master) {
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(0, ctx.currentTime, 0.25);
    const old = beds;
    beds = [];
    if (crackleTimer) clearInterval(crackleTimer);
    crackleTimer = null;
    setTimeout(() => {
      old.forEach((s) => s.stop());
      if (!on) ctx?.suspend();
    }, 1200);
  }
}

/** A soft two-note bell. Only plays while sound is on. */
export function chime() {
  if (!on || !ctx) return;
  const t = ctx.currentTime;
  [1046.5, 1568].forEach((freq, i) => {
    const osc = ctx!.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    const g = ctx!.createGain();
    g.gain.setValueAtTime(0, t + i * 0.09);
    g.gain.linearRampToValueAtTime(0.12, t + i * 0.09 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.09 + 1.4);
    osc.connect(g).connect(ctx!.destination);
    osc.start(t + i * 0.09);
    osc.stop(t + i * 0.09 + 1.5);
  });
}

export function useSoundOn() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => on,
    () => false,
  );
}
