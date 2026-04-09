import sys
import os
from pathlib import Path

# 1. Authoritative Path Discovery
# We explicitly force the root path into sys.path to ensure 'backend' can be resolved
# regardless of where Vercel starts the function.
root_path = Path(__file__).parent.parent.absolute()
if str(root_path) not in sys.path:
    sys.path.insert(0, str(root_path))

# 2. Vercel-Native Export
# We no longer use Mangum or manual handlers. 
# Vercel's Python runtime detects the 'app' variable and handles the mapping automatically.
from backend.main import app
