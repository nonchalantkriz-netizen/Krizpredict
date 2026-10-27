# Kriz MatchIQ V1 — Android APK project

Android WebView wrapper for the educational football-statistics app. It does not include bookmaker odds, betting recommendations, or wagering workflows.

## Features in the app
- Match/team inputs and screenshot upload with optional online OCR (Tesseract.js CDN).
- Transparent Poisson baseline probabilities and batch CSV tools.
- Chronological historical walk-forward backtesting with accuracy, Brier score, and log loss.
- Native CSV exports saved to `Downloads/KrizMatchIQ` on Android 10+.
- Responsive dark UI, launcher icon, local app assets, localStorage support, and Android file picker.

## Build an unsigned APK with GitHub Actions (phone-friendly route)
1. Extract this ZIP.
2. Create a new GitHub repository named `KrizMatchIQ` and upload the extracted **contents** (the `app` folder, `build.gradle`, `settings.gradle`, `.github` folder, etc.) to the repository root. Do not upload the ZIP as the only file.
3. Open the repository's **Actions** tab and run **Build unsigned APK** (or push to `main`/`master` to trigger it).
4. When the workflow finishes successfully, open the run, find **Artifacts**, and download `Kriz-MatchIQ-unsigned-APK`. Extract the artifact ZIP to get `app-release-unsigned.apk`.
5. Transfer that APK to your Android phone and open it in MT Manager. Use MT Manager's APK signing function to sign the unsigned APK, then install the signed output. Android may ask you to allow installs from that source.

The APK is unsigned by design so you can sign it in MT Manager. Keep a backup of the signed APK and use the same signing key for future updates; a different key may prevent in-place updates. Never share your signing key or its password.

## Build locally with Android Studio
Open this folder as an Android Studio project with JDK 17 and Android SDK Platform 35 installed. Run `:app:assembleRelease`. The unsigned output is `app/build/outputs/apk/release/app-release-unsigned.apk`.

## Notes and limitations
- This environment does not have Android SDK/build-tools installed, so no APK binary is claimed as built here. The included GitHub Actions workflow builds the unsigned APK for you.
- OCR needs internet on first use and may be inaccurate; check all extracted text.
- Imported statistics must be trustworthy. The model is a simple educational baseline, not a validated real-world forecasting system. Backtest metrics describe only the dataset used.
- The app does not fetch live scores or league results automatically.
- Minimum Android version: Android 10 (API 29).

## Tests
Run `node tests.js` in the web app source folder to test the baseline probability math. Tests do not establish predictive accuracy.
