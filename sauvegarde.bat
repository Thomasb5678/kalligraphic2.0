@echo off
echo 🎨 Script de Sauvegarde Kalligraphic
echo ===================================

set timestamp=%date:~-4,4%-%date:~-10,2%-%date:~-7,2%_%time:~0,2%-%time:~3,2%-%time:~6,2%
set timestamp=%timestamp: =0%

set backup_folder=sauvegardes\backup_%timestamp%
echo Création du dossier de sauvegarde: %backup_folder%
mkdir "%backup_folder%" 2>nul

echo.
echo 📁 Sauvegarde des fichiers importants...

echo - Sauvegarde de data.js
copy "src\data\data.js" "%backup_folder%\data.js" >nul

echo - Sauvegarde du dossier images
xcopy "public\images" "%backup_folder%\images\" /E /I /Q >nul

echo - Sauvegarde de App.js
copy "src\App.js" "%backup_folder%\App.js" >nul

echo - Sauvegarde de package.json
copy "package.json" "%backup_folder%\package.json" >nul

echo.
echo ✅ Sauvegarde terminée dans: %backup_folder%
echo.
echo 💡 Conseil: Gardez régulièrement des sauvegardes de vos modifications
echo.
pause