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
    version="2.1.0",
    docs_url="/api/docs",
    openapi_url="/api/openapi.json"
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
@app.get("/api/health/")
async def health_check():
    """Diagnostic Hub to expose environment status without crashing."""
    try:
        from backend.services.supabase_service import supabase_service
        
        env_vars_to_check = [
            "SUPABASE_URL", "SUPABASE_SERVICE_KEY", 
            "GEMINI_API_KEY", "CLOUDINARY_CLOUD_NAME",
            "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"
        ]
        
        present_vars = [v for v in env_vars_to_check if os.getenv(v)]
        
        db_connected = False
        db_error = None
        if supabase_service.supabase:
            try:
                supabase_service.supabase.table("users").select("count").limit(1).execute()
                db_connected = True
            except Exception as e:
                db_error = str(e)

        return {
            "status": "online" if db_connected else "degraded",
            "env_vars_present": present_vars,
            "database_connected": db_connected,
            "database_error": db_error,
            "vercel_env": os.getenv("VERCEL_ENV", "local")
        }
    except Exception as e:
        return JSONResponse(
            status_code=503,
            content={
                "status": "error",
                "message": "Health Hub Initialization failure",
                "error": str(e),
                "traceback": traceback.format_exc()
            }
        )

# 5. Deferred Router Loading
# This prevents one broken router from killing the entire API initialization
try:
    from backend.routers import generate, upload, user, chat, tools
    app.include_router(generate.router, prefix="/api", tags=["generation"])
    app.include_router(upload.router, prefix="/api", tags=["upload"])
    app.include_router(user.router, prefix="/api", tags=["user"])
    app.include_router(chat.router, prefix="/api", tags=["chat"])
    app.include_router(tools.router, prefix="/api", tags=["tools"])
except Exception as e:
    print(f"ROUTER LOADING ERROR: {e}")

@app.get("/")
async def root():
    return {"status": "PixelForge Engine Ready", "archon": "Active"}

handler = Mangum(app)
