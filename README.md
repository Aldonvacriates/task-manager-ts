# Task Manager TS (React + TypeScript + Auth0)

A typed task management app demonstrating:

- React + TypeScript
- Auth0 authentication (optional in dev)
- React Router routing with protected routes
- Context API for global state
- zod + react-hook-form validation
- LocalStorage CRUD service (swap for REST later)

## Requirements
- Node 18+

## Getting Started
1) Install dependencies
```bash
npm install
```

2) Configure environment

An `.env.local` file is included with your Auth0 tenant settings:

- `VITE_AUTH0_DOMAIN=dev-qsutcgxzzeccn0t3.us.auth0.com`
- `VITE_AUTH0_CLIENT_ID=6tZmcQPmhREpmvlMNLf5cNOjttUSAJr3`
- `VITE_AUTH0_AUDIENCE=` (optional, set if you expose a secured API)
- `VITE_AUTH0_REDIRECT_URI=http://localhost:5173/callback`
- `VITE_AUTH0_LOGOUT_URI=http://localhost:5173`
- `VITE_APP_NAME=Task Manager TS`

Update these values if you regenerate credentials. When Auth0 variables are omitted the UI automatically drops into a dev-friendly anonymous mode so you can continue working offline.

3) Run
```bash
npm run dev
```

Open the printed URL (typically http://localhost:5173).

## Scripts
- `npm run dev` – start Vite dev server
- `npm run build` – type-check and build for production
- `npm run preview` – preview production build
- `npm run lint` – run eslint

## Features
- Task dashboard with typed filters (search/status/priority/sort) backed by URL state
- Create, edit, and delete tasks with zod + react-hook-form validation
- Detailed task view with metadata (status, priority, due, created/updated)
- Auth0-based login/logout with protected routes
- Global task store via React Context and typed hooks
- Landing, sign-in, and sign-up pages styled for the experience

## Auth0 Configuration
1. In the [Auth0 Dashboard](https://manage.auth0.com/), create a **Single Page Application**.
2. Add the following URLs to your application settings:
   - **Allowed Callback URLs**: `http://localhost:5173/callback`
   - **Allowed Logout URLs**: `http://localhost:5173`
   - **Allowed Web Origins**: `http://localhost:5173`
3. Copy the Domain and Client ID into `.env.local` (values already provided above).
4. Restart the dev server after updating environment variables so Vite picks them up.

## Project Structure
- `src/types` – TypeScript interfaces (e.g., `Task`)
- `src/services` – `taskService` for LocalStorage CRUD
- `src/context` – `TaskProvider` and typed hooks
- `src/auth` – Auth0 provider wrapper, protected route, and safe hook
- `src/pages` – Dashboard, TaskCreate, TaskEdit, TaskDetails
- `src/components` – UI components (NavBar, TaskList, FiltersBar, etc.)
- `src/errors` – Error boundary
- `src/lib` – Query parsing/serialization helpers

## Auth0 Notes
- The app uses `@auth0/auth0-react` with a router-aware provider.
- When `VITE_AUTH0_DOMAIN` and `VITE_AUTH0_CLIENT_ID` are missing, the app falls back to a dev mode: routes are accessible, login/logout are no-ops, and `useAuth0` consumers use a safe wrapper.

## Future Enhancements
- Replace LocalStorage with a real API (preserve types and validation)
- Add pagination and bulk operations
- Add unit/integration tests
