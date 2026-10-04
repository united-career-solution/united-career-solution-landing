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
widget. Server-side code (MongoDB connection, models, auth) lives in `lib/`.

## Getting started

```bash
cp .env.example .env.local   # then fill in the values
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). A MongoDB instance is
required for the contact form and the admin panel.

## Environment variables

| Name | Purpose |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign admin login tokens |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Admin account created on first DB connection if no admin exists |

To reset the admin account against a local database, run
`node scripts/reset-admin.mjs`.

## Deployment

The `Deploy Landing Page` workflow builds the standalone output, copies it to
`/var/www/united-career-solution/landing` and restarts it with PM2 using the
`ecosystem.config.js` on the server (port 5000). The server's PM2 config must
provide all the environment variables above.

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
