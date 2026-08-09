import React from 'react';
import { Settings, AlertTriangle, User, CheckCircle2 } from 'lucide-react';

export default function DevStateSwitcher({ currentState, onStateChange }) {
  return (
    <div className="dev-switcher">
      <div className="dev-switcher-header">
        <Settings size={12} className="spin-icon" />
        <span>Reviewer Sandbox Controls</span>
      </div>
      <div className="dev-switcher-buttons">
        <button 
          onClick={() => onStateChange('freshStart')} 
          className={`dev-btn ${currentState === 'freshStart' ? 'active fresh' : ''}`}
          title="Day 1, 0 Streak, Empty Profile"
        >
          <User size={13} />
          <span>Fresh<span className="hide-mobile"> Start (Day 1)</span></span>
        </button>
        
        <button 
          onClick={() => onStateChange('activeStreak')} 
          className={`dev-btn ${currentState === 'activeStreak' ? 'active active-streak' : ''}`}
          title="Day 12, 11-Day Active Streak"
        >
          <CheckCircle2 size={13} />
          <span>Active<span className="hide-mobile"> Streak (D12)</span></span>
        </button>
        
        <button 
          onClick={() => onStateChange('missedDay')} 
          className={`dev-btn ${currentState === 'missedDay' ? 'active missed' : ''}`}
          title="Day 12, Streak Broken at Day 11"
        >
          <AlertTriangle size={13} />
          <span>Missed<span className="hide-mobile"> (Recovery)</span></span>
        </button>
      </div>
    </div>
  );
}
