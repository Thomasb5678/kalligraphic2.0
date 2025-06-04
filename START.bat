@echo off
echo 🚀 KALLIGRAPHIC - DÉMARRAGE
echo ===========================
echo.

REM Arrêter tous les processus Node.js existants
echo 🧹 Nettoyage des processus...
taskkill /f /im node.exe >nul 2>&1
timeout /t 2 >nul

REM Aller dans le bon répertoire
cd /d "C:\Users\Bousq\Desktop\kalligraphic"

echo ✅ Démarrage du serveur Kalligraphic...
echo.
echo 📍 Site web    : http://localhost:3001
echo 👤 Admin       : http://localhost:3001/admin
echo 📡 API Data    : http://localhost:3001/api/data
echo.
echo 🔥 POUR ARRÊTER : Ctrl+C
echo.

REM Démarrer le serveur
node server.js

echo.
echo Serveur arrêté.
pause
