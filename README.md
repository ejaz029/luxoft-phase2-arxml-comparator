# Luxoft Phase 2 – ARXML Semantic Comparator

## Project Overview

This project is part of the **Luxoft University Connect Program (Phase 2)**.  
It is a backend-driven tool designed to compare large **AUTOSAR ARXML files**
using schema-based (XSD) validation and semantic comparison instead of plain
text diffing.

---

## Key Features

- Upload `.arxml` and optional `.xsd` files
- Schema-aware ARXML comparison
- Detects structural and semantic differences
- Supports large files using background processing
- AI-generated summary of differences

---

## Tech Stack

- **Frontend:** React
- **Backend:** Django, Celery, Redis
- **Database:** SQLite
- **Parsing Libraries:** `lxml`, `xmlschema`

---

## 🧪 Backend Setup & Run Instructions

### Python Setup

Install required libraries:

```bash
pip install lxml xmlschema
