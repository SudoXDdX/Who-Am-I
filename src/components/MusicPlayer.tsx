"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  spotify?: string;
  color: string;
  duration?: number;
}

const PLAYLIST: Track[] = [
  {
    id: "tesouro-nacional",
    title: "Tesouro Nacional",
    artist: "A L U A D O",
    src: "/music/tesouro-nacional.mp3",
    spotify: "https://open.spotify.com/embed/track/6frm1EDS067QBmlb7hIMt7?utm_source=generator&theme=0",
    color: "#f94aab",
  },
  {
    id: "that-girl",
    title: "that girl a stalker",
    artist: "overtonight",
    src: "/music/that-girl-a-stalker.mp3",
    spotify: "https://open.spotify.com/embed/track/3IWuc0GVwKFsSulgqt3Qth?utm_source=generator&theme=0",
    color: "#4e8ff8",
  },
];

function formatTime(s: number): string {
  if (!s || !isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function MusicPlayer({ locale }: { locale: "pt" | "en" }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showSpotify, setShowSpotify] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [repeat, setRepeat] = useState<false | 1 | 2>(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  const track = PLAYLIST[trackIdx];
  const trackColor = track.color;

  useEffect(() => {
    function tick() {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
        setProgress(audioRef.current.duration ? (audioRef.current.currentTime / audioRef.current.duration) * 100 : 0);
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = track.src;
    audio.load();
    setProgress(0);
    setCurrentTime(0);
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    }
  }, [trackIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [playing]);

  const seekTo = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressRef.current;
    const audio = audioRef.current;
    if (!bar || !audio || !audio.duration) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = pct * audio.duration;
  }, []);

  const nextTrack = useCallback(() => {
    setTrackIdx((i) => {
      if (shuffled) {
        let next: number;
        do { next = Math.floor(Math.random() * PLAYLIST.length); } while (next === i && PLAYLIST.length > 1);
        return next;
      }
      return (i + 1) % PLAYLIST.length;
    });
  }, [shuffled]);

  const prevTrack = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    setTrackIdx((i) => {
      if (shuffled) {
        let next: number;
        do { next = Math.floor(Math.random() * PLAYLIST.length); } while (next === i && PLAYLIST.length > 1);
        return next;
      }
      return (i - 1 + PLAYLIST.length) % PLAYLIST.length;
    });
  }, [shuffled]);

  const toggleShuffle = useCallback(() => setShuffled((s) => !s), []);
  const toggleRepeat = useCallback(() => setRepeat((r) => (r === false ? 1 : r === 1 ? 2 : false)), []);

  const changeVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        preload="metadata"
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
        onEnded={() => {
          if (repeat === 2) {
            if (audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.play(); }
          } else if (repeat === 1 || trackIdx < PLAYLIST.length - 1) {
            nextTrack();
          } else {
            setPlaying(false);
          }
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <div
        className={`music-player ${expanded ? "expanded" : ""} ${playing ? "is-playing" : ""}`}
        style={{ "--track-color": trackColor } as React.CSSProperties}
      >
        <div className="music-player-glow" aria-hidden="true" />

        <button
          className="music-expand-btn"
          onClick={() => setExpanded((e) => !e)}
          aria-label={expanded ? (locale === "pt" ? "Minimizar player" : "Minimize player") : (locale === "pt" ? "Expandir player" : "Expand player")}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
            {expanded ? "expand_more" : "expand_less"}
          </span>
        </button>

        <div className="music-player-main">
          <div className="music-track-info">
            <div className="music-cover" style={{ background: `linear-gradient(135deg, ${trackColor}40, ${trackColor}15)` }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24, color: trackColor }}>
                {playing ? "equalizer" : "music_note"}
              </span>
              {playing && <div className="music-cover-bars" aria-hidden="true"><span /><span /><span /><span /></div>}
            </div>
            <div className="music-track-text">
              <p className="music-track-title">{track.title}</p>
              <p className="music-track-artist">{track.artist}</p>
            </div>
          </div>

          <div className="music-center">
            <div className="music-controls">
              <button onClick={toggleShuffle} className={`music-ctrl-btn ${shuffled ? "active" : ""}`} aria-label="Shuffle">
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>shuffle</span>
              </button>
              <button onClick={prevTrack} className="music-ctrl-btn" aria-label="Previous">
                <span className="material-symbols-outlined" style={{ fontSize: 22 }}>skip_previous</span>
              </button>
              <button onClick={togglePlay} className="music-play-btn" aria-label={playing ? "Pause" : "Play"}>
                <span className="material-symbols-outlined" style={{ fontSize: 28 }}>
                  {playing ? "pause" : "play_arrow"}
                </span>
              </button>
              <button onClick={nextTrack} className="music-ctrl-btn" aria-label="Next">
                <span className="material-symbols-outlined" style={{ fontSize: 22 }}>skip_next</span>
              </button>
              <button onClick={toggleRepeat} className={`music-ctrl-btn ${repeat ? "active" : ""}`} aria-label="Repeat">
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                  {repeat === 2 ? "repeat_one" : "repeat"}
                </span>
              </button>
            </div>

            <div className="music-progress-row">
              <span className="music-time">{formatTime(currentTime)}</span>
              <div
                ref={progressRef}
                className="music-progress-bar"
                onClick={seekTo}
                role="slider"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
                tabIndex={0}
              >
                <div className="music-progress-fill" style={{ width: `${progress}%` }}>
                  <div className="music-progress-thumb" />
                </div>
              </div>
              <span className="music-time">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="music-right">
            <button
              onClick={() => setShowPlaylist((p) => !p)}
              className={`music-ctrl-btn ${showPlaylist ? "active" : ""}`}
              aria-label="Playlist"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>queue_music</span>
            </button>
            <button
              onClick={() => setShowSpotify((s) => !s)}
              className={`music-ctrl-btn ${showSpotify ? "active" : ""}`}
              aria-label="Spotify"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>brand_awareness</span>
            </button>
            <div className="music-volume">
              <button
                onClick={() => {
                  const audio = audioRef.current;
                  if (!audio) return;
                  if (volume > 0) {
                    setVolume(0);
                    audio.volume = 0;
                  } else {
                    setVolume(0.7);
                    audio.volume = 0.7;
                  }
                }}
                className="music-ctrl-btn"
                aria-label="Volume"
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                  {volume === 0 ? "volume_off" : volume < 0.5 ? "volume_down" : "volume_up"}
                </span>
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={changeVolume}
                className="music-volume-slider"
                aria-label="Volume"
              />
            </div>
          </div>
        </div>

        {expanded && (
          <div className="music-panels">
            {showPlaylist && (
              <div className="music-panel">
                <p className="music-panel-title">{locale === "pt" ? "Playlist" : "Playlist"}</p>
                <div className="music-playlist">
                  {PLAYLIST.map((t, i) => (
                    <button
                      key={t.id}
                      onClick={() => { setTrackIdx(i); if (!playing) togglePlay(); }}
                      className={`music-playlist-item ${i === trackIdx ? "active" : ""}`}
                    >
                      <div className="music-playlist-cover" style={{ background: `linear-gradient(135deg, ${t.color}40, ${t.color}10)` }}>
                        {i === trackIdx && playing ? (
                          <div className="music-mini-bars" aria-hidden="true"><span /><span /><span /></div>
                        ) : (
                          <span className="material-symbols-outlined" style={{ fontSize: 16, color: t.color }}>music_note</span>
                        )}
                      </div>
                      <div className="music-playlist-text">
                        <p className="music-playlist-name">{t.title}</p>
                        <p className="music-playlist-artist">{t.artist}</p>
                      </div>
                      {i === trackIdx && <span className="music-now-playing">{locale === "pt" ? "Tocando" : "Playing"}</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {showSpotify && track.spotify && (
              <div className="music-panel">
                <p className="music-panel-title">Spotify</p>
                <div className="music-spotify-embed">
                  <iframe
                    src={track.spotify}
                    width="100%"
                    height={152}
                    style={{ borderRadius: 12 }}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
