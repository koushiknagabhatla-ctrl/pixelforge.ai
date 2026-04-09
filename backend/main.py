from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from dotenv import load_dotenv
import os

# Load environment variables FIRST before importing routers
load_dotenv()

from backend.routers import generate, upload, user, chat, tools

from fastapi import Request
from fastapi.responses import JSONResponse
import traceback

app = FastAPI(
    title="PixelForge AI API",
    version="2.0.0"
)

handler = Mangum(app)

# --- EMERGENCY FAIL-SAFE ---
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Captures all 500 errors and returns JSON instead of Vercel crash page."""
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Forge Error",
            "detail": str(exc),
            "traceback": traceback.format_exc() if os.getenv("DEBUG") else "Secret"
        }
    )

# --- EMERGENCY CORS RELIEVER ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Temporarily open for diagnostic purposes
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include refreshed routers
app.include_router(generate.router, prefix="/api", tags=["generation"])
app.include_router(upload.router, prefix="/api", tags=["upload"])
app.include_router(user.router, prefix="/api", tags=["user"])
app.include_router(chat.router, prefix="/api", tags=["chat"])
app.include_router(tools.router, prefix="/api", tags=["tools"])


@app.get("/")
async def root():
    return {
        "name": "PixelForge AI API",
        "status": "ready",
        "archon": "Active"
    }


@app.get("/api/health/")
async def health_check():
    """Diagnostic Hub for checking environment and services."""
    from backend.services.supabase_service import supabase_service
    from backend.services.gemini_service import gemini_service
    
    env_vars = ["SUPABASE_URL", "SUPABASE_SERVICE_KEY", "GEMINI_API_KEY", "CLOUDINARY_CLOUD_NAME"]
    missing = [v for v in env_vars if not os.getenv(v)]
    
    db_status = "Disconnected"
    if supabase_service.supabase:
        try:
            supabase_service.supabase.table("users").select("count").limit(1).execute()
            db_status = "Connected"
        except Exception as e:
            db_status = f"Error: {str(e)}"

    return {
        "status": "online",
        "database": db_status,
        "missing_env_vars": missing,
        "environment": os.getenv("VERCEL_ENV", "local")
    }
