from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from mangum import Mangum
from dotenv import load_dotenv
import os
import traceback
import importlib

# 1. Immediate Environment Loading
load_dotenv()

app = FastAPI(
    title="PixelForge AI Production Engine",
    version="3.3.0",
    docs_url="/docs",
    openapi_url="/openapi.json",
    root_path="/api",
    redirect_slashes=False
)

# 2. Universal CORS Relief
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Global Emergency Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Forge Crash",
            "detail": str(exc),
            "traceback": traceback.format_exc()
        }
    )

# 4. Emergency Diagnostic Hub (User Requested Format)
@app.get("/health/")
async def health_check():
    """Archon v3.3 Diagnostic Oracle"""
    try:
        from backend.services.supabase_service import supabase_service
        
        env_status = {
            "SUPABASE_URL": bool(os.getenv("SUPABASE_URL")),
            "SUPABASE_KEY": bool(os.getenv("SUPABASE_SERVICE_KEY")),
            "GEMINI_KEY": bool(os.getenv("GEMINI_API_KEY")),
            "CLOUDINARY": bool(os.getenv("CLOUDINARY_API_KEY"))
        }
        
        db_connected = False
        if supabase_service.supabase:
            try:
                supabase_service.supabase.table("users").select("count").limit(1).execute()
                db_connected = True
            except Exception: pass

        return {
            "status": "online" if db_connected else "degraded",
            "archon_v3_3": "Active",
            "routing": "Zero-Config (root_path=/api)",
            "environment_keys": env_status,
            "database_connected": db_connected,
            "deployment": os.getenv("VERCEL_ENV", "local")
        }
    except Exception as e:
        return JSONResponse(
            status_code=503,
            content={
                "status": "error",
                "message": "Archon Ignition Failure",
                "detail": str(e)
            }
        )

# 5. Deferred Router Loading
# We use empty prefixes internally because Vercel/Frontend already provide the /api/ scoping.
try:
    from backend.routers import generate, upload, user, chat, tools
    app.include_router(generate.router, prefix="", tags=["generation"])
    app.include_router(upload.router, prefix="", tags=["upload"])
    app.include_router(user.router, prefix="", tags=["user"])
    app.include_router(chat.router, prefix="", tags=["chat"])
    app.include_router(tools.router, prefix="", tags=["tools"])
except Exception as e:
    print(f"ROUTER LOADING ERROR: {e}")

@app.get("/")
async def root():
    return {"status": "PixelForge Engine Ready", "archon": "Active", "mode": "Ironclad Routing"}

handler = Mangum(app)
