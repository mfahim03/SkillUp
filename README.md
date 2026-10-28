# SkillUp — learn a little every day

SkillUp is a React Native (Expo) learning habit tracker built for the UVW Code Labs capstone. Browse bite-sized learning paths, save favorites, keep progress on device, and tune a daily reminder.

## User stories

1. As a learner, I want to create an account with a username, email, and password so my learning progress has a profile.
2. As a returning learner, I want to sign in with email and password so I can continue where I left off.
3. As a learner, I want to browse a home feed of learning paths so I can choose what to study next.
4. As a learner, I want to open a path and see its description, lessons, and progress so I know what I will learn.
5. As a learner, I want to save and revisit favorite paths so I can build a personal study list.
6. As a learner, I want my saved paths and progress to persist on my device so they are available next time I open the app.
7. As a learner, I want to see fresh learning inspiration from an external API so the home feed feels current.
8. As a learner, I want to change my profile and learning preferences in settings so the app fits my routine.
9. As a learner, I want to configure and receive a daily study reminder so I keep a consistent learning habit.

## Run locally

1. Install Node.js LTS and Expo Go (or Android Studio / Xcode).
2. Run `npm install`.
3. Run `npx expo start`; scan the QR code in Expo Go or press `a` / `i` for a simulator.

The app uses AsyncStorage for a local demo account, saved favorites, progress, and preferences. The explore feed fetches from DummyJSON and gracefully falls back to curated sample content while offline. Notifications use Expo Notifications; scheduling works on a physical device and may be limited in simulators. The local demo authentication is not a production identity provider.

## Project map

- `App.tsx` — navigation shell, authentication and app state
- `src/screens/AuthScreens.tsx` — login and registration validation
- `src/screens/HomeScreen.tsx` — home feed and API integration
- `src/screens/DetailScreen.tsx` — learning path details and progress action
- `src/screens/LibraryScreen.tsx` — favorites and profile
- `src/screens/SettingsScreen.tsx` — settings menu, preferences, reminders
- `src/storage.ts` — AsyncStorage persistence
- `src/notifications.ts` — notification permissions and scheduling
- `docs/SUBMISSION.md` — 28-task evidence and submission checklist
- `design/` — screen design brief and SVG wireframes suitable for importing into Figma

## Capstone submission checklist

See [docs/SUBMISSION.md](docs/SUBMISSION.md). Replace the repository placeholder with the public GitHub URL after publishing this repository. Capture the requested screenshots from the running app and Figma, then place them in `evidence/` using the exact filenames in that checklist.
