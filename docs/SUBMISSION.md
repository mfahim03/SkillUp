# Capstone submission tracker

Repository visibility: **public** once published. Repository URL: `ADD_PUBLIC_GITHUB_URL_HERE`

Screenshots belong in `evidence/`. Capture screenshots from the running app (and Figma for design evidence), keeping the exact filenames below. Do not submit placeholder or recreated screenshots in place of the actual app/Figma evidence.

| # | Points | Submission item | Implementation / evidence location |
|---:|---:|---|---|
| 1 | 2 | Public GitHub repository link | `ADD_PUBLIC_GITHUB_URL_HERE` — publish this Git repository publicly |
| 2 | 9 | Nine user stories | [README.md](../README.md#user-stories) |
| 3 | 5 | Figma: login, registration, home, detail, favorites/profile | `evidence/figma-evidence1.png` (capture in Figma) |
| 4 | 4 | Figma: API, menu, settings, notifications | `evidence/figma-evidence2.png` (capture in Figma) |
| 5 | 4 | Signup implementation link | [`src/screens/AuthScreens.tsx`](../src/screens/AuthScreens.tsx) — `signup` and validation |
| 6 | 6 | Signup screen screenshot | `evidence/signup_screen_evidence.png` |
| 7 | 2 | Signup error screenshot | `evidence/signup_error.png` — show validation or duplicate-account error |
| 8 | 4 | Login implementation link | [`src/screens/AuthScreens.tsx`](../src/screens/AuthScreens.tsx) — `login` and credential check |
| 9 | 5 | Login screen screenshot | `evidence/login_screen_evidence.png` |
| 10 | 2 | Login error screenshot | `evidence/login_error.png` — show invalid credentials alert |
| 11 | 4 | Home implementation link | [`src/screens/HomeScreen.tsx`](../src/screens/HomeScreen.tsx) |
| 12 | 4 | Home screenshot with header logo | `evidence/home-screen-evidence.png` |
| 13 | 4 | Detail implementation link | [`src/screens/DetailScreen.tsx`](../src/screens/DetailScreen.tsx) |
| 14 | 2 | Home navigation icon screenshot | `evidence/evidence-detail-navigation.png` |
| 15 | 2 | Detail item screenshot | `evidence/evidence-detail-screen.png` |
| 16 | 4 | Local storage implementation link | [`src/storage.ts`](../src/storage.ts) |
| 17 | 2 | Local storage data screenshot | `evidence/evidence-persistence.png` (AsyncStorage inspector or exported snapshot) |
| 18 | 2 | Front-end and persisted data screenshot | `evidence/evidence-integrateScreen-persistence.png` |
| 19 | 4 | API implementation link | [`src/data.ts`](../src/data.ts) — `fetchLearningInspiration` |
| 20 | 2 | API data in app screenshot | `evidence/evidence-api-ux.png` |
| 21 | 4 | Settings menu implementation link | [`App.tsx`](../App.tsx) — tab menu |
| 22 | 2 | Settings menu icon screenshot | `evidence/evidence-menu-icon.png` |
| 23 | 5 | Settings menu items screenshot | `evidence/evidence-menu-items.png` |
| 24 | 4 | Settings implementation link | [`src/screens/SettingsScreen.tsx`](../src/screens/SettingsScreen.tsx) |
| 25 | 2 | Settings screen screenshot | `evidence/evidence-settings-screen.png` |
| 26 | 4 | Notification implementation link | [`src/notifications.ts`](../src/notifications.ts), [`src/screens/SettingsScreen.tsx`](../src/screens/SettingsScreen.tsx) |
| 27 | 2 | Notification configuration screenshot | `evidence/evidence-notification-configure.png` |
| 28 | 4 | Triggered test notification screenshot | `evidence/evidence-notification-alert.png` (physical device recommended) |

## GitHub links after publishing

Replace the repository placeholder above and submit permanent GitHub links to the listed source files. File paths are relative to the repository root. Screenshots #3 and #4 must be captured in Figma; the `design/` directory contains importable SVG wireframe starters and a screen brief, not Figma screenshots.

## Current evidence state

Evidence capture is pending. Sign-up/login, API data, local persistence, and notification flows require a running Expo app. OS permission prompts and delivered notification evidence require a real device or a supported simulator. The local demo credentials are stored as plain AsyncStorage data and are for course demonstration only.
