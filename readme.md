## Here, the following dependencies added to the project:
- @mui/system

## Here, the following options added to tsconfig.json:
- "resolveJsonModule": true,

## Fixes and improvements:
- Since the "User" api service does not have a "User" default export, the import changed to "UserStoraProvider" in "src/api/services/index.tsx" file.
- typo "this.urser" is corrected. Styling required commas added in "src/api/services/User/store.ts" file.
- Language select menu added to AppHeader and the choosen language is saved inside "localStorage" in "src/components/AppHeader/index.tsx" and "src/i18n/i18n.tsx" files.
- Countdown logic corrected, and the latest value is now kept in localStorage so that once refreshed, the countdown will continue with the latest value in "src/components/AppHeader/index.tsx" file.
- getInitials improved, and commas added in "src/components/AvatarMenu/index.tsx" file.
- prop type changed as "any" inside the hook in "src/hooks/useMatchedRoute.tsx" file.
- German translations added in "src/i18n/locales/de.json" file.
- Indexing fixed and commas added in "src/pages/Home/index.tsx" file.
