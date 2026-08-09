import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, GitCommit, Star, Terminal, CheckCircle2, ChevronDown, Award } from 'lucide-react';
import { TRACKS } from '../data/mockData';
import { LinkedinIcon } from '../components/BrandIcons';

export default function LandingPage() {
  const navigate = useNavigate();
  const [selectedTrack, setSelectedTrack] = useState('frontend');
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: "Can I do this along with college classes?",
      a: "Yes! Most students work on tasks after college hours. It takes about 1-2 hours a day, designed specifically for late-night sessions."
    },
    {
      q: "What if I miss a day in the challenge?",
      a: "Your streak goes to 0, which recruiters can see. However, you can trigger a 'Streak Recovery Quest' (a debugging trivia/quiz) once a week to restore your streak."
    },
    {
      q: "Is this challenge completely free?",
      a: "Yes, it is 100% free for all Indian college students. Our mission is to help you build proof-of-work and get hired."
    }
  ];

  const handleStart = () => {
    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <header className="landing-hero animate-float">
        <div className="landing-logo">
          <span className="text-gradient-purple font-extrabold">AB</span>
          <span className="text-white font-medium">Talks</span>
        </div>
        <h1 className="tagline">
          Build in Public.<br />
          <span className="text-gradient-cyan">Get Hired.</span>
        </h1>
        <p className="subtagline">
          The 60-Day coding challenge for Indian college students. Write code, post proof, build consistency.
        </p>
        <button className="cta-button" onClick={handleStart}>
          Accept the Challenge
        </button>
        
        {/* Trust Stats */}
        <div className="trust-stats">
          <div className="stat-item">
            <div className="stat-val">3,412</div>
            <div className="stat-lbl">Coding Today</div>
          </div>
          <div className="stat-item">
            <div className="stat-val">12.4K</div>
            <div className="stat-lbl">Commits Made</div>
          </div>
          <div className="stat-item">
            <div className="stat-val">₹8.4L</div>
            <div className="stat-lbl">Avg. Package</div>
          </div>
        </div>
      </header>

      {/* Proof of Work Mechanism */}
      <section className="glass-card proof-concept-card">
        <h3 className="section-title">
          <Award size={16} className="text-cyan" />
          <span>The Daily Habit</span>
        </h3>
        <p className="track-desc" style={{ marginBottom: '14px' }}>
          Every day, pick a coding task, complete it, and submit two things before midnight:
        </p>
        <div className="concept-grid">
          <div className="concept-box">
            <GitCommit size={20} className="text-purple" />
            <span>GitHub Commit</span>
          </div>
          <div className="concept-connector">+</div>
          <div className="concept-box">
            <LinkedinIcon size={20} className="text-cyan" />
            <span>LinkedIn Post</span>
          </div>
        </div>
      </section>

      {/* Select a Track */}
      <section className="tracks-section">
        <h3 className="section-title">
          <Terminal size={16} className="text-purple" />
          <span>Choose Your Track</span>
        </h3>
        <div className="track-list">
          {TRACKS.map((t) => (
            <div 
              key={t.id} 
              className={`track-card ${selectedTrack === t.id ? 'selected' : ''}`}
              onClick={() => setSelectedTrack(t.id)}
            >
              <div className="track-header">
                <span className="track-title">{t.title}</span>
                <span className={`badge ${
                  t.difficulty === 'Easy' ? 'badge-emerald' : 
                  t.difficulty === 'Medium' ? 'badge-blue' : 'badge-orange'
                }`}>
                  {t.difficulty}
                </span>
              </div>
              <p className="track-desc">{t.description}</p>
              <div className="track-footer">
                <span>{t.level}</span>
                <span className="text-white">{t.studentsCount}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Student Testimonial */}
      <section className="testimonials-section">
        <h3 className="section-title">
          <Star size={16} className="text-orange" />
          <span>Student Stories</span>
        </h3>
        <div className="testimonials">
          <div className="testimonial-card">
            <p className="quote">
              "Coming from a Tier-3 college, I had no direction. Pushing code daily on ABTalks forced me to be consistent. By Day 45, recruiters started visiting my LinkedIn. I secured an internship at Razorpay!"
            </p>
            <div className="author">
              <span>Rohan Das</span>
              <span>LPU '25 • SDE-1</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="faq-section">
        <h3 className="section-title">
          <CheckCircle2 size={16} className="text-emerald" />
          <span>Got Questions?</span>
        </h3>
        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-item">
              <div 
                className="faq-question" 
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <span>{faq.q}</span>
                <ChevronDown 
                  size={14} 
                  style={{ 
                    transform: activeFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s' 
                  }} 
                />
              </div>
              {activeFaq === idx && (
                <p className="faq-answer">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
