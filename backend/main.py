from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import traceback

# 1. Indestructible Shadow Foundation (v3.6.1 - FINAL SYNC)
app = FastAPI(
    title="PixelForge AI Pinnacle Engine",
    version="4.0.0",
    docs_url="/docs",
    openapi_url="/openapi.json",
    redirect_slashes=False 
)

# 2. Universal CORS Handshake
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Global Exception Shield
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Forge Crash",
            "detail": str(exc),
            "v": "3.6.1"
        }
    )

# 4. Global Diagnostic Hub
@app.get("/api/health")
@app.get("/api/health/")
@app.get("/health")
@app.get("/health/")
async def health_check():
    """Archon v4.0 - GROQ-STRIKE DIAGNOSTIC"""
    try:
        from backend.services.supabase_service import supabase_service
        db_connected = False
        if supabase_service.supabase:
            try:
                supabase_service.supabase.table("users").select("count").limit(1).execute()
                db_connected = True
            except Exception: pass

        return {
            "status": "online" if db_connected else "degraded",
            "v": "4.0.0",
            "handshake": "Optimized",
            "database": db_connected
        }
    except Exception as e:
        return {"status": "offline", "error": str(e)}

# 5. QUADRANT ROUTING
try:
    from backend.routers import generate, upload, user, chat, tools
    
    # Authoritative API Space
    app.include_router(generate.router, prefix="/api/generate", tags=["generation"])
    app.include_router(upload.router, prefix="/api/upload", tags=["upload"])
    app.include_router(user.router, prefix="/api/user", tags=["user"])
    app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
    app.include_router(tools.router, prefix="/api/tools", tags=["tools"])
    
    # Shadow Support (Agnostic Synchronization)
    app.include_router(generate.router, prefix="/generate", tags=["shadow"])
    app.include_router(upload.router, prefix="/upload", tags=["shadow"])
    app.include_router(user.router, prefix="/user", tags=["shadow"])
    app.include_router(chat.router, prefix="/chat", tags=["shadow"])
    app.include_router(tools.router, prefix="/tools", tags=["shadow"])

    # EMERGENCY BRIDGES (Resolved Frontend Mismatch)
    # This allows /api/credits/ID to work even without /user/ prefix
    app.include_router(user.router, prefix="/api", tags=["bridge"])
    app.include_router(user.router, prefix="", tags=["bridge_shadow"])
    
except Exception as e:
    print(f"SYNC IGNITION FAILURE: {e}")

@app.get("/")
async def root():
    return {"status": "PixelForge Engine Ready", "version": "4.0.0"}
