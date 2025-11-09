# 🧰 Troubleshooting

## Common Issues

### 1) Portainer API: 401/403
- Token expired or missing → verify `PORTAINER_API_TOKEN`  
- Check Endpoint-ID and assigned roles/scopes

### 2) TLS Error (`rejectUnauthorized`)
- Check certificate chain (Root/Intermediate)
- Ensure correct system clock and timezone

### 3) Swarm Stack Stuck
- `docker service ls` → analyze failing tasks  
- `docker stack rm <name>` + redeploy

### 4) Compose Path Not Found
- Provide path relative to repository root  
- Confirm working directory in CI environment

### 5) Network Timeouts
- Adjust retry/backoff values in `smart.config.json`
- Verify firewall/proxy rules for port 443
