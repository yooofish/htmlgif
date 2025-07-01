@echo off
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
  echo Killing PID %%a
  taskkill /PID %%a /F
)