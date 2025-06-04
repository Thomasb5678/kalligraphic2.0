@echo off
color 0A
cls
echo =====================================================================
echo                    KALLIGRAPHIC - DEMARRAGE FINAL
echo                        FINI LE BORDEL !
echo =====================================================================
echo.
echo ✅ UNE SEULE commande pour tout demarrer
echo ✅ Serveur definitif qui marche
echo ✅ Interface admin sans mot de passe
echo ✅ Synchronisation fonctionnelle
echo.

REM Arrêter tous les processus Node.js existants
echo Nettoyage des processus existants...
taskkill /f /im node.exe >nul 2>&1
taskkill /f /im npm.exe >nul 2>&1
timeout /t 2 >nul

echo.
echo Construction de l'application (si necessaire)...
if not exist build (
    echo Construction du build React...
    call npm run build
    if %errorlevel% neq 0 (
        echo ❌ Erreur lors de la construction
        pause
        exit /b 1
    )
) else (
    echo ✅ Build deja present
)

echo.
echo =====================================================================
echo                         DEMARRAGE DU SERVEUR
echo =====================================================================
echo.
echo 🚀 Lancement du serveur Kalligraphic...
echo.
echo URLS IMPORTANTES:
echo ================
echo.
echo 🌐 Site web      : http://localhost:3001
echo 👤 Interface admin : http://localhost:3001/admin
echo 📡 API de sante   : http://localhost:3001/api/health
echo.
echo ✅ Plus de mot de passe requis pour l'admin !
echo ✅ Synchronisation automatique entre admin et site !
echo.
echo POUR ARRETER : Appuyez sur Ctrl+C
echo.
echo =====================================================================
echo.

REM Démarrer le serveur final
node server.js

echo.
echo Serveur arrete.
pause
