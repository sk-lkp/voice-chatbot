@echo off
echo ========================================
echo Voice Bot Server Starter
echo ========================================
echo.

echo Checking if port 3000 is in use...
netstat -ano | findstr :3000 > nul
if %errorlevel% equ 0 (
    echo Port 3000 is in use. Stopping existing process...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
        taskkill /PID %%a /F > nul 2>&1
    )
    echo Process stopped.
    timeout /t 2 > nul
)

echo.
echo Starting Voice Bot server...
echo Server will be available at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

npm start 