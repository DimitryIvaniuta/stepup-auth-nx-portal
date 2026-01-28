# stepup-auth-nx-portal

Nx + Vite monorepo for Step‑Up Authentication UI suite:
- `stepup-ui`: end-user banking UI (authorize + verify OTP + history)
- `admin-ui`: operations/admin console (risk decisions, challenges, outbox, monitoring events)
- shared libraries: `@shared/ui`, `@shared/api`

## Suggested backend endpoints
User:
- `POST /api/public/register`
- `POST /api/public/login`
- `POST /api/transactions/authorize` (headers: `X-Device-Id`, `X-Country`)
- `POST /api/stepup/{challengeId}/verify`
- `GET /api/me/risk-decisions` (new; for History page)

Admin:
- `GET /api/admin/risk-decisions`
- `GET /api/admin/stepup-challenges`
- `GET /api/admin/outbox`
- `POST /api/admin/outbox/{id}/retry`
- `GET /api/admin/monitoring/events`

If your backend uses different routes, update only:
- `libs/shared/api/src/lib/adminApi.ts`

## Run
```bash
npm i
npm run serve:stepup   # http://localhost:5173
npm run serve:admin    # http://localhost:5174
```

## Clickable compile errors in IntelliJ (recommended)
Use IntelliJ Run configurations (Compound) similar to your Nx example project:
- Run `nx serve <app>` in **Run** tool window (not Terminal)
- Run `tsc --watch` in **Run** tool window
IntelliJ will hyperlink `src/file.tsx(line,col)` locations automatically.
