<div align="center">

# 🛡️ TRINETRA
### AI-Powered Digital Public Safety Intelligence Platform

<p align="center">
Detect. Verify. Protect.
</p>

[![ET AI Hackathon](https://img.shields.io/badge/ET%20AI%20Hackathon-2.0-orange?style=for-the-badge)]()
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)]()
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)]()
[![Python](https://img.shields.io/badge/Python-3.14-blue?style=for-the-badge&logo=python)]()
[![Groq](https://img.shields.io/badge/LLM-Groq-000000?style=for-the-badge)]()
[![Llama 3.3 70B](https://img.shields.io/badge/Model-Llama%203.3%2070B-purple?style=for-the-badge)]()

<br>

<a href="https://trinetra-india.netlify.app">
<img src="https://img.shields.io/badge/🚀%20Live%20Demo-Visit-success?style=for-the-badge">
</a>

<a href="https://trinetra-backend-209a.onrender.com/docs">
<img src="https://img.shields.io/badge/API-Documentation-blue?style=for-the-badge">
</a>

</div>

---

# 🇮🇳 Protecting India from Digital Fraud using AI

Trinetra is an **AI-powered Digital Public Safety Intelligence Platform** built for **ET AI Hackathon 2.0 (Problem Statement 6)**.

Instead of detecting fraud **after citizens lose money**, Trinetra helps detect scams **before financial loss occurs** using Artificial Intelligence.

It provides real-time analysis for:

- 🚨 Digital Arrest Scams
- 💬 Fraudulent WhatsApp/SMS Messages
- 📄 Fake Government & Employment Documents
- 🌍 Community Scam Intelligence

---

# 🎯 Problem Statement

India is witnessing an alarming rise in

- Digital Arrest Scams
- Fake Job Scams
- Banking & KYC Fraud
- Fake Government Notices
- AI-powered Social Engineering

Traditional systems are reactive.

**Trinetra shifts fraud detection from reactive investigation to proactive prevention.**

---

# ✨ Features

## 🚨 Digital Arrest Scam Detector

Analyze suspicious call transcripts, SMS or WhatsApp chats.

✔ CBI / ED / Police impersonation detection

✔ Psychological pressure detection

✔ Financial demand detection

✔ Isolation tactic detection

✔ Multilingual support

---

## 💬 Message Fraud Detector

Detects

- Fake Jobs
- Investment Scams
- Lottery Scams
- Task Scams
- KYC Fraud
- Romance Fraud
- Government Impersonation

Returns

- Risk Score
- Scam Category
- Red Flags
- Citizen Guidance

---

## 📄 AI Document Verifier

Upload PDF documents.

Trinetra checks for

- Fake Government Notices
- Fake Arrest Warrants
- Fake Offer Letters
- Fake Banking Documents
- Fake Customs Notices

---

## 🌍 Community Scam Intelligence

Citizens can report scams.

The platform builds a live community intelligence feed powered by Supabase.

---

## 📑 Audit Trail

Every AI analysis generates

- Unique Case ID
- UTC Timestamp
- Platform Signature

making reports easier to reference.

---

# 🧠 AI Pipeline

```text
Citizen Input
      │
      ▼
React Frontend
      │
      ▼
FastAPI Backend
      │
      ▼
Llama 3.3 70B (Groq)
      │
      ▼
Risk Analysis
      │
      ▼
Deterministic Verdict Engine
      │
      ▼
Citizen Guidance
```

---

# ⚙️ Tech Stack

| Layer | Technology |
|---------|------------|
| Frontend | React 18 + Tailwind CSS + Vite |
| Backend | FastAPI + Python |
| AI | Llama 3.3 70B via Groq |
| Database | Supabase PostgreSQL |
| Deployment | Netlify + Render |
| APIs | REST |

---

# 🎯 Risk Scoring

## Digital Arrest

| Score | Verdict |
|--------|----------|
| 0–20 | 🟢 SAFE |
| 21–45 | 🟡 LOW RISK |
| 46–70 | 🟠 MODERATE |
| 71–89 | 🔴 HIGH RISK |
| 90–100 | 🚨 CONFIRMED SCAM |

---

## Message Fraud

| Score | Verdict |
|--------|----------|
| 0–20 | SAFE |
| 21–65 | Suspicious |
| 66–85 | Likely Scam |
| 86–100 | Definite Scam |

---

## Document Verification

| Score | Verdict |
|--------|----------|
| 0–25 | Legitimate |
| 26–50 | Suspicious |
| 51–75 | Likely Fraud |
| 76–100 | Confirmed Fraud |

---

# 📊 Architecture

```text
                React Frontend
                       │
             REST API Requests
                       │
                 FastAPI Backend
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
Digital Arrest   Message Fraud   Document Verify
        │              │              │
        └──────────────┼──────────────┘
                       ▼
             Llama 3.3 70B (Groq)
                       │
             Deterministic Verdict
                       │
             Audit Trail Generation
                       │
                  Supabase Database
```

---

# 🚀 Local Setup

```bash
git clone https://github.com/RithishPK/trinetra.git

cd trinetra
```

## Backend

```bash
cd backend

python -m venv venv

pip install -r requirements.txt

uvicorn main:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

```env
GROQ_API_KEY=

SUPABASE_URL=

SUPABASE_KEY=
```

---

# 📷 Screenshots

```
Add screenshots here

Landing Page

Digital Arrest Detector

Message Fraud Detector

Document Verifier

Community Feed
```

---

# 🏆 Built For

**ET AI Hackathon 2.0**

Problem Statement 6

**AI for Digital Public Safety**

---

# 👨‍💻 Team

**Rithish PK**

**Chinmay Deepak Chandavar**

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a star!

Made with ❤️ for a safer digital India 🇮🇳

</div>
