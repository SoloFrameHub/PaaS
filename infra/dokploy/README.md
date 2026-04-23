# infra/dokploy — operational notes

State lives in `state.json` (project + service IDs on dokploy2 for solofame-prod).
Apply records live in `migrations-applied.json` (see that file for the full audit).

## Migration runbook (postgres-primary)

Dokploy on this VPS runs its managed Postgres under Docker Swarm. Every
mutation of the database config through the REST API (`.saveExternalPort`,
`.saveEnvironment`, `.update`, `.saveExternalPort` → null) triggers
`docker service update`, which is a rolling restart of the Postgres task.

On 2026-04-23 we observed **five** task recreations in a ~7-minute window
after calling `.saveExternalPort` once. The Docker Swarm task IDs rolled
through `bu9x…`, `yt11…`, `2q0b…`, `bdp7…`, `shal…`. The first 0001 apply
landed on one of those tasks and was visible in-session (`COMMIT`), but the
data was gone from the next task. By the time the service settled, nine
container boots had fired the Postgres init script, which only runs when
`$PGDATA` is empty — so the volume must have been cleared or remounted
during that window. We reverified: the current container is `shal…`,
uptime is stable, and the data I/we put in afterward has persisted through
the port-close and every subsequent test.

**Assume `.saveExternalPort` (or any Dokploy postgres-config mutation) can
wipe the data volume. Do not run it against a DB with production data.**

### The working pattern for migrations

1. Confirm there is no production data you can't afford to lose (or take a
   Dokploy-side backup first: `/api/backup.manualBackupPostgres`).
2. `tools/dokploy/dk POST /api/postgres.saveExternalPort '{"postgresId":"…","externalPort":54329}'`
3. Poll until `pg_postmaster_start_time()` is stable for >120s:
   ```sh
   for i in 1 2 3 4; do
     sleep 20
     PGPASSWORD=… psql -h <vps-ip> -p 54329 -U app_user -d solofame \
       -tAc "SELECT EXTRACT(EPOCH FROM now()-pg_postmaster_start_time())::int;"
   done
   ```
4. Apply all pending migrations **in one `psql` invocation** with
   `-v ON_ERROR_STOP=1` and multiple `-f` flags. Do NOT split into
   separate connections — you may be racing Swarm's next recreate.
5. Run verification queries (see `migrations-applied.json` → `verification`
   for the canonical set).
6. `tools/dokploy/dk POST /api/postgres.saveExternalPort '{"postgresId":"…","externalPort":null}'`
7. Confirm the port is unreachable from outside:
   `nc -zv -w 5 <vps-ip> 54329` should fail/timeout.
8. Update `migrations-applied.json` (SHA256 of each applied file, the
   verification snapshot).

### What we'd rather do long-term

Running migrations over a briefly-opened public port is adequate for the
first-bootstrap window but it is not how we want to keep operating. Two
cleaner options to move toward:

- **Drizzle-migrate from a tenant-runtime worker inside the swarm.** Once
  `apps/*` lift, one of them can run `drizzle-kit migrate` on cold start
  with a leader lock in Redis. This is the canonical path from the
  Implementation Blueprint (§6.1 — "production runs through Drizzle's
  migration runner from `packages/tenancy/src/schema/`").
- **`docker exec` via SSH.** If `solo-mike` is added to the `docker`
  group on 152.53.192.190, we can pipe SQL directly to the running
  container without ever exposing a port: `ssh solo-mike@host "docker
  exec -i <task> psql -U app_user -d solofame" < migration.sql`. Requires
  one-time server-side change (ask user before making it).

The Drizzle path is the one we commit to. This README is here to keep the
"externalPort dance" from being treated as normal.
