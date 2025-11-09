# 🧩 S.M.A.R.T Docker Installer — Édition Publique v2.3  
**Version :** 2.3  **Licence :** OPSL-1.0-Public  **Statut :** Stable / Niveau Entreprise  

---

## 🌐 Présentation

Le **S.M.A.R.T Docker Installer** est une solution universelle, sécurisée et entièrement automatisée pour les environnements **DevOps** et **GitOps** modernes.  
L’Édition Publique v2.3 a été conçue pour les **équipes, start-ups et PME** souhaitant déployer des charges Docker **fiables, reproductibles et conformes**, sans dépendre d’une infrastructure CI/CD complexe.

Contrairement à des outils comme *Docker Compose*, *Portainer Stacks* ou *Jenkins Pipelines*, le S.M.A.R.T Installer introduit une couche de contrôle autonome qui combine **validation, sécurité, restauration, observabilité et audit** dans un seul exécutable portable.

---

## 🚀 Nouveautés de la version 2.3

| Catégorie | Description |
|------------|-------------|
| **Moteur d’auto-réparation** | Détecte automatiquement les déploiements échoués et exécute une récupération ou un rollback. |
| **Validation de schéma (AJV)** | Vérifie l’intégrité de `smart.config.json` avant chaque exécution. |
| **Chargement automatique de `.env`** | Charge en toute sécurité les variables d’environnement via `dotenv`. |
| **`--set clé=valeur`** | Permet de modifier dynamiquement la configuration à l’exécution. |
| **Mode `--doctor`** | Diagnostique complet du système (Node, Docker, TLS, SSH, Portainer). |
| **`--rollback-to`** | Restaure un état antérieur avec audit complet. |
| **Serveur Webhook (port 3000)** | Reçoit les déclencheurs GitHub/GitLab pour déploiement automatique. |
| **Métriques Prometheus (port 9090)** | Exporte des métriques temps-réel pour la supervision. |
| **Déploiements parallèles** | Exécute jusqu’à 5 cibles simultanément. |

---

## 💡 Valeur stratégique pour les équipes DevOps

1. **Fiabilité & traçabilité complète** — chaque exécution génère `./.state/last_run.json` avec hash SHA-256.  
2. **Politique Zero-Destruction** — empêche toute suppression ou modification non autorisée.  
3. **Indépendance fournisseur** — fonctionne hors ligne, uniquement avec Node.js et Docker.  
4. **Reproductibilité déterministe** — hash SHA garantit des déploiements identiques.  
5. **Observabilité transparente** — métriques Prometheus intégrées pour Grafana / Datadog.  

---

## ⚙️ Fonctions principales

| Domaine | Description |
|----------|-------------|
| **Intégration GitOps** | Connecte directement les dépôts Git à Docker/Swarm. |
| **Auto-réparation** | Relance ou restaure les déploiements échoués. |
| **Protection Zero-Destruction** | Blocage des actions destructrices par défaut. |
| **Multi-cibles** | Supporte Portainer, Swarm et hôtes locaux. |
| **Exécution parallèle** | Jusqu’à 5 déploiements simultanés. |
| **Restauration auditée** | Retour instantané à un état précédent. |
| **Renforcement TLS/SSH** | TLS ≥ 1.2, vérification stricte des clés. |
| **Surcharges dynamiques** | `--set` ajuste la configuration à la volée. |
| **Diagnostic complet** | `--doctor` vérifie versions et sécurité. |
| **Métriques & Webhooks** | Interface intégrée `/metrics` + serveur Webhook. |

---

## 🧩 Comparatif des solutions

| Produit | Architecture | Sécurité | Déploiement parallèle | Auto-réparation | Observabilité | Licence |
|----------|---------------|-----------|------------------------|-----------------|----------------|-----------|
| **S.M.A.R.T v2.3** | CLI + API Standalone | ✅ Zero-Destruction + TLS 1.2+ | ✅ | ✅ | ✅ Prometheus + Audit Log | OPSL-Public |
| Docker Compose CLI | Local manuel | ⚠️ Pas de politique | ❌ | ❌ | ❌ | Apache 2.0 |
| Portainer Stacks | Web UI / API | ✅ TLS + RBAC | ⚠️ Séquentiel | ❌ | ⚠️ Logs basiques | CE / BE |
| Jenkins Pipeline | Serveur | ⚠️ Dépend de la config | ✅ | ⚠️ Partiel | ⚠️ Plugins | MIT |
| Rancher CLI | Cloud / K8s | ✅ | ❌ | ❌ | ⚠️ Cluster uniquement | Apache 2.0 |

---

## ⚡ Guide rapide

```bash
git clone https://github.com/<user>/smart-docker-installer.git
cd smart-docker-installer
node stacklink-smart_public_v2.3.js --init
vim .env
node stacklink-smart_public_v2.3.js --config smart.config.json --dry-run
node stacklink-smart_public_v2.3.js --config smart.config.json --target prod --log-json
