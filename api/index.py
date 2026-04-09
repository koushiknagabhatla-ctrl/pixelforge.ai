import sys
from pathlib import Path

# 1. Authoritative Path Discovery
# Ensure project root is in sys.path for absolute 'backend' imports
root_path = Path(__file__).parent.parent
if str(root_path) not in sys.path:
    sys.path.append(str(root_path))

# 2. Main API Ignition
# We import directly at the top level to ensure Vercel's static analyzer
# can reliably find the 'app' and 'handler' exports.
from backend.main import handler

# Authoritative Vercel Exports
app = handler
# handler is already imported above
