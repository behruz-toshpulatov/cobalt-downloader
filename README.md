# Cobalt Downloader

This repository pairs a NestJS backend with a Next.js frontend. Both layers can be started together with a single command while still being able to run independently when required.

## Getting started

1. Install dependencies with your preferred Node package manager (`pnpm` is recommended and configured in `package.json`).
2. Copy `.env.example` to `.env` to override defaults such as the backend port or API base URL.
3. Launch both servers concurrently:

```bash
pnpm install
pnpm dev
```

The backend listens on **3001** by default and exposes its routes under the `/api` prefix:

- `GET /api/meta` – service metadata used by the frontend splash screen
- `GET /api/health` – JSON health probe that includes a timestamp
- `GET /docs` – interactive Swagger UI generated from the NestJS controllers

The Next.js frontend runs on **3000** and surfaces backend availability plus a shortcut to the API documentation.

## Available scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Starts the NestJS backend (with hot reload) and the Next.js frontend concurrently. |
| `pnpm dev:backend` | Runs only the backend in watch mode using `ts-node-dev`. |
| `pnpm dev:frontend` | Runs only the Next.js development server. |
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

The backend is configured with `@nestjs/config` for environment-driven metadata and `@nestjs/swagger` for generated API documentation. The frontend fetches from the configured API base URL (`NEXT_PUBLIC_API_URL`, defaulting to `http://localhost:3001/api`) and gracefully reports connection issues.
