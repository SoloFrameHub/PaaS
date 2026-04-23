# Dokploy API Reference - Complete Working Guide

Tested on Dokploy instance at `http://46.202.88.248:3000`

## Authentication

All API requests require the `x-api-key` header:

```bash
-H "x-api-key: YOUR_API_KEY_HERE"
```

## API Pattern

Dokploy uses RPC-style endpoints: `POST /api/resource.action`

Some read operations use `GET /api/resource.action?param=value`

---

## 1. Project Management

### Create a Project

**Endpoint:** `POST /api/project.create`

**Request Body:**
```json
{
  "name": "my-project",
  "description": "Project description"
}
```

**Response:**
```json
{
  "project": {
    "projectId": "8N3vgJp7zQN1dGfc-sDCW",
    "name": "my-project",
    "description": "Project description",
    "createdAt": "2026-02-09T01:01:47.152Z",
    "organizationId": "rtBIHeyBNLtenbziE-nZ2",
    "env": ""
  },
  "environment": {
    "environmentId": "3-O6dv6y0YrB2ZM_hCFlK",
    "name": "production",
    "description": "Production environment",
    "createdAt": "2026-02-09T01:01:47.158Z",
    "env": "",
    "projectId": "8N3vgJp7zQN1dGfc-sDCW",
    "isDefault": true
  }
}
```

**Notes:**
- Automatically creates a "production" environment
- Save both `projectId` and `environmentId` for subsequent calls

**Working curl:**
```bash
curl -X POST 'http://46.202.88.248:3000/api/project.create' \
  -H 'x-api-key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"name": "my-project", "description": "My awesome project"}'
```

### List All Projects

**Endpoint:** `GET /api/project.all`

**Working curl:**
```bash
curl -X GET 'http://46.202.88.248:3000/api/project.all' \
  -H 'x-api-key: YOUR_API_KEY'
```

### Delete a Project

**Endpoint:** `POST /api/project.remove`

**Request Body:**
```json
{
  "projectId": "8N3vgJp7zQN1dGfc-sDCW"
}
```

**Working curl:**
```bash
curl -X POST 'http://46.202.88.248:3000/api/project.remove' \
  -H 'x-api-key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"projectId": "YOUR_PROJECT_ID"}'
```

**Notes:**
- Must remove all services (applications, databases, compose) first
- Use `project.remove`, NOT `project.delete`

---

## 2. PostgreSQL Database

### Create PostgreSQL Database

**Endpoint:** `POST /api/postgres.create`

**Request Body:**
```json
{
  "projectId": "8N3vgJp7zQN1dGfc-sDCW",
  "environmentId": "3-O6dv6y0YrB2ZM_hCFlK",
  "name": "my-postgres",
  "databaseName": "mydb",
  "databaseUser": "dbuser",
  "databasePassword": "secure_password_123"
}
```

**Response:**
```json
{
  "postgresId": "1XITzf6v49K6IuVLulnTy",
  "name": "my-postgres",
  "appName": "postgres-input-neural-driver-qzsq7y",
  "databaseName": "mydb",
  "databaseUser": "dbuser",
  "databasePassword": "secure_password_123",
  "dockerImage": "postgres:18",
  "applicationStatus": "idle",
  "replicas": 1,
  "createdAt": "2026-02-09T01:02:02.980Z",
  "environmentId": "3-O6dv6y0YrB2ZM_hCFlK",
  ...
}
```

**Working curl:**
```bash
curl -X POST 'http://46.202.88.248:3000/api/postgres.create' \
  -H 'x-api-key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "projectId": "YOUR_PROJECT_ID",
    "environmentId": "YOUR_ENVIRONMENT_ID",
    "name": "my-postgres",
    "databaseName": "mydb",
    "databaseUser": "dbuser",
    "databasePassword": "secure_password_123"
  }'
```

**Notes:**
- Both `projectId` and `environmentId` are REQUIRED
- Creates with `postgres:18` image by default
- Status starts as "idle" (not deployed)
- Automatically creates a volume mount for `/var/lib/postgresql/18/docker`

### Deploy PostgreSQL

**Endpoint:** `POST /api/postgres.deploy`

