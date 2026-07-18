# Trinetra — AI Digital Public Safety Intelligence Platform

Built for ET AI Hackathon 2.0 | Problem Statement 6

## What it does
Trinetra is a citizen-facing AI platform that detects digital fraud in real time across three threat vectors:
- **Digital Arrest Scam Detector** — identifies fake CBI/ED/Police impersonation calls and messages
- **Message Fraud Detector** — analyses suspicious WhatsApp, SMS, and Telegram messages
- **Document Verifier** — scans uploaded PDFs for fake government notices and fraudulent offer letters

## Tech Stack
- **Frontend:** React + Tailwind CSS (Vite)
- **Backend:** FastAPI (Python)
- **AI Model:** Llama 3.3 70B via Groq API
- **PDF Processing:** pdfplumber
- **Database:** Supabase (PostgreSQL)

## Setup

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
# Add your GROQ_API_KEY to .env
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Problem Statement
PS 6: AI for Digital Public Safety — Defeating Counterfeiting, Fraud & Digital Arrest Scams
ET AI Hackathon 2.0
