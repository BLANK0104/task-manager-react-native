@echo off
echo ========================================
echo Task Manager App - Project Setup
echo ========================================
echo.

echo Step 1: Installing npm dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install npm dependencies
    exit /b 1
)
echo.

echo Step 2: Checking for native project structure...
if exist "android\" (
    echo Android folder already exists. Skipping initialization.
    goto :skip_init
)

echo Step 3: Initializing React Native project structure...
echo This will create the android and ios folders...
call npx @react-native-community/cli init TaskManagerTemp --skip-install --pm npm
if %errorlevel% neq 0 (
    echo ERROR: Failed to initialize React Native project
    exit /b 1
)
echo.

echo Step 4: Moving native folders to project root...
if exist "TaskManagerTemp\android\" (
    move TaskManagerTemp\android . >nul
    echo - Moved android folder
)
if exist "TaskManagerTemp\ios\" (
    move TaskManagerTemp\ios . >nul
    echo - Moved ios folder
)
echo.

echo Step 5: Cleaning up temporary files...
rmdir /s /q TaskManagerTemp
echo.

:skip_init
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Run: npm start
echo 2. Run: npm run android (in a new terminal)
echo.
echo To build APK manually:
echo   cd android
echo   gradlew assembleDebug
echo.
echo To commit to GitHub:
echo   git add .
echo   git commit -m "Add native project structure"
echo   git push origin main
echo.
pause
