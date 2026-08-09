# ABTalks Redesign Challenge

This repository contains a mobile-first redesign of the ABTalks platform, built as part of a coding challenge.

## Context & Situation
ABTalks runs a 60-day coding challenge for Indian college students. 
Students pick a track (e.g., Frontend Web Development), build something every day, and maintain a public learning streak by submitting two proofs of work:
1. A GitHub commit
2. A LinkedIn post

This daily consistency helps students build public proof of work and gain visibility with tech recruiters. The target audience primarily accesses the platform on their mobile phones late at night.

---

## Redesign Requirements

### 1. Landing Page (`/`)
* Introduce ABTalks to new students.
* Build trust, clarity, and motivation for students to join the 60-day challenge.

### 2. Student Dashboard (`/dashboard`)
* Display active stats: Current streak, total completion percentage, achievements, and calendar progress.
* Handle real-world edge cases like a new student start, active streak, and missed days.

### 3. Challenge Day Screen (`/day/12` or `/day/:dayId`)
* Present the day's tasks, instructions, and learning goals.
* Provide an interactive submission form requiring valid GitHub and LinkedIn proof-of-work URLs.

---

## Implementation Details

### Tech Stack
* **Framework:** React + Vite
* **Routing:** React Router (client-side routing)
* **Styling:** Custom Vanilla CSS (Design system, responsive simulator, glassmorphism, animations)
* **Icons:** Lucide React

### Thoughtful Innovations
1. **Night Owl Study Space:** A study helper featuring a Pomodoro timer, ambient lofi/rain sound toggles, active student counters, and wellness reminders.
2. **Streak Recovery Quest:** An interactive debugging challenge that allows students to restore a broken streak rather than losing progress.
3. **Interactive Confetti:** CSS-based falling particles that celebrate proof of work submissions.
4. **Sandbox State Switcher:** A floating top control bar that lets reviewers swap mock user states dynamically (Fresh Start, Active Streak, and Missed Day).

---

## Route Map
```text
/
/dashboard
/day/12
```
