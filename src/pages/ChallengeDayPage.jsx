import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, GitCommit, CheckCircle2, Flame, HelpCircle, Shield, Award, Sparkles } from 'lucide-react';
import { TASKS_DETAIL, STUDENT_STATES } from '../data/mockData';
import { LinkedinIcon } from '../components/BrandIcons';

export default function ChallengeDayPage({ student, onCompleteDay, onRecoverStreak }) {
  const { dayId } = useParams();
  const navigate = useNavigate();
  const dayNum = parseInt(dayId, 10) || 12;

  // Form inputs
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Recovery Quest state
  const [selectedOption, setSelectedOption] = useState(null);
  const [questStatus, setQuestStatus] = useState('idle'); // idle, correct, wrong
  const [isRecovered, setIsRecovered] = useState(false);

  // Confetti particles
  const [confetti, setConfetti] = useState([]);

  // Load existing submission if any
  useEffect(() => {
    if (student.submissions[dayNum]) {
      setGithubUrl(student.submissions[dayNum].github);
      setLinkedinUrl(student.submissions[dayNum].linkedin);
      setIsSubmitted(true);
    } else {
      setGithubUrl('');
      setLinkedinUrl('');
      setIsSubmitted(false);
    }
  }, [dayNum, student]);

  // Generate CSS confetti particles on successful submit
  const triggerConfetti = () => {
    const particles = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 0.8}s`,
        color: ['#7c3aed', '#06b6d4', '#10b981', '#fbbf24', '#f43f5e'][Math.floor(Math.random() * 5)],
        size: `${Math.random() * 8 + 4}px`,
        duration: `${Math.random() * 1.5 + 1.5}s`
      });
    }
    setConfetti(particles);
  };

  const dayDetails = TASKS_DETAIL[dayNum] || {
    title: `Coding Challenge Day #${dayNum}`,
    difficulty: "Medium",
    timeRequired: "1.5 hours",
    topic: "Development",
    learningGoals: [
      "Review coding logic principles",
      "Deploy code to Github",
      "Draft a LinkedIn learning summary"
    ],
    instructions: `Implement the core specifications for Day ${dayNum}. Build something clean and functional. Ensure your code is thoroughly documented.`,
    hints: "Make sure to push all files and verify the repository link is public."
  };

  // Form Validation
  const validateForm = () => {
    const errors = {};
    if (!githubUrl) {
      errors.github = "GitHub URL is required.";
    } else if (!githubUrl.includes('github.com')) {
      errors.github = "Must be a valid GitHub URL (github.com/...)";
    }

    if (!linkedinUrl) {
      errors.linkedin = "LinkedIn post URL is required.";
    } else if (!linkedinUrl.includes('linkedin.com')) {
      errors.linkedin = "Must be a valid LinkedIn URL (linkedin.com/...)";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onCompleteDay(dayNum, githubUrl, linkedinUrl);
      setIsSubmitted(true);
      triggerConfetti();
    }
  };

  // Streak Recovery Logic
  const handleVerifyQuest = () => {
    if (student.recoveryQuest && selectedOption !== null) {
      if (selectedOption === student.recoveryQuest.correctIndex) {
        setQuestStatus('correct');
        setIsRecovered(true);
        onRecoverStreak();
      } else {
        setQuestStatus('wrong');
      }
    }
  };

  return (
    <div className="day-container">
      {/* Confetti Container */}
      {confetti.map((p) => (
        <div 
          key={p.id}
          className="confetti-particle"
          style={{
            left: p.left,
            animationDelay: p.delay,
            backgroundColor: p.color,
            width: p.size,
            height: p.size,
            animationDuration: p.duration
          }}
        />
      ))}

      {/* Day Header */}
      <div className="day-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={16} />
        </button>
        <div className="day-header-info">
          <h2>Day {dayNum}: {dayDetails.title}</h2>
          <p>{dayDetails.topic} • {dayDetails.difficulty}</p>
        </div>
      </div>

      {/* Streak Recovery Module */}
      {student.id === 'missedDay' && !isRecovered && !student.completedDays.includes(dayNum) && (
        <div className="glass-card recovery-quest-box">
          <div className="quest-title-area">
            <Shield size={16} />
            <span>Streak Recovery Quest</span>
          </div>
          <p className="alert-desc" style={{ marginBottom: '10px' }}>
            Answer this quick developer trivia to protect your **10-day streak** before submitting Day 12's task!
          </p>
          <div className="quest-question">
            Q: {student.recoveryQuest.question}
          </div>
          <div className="quest-options">
            {student.recoveryQuest.options.map((opt, idx) => {
              let optClass = '';
              if (selectedOption === idx) optClass = 'selected';
              if (questStatus === 'correct' && idx === student.recoveryQuest.correctIndex) optClass = 'correct';
              if (questStatus === 'wrong' && selectedOption === idx) optClass = 'incorrect';

              return (
                <button 
                  key={idx}
                  className={`quest-option-btn ${optClass}`}
                  onClick={() => {
                    if (questStatus !== 'correct') {
                      setSelectedOption(idx);
                      setQuestStatus('idle');
                    }
                  }}
                  disabled={questStatus === 'correct'}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {questStatus !== 'correct' && (
            <button 
              className="quest-submit-btn" 
              onClick={handleVerifyQuest}
              disabled={selectedOption === null}
            >
              Verify Answer
            </button>
          )}

          {questStatus === 'correct' && (
            <div className="quest-feedback success">
              🎉 <strong>Correct!</strong> Your streak shield activated. Your 11-day hot streak has been restored. Submit your day's work to bump it to 12!
            </div>
          )}
          {questStatus === 'wrong' && (
            <div className="quest-feedback error">
              ❌ <strong>Try again!</strong> That option is incorrect. Re-read the question and choose another answer.
            </div>
          )}
        </div>
      )}

      {/* Task Details */}
      <div className="glass-card">
        <h3 className="form-title" style={{ color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={14} />
          <span>Task Specifications</span>
        </h3>
        
        <div className="instruction-block">
          <p>{dayDetails.instructions}</p>
          
          <h3>Learning Goals:</h3>
          <ul>
            {dayDetails.learningGoals.map((goal, idx) => (
              <li key={idx}>{goal}</li>
            ))}
          </ul>
        </div>

        <div className="hint-pill" style={{ marginTop: '12px' }}>
          💡 <strong>Pro Tip:</strong> {dayDetails.hints}
        </div>
      </div>

      {/* Submission Portal */}
      {!isSubmitted ? (
        <div className="glass-card submission-card">
          <h3 className="form-title">Submit Proof of Work</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>GitHub Repository / Commit URL</label>
              <div className="input-container">
                <GitCommit size={14} className="input-icon" />
                <input 
                  type="text" 
                  placeholder="https://github.com/username/repo/commit/..."
                  className="form-input"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                />
              </div>
              {formErrors.github && <span className="text-rose" style={{ fontSize: '10px', marginTop: '2px', display: 'block' }}>{formErrors.github}</span>}
            </div>

            <div className="form-group">
              <label>LinkedIn Learning Post URL</label>
              <div className="input-container">
                <LinkedinIcon size={14} className="input-icon" />
                <input 
                  type="text" 
                  placeholder="https://linkedin.com/posts/activity-..."
                  className="form-input"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                />
              </div>
              {formErrors.linkedin && <span className="text-rose" style={{ fontSize: '10px', marginTop: '2px', display: 'block' }}>{formErrors.linkedin}</span>}
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={student.id === 'missedDay' && !isRecovered}
            >
              Submit Proof of Work
            </button>
            {student.id === 'missedDay' && !isRecovered && (
              <span className="text-orange" style={{ fontSize: '10px', display: 'block', textAlign: 'center', marginTop: '6px' }}>
                ⚠️ Solve the Recovery Quest above to enable submission!
              </span>
            )}
          </form>
        </div>
      ) : (
        /* Celebration / Success Screen */
        <div className="glass-card submission-card" style={{ borderColor: 'var(--primary-emerald)' }}>
          <div className="success-overlay">
            <div className="success-badge-container">
              <Award size={32} />
            </div>
            <h2 className="success-title">Day {dayNum} Submitted!</h2>
            <p className="success-desc">
              Excellent consistency! Your proof of work is public. You are in the top 15% of active coders this week.
            </p>
            
            <div className="success-stats-box">
              <div className="success-stat">
                <span className="success-stat-val">{student.streakCount}d</span>
                <span className="success-stat-lbl">Active Streak</span>
              </div>
              <div className="success-stat" style={{ borderLeft: '1px solid var(--border-light)', paddingLeft: '16px' }}>
                <span className="success-stat-val">{Math.round((student.completedDays.length / 60) * 100)}%</span>
                <span className="success-stat-lbl">Challenge Complete</span>
              </div>
            </div>

            {/* Submitted URLs display */}
            <div className="glass-card submitted-links-card" style={{ width: '100%', marginBottom: '14px', padding: '10px' }}>
              <div className="submitted-link-row">
                <span className="link-label"><GitCommit size={12} /> GitHub</span>
                <a href={githubUrl} target="_blank" rel="noreferrer" className="link-url">{githubUrl}</a>
              </div>
              <div className="submitted-link-row">
                <span className="link-label"><LinkedinIcon size={12} /> LinkedIn</span>
                <a href={linkedinUrl} target="_blank" rel="noreferrer" className="link-url">{linkedinUrl}</a>
              </div>
            </div>

            <button className="cta-button" style={{ background: 'var(--primary-emerald)', width: '100%', borderRadius: '10px' }} onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Inline styles for custom confetti falling keyframes */}
      <style>{`
        .confetti-particle {
          position: absolute;
          top: -20px;
          z-index: 999;
          opacity: 0.8;
          border-radius: 2px;
          animation: fall linear forwards;
        }

        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(600px) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
