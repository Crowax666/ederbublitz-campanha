"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

function PlayerIcon({ playing }: { playing: boolean }) {
  return playing ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7v10M15 7v10" /></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 7 8 5-8 5Z" /></svg>;
}

export default function JinglePlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);
  const progress = duration > 0 ? `${Math.min(100, (current / duration) * 100)}%` : "0%";

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    setError(false);
    try {
      if (audio.paused) {
        await audio.play();
        if (window.matchMedia("(max-width: 760px)").matches) timerRef.current = setTimeout(() => setOpen(false), 1200);
      } else {
        audio.pause();
      }
    } catch {
      setError(true);
    }
  }

  return (
    <aside className={`jinglePlayer${open ? " isOpen" : ""}${playing ? " isPlaying" : ""}`} aria-label="Jingle oficial da campanha">
      {!open ? (
        <button className="jingleTrigger" type="button" onClick={() => setOpen(true)} aria-label="Abrir o player do jingle">
          <span className="jingleRoundButton"><PlayerIcon playing={playing} /></span>
          <span className="jingleTriggerText"><small>Jingle oficial</small><strong>{playing ? "Tocando agora" : "Ouça o 1020"}</strong></span>
          <span className="jingleBars" aria-hidden="true"><i /><i /><i /></span>
        </button>
      ) : (
        <div className="jinglePanel">
          <div className="jinglePanelContent">
            <div className="jingleIdentity">
              <span className="jingleTitle"><small>Jingle oficial da campanha</small><strong>Eder Bublitz <b>1020</b></strong></span>
              <button className="jingleClose" type="button" onClick={() => setOpen(false)} aria-label="Minimizar player">−</button>
            </div>
            <div className="jingleControls">
              <button className="jinglePlay" type="button" onClick={togglePlayback} aria-label={playing ? "Pausar jingle" : "Tocar jingle"}><PlayerIcon playing={playing} /></button>
              <div className="jingleTrack"><input style={{ "--jingle-progress": progress } as CSSProperties} type="range" min="0" max={duration || 0} step="0.1" value={Math.min(current, duration || 0)} aria-label="Posição do jingle" onChange={(event) => { const next = Number(event.target.value); if (audioRef.current) audioRef.current.currentTime = next; setCurrent(next); }} /></div>
            </div>
            {error && <p className="jingleError">Toque novamente para carregar o áudio.</p>}
          </div>
          <div className="jingleArtwork">
            <img className="jinglePortrait" src="/eder-jingle-thumb.jpg" alt="Eder Bublitz sorrindo" />
            <img className="jingleArtworkLogo" src="/brand-lockup-1-navy.png" alt="1020 Eder Bublitz" />
          </div>
        </div>
      )}
      <audio ref={audioRef} preload="metadata" playsInline onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onDurationChange={(e) => setDuration(e.currentTarget.duration)} onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => { setPlaying(false); setCurrent(0); }} onError={() => setError(true)}>
        <source src="/jingle-eder-1020-v2.mp3" type="audio/mpeg" />
      </audio>
    </aside>
  );
}
