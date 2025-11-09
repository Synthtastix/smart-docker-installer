# Politique de Sécurité (Version 2.3)

**Version :** 2.3  **Date :** 9 novembre 2025  
**Licence :** OPSL-1.0 Édition Publique  

---

## Principes de base

1. **Zero-Destruction** – Inaltérable, même en rollback.  
2. **Auditabilité** – Chaque exécution génère `state/run_*.json` avec SHA-256.  
3. **Sécurité par défaut** – TLS 1.2+, SSH 0600, masquage de credentials.  
4. **Divulgation responsable** – `security@thinking-lab.ai`.  

---

## Nouveautés (v2.3)

- `--rollback-to` uniquement avec fichier état validé.  
- Webhook HMAC-SHA256 requiert `WEBHOOK_SECRET`.  
- Aucune donnée sensible dans /metrics.  
- Isolement des erreurs en déploiement parallèle.  
- Validation AJV des fichiers de configuration.  

---

## Conformité

- ISO 27001, SOC 2 Type II, RGPD, ISO 42001.  
- Fichiers état : mode 0600, `duration_ms`, `commit`, `run_id`.  

---

## ⚙️ Architecture de sécurité

- Aucune routine ne doit supprimer ou écraser des données sans consentement explicite.  
- Tous les événements sécurité doivent être journalisés (JSON signé).  
- Clés SSH avec permissions 0600 ; aucune clé API en clair.  
- TLS 1.2+ obligatoire, HTTP interdit.  
- Modèle de redaction : `abc***xyz`.  
- Chaque version doit avoir un SHA-256 unique.  

---

## 🧠 Divulgation responsable

Signaler toute vulnérabilité confidentiellement à `security@thinking-lab.ai`.  
Réponse ≤ 72 h ; évaluation ≤ 14 jours selon ISO 29147 / 30111.  

---

**© 2025 Sebastian Huehn**  
Ce document peut être partagé librement s’il n’est pas modifié.  
