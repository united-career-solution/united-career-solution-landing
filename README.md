# United Career Solutions

One Next.js app that serves the public website, the admin panel and the API
(previously three separate repos/PM2 processes: landing, admin, api).

| Path | What |
|---|---|
| `/`, `/about`, `/contact`, `/employer`, `/candidate` | Public website — `app/(site)/` |
| `/admin/login`, `/admin/dashboard` | Admin panel — `app/admin/` |
| `/api/contact`, `/api/admin/*` | API route handlers — `app/api/` |

The site and the admin panel each have their own root layout, so the admin
panel keeps its own styles and does not show the site's navbar, footer or chat
widget. Server-side code (SQLite connection, models, auth) lives in `lib/`.

## Getting started

```bash
cp .env.example .env.local   # then fill in the values
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Node.js 24 is required. Set SQLITE_PATH in the environment to a writable SQLite file path; the parent directory must already exist.

## Environment variables

| Name | Purpose |
|---|---|
| `SQLITE_PATH` | SQLite file path; relative paths resolve from the working directory |
| `MONGODB_URI` | MongoDB connection string, used only by the migration script |
| `JWT_SECRET` | Secret used to sign admin login tokens |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Admin account created on first DB connection if no admin exists |

To migrate existing MongoDB data, install MongoDB Shell (`mongosh`) and use Node.js
24. Set `SQLITE_PATH` and `MONGODB_URI` in `.env.local` or `.env`, then run
`node scripts/migrate-mongodb.mjs` from the application directory before starting
the app. No npm packages are needed. The destination tables
must be empty; migration preserves IDs and password hashes and is transactional.
Stop writes to MongoDB during migration. Back up the databases before migrating.
The deploy action copies the script to
`/var/www/united-career-solution/landing/scripts/migrate-mongodb.mjs`. It reads
relative SQLite paths from the current working directory. The deployed app must
be stopped before migration; it creates an admin on its first database access.

To reset the admin account using the configured credentials, run
`node scripts/reset-admin.mjs`.

## Deployment

The `Deploy Landing Page` workflow builds the standalone output, copies it to
`/var/www/united-career-solution/landing` and restarts it with PM2 using the
`ecosystem.config.js` on the server (port 5000).

The environment variables above go in `/var/www/united-career-solution/landing/.env`
on the server (same format as `.env.example`). The standalone `server.js` loads
it automatically on start, and deploys don't overwrite it. Don't also set these
variables in `ecosystem.config.js`: values set there take precedence over `.env`.
Store the SQLite file outside the deployment directory so deployments do not overwrite it.
After editing `.env`, restart the app (`pm2 restart ecosystem.config.js`).

### Redirecting the old subdomains

The admin panel and API used to run on their own subdomains. Point those at
the merged app with nginx (keep each block's existing `listen 443 ssl` and
certificate lines):

```nginx
server {
    server_name admin.unitedcareersolution.com;
    # Old admin paths (/login, /dashboard) now live under /admin
    return 301 https://unitedcareersolution.com/admin$request_uri;
}

server {
    server_name api.unitedcareersolution.com;
    # API paths are unchanged; 308 keeps the request method and body (POST etc.)
    return 308 https://unitedcareersolution.com$request_uri;
}
```

The old `api` and `admin` PM2 processes can then be removed
(`pm2 delete <name> && pm2 save`).
