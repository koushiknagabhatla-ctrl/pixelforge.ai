from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routers import enhance, upload, user, chat

load_dotenv()

app = FastAPI(
    title="PixelForge AI API",
    description="AI-powered image enhancement backend",
    version="1.0.0",
)

# CORS — Enhanced for Production Deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "*", # Allow all origins for initial production stability; restrict this in high-security environments
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(enhance.router)
app.include_router(upload.router)
app.include_router(user.router)
app.include_router(chat.router)


@app.get("/")
async def root():
    return {
        "name": "PixelForge AI API",
        "version": "1.0.0",
        "status": "running",
    }


@app.get("/health")
async def health():
    return {"status": "healthy"}
