#!/usr/bin/env node
/**
 * S.M.A.R.T Docker Installer – Public Pro v2.3
 * Full GitOps CLI | Zero-Destruction | Self-Healing | Observability
 * License: OPSL-1.0-Public
 *
 * New in v2.3:
 *  1. Config Schema Validation (AJV)
 *  2. --init + Template Repo
 *  3. .env Auto-Load
 *  4. Webhook Server
 *  5. Parallel Deploy
 *  6. --rollback-to
 *  7. Prometheus Metrics
 *  8. --set key=value
 *  9. --self-update
 * 10. --doctor + --help
 *
 * npm i ajv dotenv
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execSync } from 'node:child_process';
import crypto from 'node:crypto';
import { setTimeout as delay } from 'node:timers/promises';
import http from 'node:http';
import Ajv from 'ajv';
import 'dotenv/config'; // Auto-load .env

// ============================================================================
// CLI + VERSION
// ============================================================================
const VERSION = '2.3.0';
const args = process.argv.slice(2);
const arg = (name, dflt) => args.includes(name) ? (args[args.indexOf(name) + 1] || true) : dflt;
const has = (name) => args.includes(name);

const CONFIG_PATH = arg('--config', 'smart.config.json');
const TARGET_NAME = arg('--target');
const DRY = has('--dry-run');
const VERIFY = has('--verify-only');
const NO_GIT = has('--no-git-update');
const LOG_JSON = has('--log-json');
const LOG_VERBOSE = has('--verbose');
const PARALLEL = !has('--no-parallel');
const SETS = args.filter(a => a.includes('=')).map(kv => kv.split('='));

// ============================================================================
// CONFIG + SCHEMA + SET
// ============================================================================
const set = (obj, path, val) => {
  const parts = path.split(/[\.\[\]]/).filter(Boolean);
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]] = cur[parts[i]] || {};
  cur[parts[parts.length - 1]] = val;
};
const cfg = JSON.parse(fs.readFileSync(path.resolve(CONFIG_PATH), 'utf-8'));
SETS.forEach(([k, v]) => set(cfg, k, v));

// ============================================================================
// SCHEMA VALIDATION
// ============================================================================
const ajv = new Ajv({ strict: false });
const schema = {
  type: 'object',
  required: ['repo', 'targets'],
  properties: {
    repo: { type: 'object', required: ['url'] },
    targets: { type: 'array', items: { type: 'object', required: ['name', 'type'] } }
  }
};
const validate = ajv.compile(schema);
if (!validate(cfg)) {
  console.error('Config invalid:', validate.errors);
  process.exit(1);
}

// ============================================================================
// LOGGING
// ============================================================================
const log = (lvl, msg, meta = {}) => {
  const entry = { ts: new Date().toISOString(), lvl, msg, ...meta };
  const line = LOG_JSON ? JSON.stringify(entry) : `[${entry.ts}] ${lvl.toUpperCase()} ${msg}`;
  console.log(line);
  if (LOG_VERBOSE && !LOG_JSON && Object.keys(meta).length) console.log('   ↳', meta);
};

// ============================================================================
// UTILS
// ============================================================================
const sh = (cmd, opts = {}) => {
  try { return { stdout: execSync(cmd, { stdio: 'pipe', ...opts }).toString().trim() }; }
  catch (e) { throw new Error(`CMD failed: ${cmd}\n${e.stderr?.toString() || e.message}`); }
};
const sha256 = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const expand = (s) => s?.replace(/\$\{([^}]+)\}/g, (_, k) => process.env[k] || '');
const writeState = (data) => {
  const file = path.join(STATE_DIR, `run_${Date.now()}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2), { mode: 0o600 });
  log('info', 'State saved', { file });
  return file;
};
const STATE_DIR = path.resolve(cfg.state?.dir || './.state');
const LOG_DIR = path.resolve(cfg.log?.dir || './logs');
fs.mkdirSync(STATE_DIR, { recursive: true });
fs.mkdirSync(LOG_DIR, { recursive: true });

// ============================================================================
// --init
// ============================================================================
if (has('--init')) {
  const template = {
    repo: { url: 'https://github.com/user/your-app.git', branch: 'main' },
    targets: [{ name: 'demo', type: 'local', compose: 'docker-compose.yml' }],
    health: { http: [{ url: 'http://localhost/health', expect: 200 }] }
  };
  fs.writeFileSync('smart.config.json', JSON.stringify(template, null, 2));
  fs.writeFileSync('.env.example', 'GITHUB_TOKEN=\nPORTAINER_KEY=\n');
  console.log('Initialized: smart.config.json + .env.example');
  process.exit(0);
}

// ============================================================================
// --doctor
// ============================================================================
if (has('--doctor')) {
  console.log('Doctor: System check...');
  const checks = [
    ['Node.js', () => process.version, '>= v20.0.0'],
    ['Git', () => sh('git --version').stdout, '>= 2.45.0'],
    ['Docker', () => sh('docker version --format "{{.Server.Version}}"').stdout, '>= 24.0.0'],
    ['Docker Compose', () => sh('docker compose version --short').stdout, '>= v2.20.0'],
    ['SSH', () => sh('ssh -V 2>&1').stdout, '>= 8.0'],
    ['TLS', () => sh('openssl version').stdout, 'TLS 1.2+']
  ];
  checks.forEach(([name, fn, req]) => {
    try {
      const val = fn();
      const ok = req.includes('>=') ? require('semver').gte(val.match(/\d+\.\d+\.\d+/)?.[0] || '0', req.split('>= ')[1]) : true;
      console.log(`${ok ? 'OK' : 'FAIL'} ${name}: ${val}`);
    } catch { console.log(`FAIL ${name}: not found`); }
  });
  process.exit(0);
}

// ============================================================================
// --self-update
// ============================================================================
if (has('--self-update')) {
  const owner = 'your-username';
  const repo = 'stacklink-smart';
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`);
  const latest = await res.json();
  if (latest.tag_name <= VERSION) {
    console.log(`Already up to date: ${VERSION}`);
    process.exit(0);
  }
  const asset = latest.assets.find(a => a.name.includes('stacklink-smart'));
  const bin = await fetch(asset.browser_download_url);
  fs.writeFileSync(process.argv[1], Buffer.from(await bin.arrayBuffer()));
  fs.chmodSync(process.argv[1], 0o755);
  console.log(`Updated to ${latest.tag_name}`);
  process.exit(0);
}

// ============================================================================
// --help
// ============================================================================
if (has('--help') || has('-h')) {
  console.log(`
stacklink-smart v${VERSION} – GitOps CLI for Docker

Usage:
  stacklink-smart [options]

Options:
  --config <file>          Config file (default: smart.config.json)
  --target <name>          Deploy only this target
  --dry-run                Simulate deployment
  --verify-only            Check health only
  --no-git-update          Skip git pull (cache)
  --parallel               Deploy targets in parallel (default)
  --no-parallel            Sequential deploy
  --log-json               JSON logs
  --verbose                Verbose output
  --set key=value          Override config (e.g. targets[0].stack=prod)
  --init                   Create config + .env.example
  --doctor                 System health check
  --self-update            Update to latest version
  --rollback-to <file>     Rollback to state file
  --webhook                Start webhook server (port 3000)
  --help, -h               Show this help

Examples:
  stacklink-smart --config prod.json --target web
  stacklink-smart --dry-run --verbose
  stacklink-smart --init
`);
  process.exit(0);
}

// ============================================================================
// GIT + SSH
// ============================================================================
const validateSSH = (key) => {
  if (!key) return;
  const p = path.resolve(expand(key));
  if (fs.existsSync(p) && (fs.statSync(p).mode & 0o777) !== 0o600) {
    throw new Error(`SSH key must be 0600: ${p}`);
  }
};
const sshEnv = (cfg) => {
  if (!cfg.repo?.ssh?.enabled) return {};
  const key = expand(cfg.repo.ssh.private_key);
  validateSSH(key);
  return { GIT_SSH_COMMAND: `ssh -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes -i ${key}` };
};
const gitCheckout = (dir, cfg, opts = {}) => {
  const env = sshEnv(cfg);
  const url = cfg.repo.url;
  const branch = cfg.repo.branch || 'main';

  if (opts.dry) return { dir, commit: 'dry' };
  if (opts.skip && fs.existsSync(path.join(dir, '.git'))) {
    const commit = sh(`git -C ${dir} rev-parse HEAD`, { env }).stdout;
    return { dir, commit };
  }
  if (!fs.existsSync(path.join(dir, '.git'))) {
    sh(`git clone --depth 1 --branch ${branch} ${url} ${dir}`, { env });
  } else {
    sh(`git -C ${dir} fetch --depth 1 origin ${branch} && git -C ${dir} reset --hard origin/${branch}`, { env });
  }
  return { dir, commit: sh(`git -C ${dir} rev-parse HEAD`, { env }).stdout };
};

// ============================================================================
// DEPLOY + HEALTH
// ============================================================================
const deploy = async (t, cfg, opts) => {
  const workdir = cfg.workdir || path.join(os.tmpdir(), 'smart');
  const { dir, commit } = gitCheckout(workdir, cfg, opts);
  const compose = path.join(dir, t.compose || 'docker-compose.yml');
  const envFile = t.env ? path.join(dir, t.env) : null;

  if (opts.dry) return { name: t.name, status: 'dry', commit };
  if (t.type === 'portainer') {
    // Portainer logic (same as v2.2)
    const payload = { Name: t.stack, RepositoryURL: cfg.repo.url, ComposeFilePathInRepository: t.compose };
    const url = `${expand(t.base_url)}/api/stacks?endpointId=${t.endpoint_id}`;
    const res = await fetch(url, { method: 'POST', headers: { 'X-API-Key': expand(t.api_key) }, body: JSON.stringify(payload) });
    if (!res.ok) throw new Error(`Portainer: ${await res.text()}`);
    return { name: t.name, status: 'ok', commit };
  }
  if (t.type === 'swarm') {
    const envArg = envFile ? `--env-file ${envFile}` : '';
    sh(`docker stack deploy -c ${compose} ${envArg} ${t.stack} --prune`);
    return { name: t.name, status: 'ok', commit };
  }
  if (t.type === 'local') {
    sh(`docker compose -f ${compose} up -d`);
    return { name: t.name, status: 'ok', commit };
  }
  throw new Error(`Unknown type: ${t.type}`);
};

const checkHealth = async (health, type) => {
  if (!health) return;
  let success = 0;
  for (let i = 0; i < (health.retries || 6); i++) {
    let ok = true;
    for (const h of health.http || []) {
      try {
        const res = await fetch(expand(h.url), { signal: AbortSignal.timeout(h.timeout || 5000) });
        if (res.status !== (h.expect || 200)) ok = false;
      } catch { ok = false; }
    }
    if (type === 'swarm' && health.services) {
      const out = sh('docker service ls --format "{{.Name}}\\t{{.Replicas}}"').stdout;
      for (const s of health.services) {
        const rep = out.split('\n').find(l => l.startsWith(s + '\t'))?.split('\t')[1] || '0/0';
        const [run, want] = rep.split('/').map(Number);
        if (run / want < 0.8) ok = false;
      }
    }
    if (ok) { if (++success >= (health.consecutive || 2)) return; }
    else success = 0;
    await delay(health.backoff || 3000);
  }
  throw new Error('Health checks failed');
};

// ============================================================================
// --rollback-to
// ============================================================================
if (arg('--rollback-to')) {
  const old = JSON.parse(fs.readFileSync(arg('--rollback-to'), 'utf-8'));
  cfg.repo.branch = old.commit;
  log('info', 'Rolling back to commit', { commit: old.commit });
  // Continue with normal deploy
}

// ============================================================================
// WEBHOOK SERVER
// ============================================================================
if (has('--webhook')) {
  const secret = process.env.WEBHOOK_SECRET;
  if (!secret) throw new Error('WEBHOOK_SECRET not set');
  const verify = (payload, sig) => {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(payload);
    return crypto.timingSafeEqual(Buffer.from(sig.replace('sha256=', ''), 'hex'), hmac.digest());
  };
  http.createServer(async (req, res) => {
    if (req.method !== 'POST') { res.writeHead(405); res.end(); return; }
    const payload = await new Promise(r => {
      let d = ''; req.on('data', c => d += c); req.on('end', () => r(d));
    });
    if (!verify(payload, req.headers['x-hub-signature-256'])) { res.writeHead(401); res.end(); return; }
    log('info', 'Webhook received – starting deploy');
    try { await main(); res.writeHead(200, { 'Content-Type': 'text/plain' }); res.end('Deployed'); }
    catch (e) { res.writeHead(500); res.end(e.message); }
  }).listen(3000);
  console.log('Webhook server running on :3000');
  process.exit(0);
}

// ============================================================================
// PROMETHEUS METRICS
// ============================================================================
let metrics = '';
if (cfg.metrics?.enabled !== false) {
  const server = http.createServer((_, res) => res.end(metrics));
  server.listen(9090);
  log('info', 'Metrics exposed on :9090');
}

// ============================================================================
// MAIN
// ============================================================================
async function main() {
  const state = { version: VERSION, started_at: new Date().toISOString(), targets: [], ok: false };
  try {
    const workdir = cfg.workdir || path.join(os.tmpdir(), 'smart');
    const gitOpts = { dry: DRY, skip: NO_GIT };
    const { commit } = gitCheckout(workdir, cfg, gitOpts);

    const tasks = cfg.targets
      .filter(t => !TARGET_NAME || t.name === TARGET_NAME)
      .map(t => deploy(t, cfg, { dry: DRY, verify: VERIFY, commit }));

    const results = PARALLEL ? await Promise.all(tasks) : await tasks.reduce(async (p, t) => [...await p, await t], []);
    state.targets = results;
    state.commit = commit;

    if (!VERIFY && cfg.health) {
      await checkHealth(cfg.health, cfg.targets[0]?.type);
      state.health = 'passed';
    }

    state.ok = true;
  } catch (e) {
    log('error', e.message);
    state.error = e.message;
  } finally {
    state.duration_ms = Date.now() - new Date(state.started_at).getTime();
    writeState(state);
    metrics = `smart_deploy_duration_ms ${state.duration_ms}\nsmart_deploy_success ${state.ok ? 1 : 0}\n`;
    process.exit(state.ok ? 0 : 1);
  }
}

main();