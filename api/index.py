import os
import sys
import json

def handler(environ, start_response):
    """
    The Oracle Probe: Zero-Dependency WSGI Diagnostic Handler.
    Used to find root-level Python crashes in Vercel Serverless.
    """
    # 1. Capture Environment State
    diag_info = {
        "status": "oracle_online",
        "python_version": sys.version,
        "cwd": os.getcwd(),
        "sys_path": sys.path,
        "installed_packages": [],
        "env_vars": {k: "set" for k in os.environ},
        "path_to_index": __file__
    }

    # 2. Try to list site-packages
    try:
        import pkg_resources
        diag_info["installed_packages"] = [str(d) for d in pkg_resources.working_set]
    except Exception as e:
        diag_info["installed_packages_error"] = str(e)

    # 3. Prepare Response
    response_body = json.dumps(diag_info, indent=2).encode('utf-8')
    status = '200 OK'
    response_headers = [
        ('Content-Type', 'application/json'),
        ('Content-Length', str(len(response_body)))
    ]
    
    start_response(status, response_headers)
    return [response_body]

# Export for Vercel
# Vercel's @vercel/python looks for 'app' or 'handler' or 'index'
app = handler
