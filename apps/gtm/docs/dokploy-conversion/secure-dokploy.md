# Securing Dokploy with HTTPS

## Current Status
- Dokploy is accessible at `http://46.202.88.248:3000`
- Projects created successfully
- Ready to configure HTTPS

## Option 1: Secure Dokploy Panel Itself (Recommended)

### Step 1: Configure Domain in Dokploy
1. Open Dokploy UI: `http://46.202.88.248:3000`
2. Go to **Settings → Domains** (or **Domains** in main menu)
3. Click **Add Domain**rt
4. Enter domain: `dokploy.staupapps.cloud` (or your preferred subdomain)
5. Select SSL provider: **Let's Encrypt** (automatic)
6. Save

### Step 2: Update DNS
Add an A record in your DNS provider:
- **Type**: A
- **Name**: `dokploy.startupapps.cloud` (or your subdomain)
- **Value**: `46.202.88.248`
- **TTL**: 3600 (or default)

### Step 3: Wait for SSL Certificate
- Dokploy/Traefik will automatically request Let's Encrypt certificate
- This usually takes 1-2 minutes
- Check status in Dokploy Domains section

### Step 4: Disable IP:Port Access (Security)
Once HTTPS is working, disable direct IP access:

```bash
ssh root@46.202.88.248
docker service update --publish-rm "published=3000,target=3000,mode=host" dokploy
```

This prevents access via `http://46.202.88.248:3000` and forces HTTPS domain access.

## Option 2: Use Cloudflare Tunnel (Alternative)

If you prefer Cloudflare Tunnels:
1. Install Cloudflare Tunnel on your VPS
2. Configure tunnel to point to `localhost:3000`
3. Access Dokploy via Cloudflare domain
4. SSL handled automatically by Cloudflare

## Option 3: Reverse Proxy (Nginx/Traefik)

You can also set up a reverse proxy in front of Dokploy, but Dokploy's built-in Traefik is recommended.

## Verification

After setup:
1. Test HTTPS: `https://dokploy.soloframehub.com`
2. Verify SSL certificate is valid
3. Test login functionality
4. Confirm API access works with HTTPS

## Troubleshooting

### SSL Certificate Not Issuing
- Check DNS propagation: `dig dokploy.soloframehub.com`
- Ensure port 80 is accessible (for Let's Encrypt validation)
- Check Dokploy logs: `docker service logs dokploy`

### DNS Not Resolving
- Wait for DNS propagation (can take up to 48 hours, usually < 1 hour)
- Verify A record is correct
- Check with: `nslookup dokploy.soloframehub.com`

### Port Conflicts
- Ensure port 80 and 443 are free
- Check: `ss -tulpen | grep -E ':(80|443)'`
- Dokploy's Traefik needs these ports for SSL

## Next Steps After Securing

1. Update API key usage to HTTPS endpoint
2. Update any scripts using Dokploy API
3. Configure additional security (2FA, etc.)
4. Set up monitoring and alerts

## Security Best Practices

1. **Enable 2FA** in Dokploy Settings → Profile
2. **Use strong passwords** for admin account
3. **Restrict API key access** - only grant to trusted services
4. **Regular backups** of Dokploy database
5. **Monitor access logs** regularly
6. **Keep Dokploy updated** - check for updates in Settings
