@echo off
echo ========================================
echo   PUSHING OWAIS PORTFOLIO TO GITHUB
echo ========================================
echo.
echo Your portfolio is ready to be pushed to GitHub!
echo Repository: https://github.com/HMMORKS/portfolio
echo.
echo Step 1: Attempting to push...
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo   AUTHENTICATION REQUIRED
    echo ========================================
    echo.
    echo The push failed due to authentication.
    echo Please choose one of these options:
    echo.
    echo OPTION 1 - GitHub CLI ^(Recommended^):
    echo   1. Install GitHub CLI from: https://cli.github.com/
    echo   2. Run: gh auth login
    echo   3. Run this script again
    echo.
    echo OPTION 2 - Personal Access Token:
    echo   1. Go to GitHub.com ^> Settings ^> Developer settings ^> Personal access tokens
    echo   2. Generate new token with repo permissions
    echo   3. Use token as password when prompted
    echo.
    echo OPTION 3 - GitHub Desktop:
    echo   1. Download GitHub Desktop from: https://desktop.github.com/
    echo   2. Sign in to your GitHub account
    echo   3. Clone your repository and sync files
    echo.
    echo Then run: git push -u origin main
    echo.
    pause
) else (
    echo.
    echo ========================================
    echo   SUCCESS! 
    echo ========================================
    echo.
    echo Your portfolio has been pushed to GitHub!
    echo.
    echo Next steps:
    echo 1. Go to https://github.com/HMMORKS/portfolio
    echo 2. Click Settings ^> Pages
    echo 3. Select 'main' branch as source
    echo 4. Your portfolio will be live at: https://HMMORKS.github.io/portfolio
    echo.
    pause
)