# Task Manager TS

A typed task manager built with React 19, TypeScript and Vite, with Auth0 login, protected routes and filters that live in the URL. It is a frontend-only project for practicing typed React patterns; tasks are stored in the browser's localStorage, not on a server.

**Live demo:** https://task-manager-ts-six.vercel.app

Personal project, built in November 2025.

## Features

- Create, view, edit and delete tasks with a title, description, status (to do / in progress / done), priority (low / medium / high) and optional due date
- Search by title or description, filter by status and priority, and sort by created date, due date or title (ascending or descending)
- Filter, search and sort state is kept in URL query params, so a filtered view can be bookmarked or shared and survives a refresh
- Auth0 login and logout; the dashboard, task pages and profile page are behind a protected route
- Tasks persist across reloads in localStorage
- Storage errors are shown in a dismissible banner, and an app-level error boundary (`AppErrorBoundary`) wraps the router and providers

## Tech stack

React 19, TypeScript 5.9, Vite 7, React Router 7, Auth0 (`@auth0/auth0-react`), react-hook-form, zod 4, ESLint. Deployed on Vercel.

## How it works

- **Protected routes with an Auth0 fallback.** `src/auth/AuthenticationGuard.tsx` wraps the private routes in `src/routes.tsx` and redirects signed-out users to `/login`. The Auth0 provider (`src/auth/Auth0Provider.tsx`) sits inside the router so it can navigate after the login redirect. If the Auth0 domain or client ID is missing, the provider is skipped, protected routes render directly and the `useOptionalAuth` hook (`src/auth/useAuth.ts`) returns a signed-out stub, so the app still runs locally without an Auth0 tenant.
- **URL as the source of truth for filters.** `src/lib/query.ts` parses and serializes the `q`, `status`, `priority`, `sort` and `dir` params. `src/pages/Dashboard.tsx` reads them with `useSearchParams` and derives the filtered, sorted list with `useMemo` instead of keeping a separate copy in state.
- **Context store over a storage service.** `src/context/TaskContext.tsx` provides tasks plus `create` / `update` / `remove` through a typed `useTasks` hook. It calls `src/services/taskService.ts`, which reads and writes the `tm_tasks_v1` localStorage key and throws a `TaskServiceError` on bad or unwritable data; the context turns that into an error message for the UI. Components read and write tasks through the context; the one direct call is the dashboard using `taskService.seed()` to add a sample task when storage is empty.
- **Schema-validated forms.** `src/validation/taskSchema.ts` defines the task schema in zod, and the New Task and Edit Task pages (`src/pages/TaskCreate.tsx`, `src/pages/TaskEdit.tsx`) use it through react-hook-form's `zodResolver`. The quick-add form on the dashboard (`src/components/TaskForm.tsx`) uses plain controlled inputs instead.

## Getting started

Prerequisites: Node.js 20.19+ or 22.12+ (required by Vite 7) and npm.

```bash
npm install
cp .env.example .env.local   # then fill in your Auth0 values
npm run dev                  # http://localhost:5173
```

### Environment variables

See [`.env.example`](.env.example):

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_AUTH0_DOMAIN` | for login | Auth0 tenant domain |
| `VITE_AUTH0_CLIENT_ID` | for login | Auth0 SPA client ID |
| `VITE_AUTH0_AUDIENCE` | no | API audience, only if you call a protected API |
| `VITE_AUTH0_REDIRECT_URI` | no | Login callback URL (defaults to the current origin) |
| `VITE_AUTH0_LOGOUT_URI` | no | Where to return after logout (defaults to the current origin) |

To set up Auth0, create a **Single Page Application** in the [Auth0 Dashboard](https://manage.auth0.com/) and add:

- Allowed Callback URLs: `http://localhost:5173/callback`
- Allowed Logout URLs: `http://localhost:5173`
- Allowed Web Origins: `http://localhost:5173`

Restart the dev server after changing env vars.

### Scripts

- `npm run dev` - start the Vite dev server
- `npm run build` - type-check (`tsc -b`) and build for production
- `npm run preview` - serve the production build
- `npm run lint` - run ESLint

There are no automated tests yet; `npm run lint` and `npm run build` are the current checks.

## Project structure

```
src/
  auth/         Auth0 provider, protected route, useOptionalAuth hook
  components/   NavBar, FiltersBar, TaskList, TaskCard, TaskForm, ...
  context/      TaskProvider and useTasks
  errors/       AppErrorBoundary
  lib/          URL query parsing and serialization
  pages/        Dashboard, TaskCreate, TaskEdit, TaskDetails, Profile, auth pages
  services/     taskService (localStorage CRUD)
  types/        Task types
  validation/   zod schemas
```

## What I'd improve next

- Add a route `errorElement`. Render errors inside a route currently show React Router's default error screen instead of `AppErrorBoundary`.
- Replace localStorage with a real API. Tasks are stored per browser and are not filtered by the signed-in user, even though each task records an `ownerId`.
- Add unit tests for `taskService` and `lib/query.ts`.
- Validate URL params in `parseQuery` (they are currently cast, not checked) and move the dashboard quick-add form onto the shared zod schema.
- Remove leftovers: the unused `src/App.jsx` and the `@sentry/*` dependencies, which are installed but not wired up.
