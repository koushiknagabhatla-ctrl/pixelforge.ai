import sys
from pathlib import Path
import json

# 1. Authoritative Path Discovery
root_path = Path(__file__).parent.parent
if str(root_path) not in sys.path:
    sys.path.append(str(root_path))

# 2. Main API Ignition with Emergency Fallback
try:
    from backend.main import handler
    app = handler
    # Vercel needs 'app' or 'handler' at the top level
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

# Exports for Vercel
# handler is already defined/imported
# app is already defined/aliased
