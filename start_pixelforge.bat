@echo off
echo Starting PixelForge AI...

:: Start the Python Backend in a new window
echo Starting Backend Server...
start cmd /k "cd backend && python -m uvicorn main:app --reload --port 8000"

:: Start the React Frontend in a new window
echo Starting Frontend Server...
start cmd /k "cd frontend && npm run dev"

echo PixelForge AI has been launched in the background!
echo You can now open your browser to http://localhost:5173
pause
