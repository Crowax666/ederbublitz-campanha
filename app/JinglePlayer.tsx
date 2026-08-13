"use client";

import { useRef, useState, type CSSProperties } from "react";

function PlayerIcon({ playing }: { playing: boolean }) {
  return playing
    ? <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1.5" /></svg>
    : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 7 8 5-8 5Z" /></svg>;
}

export default function JinglePlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const progress = duration ? `${Math.min(100, (current / duration) * 100)}%` : "0%";

  async function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        setAudioError(false);
        setLoading(true);
        await audio.play();
      } catch {
        setAudioError(true);
        setPlaying(false);
      } finally {
        setLoading(false);
      }
    }
    else {
      audio.pause();
      audio.currentTime = 0;
      setCurrent(0);
    }
  }

  return <aside className={`jinglePlayer${playing ? " isPlaying" : ""}`} aria-label="Jingle oficial da campanha">
    <button className="jingleTrigger" type="button" onClick={toggle} aria-label={playing ? "Parar jingle" : "Tocar jingle"}>
      <span className="jingleRoundButton"><PlayerIcon playing={playing} /></span>
      <span className="jingleTriggerText"><small>Jingle oficial</small><strong>{audioError ? "Tente novamente" : playing ? "Tocando agora" : loading ? "Preparando..." : "Ouça o 1020"}</strong></span>
      <span className="jingleBars" aria-hidden="true"><i /><i /><i /></span>
    </button>
    <input
      className="jingleHeaderProgress"
      style={{ "--jingle-progress": progress } as CSSProperties}
      type="range"
      min="0"
      max={duration || 0}
      step="0.1"
      value={Math.min(current, duration || 0)}
      aria-label="Posição do jingle"
      onChange={(event) => {
        const value = Number(event.target.value);
        if (audioRef.current) audioRef.current.currentTime = value;
        setCurrent(value);
      }}
    />
    <audio
      ref={audioRef}
      preload="auto"
      playsInline
      src="/jingle-eder-1020-integral-80k.mp3"
      onCanPlay={() => setAudioError(false)}
      onError={() => { setAudioError(true); setPlaying(false); setLoading(false); }}
      onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
      onTimeUpdate={(event) => setCurrent(event.currentTarget.currentTime)}
      onPlay={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      onEnded={() => { setPlaying(false); setCurrent(0); }}
    />
  </aside>;
}
