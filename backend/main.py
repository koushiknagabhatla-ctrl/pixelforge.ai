from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import traceback

# 1. Direct Ignition Foundation (v3.5)
# We remove root_path and shadow routing to let Vercel manage the /api/ mapping.
app = FastAPI(
    title="PixelForge AI Production Engine",
    version="3.5.0",
    docs_url="/docs",
    openapi_url="/openapi.json",
    redirect_slashes=False
)

# 2. Universal Handshake (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Exception Shield
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "error": "Forge Internal Crash",
            "detail": str(exc),
            "traceback": traceback.format_exc() if os.getenv("VERCEL_ENV") != "production" else "Check Runtime Logs"
        }
    )

# 4. Diagnostic Oracle (v3.5)
@app.get("/health")
@app.get("/health/")
async def health_check():
    """Archon v3.5 - FINAL IGNITION"""
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
            "v": "3.5",
            "mode": "Direct Ignition",
            "database": db_connected,
            "handshake": "Verified"
        }
    except Exception as e:
        return {"status": "offline", "error": str(e)}

# 5. Authoritative Router Inclusion
# We use standard prefixes. Vercel's rewrite /api/(.*) -> api/index.py 
# means the frontend's /api/user/ensure hits here as /user/ensure.
try:
    from backend.routers import generate, upload, user, chat, tools
    app.include_router(generate.router, prefix="/generate", tags=["generation"])
    app.include_router(upload.router, prefix="/upload", tags=["upload"])
    app.include_router(user.router, prefix="/user", tags=["user"])
    app.include_router(chat.router, prefix="/chat", tags=["chat"])
    app.include_router(tools.router, prefix="/tools", tags=["tools"])
except Exception as e:
    print(f"IGNITION CRITICAL ERROR: {e}")

@app.get("/")
async def root():
    return {"status": "PixelForge Engine Ready", "version": "3.5.0"}
