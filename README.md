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

2) Configure environment (optional for local/dev)

Copy `.env.local` and set your Auth0 values. The app runs without Auth0 in dev (routes are unprotected and login controls are no-ops) but to use real Auth0:

- `VITE_AUTH0_DOMAIN=YOUR_TENANT.us.auth0.com`
- `VITE_AUTH0_CLIENT_ID=YOUR_CLIENT_ID`
- `VITE_AUTH0_AUDIENCE=YOUR_API_AUDIENCE` (optional)
- `VITE_APP_NAME=Task Manager TS`

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
- Task dashboard with search, filter (status/priority), and sort (created, due, title)
- Create, edit, delete tasks
- Task details view
- Auth0-based login/logout and protected routes (bypass in dev when Auth0 env not set)
- Typed forms with zod validation and react-hook-form
- Global state via React Context

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
