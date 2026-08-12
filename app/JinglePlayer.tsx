"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

function PlayIcon({ paused }: { paused: boolean }) {
  return paused ? (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7v10M15 7v10" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 7 8 5-8 5Z" /></svg>
  );
}

export default function JinglePlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const progress = duration ? `${(current / duration) * 100}%` : "0%";

  useEffect(() => {
    const escape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", escape);
    return () => {
      window.removeEventListener("keydown", escape);
      if (collapseTimer.current) clearTimeout(collapseTimer.current);
    };
  }, []);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      await audio.play();
      if (window.matchMedia("(max-width: 760px)").matches) {
        collapseTimer.current = setTimeout(() => setOpen(false), 900);
      }
    } else {
      audio.pause();
    }
  }

  return (
    <aside className={`jinglePlayer${open ? " isOpen" : ""}${playing ? " isPlaying" : ""}`} aria-label="Jingle oficial da campanha">
      {!open ? (
        <button className="jingleTrigger" type="button" onClick={() => setOpen(true)} aria-label="Abrir player do jingle">
          <span className="jingleRoundButton"><PlayIcon paused={playing} /></span>
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
              <button className="jinglePlay" type="button" onClick={toggle} aria-label={playing ? "Pausar jingle" : "Tocar jingle"}><PlayIcon paused={playing} /></button>
              <div className="jingleTrack"><input style={{ "--jingle-progress": progress } as CSSProperties} type="range" min="0" max={duration || 0} step="0.1" value={Math.min(current, duration || 0)} aria-label="Posição do jingle" onChange={(event) => { const next=Number(event.target.value); if(audioRef.current) audioRef.current.currentTime=next; setCurrent(next); }} /></div>
            </div>
          </div>
          <img className="jinglePortrait" src="/eder-jingle-thumb.jpg" alt="Eder Bublitz sorrindo" />
        </div>
      )}
      <audio ref={audioRef} src="/jingle-eder-1020.mp3" preload="metadata" onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => { setPlaying(false); setCurrent(0); }} />
    </aside>
  );
}
