# Scholarship & Career Intelligence Platform

An AI-powered platform for discovering scholarships, internships, fellowships, research programs, grants, and career opportunities through intelligent search and personalized recommendations.

## Overview

The Scholarship & Career Intelligence Platform centralizes opportunity discovery and uses semantic search, vector embeddings, resume matching, and Generative AI to help users find relevant opportunities.

The platform supports both traditional keyword search and natural-language discovery, along with personalized recommendations and an AI assistant.

---
## Demo Video

### Link : https://youtu.be/aZHRaB4E8WY

---
## Key Features

### 🔎 Opportunity Discovery

* Scholarships, internships, fellowships, research programs, and jobs
* Keyword-based search
* Semantic search using embeddings
* Opportunity filtering and sorting
* Detailed opportunity pages
* Similar opportunity discovery

### 🎯 Personalized Recommendations

* Resume PDF upload
* Automatic resume text extraction
* Resume embedding generation
* Semantic resume-to-opportunity matching
* Ranked personalized recommendations

### 🤖 AI Assistant

* Natural-language questions about opportunities
* Semantic retrieval of relevant opportunities
* RAG-based context generation
* Gemini-powered responses
* Grounded answers based on available opportunity data

---

## Architecture

```text
Opportunity Data
      │
      ▼
PostgreSQL + pgvector
      │
      ├───────────────┐
      ▼               ▼
Semantic Search   Similarity Search
      │               │
      └───────┬───────┘
              ▼
       Relevant Opportunities
              │
       ┌──────┴──────┐
       ▼             ▼
Recommendations   RAG Assistant
       │             │
       ▼             ▼
 Resume Matching   Gemini
```

### Recommendation Flow

```text
Resume PDF
   ↓
Text Extraction
   ↓
Resume Embedding
   ↓
Vector Similarity Search
   ↓
Personalized Recommendations
```

### AI Assistant Flow

```text
User Question
   ↓
Semantic Search
   ↓
Relevant Opportunities
   ↓
RAG Context
   ↓
Gemini
   ↓
AI Response
```

---

## Technology Stack

### Frontend

* React
* JavaScript
* React Router
* REST API integration
* Responsive CSS

### Backend

* Python
* FastAPI
* SQLAlchemy
* Pydantic
* Uvicorn
* PyPDF

### Database & AI

* PostgreSQL
* pgvector
* Vector embeddings
* Semantic search
* Recommendation matching
* Retrieval-Augmented Generation (RAG)
* Google Gemini

---

## API

### Opportunities

```text
GET  /opportunities/
GET  /opportunities/search
GET  /opportunities/semantic-search
GET  /opportunities/{opportunity_id}
GET  /opportunities/{opportunity_id}/similar
```

### Recommendations

```text
POST /recommendations/
```

Upload a resume PDF to receive personalized opportunity recommendations.

### AI Assistant

```text
POST /assistant/
```

Submit a natural-language question and receive an AI-generated response with relevant opportunities.

Interactive API documentation is available at:

```text
http://127.0.0.1:8000/docs
```

---

## Running Locally

### Backend

```bash
python -m venv .venv
source .venv/Scripts/activate
pip install -r requirements.txt

python -m uvicorn backend.app.main:app --reload
```

### Frontend

```bash
npm install
npm run dev
```

Create a `.env` file with your required configuration:

```env
DATABASE_URL=your_database_url
GEMINI_API_KEY=your_gemini_api_key
```

Do not commit API keys or `.env` files to Git.

---

## Project Status

| Feature                      | Status |
| ---------------------------- | ------ |
| Opportunity discovery        | ✅      |
| Keyword search               | ✅      |
| Semantic search              | ✅      |
| Opportunity embeddings       | ✅      |
| Similar opportunities        | ✅      |
| Resume processing            | ✅      |
| Personalized recommendations | ✅      |
| RAG pipeline                 | ✅      |
| Gemini AI Assistant          | ✅      |
| React frontend               | ✅      |
| FastAPI backend              | ✅      |

---

## Learning Objectives

This project demonstrates practical experience with:

* Full-stack development
* REST API design
* PostgreSQL and vector databases
* Semantic search
* Embeddings and similarity search
* Recommendation systems
* Resume processing
* Retrieval-Augmented Generation
* Generative AI
* React and FastAPI
