import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DevStateSwitcher from './components/DevStateSwitcher';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ChallengeDayPage from './pages/ChallengeDayPage';
import { STUDENT_STATES } from './data/mockData';

export default function App() {
  const [activeStateName, setActiveStateName] = useState('activeStreak');
  
  // Clone state configurations to avoid side effects between switches
  const [studentProfiles, setStudentProfiles] = useState({
    freshStart: JSON.parse(JSON.stringify(STUDENT_STATES.freshStart)),
    activeStreak: JSON.parse(JSON.stringify(STUDENT_STATES.activeStreak)),
    missedDay: JSON.parse(JSON.stringify(STUDENT_STATES.missedDay))
  });

  const activeStudent = studentProfiles[activeStateName];

  const handleStateChange = (stateName) => {
    setActiveStateName(stateName);
  };

  const handleCompleteDay = (dayNum, github, linkedin) => {
    setStudentProfiles((prev) => {
      const updated = { ...prev };
      const current = updated[activeStateName];

      // Add to completed days if not already present
      if (!current.completedDays.includes(dayNum)) {
        current.completedDays.push(dayNum);
      }

      // Record submission URLs
      current.submissions[dayNum] = { github, linkedin };

      // Update streak
      current.streakCount += 1;
      if (current.streakCount > current.maxStreak) {
        current.maxStreak = current.streakCount;
      }

      // Unlock badges based on progress
      current.achievements = current.achievements.map((ach) => {
        if (ach.id === 'first_commit' && !ach.unlocked) {
          return { ...ach, unlocked: true, date: 'Just now' };
        }
        if (ach.id === 'week_warrior' && current.streakCount >= 7 && !ach.unlocked) {
          return { ...ach, unlocked: true, date: 'Just now' };
        }
        if (ach.id === 'night_owl' && !ach.unlocked) {
          // Submitted late night
          return { ...ach, unlocked: true, date: 'Just now' };
        }
        return ach;
      });

      return updated;
    });
  };

  const handleRecoverStreak = () => {
    setStudentProfiles((prev) => {
      const updated = { ...prev };
      const current = updated[activeStateName];

      // Restore streak
      current.streakCount = 11;
      current.maxStreak = 11;
      current.recoveryQuestAvailable = false;

      // Unlock badges if needed
      current.achievements = current.achievements.map((ach) => {
        if (ach.id === 'week_warrior' && !ach.unlocked) {
          return { ...ach, unlocked: true, date: 'Just now' };
        }
        return ach;
      });

      return updated;
    });
  };

  return (
    <Router>
      {/* Floating State Selector */}
      <DevStateSwitcher 
        currentState={activeStateName} 
        onStateChange={handleStateChange} 
      />
      
      {/* Main viewport with mock simulator frame */}
      <Layout student={activeStudent} onStateChange={handleStateChange}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/dashboard" 
            element={
              <DashboardPage 
                student={activeStudent} 
              />
            } 
          />
          <Route 
            path="/day/:dayId" 
            element={
              <ChallengeDayPage 
                student={activeStudent} 
                onCompleteDay={handleCompleteDay}
                onRecoverStreak={handleRecoverStreak}
              />
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
}
