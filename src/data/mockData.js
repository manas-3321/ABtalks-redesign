// Mock Data for ABTalks Challenge Platform

export const TRACKS = [
  {
    id: 'frontend',
    title: 'Frontend Web Development',
    description: 'Master HTML, CSS, JavaScript, React, and build stunning user experiences.',
    level: 'Beginner to Advanced',
    studentsCount: '1,842 college students enrolled',
    difficulty: 'Medium'
  },
  {
    id: 'backend',
    title: 'Backend Systems & APIs',
    description: 'Learn Node.js, Express, databases (SQL/NoSQL), authentication, and system design.',
    level: 'Intermediate',
    studentsCount: '1,120 college students enrolled',
    difficulty: 'Hard'
  },
  {
    id: 'python-ds',
    title: 'Python & Data Structures',
    description: 'Solve coding challenges, understand DSA, and build automation scripts.',
    level: 'Beginner',
    studentsCount: '2,450 college students enrolled',
    difficulty: 'Medium'
  }
];

// Details of tasks for core testing days. The rest can be generated programmatically for UI grid
export const TASKS_DETAIL = {
  1: {
    title: "Vibe Check & Development Setup",
    difficulty: "Easy",
    timeRequired: "45 mins",
    topic: "Setup",
    learningGoals: [
      "Install Git and VS Code if not already installed",
      "Create a public GitHub repository named 'abtalks-60-day-challenge'",
      "Set up your developer profile on LinkedIn"
    ],
    instructions: `Welcome to the 60-day coding challenge! Today is about setting your foundation.
    
### What to Build:
1. Create a simple HTML page with your name, goal, and a list of technologies you want to learn.
2. Push this file as \`index.html\` to your newly created public repository.
3. Share your decision to start this 60-day coding challenge on LinkedIn. Tag #ABTalks and #60DaysOfCode.

### Why this matters:
The hardest part of coding is getting started. Today, you commit to yourself and public accountability.`,
    hints: "Keep your git commit message clean, e.g. 'day 1: initial environment setup and goals'."
  },
  11: {
    title: "Responsive Grid Card Layout",
    difficulty: "Medium",
    timeRequired: "1.5 hours",
    topic: "CSS Grid",
    learningGoals: [
      "Understand grid-template-columns and grid-gap",
      "Implement responsive media queries at 390px (mobile) and 768px (tablet)",
      "Add glassmorphic blur hover effects to card items"
    ],
    instructions: `Yesterday we built flexbox items. Today, we scale up to two-dimensional CSS Grid layout.
    
### What to Build:
1. Create a 3x3 layout of cards showcasing personal coding projects.
2. The cards must collapse into a single vertical column on mobile screens (< 480px).
3. Implement subtle transition durations for scale changes when cards are focused.

### Why this matters:
Modern layout systems require grid structures. Master responsive design principles to make your work look professional on any device.`,
    hints: "Use \`grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\` for zero-media-query responsiveness!"
  },
  12: {
    title: "Building a Premium CSS Modal",
    difficulty: "Medium",
    timeRequired: "2 hours",
    topic: "DOM & CSS Transitions",
    learningGoals: [
      "Use JavaScript to manage modal toggle states",
      "Build a glassmorphic background overlay with backdrop-filter",
      "Implement slide-up animations for mobile screens (390px) and fade-in for desktop"
    ],
    instructions: `Modals are essential for displaying detailed contextual content without cluttering the screen.
    
### What to Build:
1. Build an interactive card dashboard. Clicking a card opens a detailed viewport overlay.
2. Implement custom micro-interactions: a close button that rotates on hover, and an ESC key event listener to close the modal.
3. Make the overlay background blur out the dashboard behind it.

### Why this matters:
Attention to detail distinguishes standard websites from premium, polished applications. Smooth modal transitions enhance user trust and satisfaction.`,
    hints: "Apply \`backdrop-filter: blur(8px)\` and \`transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)\` for that premium Apple-like feel."
  },
  13: {
    title: "Fetch API & Dynamic Render",
    difficulty: "Hard",
    timeRequired: "2.5 hours",
    topic: "Async JS / APIs",
    learningGoals: [
      "Perform GET requests using Fetch API or Axios",
      "Handle API loading states, success screens, and error boundaries",
      "Format JSON data nicely into visual components"
    ],
    instructions: `Websites become dynamic when they integrate remote data. Today you connect to a public API.
    
### What to Build:
1. Fetch live developer quotes or github profile statistics.
2. Create loading skeleton cards that pulse while the HTTP request resolves.
3. Render user details dynamically inside your cards.

### Why this matters:
Almost every frontend job requires handling API calls. Managing asynchronous operations is a core developer skill.`,
    hints: "Always wrap your fetch inside a try-catch block to handle network dropouts gracefully!"
  }
};

