You wire it up in two parts: (1) run the Dokploy MCP server with your Dokploy URL + API key, and (2) point your AI client (Claude Desktop, Cursor, etc.) at that server. [github](https://github.com/andradehenrique/dokploy-mcp)

## 1. Prerequisites

- A running Dokploy instance (cloud or self‑hosted). [docs.dokploy](https://docs.dokploy.com/docs/core/installation)
- An API key from Dokploy: in the Dokploy dashboard go to Settings → API Tokens and create a token. [github](https://github.com/huuthangntk/dokploy-mcp)
- Docker installed on the machine where you’ll run the MCP server (or Node if you want to run from source). [glama](https://glama.ai/mcp/servers/@andradehenrique/dokploy-mcp)

You’ll need two values for all configs:  
- `DOKPLOY_URL` → `https://your-dokploy-server.com/api` (or `http://IP:3000/api` for self‑hosted). [lobehub](https://lobehub.com/mcp/dokploy-mcp)
- `DOKPLOY_API_KEY` → the token you generated. [glama](https://glama.ai/mcp/servers/@andradehenrique/dokploy-mcp)

## 2. Fastest setup: Docker, HTTP mode

This is the simplest way to get a stable MCP endpoint you can reuse from multiple clients. [glama](https://glama.ai/mcp/servers/@limehawk/dokploy-mcp)

On a server or your dev machine, run:

```bash
docker run -it --rm \
  -p 3000:3000 \
  -e MCP_TRANSPORT=http \
  -e DOKPLOY_URL=https://your-dokploy-server.com/api \
  -e DOKPLOY_API_KEY=your_token_here \
  dokploy-mcp
```

or, in some variants: [skywork](https://skywork.ai/skypage/en/dokploy-ai-engineer-devops/1981188124295745536)

```bash
docker run -it --rm \
  -p 3001:3001 \
  -e MCP_TRANSPORT=http \
  -e DOKPLOY_URL=http://your-dokploy-instance-ip:3000/api \
  -e DOKPLOY_API_KEY=your_dokploy_api_key \
  ghcr.io/dokploy/mcp:latest
```

After this, the MCP server will expose an HTTP endpoint like `http://localhost:3000/mcp` (or `3001`, depending on your port mapping). [playbooks](https://playbooks.com/mcp/andradehenrique/dokploy-mcp)

For a more permanent setup, use the provided `docker-compose.yml` from the Dokploy MCP repo or Glama/LobeHub listing, then run:

```bash
docker-compose up -d dokploy-mcp-http
docker-compose logs -f dokploy-mcp-http
```



## 3. Stdio mode (for Claude Desktop, VS Code, Cursor, etc.)

If you prefer to run it only when your AI client runs, use stdio mode. [github](https://github.com/andradehenrique/dokploy-mcp)

Most clients use a config like:

```json
{
  "mcpServers": {
    "dokploy-mcp": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "DOKPLOY_URL=https://your-dokploy-server.com/api",
        "-e",
        "DOKPLOY_API_KEY=your_token_here",
        "dokploy-mcp"
      ]
    }
  }
}
```

- For Claude Desktop: add this to your `claude_desktop_config.json` or equivalent MCP config file. [github](https://github.com/andradehenrique/dokploy-mcp)
- For Cursor: use a similar block in `~/.cursor/mcp.json`. [skywork](https://skywork.ai/skypage/en/dokploy-ai-engineer-devops/1981188124295745536)
- On Windows, wrap the command with `cmd` as shown in the docs (same env vars). [glama](https://glama.ai/mcp/servers/@limehawk/dokploy-mcp)

In Cursor, an alternative example uses a direct Node command: [skywork](https://skywork.ai/skypage/en/dokploy-ai-engineer-devops/1981188124295745536)

```json
{
  "servers": [
    {
      "name": "Dokploy",
      "transport": {
        "type": "stdio",
        "command": [
          "/path/to/your/mcp/project/node_modules/.bin/tsx",
          "/path/to/your/mcp/project/src/index.ts"
        ]
      },
      "enabled": true
    }
  ]
}
```

## 4. Running from source (optional)

If you want to hack on the server (e.g., add custom tools or logging): [skywork](https://skywork.ai/skypage/en/dokploy-mcp-server-ai-conversational-infrastructure/1979031846822465536)

```bash
git clone https://github.com/Dokploy/mcp.git
cd mcp
npm install

# configure env
export DOKPLOY_URL=https://your-dokploy-server.com/api
export DOKPLOY_API_KEY=your_token_here

npm run build
npm start
```

This starts the MCP server (stdio or HTTP depending on `MCP_TRANSPORT`), and you then point your client config to the process or to `http://localhost:3000/mcp` as above. [skywork](https://skywork.ai/skypage/en/dokploy-mcp-server-ai-conversational-infrastructure/1979031846822465536)

## 5. Verifying it works

- Hit the health endpoint in HTTP mode: `curl http://localhost:3000/health` should return a healthy status. [glama](https://glama.ai/mcp/servers/@andradehenrique/dokploy-mcp)
- In your AI client, you should see a “Dokploy” server listed and be able to call tools like listing projects, deployments, and databases (tools are documented in `TOOLS.md` in the MCP repo / marketplace listings). [playbooks](https://playbooks.com/mcp/andradehenrique/dokploy-mcp)

If you tell me which client you’re using first (Claude Desktop vs Cursor vs a custom app), I can give you a tailored config snippet you can paste in directly.