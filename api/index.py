import sys
import os
from pathlib import Path
import json

# 1. Authoritative Path Discovery
# We explicitly force the root path into sys.path to ensure 'backend' can be resolved
# regardless of where Vercel starts the function.
root_path = Path(__file__).parent.parent.absolute()
if str(root_path) not in sys.path:
    sys.path.insert(0, str(root_path))

# 2. Main API Ignition with Emergency Fallback
try:
    from backend.main import app as fastapi_app
    from mangum import Mangum
    
    # Authoritative Vercel Handler
    handler = Mangum(fastapi_app)
    app = fastapi_app
    
except Exception as e:
    import traceback
    # Emergency Diagnostic Handler
    # This prevents the raw 'FUNCTION_INVOCATION_FAILED' and gives us the real traceback
    def handler(event, context):
        return {
            "statusCode": 500,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({
                "status": "Archon Boot Failure",
                "error": str(e),
                "traceback": traceback.format_exc(),
                "path": str(root_path),
                "sys_path": sys.path
            })
        }
    app = handler

# Vercel's Python runtime searches for 'app' or 'handler' at the top level.
# We have both defined above.
