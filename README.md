# jxlabs PocketBase

This repository contains the PocketBase backend for JXLabs. It runs PocketBase in Docker, persists all app data in `pb_data/`, and uses a startup hook to create the initial superuser from environment variables when the database is empty.

The service is intended to sit behind Traefik and be exposed on the configured subdomain. The current setup is focused on keeping the backend simple, portable, and easy to redeploy without losing data.

## What it does

- Runs PocketBase as a containerized backend service.
- Persists the database and uploaded files in `pb_data/`.
- Seeds a default superuser from `DB_ADMIN_USER` and `DB_ADMIN_PASSWORD` the first time it starts.
- Connects to the shared `proxy` network for reverse proxying through Traefik.
- Uses `POCKETBASE_ENCRYPTION_KEY` for PocketBase encryption features.

## Configuration

Copy `env.example` to your local environment file and set the required values:

- `PB_VERSION` for the PocketBase image version.
- `DB_ADMIN_USER` and `DB_ADMIN_PASSWORD` for the initial admin account.
- `POCKETBASE_ENCRYPTION_KEY` for PocketBase encryption.

Optional tunnel-related values are also listed in `env.example` for the broader stack this service is part of.

## Run locally

Build and run with Docker Compose:

```bash
docker-compose up --build
```

Run in the background:

```bash
docker-compose up -d
```

Stop the container:

```bash
docker-compose down
```

## Direct Docker build

If you want to build the image without Compose:

```bash
docker build -t pocketbase-image -f Dockerfile.base .
docker run -p 8080:8080 -v ${PWD}/pb_data:/pb/pb_data pocketbase-image
```

## Notes

- The default superuser is only created when no matching account already exists.
- Keep `pb_data/` mounted and backed up if you want to preserve records and files across redeploys.