// Auto-generate generic metadata for remaining days
export const getChallengeDays = () => {
  const days = [];
  for (let i = 1; i <= 60; i++) {
    const isSpecific = TASKS_DETAIL[i];
    days.push({
      day: i,
      title: isSpecific ? isSpecific.title : `Coding Day Challenge #${i}`,
      topic: isSpecific ? isSpecific.topic : (i < 15 ? 'HTML/CSS Basics' : i < 30 ? 'JavaScript DOM' : i < 45 ? 'React Frontend' : 'Fullstack & Deploy'),
      difficulty: isSpecific ? isSpecific.difficulty : (i % 5 === 0 ? 'Hard' : i % 3 === 0 ? 'Medium' : 'Easy'),
      timeRequired: isSpecific ? isSpecific.timeRequired : '1 hour'
    });
  }
  return days;
};

// Mock student profile states representing different edge cases
export const STUDENT_STATES = {
  freshStart: {
    id: 'freshStart',
    name: 'Karan Sharma',
    college: 'Vellore Institute of Technology',
    trackId: 'frontend',
    currentDay: 1,
    streakCount: 0,
    maxStreak: 0,
    frozenStreak: false,
    completedDays: [], // Empty profile
    submissions: {}, // Empty submissions
    unlockedBadges: [],
    achievements: [
      { id: 'first_commit', title: 'First Commit', desc: 'Push your first code proof', unlocked: false, icon: 'GitCommit' },
      { id: 'week_warrior', title: '7-Day Warrior', desc: 'Maintain a 7-day streak', unlocked: false, icon: 'Flame' },
      { id: 'night_owl', title: 'Midnight Oil', desc: 'Submit a task between 11 PM and 3 AM', unlocked: false, icon: 'Moon' }
    ]
  },
  
  activeStreak: {
    id: 'activeStreak',
    name: 'Manasa Rao',
    college: 'IIT Madras',
    trackId: 'frontend',
    currentDay: 12,
    streakCount: 11,
    maxStreak: 11,
    frozenStreak: false,
    completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // 11 days completed
    submissions: {
      1: { github: 'https://github.com/manasa/abtalks-60/commit/day1', linkedin: 'https://linkedin.com/posts/manasa-day1' },
      2: { github: 'https://github.com/manasa/abtalks-60/commit/day2', linkedin: 'https://linkedin.com/posts/manasa-day2' },
      3: { github: 'https://github.com/manasa/abtalks-60/commit/day3', linkedin: 'https://linkedin.com/posts/manasa-day3' },
      4: { github: 'https://github.com/manasa/abtalks-60/commit/day4', linkedin: 'https://linkedin.com/posts/manasa-day4' },
      5: { github: 'https://github.com/manasa/abtalks-60/commit/day5', linkedin: 'https://linkedin.com/posts/manasa-day5' },
      6: { github: 'https://github.com/manasa/abtalks-60/commit/day6', linkedin: 'https://linkedin.com/posts/manasa-day6' },
      7: { github: 'https://github.com/manasa/abtalks-60/commit/day7', linkedin: 'https://linkedin.com/posts/manasa-day7' },
      8: { github: 'https://github.com/manasa/abtalks-60/commit/day8', linkedin: 'https://linkedin.com/posts/manasa-day8' },
      9: { github: 'https://github.com/manasa/abtalks-60/commit/day9', linkedin: 'https://linkedin.com/posts/manasa-day9' },
      10: { github: 'https://github.com/manasa/abtalks-60/commit/day10', linkedin: 'https://linkedin.com/posts/manasa-day10' },
      11: { github: 'https://github.com/manasa/abtalks-60/commit/day11', linkedin: 'https://linkedin.com/posts/manasa-day11' }
    },
    unlockedBadges: ['first_commit', 'week_warrior', 'night_owl'],
    achievements: [
      { id: 'first_commit', title: 'First Commit', desc: 'Push your first code proof', unlocked: true, date: '11 days ago', icon: 'GitCommit' },
      { id: 'week_warrior', title: '7-Day Warrior', desc: 'Maintain a 7-day streak', unlocked: true, date: '5 days ago', icon: 'Flame' },
      { id: 'night_owl', title: 'Midnight Oil', desc: 'Submit a task between 11 PM and 3 AM', unlocked: true, date: 'Yesterday', icon: 'Moon' }
    ]
  },
  
  missedDay: {
    id: 'missedDay',
    name: 'Rahul Sen',
    college: 'Delhi Technological University',
    trackId: 'frontend',
    currentDay: 12,
    streakCount: 0, // Streak broken (was 10)
    maxStreak: 10,
    frozenStreak: false,
    completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // Missed day 11!
    submissions: {
      1: { github: 'https://github.com/rahul/abtalks/commit/1', linkedin: 'https://linkedin.com/posts/rahul-1' },
      2: { github: 'https://github.com/rahul/abtalks/commit/2', linkedin: 'https://linkedin.com/posts/rahul-2' },
      3: { github: 'https://github.com/rahul/abtalks/commit/3', linkedin: 'https://linkedin.com/posts/rahul-3' },
      4: { github: 'https://github.com/rahul/abtalks/commit/4', linkedin: 'https://linkedin.com/posts/rahul-4' },
      5: { github: 'https://github.com/rahul/abtalks/commit/5', linkedin: 'https://linkedin.com/posts/rahul-5' },
      6: { github: 'https://github.com/rahul/abtalks/commit/6', linkedin: 'https://linkedin.com/posts/rahul-6' },
      7: { github: 'https://github.com/rahul/abtalks/commit/7', linkedin: 'https://linkedin.com/posts/rahul-7' },
      8: { github: 'https://github.com/rahul/abtalks/commit/8', linkedin: 'https://linkedin.com/posts/rahul-8' },
      9: { github: 'https://github.com/rahul/abtalks/commit/9', linkedin: 'https://linkedin.com/posts/rahul-9' },
      10: { github: 'https://github.com/rahul/abtalks/commit/10', linkedin: 'https://linkedin.com/posts/rahul-10' }
      // Missed 11!
    },
    unlockedBadges: ['first_commit', 'week_warrior'],
    achievements: [
      { id: 'first_commit', title: 'First Commit', desc: 'Push your first code proof', unlocked: true, date: '12 days ago', icon: 'GitCommit' },
      { id: 'week_warrior', title: '7-Day Warrior', desc: 'Maintain a 7-day streak', unlocked: true, date: '6 days ago', icon: 'Flame' },
      { id: 'night_owl', title: 'Midnight Oil', desc: 'Submit a task between 11 PM and 3 AM', unlocked: false, icon: 'Moon' }
    ],
    recoveryQuestAvailable: true,
    recoveryQuest: {
      question: "Which of the following creates a flex grid container in CSS?",
      options: [
        "display: block-flex",
        "display: flex",
        "flex-direction: grid",
        "align-items: center"
      ],
      correctIndex: 1
    }
  }
};
