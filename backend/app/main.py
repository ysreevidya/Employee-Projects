from fastapi import FastAPI
from . import models
from .database import engine
from .routers import router

app = FastAPI(title="Employee Project Management API")

# Create DB tables (only for dev; later Alembic handles migrations)
models.Base.metadata.create_all(bind=engine)

# Include employee router
app.include_router(router)

# @app.get("/")
# def read_root():
#     return {"message": "Welcome to Employee Project Management API"}

# @app.get("/health")
# def health_check():
#     return {"status": "ok"}
