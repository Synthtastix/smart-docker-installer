#!/usr/bin/env python3
"""
smart_diagnose.py — System & Network Diagnostic Tool (Public Edition v2.2)
License: OPSL-1.0-Public Edition
"""

import json, os, subprocess, socket, sys

def run(cmd):
    try:
        out = subprocess.check_output(cmd, shell=True, stderr=subprocess.STDOUT, timeout=20)
        return {"ok": True, "output": out.decode(errors="replace").strip()}
    except subprocess.CalledProcessError as e:
        return {"ok": False, "output": e.output.decode(errors="replace").strip()}
    except Exception as e:
        return {"ok": False, "output": str(e)}

def port_open(host, port, timeout=3):
    try:
        with socket.create_connection((host, port), timeout=timeout):
            return True
    except Exception:
        return False

def dns_lookup(host):
    try:
        return {"ok": True, "result": socket.gethostbyname_ex(host)[2]}
    except Exception as e:
        return {"ok": False, "error": str(e)}

report = {
    "python_version": sys.version.split()[0],
    "binaries": {
        "node": run("node -v"),
        "git": run("git --version"),
        "docker": run('docker version --format "{{.Server.Version}}"'),
        "compose": run("docker compose version")
    },
    "network": {
        "dns_github": dns_lookup("github.com"),
        "port_80_example": port_open("example.com", 80),
        "port_443_example": port_open("example.com", 443),
    }
}

# Overall status
binaries_ok = all(v.get("ok") for v in report["binaries"].values())
network_ok = report["network"]["dns_github"].get("ok") and report["network"]["port_443_example"]
report["summary"] = {
    "binaries_ok": binaries_ok,
    "network_ok": bool(network_ok),
    "ok": bool(binaries_ok and network_ok)
}

print(json.dumps(report, indent=2))
sys.exit(0 if report["summary"]["ok"] else 1)