**Request Body:**
```json
{
  "postgresId": "1XITzf6v49K6IuVLulnTy"
}
```

**Working curl:**
```bash
curl -X POST 'http://46.202.88.248:3000/api/postgres.deploy' \
  -H 'x-api-key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"postgresId": "YOUR_POSTGRES_ID"}'
```

**Notes:**
- Returns full postgres object with status changing to "done" when deployed

### Stop PostgreSQL

**Endpoint:** `POST /api/postgres.stop`

**Request Body:**
```json
{
  "postgresId": "1XITzf6v49K6IuVLulnTy"
}
```

### Remove PostgreSQL (with volumes)

**Endpoint:** `POST /api/postgres.remove`

**Request Body:**
```json
{
  "postgresId": "1XITzf6v49K6IuVLulnTy"
}
```

**Working curl:**
```bash
curl -X POST 'http://46.202.88.248:3000/api/postgres.remove' \
  -H 'x-api-key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"postgresId": "YOUR_POSTGRES_ID"}'
```

**Notes:**
- Use `postgres.remove`, NOT `postgres.delete` or `postgres.deleteWithVolumes`
- Sets status to "idle" (removes containers but keeps DB entry)

---

## 3. Redis Database

### Create Redis Database

**Endpoint:** `POST /api/redis.create`

**Request Body:**
```json
{
  "projectId": "8N3vgJp7zQN1dGfc-sDCW",
  "environmentId": "3-O6dv6y0YrB2ZM_hCFlK",
  "name": "my-redis",
  "databasePassword": "redis_password_123"
}
```

**Response:**
```json
{
  "redisId": "GrTmKxgflrPO6oImrX5V2",
  "name": "my-redis",
  "appName": "redis-back-up-1080p-protocol-o7c52q",
  "databasePassword": "redis_password_123",
  "dockerImage": "redis:8",
  "applicationStatus": "idle",
  "replicas": 1,
  "createdAt": "2026-02-09T01:02:04.609Z",
  "environmentId": "3-O6dv6y0YrB2ZM_hCFlK",
  ...
}
```

**Working curl:**
```bash
curl -X POST 'http://46.202.88.248:3000/api/redis.create' \
  -H 'x-api-key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "projectId": "YOUR_PROJECT_ID",
    "environmentId": "YOUR_ENVIRONMENT_ID",
    "name": "my-redis",
    "databasePassword": "redis_password_123"
  }'
```

**Notes:**
- Uses `redis:8` image by default
- `databasePassword` is REQUIRED
- Automatically creates volume mount for `/data`

### Deploy Redis

**Endpoint:** `POST /api/redis.deploy`

**Request Body:**
```json
{
  "redisId": "GrTmKxgflrPO6oImrX5V2"
}
```

**Working curl:**
```bash
curl -X POST 'http://46.202.88.248:3000/api/redis.deploy' \
  -H 'x-api-key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"redisId": "YOUR_REDIS_ID"}'
```

### Stop and Remove Redis

Same pattern as PostgreSQL:
- `POST /api/redis.stop` with `{"redisId": "..."}`
- `POST /api/redis.remove` with `{"redisId": "..."}`

---

## 4. Docker Compose Services (for MinIO, etc.)

### Create Compose Service

**Endpoint:** `POST /api/compose.create`

**Request Body:**
```json
{
  "projectId": "8N3vgJp7zQN1dGfc-sDCW",
  "environmentId": "3-O6dv6y0YrB2ZM_hCFlK",
  "name": "my-minio",
  "composeType": "docker-compose"
}
```

**Response:**
```json
{
  "composeId": "Ap7Hqjwc3pAC-De0ICaC3",
  "name": "my-minio",
  "appName": "compose-synthesize-optical-pixel-wg4hf8",
  "composeFile": "",
  "composeType": "docker-compose",
  "sourceType": "github",
  "autoDeploy": true,
  "composePath": "./docker-compose.yml",
  "composeStatus": "idle",
  "environmentId": "3-O6dv6y0YrB2ZM_hCFlK",
  "createdAt": "2026-02-09T01:02:06.418Z",
  ...
}
```

