import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Flame, AlertCircle } from 'lucide-react';

export default function StreakCalendar({ student, getChallengeDays }) {
  const navigate = useNavigate();
  const days = getChallengeDays();

  const handleDayClick = (dayNum) => {
    // Only allow clicking days up to currentDay
    if (dayNum <= student.currentDay) {
      navigate(`/day/${dayNum}`);
    }
  };

  return (
    <div className="streak-calendar-card">
      <div className="calendar-header">
        <div className="calendar-title">
          <Flame size={18} className="text-orange" />
          <h4>60-Day Progress Grid</h4>
        </div>
        <div className="calendar-legend">
          <div className="legend-item"><span className="dot dot-completed"></span><span>Done</span></div>
          <div className="legend-item"><span className="dot dot-missed"></span><span>Missed</span></div>
          <div className="legend-item"><span className="dot dot-current"></span><span>Active</span></div>
          <div className="legend-item"><span className="dot dot-locked"></span><span>Locked</span></div>
        </div>
      </div>

      <div className="calendar-grid">
        {days.map((d) => {
          const isCompleted = student.completedDays.includes(d.day);
          const isCurrent = d.day === student.currentDay;
          const isMissed = d.day < student.currentDay && !isCompleted;
          const isLocked = d.day > student.currentDay;

          let statusClass = 'locked';
          if (isCompleted) statusClass = 'completed';
          else if (isCurrent) statusClass = 'current';
          else if (isMissed) statusClass = 'missed';

          return (
            <button
              key={d.day}
              className={`grid-day-cell ${statusClass}`}
              onClick={() => handleDayClick(d.day)}
              disabled={isLocked}
              title={`Day ${d.day}: ${d.title} (${statusClass.toUpperCase()})`}
            >
              <span className="day-number">{d.day}</span>
              {isCompleted && <Check size={8} className="check-icon" />}
              {isMissed && <AlertCircle size={8} className="alert-icon" />}
              {isCurrent && <span className="current-pulse"></span>}
            </button>
          );
        })}
      </div>
      <div className="calendar-footer">
        <span>Completion: {Math.round((student.completedDays.length / 60) * 100)}%</span>
        <span>{student.completedDays.length} of 60 Days Complete</span>
      </div>
    </div>
  );
}
