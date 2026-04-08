from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Load environment variables FIRST before importing routers
load_dotenv()

from routers import generate, upload, user, chat, tools

app = FastAPI(
    title="PixelForge AI API",
    description="Imagen 3 powered image generation engine",
    version="2.0.0",
)

# Enhanced CORS for production reliability
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://pixelforge-ai.vercel.app", # Replace with your actual Vercel project name
        "*", 
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include refreshed routers
app.include_router(generate.router)
app.include_router(upload.router)
app.include_router(user.router)
app.include_router(chat.router)
app.include_router(tools.router)


@app.get("/")
async def root():
    return {
        "name": "PixelForge AI API",
        "engine": "Imagen 3 + Gemini 1.5 Flash",
        "status": "ready",
    }


@app.get("/health")
async def health():
    return {"status": "healthy"}
