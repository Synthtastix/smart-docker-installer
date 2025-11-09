
---

### 📘 `CHANGELOG_v2.3_PL.md`
```markdown
# Dziennik zmian — Edycja Publiczna v2.3

**Projekt:** S.M.A.R.T Docker Installer — CLI Public Pro  
**Licencja:** OPSL-1.0 Edycja Publiczna  
**Data:** 9 listopada 2025  

---

## Wersja 2.3 (9 lis 2025)

### Nowe funkcje i ulepszenia
- `--init` tworzy `smart.config.json` i `.env.example`.  
- `--doctor` — pełna diagnostyka systemu.  
- `--self-update` — automatyczna aktualizacja z GitHuba.  
- `--set` — nadpisywanie parametrów bez edycji JSON-a.  
- Serwer Webhook z uwierzytelnianiem HMAC-SHA256.  
- Równoległe wdrożenia dla wielu celów.  
- `--rollback-to` — pełny rollback.  
- Metryki Prometheus (port 9090).  
- Automatyczne ładowanie `.env`.  
- Walidacja schematu z AJV.  

### Bezpieczeństwo i zgodność
- Polityka Zero-Destruction niezmieniona.  
- SSH 0600 + StrictHostKeyChecking.  
- Maskowanie danych w logach i plikach stanu.  
- Pliki z SHA-256 i uprawnieniami 0600.  
- Audyt rozszerzony o `run_id`, `hostname`, `ip`.  

### Poprawki i optymalizacje
- Spójne kody wyjścia (0 OK / 1 Błąd / 2 Weryfikacja).  
- Globalny backoff ponowień.  
- Timeout 30 s dla wszystkich operacji.  
- Izolacja błędów w trybie równoległym.  

---

**© 2025 Sebastian Huehn**  
Może być swobodnie rozpowszechniany, jeśli pozostaje niezmieniony.  