**Working curl:**
```bash
curl -X POST 'http://46.202.88.248:3000/api/compose.create' \
  -H 'x-api-key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "projectId": "YOUR_PROJECT_ID",
    "environmentId": "YOUR_ENVIRONMENT_ID",
    "name": "my-minio",
    "composeType": "docker-compose"
  }'
```

**Notes:**
- `composeType` must be `"docker-compose"` or `"stack"`
- Initially creates with empty `composeFile` - must update next

### Update Compose File Content

**Endpoint:** `POST /api/compose.update`

**Request Body:**
```json
{
  "composeId": "Ap7Hqjwc3pAC-De0ICaC3",
  "composeFile": "version: '3.8'\nservices:\n  minio:\n    image: minio/minio:latest\n    command: server /data --console-address \":9001\"\n    environment:\n      MINIO_ROOT_USER: minioadmin\n      MINIO_ROOT_PASSWORD: minioadmin123\n    ports:\n      - \"9000:9000\"\n      - \"9001:9001\"\n    volumes:\n      - minio-data:/data\nvolumes:\n  minio-data:\n"
}
```

**Working curl:**
```bash
# Create compose file
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  minio:
    image: minio/minio:latest
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin123
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - minio-data:/data
volumes:
  minio-data:
EOF

# Update via API (JSON-escape the file)
COMPOSE_CONTENT=$(cat docker-compose.yml | jq -Rs .)
curl -X POST 'http://46.202.88.248:3000/api/compose.update' \
  -H 'x-api-key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d "{\"composeId\": \"YOUR_COMPOSE_ID\", \"composeFile\": $COMPOSE_CONTENT}"
```

**Notes:**
- `composeFile` must be a JSON-escaped string (including `\n` for newlines)
- You can also set other fields like `env`, `sourceType`, `repository`, etc.

### Deploy Compose Service

**Endpoint:** `POST /api/compose.deploy`

**Request Body:**
```json
{
  "composeId": "Ap7Hqjwc3pAC-De0ICaC3"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Deployment queued",
  "composeId": "Ap7Hqjwc3pAC-De0ICaC3"
}
```

**Working curl:**
```bash
curl -X POST 'http://46.202.88.248:3000/api/compose.deploy' \
  -H 'x-api-key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"composeId": "YOUR_COMPOSE_ID"}'
```

**Notes:**
- Returns immediately with "queued" message
- Check `composeStatus` via `compose.one` to monitor deployment

### Remove Compose Service

**Endpoint:** `POST /api/compose.remove`

**Request Body:**
```json
{
  "composeId": "Ap7Hqjwc3pAC-De0ICaC3"
}
```

---

## 5. Applications (Next.js, Dockerfile, etc.)

### Create Application

**Endpoint:** `POST /api/application.create`

**Request Body:**
```json
{
  "projectId": "8N3vgJp7zQN1dGfc-sDCW",
  "environmentId": "3-O6dv6y0YrB2ZM_hCFlK",
  "name": "my-nextjs-app",
  "buildType": "dockerfile"
}
```

**Response:**
```json
{
  "applicationId": "K2eU8rsspg92CAFAjC3gl",
  "name": "my-nextjs-app",
  "appName": "app-synthesize-neural-circuit-unrtfr",
  "buildType": "nixpacks",
  "sourceType": "github",
  "applicationStatus": "idle",
  "previewPort": 3000,
  "autoDeploy": true,
  "triggerType": "push",
  "replicas": 1,
  "createdAt": "2026-02-09T01:02:17.590Z",
  "environmentId": "3-O6dv6y0YrB2ZM_hCFlK",
  ...
}
```

**Working curl:**
```bash
curl -X POST 'http://46.202.88.248:3000/api/application.create' \
  -H 'x-api-key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "projectId": "YOUR_PROJECT_ID",
    "environmentId": "YOUR_ENVIRONMENT_ID",
    "name": "my-nextjs-app",
    "buildType": "dockerfile"
  }'
```

**Notes:**
- `buildType` can be `"nixpacks"`, `"dockerfile"`, `"heroku"`, `"railpack"`
- Creates with default `buildType: "nixpacks"` even if you specify `"dockerfile"`
- Must update build settings in next step

### Update Application Settings

**Endpoint:** `POST /api/application.update`

