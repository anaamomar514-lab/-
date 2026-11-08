import { useCallback, useRef, useState } from "react";

type Cue = "tap" | "soft";

export function useSoundEffects() {
  const [enabled, setEnabled] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const contextRef = useRef<AudioContext | null>(null);

  const getContext = useCallback(() => {
    if (typeof window === "undefined" || !window.AudioContext) return null;
    if (!contextRef.current || contextRef.current.state === "closed") {
      contextRef.current = new AudioContext();
    }
    return contextRef.current;
  }, []);

  const toggleEnabled = useCallback(() => {
    setEnabled((current) => {
      const next = !current;
      if (next) {
        const context = getContext();
        if (context?.state === "suspended") void context.resume().catch(() => undefined);
      }
      return next;
    });
  }, [getContext]);

  const playCue = useCallback(
    (cue: Cue = "tap") => {
      if (!enabled || volume <= 0) return;
      const context = getContext();
      if (!context) return;
      if (context.state === "suspended") void context.resume().catch(() => undefined);

      const now = context.currentTime;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const startFrequency = cue === "soft" ? 540 : 680;
      const endFrequency = cue === "soft" ? 720 : 510;
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(startFrequency, now);
      oscillator.frequency.exponentialRampToValueAtTime(endFrequency, now + 0.12);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(Math.max(0.0001, volume * 0.055), now + 0.018);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.19);
    },
    [enabled, getContext, volume],
  );

  return { enabled, volume, setVolume, toggleEnabled, playCue };
}
