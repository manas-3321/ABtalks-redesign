import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, Coffee, Heart, CheckCircle } from 'lucide-react';

const WELLNESS_TIPS = [
  "Hydrate! Keep a water bottle next to your laptop. Coffee doesn't count.",
  "Stuck on a bug? Sleep on it. Your brain resolves logic while resting.",
  "Remember to blink. Every 20 minutes, look at something 20 feet away for 20 seconds.",
  "Relax your shoulders and unclench your jaw right now.",
  "You're building consistency, not just lines of code. Be proud of showing up tonight.",
  "Keep your phone in another room or face down to avoid midnight distractions.",
  "College lectures start early tomorrow. Set a hard stop time for tonight's session!"
];

export default function NightOwlConsole({ onClose }) {
  // Pomodoro State
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);

  // Audio State
  const [isLofiPlaying, setIsLofiPlaying] = useState(false);
  const [isRainPlaying, setIsRainPlaying] = useState(false);
  const lofiAudioRef = useRef(null);
  const rainAudioRef = useRef(null);

  // Wellness tip
  const [tipIndex, setTipIndex] = useState(0);

  // Load audio elements on mount
  useEffect(() => {
    // Standard royalty-free lofi synth and rain sound URLs
    lofiAudioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3');
    lofiAudioRef.current.loop = true;
    lofiAudioRef.current.volume = 0.4;

    rainAudioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3');
    rainAudioRef.current.loop = true;
    rainAudioRef.current.volume = 0.5;

    // Pick a random tip
    setTipIndex(Math.floor(Math.random() * WELLNESS_TIPS.length));

    return () => {
      // Clean up timer and audio on unmount
      if (timerRef.current) clearInterval(timerRef.current);
      if (lofiAudioRef.current) lofiAudioRef.current.pause();
      if (rainAudioRef.current) rainAudioRef.current.pause();
    };
  }, []);

  // Pomodoro Logic
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (seconds === 0) {
          if (minutes === 0) {
            // Timer complete
            setIsActive(false);
            clearInterval(timerRef.current);
            alert("Great work! Time for a short break.");
            setMinutes(25);
            setSeconds(0);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, minutes, seconds]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  // Audio Playback Toggles
  const toggleLofi = () => {
    if (isLofiPlaying) {
      lofiAudioRef.current.pause();
    } else {
      lofiAudioRef.current.play().catch(err => console.log("Audio play blocked by browser", err));
    }
    setIsLofiPlaying(!isLofiPlaying);
  };

  const toggleRain = () => {
    if (isRainPlaying) {
      rainAudioRef.current.pause();
    } else {
      rainAudioRef.current.play().catch(err => console.log("Audio play blocked by browser", err));
    }
    setIsRainPlaying(!isRainPlaying);
  };

  const nextTip = () => {
    setTipIndex((prev) => (prev + 1) % WELLNESS_TIPS.length);
  };

  return (
    <div className="night-owl-console">
      <div className="console-header">
        <div className="title-area">
          <span className="console-indicator animate-pulse"></span>
          <h3>Night Owl Space</h3>
        </div>
        <button className="console-close" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <div className="console-body">
        {/* Pomodoro Card */}
        <div className="console-card timer-card">
          <div className="card-label">Focus Pomodoro</div>
          <div className="timer-display">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="timer-controls">
            <button className={`timer-btn play-pause ${isActive ? 'active' : ''}`} onClick={toggleTimer}>
              {isActive ? <Pause size={16} /> : <Play size={16} />}
              <span>{isActive ? 'Pause' : 'Start'}</span>
            </button>
            <button className="timer-btn reset" onClick={resetTimer}>
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Ambient Sounds Card */}
        <div className="console-card audio-card">
          <div className="card-label">Ambient Audio</div>
          <div className="audio-row">
            <button 
              className={`audio-toggle ${isLofiPlaying ? 'active' : ''}`} 
              onClick={toggleLofi}
            >
              {isLofiPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <div className="audio-info">
                <span className="audio-title">Lofi Beats</span>
                <span className="audio-status">{isLofiPlaying ? 'Playing' : 'Off'}</span>
              </div>
              {isLofiPlaying && (
                <div className="eq-bars">
                  <span className="eq-bar bar1"></span>
                  <span className="eq-bar bar2"></span>
                  <span className="eq-bar bar3"></span>
                </div>
              )}
            </button>

            <button 
              className={`audio-toggle ${isRainPlaying ? 'active' : ''}`} 
              onClick={toggleRain}
            >
              {isRainPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <div className="audio-info">
                <span className="audio-title">Calming Rain</span>
                <span className="audio-status">{isRainPlaying ? 'Playing' : 'Off'}</span>
              </div>
              {isRainPlaying && (
                <div className="eq-bars">
                  <span className="eq-bar bar1"></span>
                  <span className="eq-bar bar2"></span>
                  <span className="eq-bar bar3"></span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Student Active Status */}
        <div className="live-coders-pill">
          <div className="green-ping"></div>
          <span><strong>428</strong> Indian students coding on ABTalks right now</span>
        </div>

        {/* Wellness Tip */}
        <div className="console-card tip-card">
          <div className="tip-header">
            <div className="tip-title">
              <Coffee size={14} className="text-purple" />
              <span>Midnight Health Tip</span>
            </div>
            <button className="tip-next" onClick={nextTip}>Next</button>
          </div>
          <p className="tip-text">"{WELLNESS_TIPS[tipIndex]}"</p>
        </div>
      </div>
    </div>
  );
}
