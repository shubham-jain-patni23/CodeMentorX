# CodeMentorX — AI-Powered Coding Practice & Review Platform

CodeMentorX is a full-stack web platform designed to help developers practice DSA problems, receive AI-powered code reviews, and simulate real interview evaluations — all in a single, unified learning workflow.

The platform combines curated problem solving, algorithmic reasoning feedback, and interview-style assessment using modern web technologies and large language models.

---

## ✨ Key Features

### 🧩 DSA Practice Playground
- Curated set of DSA problems with varying difficulty levels  
- Explicit pattern tagging (e.g., Two Pointers, Hashing, DP)  
- Think-Before-You-Code prompts to encourage structured problem solving  

### 🤖 AI-Powered Code Review
- Automated analysis of submitted code using LLMs  
- Detects logical issues, inefficiencies, and edge cases  
- Provides:
  - Correctness evaluation  
  - Time & space complexity analysis  
  - Optimization and refactoring suggestions  
  - Conceptual hints when solutions are incorrect  

### 🎤 Interview Simulation Mode
- Simulates real technical interviews after code submission  
- Evaluates:
  - Approach explanation  
  - Complexity reasoning  
  - Code–approach consistency  
  - Missing edge cases  
- Generates structured feedback with scores, strengths, weaknesses, and improvement areas  

### 📊 Learning Analytics Dashboard
- User dashboard showing:
  - Progress over time  
  - Difficulty distribution  
  - Pattern coverage  
  - Attempts per problem  
- Helps users track learning trends and weak areas  

### 🛠 Admin Dashboard (Role-Based Access Control)
- Admin-only features:
  - Add, edit, and delete problems  
  - Monitor AI review activity  
  - View system health and usage statistics  
- Clean separation between user and admin workflows  

---

## 🧠 System Architecture Overview

**Frontend**
- React.js (Single Page Application)
- Context-based authentication
- Protected routes for users and admins
- Modular component and page structure

**Backend**
- Node.js + Express.js REST API
- MongoDB with Mongoose ODM
- JWT-based authentication
- Role-based authorization (User / Admin)

**AI Integration**
- LLM-powered review services
- Prompt-engineered workflows for:
  - Code review
  - Explainability
  - Interview evaluation
- Safe response parsing, fallback handling, and API-limit resilience

---

## 🛠 Tech Stack

**Frontend**
- React.js
- JavaScript
- HTML / CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

**AI / APIs**
- LLM APIs (Gemini / ChatGPT)
- RESTful architecture

**Auth & Security**
- JWT authentication
- Role-based access control

---

## 📂 Project Structure (Simplified)

frontend/
  ├── src/
  │   ├── pages/
  │   ├── components/
  │   ├── context/
  │   └── services/

backend/
  ├── controllers/
  ├── routes/
  ├── models/
  ├── middleware/
  ├── services/
  └── index.js


---

## 🔐 Authentication & Authorization

- JWT-based authentication
- Protected routes for logged-in users
- Admin-only routes protected via middleware
- Secure separation of user and admin capabilities

---

## ⚙️ Environment Variables

Create a `.env` file in the backend root:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_llm_api_key


---

## 🚀 Running the Project Locally

### Backend

cd backend
npm install
node index.js


### Frontend

cd frontend
npm install
npm run dev


---

## 📈 Future Enhancements

- Premium AI review modes  
- Advanced interview scoring rubrics  
- Problem recommendation system  
- Performance benchmarking  
- Marketplace for curated learning packs  

---

## 🎯 Motivation

CodeMentorX was built to bridge the gap between solving problems and understanding how interviewers evaluate solutions, providing learners with structured, AI-assisted feedback at every step of the problem-solving journey.

---

## 👨‍💻 Author

**Shubham Jain**

Built as a resume-grade, interview-ready full-stack project focused on DSA learning, system design, and AI integration.

---

## ⭐ Final Notes

- Designed with scalability and extensibility in mind  
- Emphasizes clean architecture and separation of concerns  
- Ideal for showcasing full-stack + AI engineering skills 