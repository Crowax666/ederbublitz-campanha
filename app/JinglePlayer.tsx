"use client";

import { useEffect, useRef, useState } from "react";

function formatTime(value: number) {
  if (!Number.isFinite(value)) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function JinglePlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePlayer();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const closePlayer = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
    setIsOpen(false);
  };

  return (
    <aside className={`jinglePlayer${isOpen ? " isOpen" : ""}`} aria-label="Jingle oficial da campanha">
      {!isOpen ? (
        <button className="jingleTrigger" type="button" onClick={() => setIsOpen(true)} aria-label="Abrir player do jingle 1020">
          <span className="jingleTriggerIcon" aria-hidden="true">♪</span>
          <span><small>Jingle oficial</small>Ouça o jingle 1020</span>
        </button>
      ) : (
        <div className="jinglePanel">
          <div className="jinglePanelTop">
            <button className="jinglePlay" type="button" onClick={togglePlayback} aria-label={isPlaying ? "Pausar jingle" : "Reproduzir jingle"}>
              <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
            </button>
            <span className="jingleTitle"><small>Jingle oficial</small><strong>Eder Bublitz 1020</strong></span>
            <button className="jingleClose" type="button" onClick={closePlayer} aria-label="Fechar player">×</button>
          </div>
          <div className="jingleTimeline">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={Math.min(currentTime, duration || 0)}
              aria-label="Posição do jingle"
              onChange={(event) => {
                const nextTime = Number(event.target.value);
                if (audioRef.current) audioRef.current.currentTime = nextTime;
                setCurrentTime(nextTime);
              }}
            />
            <span>{formatTime(duration)}</span>
          </div>
          <audio
            ref={audioRef}
            src="/jingle-eder-1020.mp3"
            preload="metadata"
            onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
            onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
            onEnded={() => setIsPlaying(false)}
          />
        </div>
      )}
    </aside>
  );
}
