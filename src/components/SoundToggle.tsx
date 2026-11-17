"use client";

import { setSound, useSoundOn } from "@/lib/sound";

/** Opt-in fireplace ambience. Shows four little bars that dance while sound is on. */
export default function SoundToggle({ className = "" }: { className?: string }) {
  const on = useSoundOn();

  return (
    <button
      type="button"
      onClick={() => setSound(!on)}
      aria-pressed={on}
      aria-label={on ? "Turn fireplace sound off" : "Turn fireplace sound on"}
      className={`group inline-flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.2em] ${className}`}
    >
      <span className="flex h-3.5 items-end gap-[3px]" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`w-[2px] rounded-full bg-current ${on ? "sound-bar" : "h-[3px]"}`}
            style={on ? { animationDelay: `${i * -0.23}s` } : undefined}
          />
        ))}
      </span>
      <span className="link link-quiet">{on ? "Sound on" : "Sound off"}</span>
    </button>
  );
}
