import sys
import os
import traceback
from pathlib import Path

# 1. Authoritative Path Resolution
# Add project root to sys.path to resolve 'backend' package
root_path = Path(__file__).parent.parent
if str(root_path) not in sys.path:
    sys.path.append(str(root_path))

# 2. Bridge-Level Exception Catching
# If the backend fails to load, we want to see EXACTLY why (e.g. ModuleNotFoundError)
try:
    from backend.main import handler as mangum_handler
    app = mangum_handler
except Exception as e:
    print(f"CRITICAL BACKEND STARTUP FAILURE: {str(e)}")
    print(traceback.format_exc())
    
    # Fallback to a bare-bones FastAPI app to report the error via HTTP
    from fastapi import FastAPI
    from fastapi.responses import JSONResponse
    
    app = FastAPI()
    
    @app.get("/api/health/")
    async def health_emergency():
        return JSONResponse(
            status_code=500,
            content={
                "status": "emergency_bridge_active",
                "error": str(e),
                "traceback": traceback.format_exc(),
                "cwd": os.getcwd(),
                "sys_path": sys.path
            }
        )
    
    from mangum import Mangum
    app = Mangum(app)

# Export for Vercel
handler = app
