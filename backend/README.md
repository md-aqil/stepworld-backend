# StepWorld Backend

Small Node + Express + TypeScript backend for managing **colleges** and **courses**.

## Stack

- Node.js + Express 4 (TypeScript)
- PostgreSQL + Prisma ORM
- Zod for validation
- Axios shared client (`src/lib/httpClient.ts`) with timeout + retries + request-id
- Helmet, CORS, Morgan

## Structure

```
backend/
 prisma/schema.prisma
 src/
    server.ts
    lib/         prisma + httpClient
    middleware/  error handler
    routes/      colleges, courses
    services/    business logic
    schemas/     zod validators
```

## Setup

```bash
cd backend
cp .env.example .env
# edit DATABASE_URL + FRONTEND_URL

npm install
npx prisma migrate dev --name init
npm run dev   # http://localhost:4000
```

## Endpoints

| Method | Path                          | Description                     |
|--------|-------------------------------|---------------------------------|
| GET    | `/health`                     | health check                    |
| GET    | `/api/colleges`               | list all colleges + courses     |
| POST   | `/api/colleges`               | create college (Zod validated)  |
| GET    | `/api/colleges/:slug`         | get college by slug             |
| PATCH  | `/api/colleges/:slug`         | update college                  |
| DELETE | `/api/colleges/:slug`         | delete college                  |
| GET    | `/api/colleges/:slug/courses` | list courses of a college       |
| GET    | `/api/courses?collegeSlug=`   | list courses (filter by college)|
| GET    | `/api/courses/:slug`          | get course                      |
| POST   | `/api/courses`                | create course                   |
| PATCH  | `/api/courses/:slug`          | update course                   |
| DELETE | `/api/courses/:slug`          | delete course                   |

## Architecture rules

- All external API calls go through `src/lib/httpClient.ts`.
- Frontend MUST call this backend via `/api/*` only — no third-party calls from the React app.
- API keys are stored in DB / `.env` and never exposed to the client.