**Request Body:**
```json
{
  "applicationId": "K2eU8rsspg92CAFAjC3gl",
  "buildType": "dockerfile",
  "dockerfile": "Dockerfile",
  "sourceType": "github",
  "repository": "soloframehub-v3",
  "owner": "your-github-username",
  "branch": "main",
  "buildPath": "/"
}
```

**Response:**
```json
true
```

**Working curl:**
```bash
curl -X POST 'http://46.202.88.248:3000/api/application.update' \
  -H 'x-api-key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "applicationId": "YOUR_APP_ID",
    "buildType": "dockerfile",
    "dockerfile": "Dockerfile",
    "sourceType": "github",
    "repository": "your-repo",
    "owner": "your-username",
    "branch": "main"
  }'
```

**Notes:**
- Returns `true` on success (not an object)
- Can update any application field including `buildType`, `dockerfile`, `env`, etc.

### Get Application Details

**Endpoint:** `GET /api/application.one?applicationId=XXX`

**Working curl:**
```bash
curl -X GET 'http://46.202.88.248:3000/api/application.one?applicationId=YOUR_APP_ID' \
  -H 'x-api-key: YOUR_API_KEY'
```

---

## 6. Environment Variables

### Set Environment Variables on Application

**Endpoint:** `POST /api/application.update`

**Request Body:**
```json
{
  "applicationId": "K2eU8rsspg92CAFAjC3gl",
  "env": "NODE_ENV=production\nDATABASE_URL=postgresql://user:pass@host:5432/db\nREDIS_URL=redis://host:6379"
}
```

**Working curl:**
```bash
curl -X POST 'http://46.202.88.248:3000/api/application.update' \
  -H 'x-api-key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "applicationId": "YOUR_APP_ID",
    "env": "NODE_ENV=production\nDATABASE_URL=postgresql://user:pass@host:5432/db"
  }'
```

**Notes:**
- Use `\n` to separate environment variables
- Use the same `application.update` endpoint for all settings
- No separate `saveEnvironmentVariables` endpoint

---

## 7. Domains and HTTPS

### Add Domain to Application

**Endpoint:** `POST /api/domain.create`

**Request Body:**
```json
{
  "applicationId": "K2eU8rsspg92CAFAjC3gl",
  "host": "myapp.example.com",
  "path": "/",
  "port": 3000,
  "https": true,
  "certificateType": "letsencrypt"
}
```

**Response:**
```json
{
  "domainId": "1aEmOrFkk75Ty1JAS0L7i",
  "host": "myapp.example.com",
  "https": true,
  "port": 3000,
  "path": "/",
  "certificateType": "letsencrypt",
  "domainType": "application",
  "uniqueConfigKey": 1,
  "createdAt": "2026-02-09T01:02:38.852Z",
  "applicationId": "K2eU8rsspg92CAFAjC3gl",
  ...
}
```

**Working curl:**
```bash
curl -X POST 'http://46.202.88.248:3000/api/domain.create' \
  -H 'x-api-key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "applicationId": "YOUR_APP_ID",
    "host": "myapp.example.com",
    "path": "/",
    "port": 3000,
    "https": true,
    "certificateType": "letsencrypt"
  }'
```

**Notes:**
- `certificateType` can be `"letsencrypt"`, `"none"`, or custom
- Must configure DNS A record pointing to Dokploy server IP first
- Automatically configures Traefik reverse proxy

### Delete Domain

**Endpoint:** `POST /api/domain.delete`

**Request Body:**
```json
{
  "domainId": "1aEmOrFkk75Ty1JAS0L7i"
}
```

**Working curl:**
```bash
curl -X POST 'http://46.202.88.248:3000/api/domain.delete' \
  -H 'x-api-key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"domainId": "YOUR_DOMAIN_ID"}'
```

---

## 8. Deploying Applications

### Deploy Application

**Endpoint:** `POST /api/application.deploy`

**Request Body:**
```json
{
  "applicationId": "K2eU8rsspg92CAFAjC3gl"
}
```

**Working curl:**
```bash
curl -X POST 'http://46.202.88.248:3000/api/application.deploy' \
  -H 'x-api-key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"applicationId": "YOUR_APP_ID"}'
```

