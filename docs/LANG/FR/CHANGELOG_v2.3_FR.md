
---

### 📘 `CHANGELOG_v2.3_FR.md`
```markdown
# Journal des modifications — Édition Publique v2.3

**Projet :** S.M.A.R.T Docker Installer — CLI Pro Publique  
**Licence :** OPSL-1.0 Édition Publique  
**Date :** 9 novembre 2025  

---

## Version 2.3 (9 nov 2025)

### Nouvelles fonctionnalités et améliorations
- `--init` : création automatique de `smart.config.json`, `.env.example`.  
- `--doctor` : diagnostic complet du système.  
- `--self-update` : mise à jour automatique depuis GitHub.  
- `--set` : remplacement direct de valeurs sans modifier le JSON.  
- Serveur Webhook : déploiement instantané sécurisé (HMAC-SHA256).  
- Déploiements parallèles : plusieurs cibles en même temps.  
- `--rollback-to` : restauration complète d’un état précédent.  
- Métriques Prometheus (port 9090).  
- Chargement automatique `.env`.  
- Validation AJV des configurations.  

### Sécurité et conformité
- Politique Zero-Destruction immut.  
- SSH 0600 + StrictHostKeyChecking.  
- Identifiants masqués dans logs et états.  
- Fichiers état en mode 0600 + SHA-256.  
- Audit étendu (run_id, operator, hostname, ip).  

### Corrections et optimisations
- Codes de sortie uniformes (0=OK / 1=Erreur / 2=Vérif).  
- Backoff exponentiel global.  
- Délai standard 30 s par cible.  
- Isolement des erreurs en mode parallèle.  

---

## 🔹 Version 2.2 (8 nov 2025)
- Prise en charge étendue de Docker Swarm.  
- Nouvelle option `--verify-only`.  
- Multi-cibles dans une seule configuration.  
- Fichiers audit automatiques avec SHA-256.  
- Renforcement TLS 1.2+ / SSH.  
- Politique Zero-Destruction intégrée.  

---

**© 2025 Sebastian Huehn**  
Ce journal peut être diffusé librement s’il n’est pas modifié.  
