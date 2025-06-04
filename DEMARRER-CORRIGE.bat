@echo off
echo 🔧 DÉMARRAGE SERVEUR CORRIGÉ - PLUS D'ERREUR !
echo ==============================================
echo.

REM Arrêter tous les processus Node.js existants
echo 🧹 Nettoyage des processus...
taskkill /f /im node.exe >nul 2>&1
timeout /t 2 >nul

REM Aller dans le bon répertoire
cd /d "C:\Users\Bousq\Desktop\kalligraphic"

echo ✅ Prêt à démarrer le serveur corrigé
echo.
echo 🎯 CE SERVEUR CORRIGE LES PROBLÈMES :
echo    ✅ Plus d'erreur "Invalid token"
echo    ✅ JavaScript généré toujours valide
echo    ✅ Synchronisation fonctionnelle
echo.

echo 🚀 Démarrage du serveur corrigé...
echo.

REM Démarrer le serveur corrigé
node server.js

echo.
echo Serveur arrêté.
pause
