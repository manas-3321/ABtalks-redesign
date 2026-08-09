import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, Calendar, Moon, Wifi, Battery, Signal } from 'lucide-react';
import NightOwlConsole from './NightOwlConsole';

export default function Layout({ children, student, onStateChange }) {
  const [showNightOwl, setShowNightOwl] = useState(false);
  const location = useLocation();

  // Find target day link based on student state
  const targetDay = student.currentDay;

  return (
    <div className="app-container">
      {/* Desktop Container Wrapper */}
      <div className="phone-wrapper">
        {/* Mock Phone Bezel Top / Status Bar */}
        <div className="phone-status-bar">
          <div className="status-time">11:11 PM</div>
          <div className="phone-notch"></div>
          <div className="status-icons">
            <Signal size={12} className="icon-wifi" />
            <Wifi size={12} className="icon-wifi" />
            <Battery size={14} className="icon-battery" />
          </div>
        </div>

        {/* Scrollable Viewport Content */}
        <main className="phone-content">
          {children}
        </main>

        {/* Night Owl Action Button */}
        <button 
          className={`night-owl-trigger ${showNightOwl ? 'active' : ''}`} 
          onClick={() => setShowNightOwl(!showNightOwl)}
          title="Night Owl Study Space"
        >
          <Moon size={20} className={showNightOwl ? 'spin-icon' : ''} />
          <span className="pulse-dot"></span>
        </button>

        {/* Night Owl Overlay Console */}
        {showNightOwl && (
          <NightOwlConsole onClose={() => setShowNightOwl(false)} />
        )}

        {/* Sticky Bottom Navigation Bar */}
        <nav className="phone-nav-bar">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Home size={18} />
            <span>Home</span>
          </NavLink>
          
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink 
            to={`/day/${targetDay}`} 
            className={({ isActive }) => `nav-item ${isActive || location.pathname.startsWith('/day/') ? 'active' : ''}`}
          >
            <Calendar size={18} />
            <span>Day {targetDay}</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
