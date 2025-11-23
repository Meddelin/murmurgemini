@echo off
start "PetShop Backend" /D backend npm run dev
start "PetShop Frontend" /D frontend npm run dev
echo Pet Shop is running!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
pause


