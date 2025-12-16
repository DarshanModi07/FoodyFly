@echo off
REM FoodyFly Setup Script (Windows)

echo.
echo 🚀 FoodyFly Setup Script
echo ========================
echo.

REM Check if Node.js is installed
where /q node
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js v18 or higher.
    echo Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js version:
node --version
echo.
echo ✅ npm version:
npm --version
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)
echo ✅ Dependencies installed successfully
echo.

REM Run tests
echo 🧪 Running tests...
call npm test -- --passWithNoTests
echo.

REM Build project
echo 🔨 Building project...
call npm run build
if errorlevel 1 (
    echo ❌ Build failed
    pause
    exit /b 1
)
echo.

echo ✅ Setup completed successfully!
echo.
echo 📝 Next steps:
echo    1. Run 'npm start' to start the development server
echo    2. Open http://localhost:1234 in your browser
echo.
pause
