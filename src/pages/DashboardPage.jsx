import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, ArrowRight, Award, AlertTriangle, ShieldCheck, Play, CheckCircle } from 'lucide-react';
import StreakCalendar from '../components/StreakCalendar';
import { getChallengeDays, TASKS_DETAIL } from '../data/mockData';

export default function DashboardPage({ student, triggerRecovery }) {
  const navigate = useNavigate();
  
  const currentDayNum = student.currentDay;
  const currentTask = TASKS_DETAIL[currentDayNum] || {
    title: `Coding Day Challenge #${currentDayNum}`,
    topic: 'Coding practice',
    difficulty: 'Medium',
    timeRequired: '1 hour'
  };

  const isMissedState = student.id === 'missedDay';
  const totalDays = 60;
  const completedCount = student.completedDays.length;
  const completionPercentage = Math.round((completedCount / totalDays) * 100);

  // SVG parameters for progress ring
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

  const handleStartCoding = () => {
    navigate(`/day/${currentDayNum}`);
  };

  return (
    <div className="dashboard-container">
      {/* Student Meta Details */}
      <div className="student-meta">
        <div className="student-info">
          <h2>Hey, {student.name}</h2>
          <p>{student.college} • {student.trackId === 'frontend' ? 'Frontend Track' : 'Coding Track'}</p>
        </div>
        <div className="streak-pulse-badge">
          <Flame size={16} className={student.streakCount > 0 ? 'text-orange animate-pulse' : 'text-dim'} />
          <span>{student.streakCount} Day Streak</span>
        </div>
      </div>

      {/* Missed Day Streak Alert */}
      {isMissedState && (
        <div className="recovery-alert">
          <div className="alert-header">
            <AlertTriangle size={18} className="animate-pulse" />
            <span>Streak Broken (Day 11 Missed)</span>
          </div>
          <p className="alert-desc">
            You missed submitting yesterday! You can restore your **10-day streak** by completing a Streak Recovery Quest on the Day 12 screen.
          </p>
          <button className="recovery-action-btn" onClick={handleStartCoding}>
            Recover Streak Now
          </button>
        </div>
      )}

      {/* Stats Overview Grid */}
      <div className="stats-circle-row">
        {/* Completion Ring Widget */}
        <div className="glass-card completion-widget">
          <div className="circle-progress-container">
            <svg width="90" height="90" viewBox="0 0 90 90">
              <circle 
                className="circle-bg" 
                cx="45" 
                cy="45" 
                r={radius} 
              />
              <circle 
                className="circle-progress" 
                cx="45" 
                cy="45" 
                r={radius} 
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 45 45)"
              />
            </svg>
            <div className="circle-text">{completionPercentage}%</div>
          </div>
          <span>Challenge Done</span>
        </div>

        {/* Streak Details Widget */}
        <div className="glass-card streak-details-widget">
          <div className="card-label">Personal Stats</div>
          <div>
            <div className="streak-big-num text-gradient-orange">{student.streakCount}d</div>
            <div className="streak-info-text">Current Hot Streak</div>
          </div>
          <div style={{ marginTop: '8px', borderTop: '1px solid var(--border-light)', paddingTop: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
              <span className="text-dim">Max Streak:</span>
              <span className="text-white font-bold">{student.maxStreak} days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Task Shortcut */}
      <div className={`glass-card today-task-card ${isMissedState ? 'missed-state' : ''}`}>
        <div className="today-task-header">
          <div className="card-label">Today's Focus</div>
          <span className="day-badge">Day {currentDayNum}</span>
        </div>
        <h3 className="today-task-title">{currentTask.title}</h3>
        <div className="today-task-meta">
          <span>{currentTask.topic}</span>
          <span>•</span>
          <span>{currentTask.difficulty}</span>
          <span>•</span>
          <span>{currentTask.timeRequired}</span>
        </div>
        
        {student.completedDays.includes(currentDayNum) ? (
          <div className="go-day-btn" style={{ color: 'var(--primary-emerald)', border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.05)' }}>
            <CheckCircle size={14} />
            <span>Today's Task Submitted</span>
          </div>
        ) : (
          <button className="go-day-btn" onClick={handleStartCoding}>
            <Play size={12} fill="currentColor" />
            <span>{isMissedState ? 'Recover & Start Coding' : 'Start Coding Day'}</span>
            <ArrowRight size={14} />
          </button>
        )}
      </div>

      {/* 60-Day Progress Grid */}
      <StreakCalendar student={student} getChallengeDays={getChallengeDays} />

      {/* Badges / Achievements Grid */}
      <div className="achievements-section">
        <h3 className="section-title">
          <Award size={16} className="text-purple" />
          <span>Achievements</span>
        </h3>
        <div className="achievements-grid">
          {student.achievements.map((ach) => {
            const isUnlocked = ach.unlocked;
            return (
              <div key={ach.id} className={`badge-card ${isUnlocked ? 'unlocked' : ''}`}>
                <div className="badge-icon-container">
                  <Award size={16} />
                </div>
                <div className="badge-name">{ach.title}</div>
                <div className="badge-desc">{ach.desc}</div>
                {isUnlocked && <div className="badge-date">{ach.date}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
