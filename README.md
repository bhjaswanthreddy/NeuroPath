# 🧠 NeuroPath – Personalized Learning Platform

NeuroPath is an AI-powered, neuroscience-inspired learning platform that adapts to each user's unique learning style. It combines visual storytelling, memory science, and adaptive spaced repetition to help students retain knowledge longer and learn smarter.

---

## 🚀 Features

- ✨ Glassmorphism-inspired Landing Page (React + Tailwind)
- 🧪 "What’s Your Learning Style?" Quiz
- 🎯 Personalized Learning Path Generation
- 🧠 Adaptive Lesson Interface (Web + Mobile-ready)
- 🔁 Spaced Repetition System (SRS)
- 📊 Dashboard with Progress Tracking
- 📬 Waitlist and Feedback Loop Integration

---

## 📦 Tech Stack

| Layer          | Technology                         |
|----------------|-------------------------------------|
| Frontend (Web) | React + Vite + Tailwind CSS         |
| Frontend (Mobile) | Flutter (planned)              |
| Backend        | Supabase (PostgreSQL + Auth)        |
| API / Logic    | Node.js / Firebase Functions        |
| AI/LLM         | OpenAI / Gemini (adaptive content)  |
| Hosting        | Vercel / Firebase Hosting           |
| Analytics      | PostHog / Notion (for user insights)|

---

## 📁 Project Structure

```
/apps
  /web               → React frontend app
  /mobile            → Flutter mobile app (coming soon)

/backend
  /functions         → SRS, LLM, feedback API logic
  /supabase          → SQL schema, migrations

/docs                → Architecture, wireframes, diagrams
```

---

## 🛠️ Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/bhjaswanthreddy/NeuroPath.git
cd NeuroPath/apps/web
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in `apps/web`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Run the App
```bash
npm run dev
```

---

## 🧪 Live Demo

Coming soon. Want early access? [Join the waitlist](#)

---

## 🧩 Contributing

Contributions are welcome! If you'd like to:
- Add new features
- Improve performance
- Contribute to Flutter mobile app

Just open a pull request or start a discussion.

---

## 🧠 Philosophy

> *“One size doesn't fit all in education. NeuroPath is our mission to personalize learning at scale using AI + memory science.”*

---

## 📬 Feedback

Got suggestions or feature requests? Open an issue or drop your thoughts in [Notion Feedback Board](#).

---

## 📄 License

MIT © [Jaswanth Reddy](https://github.com/bhjaswanthreddy)
