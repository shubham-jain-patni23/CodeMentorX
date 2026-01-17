# CodeMentorX

CodeMentorX is an AI-assisted coding platform designed to help users
learn how to think, optimize, and explain code — not just write it.

## ❓ Problem Statement

Many learners solve DSA problems but struggle with:
- Understanding *why* their solution works
- Knowing if their approach is optimal
- Explaining solutions in interviews
- Tracking progress across difficulty and patterns

Existing platforms focus on submissions, not learning depth.

## 💡 Solution — What is CodeMentorX?

CodeMentorX is a full-stack platform that helps learners:

- Practice DSA problems
- Get structured rule-based code reviews
- Receive AI-powered explanations (Gemini Flash)
- Practice interview-style explanations
- Track learning progress via analytics dashboard

## ✨ Core Features

### 🧩 DSA Playground
- Curated problems with difficulty & pattern tags
- Think-Before-You-Code prompts

### 🛠 Code Review System
- Rule-based analysis (time/space complexity, suggestions)
- AI-assisted explanation using Gemini Flash (best-effort)

### 🎤 Interview Mode
- Explain approach, complexity, optimizations
- Automatic scoring & feedback

### 📊 Analytics Dashboard
- Progress over time
- Difficulty breakdown
- Pattern exposure
- Attempts per problem

### 🔐 Authentication
- JWT-based authentication
- Protected routes

## 🧰 Tech Stack

**Frontend**
- React (Vite)
- React Router

**Backend**
- Node.js
- Express.js
- MongoDB
- JWT Authentication

**AI**
- Google Gemini Flash (v1beta, REST API)

**Tools**
- Git & GitHub

## 🏗 Architecture Overview

- Frontend communicates with backend via REST APIs
- Backend handles authentication, problem management, submissions, and analytics
- Rule-based review ensures deterministic feedback
- AI review is layered on top as best-effort enhancement
- System gracefully handles AI failures

## ▶️ Run Locally

### Backend
```bash
cd backend
npm install
node index.js

### frontend

cd frontend
npm install
npm run dev

## Environment Variables

MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret
GEMINI_API_KEY=your_key


---

### 8️⃣ Current Status & Future Work (HONEST)

```md
## 🚀 Current Status

- Phase-1 core features completed
- AI review integrated (best-effort)
- Dashboard and interview mode live

## 🔮 Future Enhancements
- Admin panel to manage problems
- Marketplace & credits system
- Deployment & scaling
