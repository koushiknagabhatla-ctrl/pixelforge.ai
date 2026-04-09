import sys
import os
from pathlib import Path

# Force the project root into sys.path
# This ensures 'backend.main' is importable as a package
root_path = Path(__file__).parent.parent
if str(root_path) not in sys.path:
    sys.path.append(str(root_path))

try:
    # Explicit absolute import through the backend package
    from backend.main import handler
    app = handler
except ImportError as e:
    print(f"Bridge Primary Import Failed: {e}")
    # Fallback: try direct import if pathing is flat
    try:
        sys.path.append(str(root_path / "backend"))
        from main import handler
        app = handler
    except ImportError as e2:
        print(f"Bridge Fallback Critical Failure: {e2}")
        raise e2

# Export for Vercel
# Vercel's @vercel/python looks for 'app' or 'handler'
handler = app
