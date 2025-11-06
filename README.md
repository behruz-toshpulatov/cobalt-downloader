# Cobalt Downloader

This repository now contains a NestJS backend and a Next.js frontend that can be started together with a single command for a cohesive developer experience.

## Getting started

1. Install dependencies using your preferred Node package manager (the project is configured for `pnpm`, but `npm` or `yarn` work as well).
2. Copy `.env.example` to `.env` if you need to override defaults. At runtime the frontend reads `NEXT_PUBLIC_API_URL` and the backend reads `PORT`.
3. Run both the backend and frontend together:

```bash
pnpm install
pnpm dev
```

The backend listens on port **3001** and exposes a `/health` endpoint. The frontend runs on **3000** and fetches the backend welcome payload on load.

## Available scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Starts the NestJS backend (with hot reload via `ts-node-dev`) and the Next.js frontend (via `next dev`) concurrently. |
| `pnpm dev:backend` | Runs only the backend in watch mode. |
| `pnpm dev:frontend` | Runs only the frontend development server. |
| `pnpm build` | Builds both applications. |
| `pnpm build:backend` | Compiles the NestJS backend TypeScript sources into `backend/dist`. |
| `pnpm build:frontend` | Builds the Next.js frontend. |
| `pnpm start:backend` | Starts the compiled NestJS backend. |
| `pnpm start:frontend` | Starts the production Next.js server. |

## Project structure

```
backend/    # NestJS backend application
frontend/   # Next.js frontend application
scripts/    # Development utilities (combined dev orchestrator)
```

The frontend is configured with the Next.js App Router and fetches the backend root endpoint to display the service metadata. CORS is enabled on the backend to allow browser calls during development.
