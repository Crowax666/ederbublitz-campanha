"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

function PlayerIcon({ playing }: { playing: boolean }) {
  return playing ? <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7.5" y="7.5" width="9" height="9" rx="1" /></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 7 8 5-8 5Z" /></svg>;
}

export default function JinglePlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const progress = duration ? `${Math.min(100, (current / duration) * 100)}%` : "0%";

  useEffect(() => {
    if (!open) return;
    const collapse = () => setOpen(false);
    window.addEventListener("scroll", collapse, { passive:true, once:true });
    return () => window.removeEventListener("scroll", collapse);
  }, [open]);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      await audio.play();
      if (window.matchMedia("(max-width:760px)").matches) {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setOpen(false), 1200);
      }
    } else {
      audio.pause();
      audio.currentTime = 0;
      setCurrent(0);
    }
  }

  return <aside className={`jinglePlayer${open ? " isOpen" : ""}${playing ? " isPlaying" : ""}`} aria-label="Jingle oficial da campanha">
    {!open ? <button className="jingleTrigger" type="button" onClick={() => setOpen(true)} aria-label="Abrir player do jingle">
      <span className="jingleRoundButton"><PlayerIcon playing={playing} /></span>
      <span className="jingleTriggerText"><small>Jingle oficial</small><strong>{playing ? "Tocando agora" : "Ouça o 1020"}</strong></span>
      <span className="jingleBars" aria-hidden="true"><i /><i /><i /></span>
    </button> : <div className="jinglePanel">
      <div className="jinglePanelContent">
        <div className="jingleIdentity"><span className="jingleTitle"><small>Jingle oficial da campanha</small><strong>Eder Bublitz <b>1020</b></strong></span><button className="jingleClose" type="button" onClick={() => setOpen(false)} aria-label="Minimizar">−</button></div>
        <div className="jingleControls"><button className="jinglePlay" type="button" onClick={toggle} aria-label={playing ? "Pausar jingle" : "Tocar jingle"}><PlayerIcon playing={playing} /></button><div className="jingleTrack"><input style={{ "--jingle-progress": progress } as CSSProperties} type="range" min="0" max={duration || 0} step="0.1" value={Math.min(current,duration || 0)} aria-label="Posição do jingle" onChange={(e) => { const value=Number(e.target.value); if(audioRef.current) audioRef.current.currentTime=value; setCurrent(value); }} /></div></div>
      </div>
      <div className="jingleArtwork"><img className="jinglePortrait" src="/eder-jingle-thumb.jpg" alt="Eder Bublitz sorrindo" /><img className="jingleArtworkLogo" src="/brand-lockup-1-navy.png" alt="1020 Eder Bublitz" /></div>
    </div>}
    <audio ref={audioRef} preload="metadata" playsInline src="/jingle-eder-1020-v3.mp3" onLoadedMetadata={(e)=>setDuration(e.currentTarget.duration)} onTimeUpdate={(e)=>setCurrent(e.currentTarget.currentTime)} onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onEnded={()=>{setPlaying(false);setCurrent(0);}} />
  </aside>;
}