**Notes:**
- Triggers async deployment
- Returns empty response (no output)
- Check deployment status via `application.one` endpoint
- Deployment logs available in `deployments[].logPath`

### Remove Application

**Endpoint:** `POST /api/application.remove`

**Request Body:**
```json
{
  "applicationId": "K2eU8rsspg92CAFAjC3gl"
}
```

---

## Complete Workflow Example

Here's a complete workflow to deploy a Next.js app with PostgreSQL, Redis, and MinIO:

```bash
API_KEY="your-api-key"
DOKPLOY_URL="http://46.202.88.248:3000"

# 1. Create project
PROJECT_RESPONSE=$(curl -s -X POST "$DOKPLOY_URL/api/project.create" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "my-saas", "description": "My SaaS Platform"}')

PROJECT_ID=$(echo "$PROJECT_RESPONSE" | jq -r '.project.projectId')
ENV_ID=$(echo "$PROJECT_RESPONSE" | jq -r '.environment.environmentId')

echo "Created project: $PROJECT_ID"
echo "Environment: $ENV_ID"

# 2. Create PostgreSQL
POSTGRES_RESPONSE=$(curl -s -X POST "$DOKPLOY_URL/api/postgres.create" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"projectId\": \"$PROJECT_ID\",
    \"environmentId\": \"$ENV_ID\",
    \"name\": \"main-db\",
    \"databaseName\": \"saas_db\",
    \"databaseUser\": \"saas_user\",
    \"databasePassword\": \"$(openssl rand -base64 32)\"
  }")

POSTGRES_ID=$(echo "$POSTGRES_RESPONSE" | jq -r '.postgresId')
POSTGRES_APP_NAME=$(echo "$POSTGRES_RESPONSE" | jq -r '.appName')

echo "Created PostgreSQL: $POSTGRES_ID ($POSTGRES_APP_NAME)"

# 3. Deploy PostgreSQL
curl -s -X POST "$DOKPLOY_URL/api/postgres.deploy" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"postgresId\": \"$POSTGRES_ID\"}"

echo "Deployed PostgreSQL"

# 4. Create Redis
REDIS_RESPONSE=$(curl -s -X POST "$DOKPLOY_URL/api/redis.create" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"projectId\": \"$PROJECT_ID\",
    \"environmentId\": \"$ENV_ID\",
    \"name\": \"main-redis\",
    \"databasePassword\": \"$(openssl rand -base64 32)\"
  }")

REDIS_ID=$(echo "$REDIS_RESPONSE" | jq -r '.redisId')
REDIS_APP_NAME=$(echo "$REDIS_RESPONSE" | jq -r '.appName')

echo "Created Redis: $REDIS_ID ($REDIS_APP_NAME)"

# 5. Deploy Redis
curl -s -X POST "$DOKPLOY_URL/api/redis.deploy" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"redisId\": \"$REDIS_ID\"}"

echo "Deployed Redis"

# 6. Create MinIO via compose
MINIO_RESPONSE=$(curl -s -X POST "$DOKPLOY_URL/api/compose.create" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"projectId\": \"$PROJECT_ID\",
    \"environmentId\": \"$ENV_ID\",
    \"name\": \"minio-storage\",
    \"composeType\": \"docker-compose\"
  }")

COMPOSE_ID=$(echo "$MINIO_RESPONSE" | jq -r '.composeId')
echo "Created MinIO compose: $COMPOSE_ID"

# 7. Update MinIO compose file
MINIO_COMPOSE=$(cat <<'EOF'
version: '3.8'
services:
  minio:
    image: minio/minio:latest
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin123
    ports:
      - "9010:9000"
      - "9011:9001"
    volumes:
      - minio-data:/data
volumes:
  minio-data:
EOF
)

COMPOSE_JSON=$(echo "$MINIO_COMPOSE" | jq -Rs .)

curl -s -X POST "$DOKPLOY_URL/api/compose.update" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"composeId\": \"$COMPOSE_ID\", \"composeFile\": $COMPOSE_JSON}"

echo "Updated MinIO compose file"

# 8. Deploy MinIO
curl -s -X POST "$DOKPLOY_URL/api/compose.deploy" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"composeId\": \"$COMPOSE_ID\"}"

echo "Deployed MinIO"

# 9. Create Next.js application
APP_RESPONSE=$(curl -s -X POST "$DOKPLOY_URL/api/application.create" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"projectId\": \"$PROJECT_ID\",
    \"environmentId\": \"$ENV_ID\",
    \"name\": \"nextjs-app\",
    \"buildType\": \"dockerfile\"
  }")

APP_ID=$(echo "$APP_RESPONSE" | jq -r '.applicationId')
echo "Created application: $APP_ID"

# 10. Update application settings
curl -s -X POST "$DOKPLOY_URL/api/application.update" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"applicationId\": \"$APP_ID\",
    \"buildType\": \"dockerfile\",
    \"dockerfile\": \"Dockerfile\",
    \"sourceType\": \"github\",
    \"repository\": \"soloframehub-v3\",
    \"owner\": \"your-username\",
    \"branch\": \"main\"
  }"

echo "Updated application settings"

# 11. Set environment variables
DATABASE_URL="postgresql://saas_user:password@$POSTGRES_APP_NAME:5432/saas_db"
REDIS_URL="redis://:password@$REDIS_APP_NAME:6379"
S3_ENDPOINT="http://minio-storage:9000"

curl -s -X POST "$DOKPLOY_URL/api/application.update" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"applicationId\": \"$APP_ID\",
    \"env\": \"NODE_ENV=production\nDATABASE_URL=$DATABASE_URL\nREDIS_URL=$REDIS_URL\nS3_ENDPOINT=$S3_ENDPOINT\"
  }"

echo "Set environment variables"

# 12. Add domain with HTTPS
curl -s -X POST "$DOKPLOY_URL/api/domain.create" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"applicationId\": \"$APP_ID\",
    \"host\": \"myapp.example.com\",
    \"path\": \"/\",
    \"port\": 3000,
    \"https\": true,
    \"certificateType\": \"letsencrypt\"
  }"

echo "Added domain"

# 13. Deploy application
curl -s -X POST "$DOKPLOY_URL/api/application.deploy" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"applicationId\": \"$APP_ID\"}"

echo "Deployment started!"
```

