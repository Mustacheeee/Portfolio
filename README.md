# Fiona Zhao's Portfolio

Personal portfolio site for **Yixin Zhao (Fiona)** — full-stack developer focused on software engineering, AI, and the web.

**Live site:** [mustacheeee.github.io/Portfolio](https://mustacheeee.github.io/Portfolio/)

---

## Description

This repository contains a production-ready, full-stack portfolio: a React (Vite) frontend with animated UI, a 3D hero scene (Three.js), and an AI chat assistant backed by a FastAPI service and the OpenAI API. Content includes projects, skills, timeline, contact, and a downloadable resume. The app is deployed on GitHub Pages with the API hosted on Render.

**Status:** **Complete** — shipped and live; maintained as needed.

---

## Features

- **AI chat assistant** — Ask questions powered by OpenAI and custom context.
- **Responsive UI** — React, Tailwind CSS, and Framer Motion.
- **Resume download** — PDF resume from the site.
- **Scroll-driven motion** — Animated headings and smooth section transitions.
- **3D landing** — Interactive Three.js scene on the hero section.

---

## Tech stack

| Layer | Technologies |
|--------|----------------|
| **Frontend** | React (Vite), TypeScript, Tailwind CSS, Framer Motion, Three.js / React Three Fiber |
| **Backend** | FastAPI, Python, OpenAI API |
| **Hosting** | GitHub Pages (frontend), Render (API) |

---

## Repository layout

```
data-story-portfolio/
├── frontend/   # Vite + React app
├── backend/    # FastAPI service for AI chat
└── shared/     # Shared data assets
```

---

## Local development

**Frontend** (from `data-story-portfolio/frontend`):

```bash
npm install
npm start
```

**Backend** (from `data-story-portfolio/backend`): create a `.env` with `OPENAI_API_KEY`, install dependencies (`pip install -r requirements.txt`), then run `python main.py` (serves on port 8000).
