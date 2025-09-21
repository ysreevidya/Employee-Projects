# Employee Projects App

A full-stack demo application with:
- **Backend**: FastAPI + SQLAlchemy + Alembic + SQLite
- **Frontend**: Next.js + React

---

## 🚀 Project Structure
Employee-Projects/
│
├── backend/ # FastAPI backend
│ ├── app/ # main application code
│ ├── alembic/ # migrations
│ └── venv/ # virtual environment (ignored in git)
│
├── frontend/ # Next.js frontend
│ ├── pages/
│ ├── components/
│ └── node_modules/ # dependencies (ignored in git)
│
└── README.md


---

## ⚙️ Backend Setup (FastAPI)

1. **Navigate to backend folder**
   ```bash
   cd backend

2. **Create virtual environment (if not created)**
python3 -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows

3. **Install dependencies**
pip install -r requirements.txt

4. **Run migrations (Alembic + SQLite)**

To create migrations:
    alembic revision --autogenerate -m "init"

To apply migrations:
    alembic upgrade head

5. **Start backend server**
uvicorn app.main:app --reload

Backend will run on:
👉 http://127.0.0.1:8000

6. **API Docs available at**
    Swagger UI: http://127.0.0.1:8000/docs
    ReDoc: http://127.0.0.1:8000/redoc

---

## 🎨 Frontend Setup (Next.js + React)
1. **Navigate to Frontend**
cd frontend

2. **Install Dependencies**
npm install --legacy-peer-deps

3. **Start Development Server**
npm run dev


✅ Frontend will start at: http://localhost:3000

**🔗 Backend & Frontend Integration**
Frontend makes API requests to backend (http://127.0.0.1:8000)
Ensure backend is running before starting frontend

---

## 🛠 Useful Commands

**Alembic**
alembic revision --autogenerate -m "message"   # Create new migration
alembic upgrade head                           # Apply migrations

## SQLite
sqlite3 app.db        # Open database shell
.tables               # Show tables
.schema employees     # Show table schema

