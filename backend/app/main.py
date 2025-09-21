from fastapi import FastAPI
from app.routers import router
# from app.models import Base
# from app.database import engine

app = FastAPI(title="Employee Project Management API")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import routers

app = FastAPI()

# ✅ Allow frontend (Next.js) to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include employee routes
app.include_router(router)

# Don't create tables manually, Alembic will handle this
# Base.metadata.create_all(bind=engine)

