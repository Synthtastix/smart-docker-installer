#!/usr/bin/env bash
# S.M.A.R.T Docker Installer — Smoke Test v2.3
# Quick local readiness checks (Node, Docker, Webhook 3000, Metrics 9090, TLS, DNS, GitHub reachability).
set -euo pipefail

green(){ printf "\033[32m%s\033[0m\n" "$*"; }
yellow(){ printf "\033[33m%s\033[0m\n" "$*"; }
red(){ printf "\033[31m%s\033[0m\n" "$*"; }

section(){ echo -e "\n=== $* ==="; }

section "Versions"
echo "[Node] $(node -v || echo 'missing')"
echo "[npm]  $(npm -v  || echo 'missing')"
echo "[Docker] $(docker -v || echo 'missing')"
echo "[Compose] $(docker compose version || echo 'missing')"
echo "[Git] $(git --version || echo 'missing')"

section "Network: GitHub 443"
if command -v curl >/dev/null 2>&1; then
  if curl -Is https://github.com >/dev/null; then green "GitHub: OK"; else red "GitHub: FAIL"; fi
else
  python3 - <<'PY'
import socket, ssl
ctx = ssl.create_default_context()
with ctx.wrap_socket(socket.socket(), server_hostname="github.com") as s:
    s.settimeout(10); s.connect(("github.com", 443))
print("OK")
PY
fi

section "TLS check (>=1.2 required)"
if command -v openssl >/dev/null 2>&1; then
  openssl ciphers -v 'TLSv1.2' >/dev/null && green "TLS 1.2 available" || yellow "TLS 1.2 not listed"
else
  yellow "openssl not found — skipping"
fi

section "Local ports (Webhook:3000, Metrics:9090)"
for p in 3000 9090; do
  if ss -ltn 2>/dev/null | grep -q ":$p "; then green "Port $p listening"; else yellow "Port $p closed (expected before start)"; fi
done

section "S.M.A.R.T Doctor / Verify"
if [ -f "stacklink-smart_public_v2.3.js" ]; then
  node stacklink-smart_public_v2.3.js --doctor --log-json || true
  if [ -f "smart.config.json" ]; then
    node stacklink-smart_public_v2.3.js --config smart.config.json --verify-only --log-json || true
  else
    yellow "smart.config.json not found — skipping verify-only"
  fi
else
  yellow "stacklink-smart_public_v2.3.js not found — skipping doctor/verify"
fi

section "Filesystem permissions"
for d in ".state" "state" "logs" "reports"; do
  mkdir -p "$d"
  chmod 700 "$d" || true
  echo "ok" > "$d/.perm_test" && rm -f "$d/.perm_test" && green "$d writable"
done

green "[SMOKE] Completed."