---

## Key Findings & Gotchas

1. **environmentId is REQUIRED** for all service creation (postgres, redis, compose, application)

2. **Use `.remove` not `.delete`** for cleanup:
   - `postgres.remove`, `redis.remove`, `compose.remove`, `application.remove`
   - `project.remove` (not `project.delete`)

3. **application.update is multi-purpose** - use it for:
   - Changing build settings (`buildType`, `dockerfile`, `repository`)
   - Setting environment variables (`env`)
   - Any other application field updates

4. **Container names** for internal networking:
   - PostgreSQL: `appName` field (e.g., `postgres-input-neural-driver-qzsq7y`)
   - Redis: `appName` field (e.g., `redis-back-up-1080p-protocol-o7c52q`)
   - Compose services: use service name from compose file

5. **Environment variables format**:
   - Use `\n` to separate variables (not actual newlines in JSON)
   - Example: `"NODE_ENV=production\nDATABASE_URL=postgresql://..."`

6. **Deployment is async**:
   - `application.deploy` returns empty/no output
   - `compose.deploy` returns `{"success": true, "message": "Deployment queued"}`
   - Check status via `application.one` or `compose.one`

7. **Default images**:
   - PostgreSQL: `postgres:18`
   - Redis: `redis:8`

8. **Cleanup order**:
   - Delete domains first
   - Delete/remove applications
   - Delete/remove databases (postgres, redis, compose)
   - Delete project last

---

## Additional Endpoints to Explore

These endpoints likely exist but weren't tested:

- `POST /api/mysql.create` - MySQL database
- `POST /api/mariadb.create` - MariaDB database
- `POST /api/mongo.create` - MongoDB database
- `GET /api/deployment.logs` - Get deployment logs
- `POST /api/application.restart` - Restart application
- `POST /api/application.redeploy` - Redeploy application
- `POST /api/github.link` - Link GitHub account
- `POST /api/registry.create` - Create container registry

Check the Dokploy UI network tab or source code for complete API reference.
