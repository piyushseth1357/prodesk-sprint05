# Sprint 05 – Kanban Task Board

## 📌 Project Overview

A **Trello-inspired Kanban Task Board** built with **React.js** as part of **Sprint 05**.

This project focuses on building a fully interactive task management experience using core React concepts — no external state libraries, just clean component architecture and hooks.

Key learning goals:
- State-driven UI with React hooks (`useState`, `useEffect`)
- Reusable component design
- Smooth drag-and-drop interactions
- Persistent data without a backend

---

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| React (Functional Components) | UI & State Management |
| Vite | Project Scaffolding & Dev Server |
| JavaScript (ES6+) | Core Logic |
| Tailwind CSS / Bootstrap | Styling & Layout |
| localStorage | Client-side Persistence |
| dnd-kit / react-beautiful-dnd | Drag & Drop |

---

## 🔗 Important Links

- 🗂️ **GitHub Repository** → 
    https://github.com/piyushseth1357/prodesk-sprint05.git

- 🌐 **Live Demo** →
    https://prodesk-sprint05.vercel.app/

- 🎥 **Video link** → 
    https://www.loom.com/share/ec340cc7fa6143c8ae60b0e6f33224f1

---

## 🚀 Features

### ✅ Phase 1 – Core Board
- 3-column layout: **To Do → In Progress → Done**
- Add new tasks to any column
- Delete tasks
- Move tasks across columns manually
- Fully state-driven rendering

### 🎨 Phase 2 – Polish & Persistence
- Inline task editing
- Priority labels: **High / Medium / Low**
- Color-coded cards based on priority
- Board state saved to `localStorage` — survives page refresh

### 🧠 Phase 3 – Advanced Features
- Drag-and-drop task movement between columns
- Global search bar with real-time filtering
- Instant UI updates with no lag

---

## 🧱 Component Architecture

```
App                  ← Global state owner
├── SearchBar        ← Filters tasks across all columns
├── Board
│   └── Column (×3)
│       ├── TaskCard ← Displays task, handles edit/delete
│       └── TaskInput ← Form to add new tasks
```

State is lifted to `App` and flows down via props — no Context or Redux.

---

## 💾 Data Persistence

Tasks are stored in `localStorage` as serialized JSON.  
Every add, edit, delete, or move is saved automatically — no manual save needed.

# Move into the project
cd kanban-board

# Install dependencies
npm install

# Start the dev server
npm run dev
```

---
Developer Name: Piyush Seth 
Role: Software Engineer Trainee 
Company: Prodesk IT 
GitHub:  https://github.com/piyushseth1357/prodesk-sprint05.git
Live Site: https://prodesk-sprint05.vercel.app/
