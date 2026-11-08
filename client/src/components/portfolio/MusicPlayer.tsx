import { useEffect, useRef, useState } from "react";
import { Music2, Pause, Play } from "lucide-react";

interface MusicPlayerProps {
  src: string;
}

export function MusicPlayer({ src }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.18);
  const [playbackError, setPlaybackError] = useState(false);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => () => audioRef.current?.pause(), []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || !src) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaybackError(false);
      setPlaying(true);
    } catch {
      setPlaybackError(true);
      setPlaying(false);
    }
  };

  return (
    <div className="music-control" role="group" aria-label="موسيقى الخلفية الاختيارية">
      <audio
        ref={audioRef}
        className="music-audio"
        src={src || undefined}
        preload="none"
        loop
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setPlaybackError(true)}
      />
      <button
        type="button"
        className={`music-toggle${playing ? " music-on" : ""}`}
        onClick={togglePlayback}
        aria-pressed={playing}
        aria-label={playing ? "إيقاف الموسيقى الهادئة" : "تشغيل الموسيقى الهادئة"}
        title={playing ? "إيقاف الموسيقى الهادئة" : "تشغيل الموسيقى الهادئة"}
        disabled={!src}
      >
        {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
        <Music2 size={15} aria-hidden="true" />
        <span>{playing ? "إيقاف الموسيقى" : "موسيقى هادئة"}</span>
      </button>
      {playing ? (
        <input
          aria-label="مستوى صوت الموسيقى الخلفية"
          className="music-volume"
          type="range"
          min="0"
          max="0.6"
          step="0.02"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
        />
      ) : null}
      {playbackError ? <span className="music-error" role="status">تعذّر تشغيل الموسيقى</span> : null}
    </div>
  );
}
