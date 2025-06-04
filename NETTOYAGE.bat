@echo off
echo 🧹 NETTOYAGE AUTOMATIQUE DU PROJET KALLIGRAPHIC
echo ===============================================
echo.

REM Aller dans le bon répertoire
cd /d "C:\Users\Bousq\Desktop\kalligraphic"

echo 📂 Répertoire de travail: %CD%
echo.

echo 🗑️ Suppression des fichiers temporaires et de debug...

REM Supprimer les fichiers de debug et test
if exist "debug-api.js" del "debug-api.js" & echo ✅ debug-api.js supprimé
if exist "debug.html" del "debug.html" & echo ✅ debug.html supprimé
if exist "test-api.js" del "test-api.js" & echo ✅ test-api.js supprimé
if exist "serveur-test.js" del "serveur-test.js" & echo ✅ serveur-test.js supprimé
if exist "server-simple.js" del "server-simple.js" & echo ✅ server-simple.js supprimé

REM Supprimer les fichiers .bat temporaires
if exist "DIAGNOSTIC.bat" del "DIAGNOSTIC.bat" & echo ✅ DIAGNOSTIC.bat supprimé
if exist "REPARATION.bat" del "REPARATION.bat" & echo ✅ REPARATION.bat supprimé
if exist "REBUILD-SYNC.bat" del "REBUILD-SYNC.bat" & echo ✅ REBUILD-SYNC.bat supprimé
if exist "REBUILD-TEST.bat" del "REBUILD-TEST.bat" & echo ✅ REBUILD-TEST.bat supprimé
if exist "TEST-NOUVELLE-API.bat" del "TEST-NOUVELLE-API.bat" & echo ✅ TEST-NOUVELLE-API.bat supprimé
if exist "TEST-SYNC.bat" del "TEST-SYNC.bat" & echo ✅ TEST-SYNC.bat supprimé

REM Supprimer les fichiers de documentation temporaires
if exist "CORRECTION-SYNCHRONISATION.md" del "CORRECTION-SYNCHRONISATION.md" & echo ✅ CORRECTION-SYNCHRONISATION.md supprimé
if exist "PROBLEME-RESOLU.md" del "PROBLEME-RESOLU.md" & echo ✅ PROBLEME-RESOLU.md supprimé

REM Supprimer les serveurs obsolètes
if exist "server.js.backup" del "server.js.backup" & echo ✅ server.js.backup supprimé
if exist "server.js" (
    echo ⚠️ Remplacement de server.js par server-fixed.js...
    del "server.js"
    ren "server-fixed.js" "server.js"
    echo ✅ server.js mis à jour avec la version corrigée
)

echo.
echo 🗂️ Suppression des dossiers backup obsolètes...

REM Supprimer les dossiers backup
if exist "config.backup" rmdir /s /q "config.backup" & echo ✅ config.backup supprimé
if exist "controllers.backup" rmdir /s /q "controllers.backup" & echo ✅ controllers.backup supprimé
if exist "middlewares.backup" rmdir /s /q "middlewares.backup" & echo ✅ middlewares.backup supprimé
if exist "models.backup" rmdir /s /q "models.backup" & echo ✅ models.backup supprimé

echo.
echo 🧹 Nettoyage des fichiers backup data.js...

REM Compter et nettoyer les fichiers backup dans src/data
cd src\data
echo 📊 Fichiers backup data.js trouvés:
dir /b *.backup.* 2>nul | find /c /v "" 
echo.

REM Garder seulement les 3 derniers backups
echo 🔄 Conservation des 3 derniers backups seulement...
for /f "skip=3 delims=" %%i in ('dir /b /o-d *.backup.* 2^>nul') do (
    del "%%i" & echo ✅ %%i supprimé
)

cd ..\..

echo.
echo 📋 Nettoyage des fichiers de logs temporaires...
if exist "logs" (
    cd logs
    del *.log 2>nul & echo ✅ Logs temporaires supprimés
    cd ..
)

echo.
echo 🎯 NETTOYAGE TERMINÉ !
echo ===================
echo.
echo ✅ Fichiers de debug supprimés
echo ✅ Scripts de test supprimés  
echo ✅ Dossiers backup supprimés
echo ✅ server.js mis à jour avec la version corrigée
echo ✅ Backups data.js optimisés
echo ✅ Logs temporaires nettoyés
echo.
echo 🏆 VOTRE PROJET EST MAINTENANT PROPRE ET OPTIMISÉ !
echo.
echo 📁 FICHIERS ESSENTIELS CONSERVÉS:
echo    - server.js (version corrigée)
echo    - DEMARRER-CORRIGE.bat (serveur principal)
echo    - DEMARRER.bat (serveur de secours)
echo    - Tous les fichiers source (src/)
echo    - Build de production (build/)
echo    - Documentation (README.md, GUIDE-FINAL.md)
echo.

pause
