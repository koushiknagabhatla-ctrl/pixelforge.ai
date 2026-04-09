import sys
import os
import traceback
from pathlib import Path

# 1. Authoritative Path Injection
# Ensure project root is in sys.path for absolute 'backend' imports
root_path = Path(__file__).parent.parent
if str(root_path) not in sys.path:
    sys.path.append(str(root_path))

# 2. Main API Ignition
try:
    from backend.main import handler as mangum_handler
    app = mangum_handler
except Exception as e:
    # 3. Emergency Diagnostic Fallback
    # If the app fails to boot, return the traceback directly
    from fastapi import FastAPI
    from fastapi.responses import JSONResponse
    from mangum import Mangum
    
    debug_app = FastAPI()
    
    @debug_app.get("/api/health/")
    async def bridge_emergency():
        return JSONResponse(
            status_code=500,
            content={
                "error": "Backend Boot Failure",
                "detail": str(e),
                "traceback": traceback.format_exc()
            }
        )
    
    app = Mangum(debug_app)

# Authoritative Vercel Export
handler = app
