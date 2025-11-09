# 🧩 S.M.A.R.T Docker Installer — Edycja Publiczna v2.3  
**Wersja:** 2.3  **Licencja:** OPSL-1.0-Public  **Status:** Stabilna / Gotowa do zastosowań korporacyjnych  

---

## 🌐 Przegląd

**S.M.A.R.T Docker Installer** to uniwersalne, bezpieczne i w pełni zautomatyzowane rozwiązanie do wdrożeń w nowoczesnych środowiskach **DevOps** i **GitOps**.  
Edycja Publiczna v2.3 została zaprojektowana dla **zespołów, start-upów i firm**, które potrzebują wdrażać kontenery w sposób **niezawodny, powtarzalny i zgodny z normami**, bez zależności od rozbudowanej infrastruktury CI/CD.

W odróżnieniu od takich narzędzi jak *Docker Compose*, *Portainer Stacks* czy *Jenkins Pipelines*, S.M.A.R.T Installer wprowadza autonomiczną warstwę kontroli, łączącą **walidację, bezpieczeństwo, rollback, obserwowalność i audyt** w jednym przenośnym pliku wykonywalnym.

---

## 🚀 Nowości w wersji 2.3

| Kategoria | Opis |
|------------|------|
| **Silnik samo-naprawy** | Automatycznie wykrywa nieudane wdrożenia i wykonuje odzyskiwanie lub rollback. |
| **Walidacja schematu (AJV)** | Sprawdza poprawność pliku `smart.config.json` przed każdą sesją. |
| **Automatyczne ładowanie `.env`** | Bezpiecznie wczytuje zmienne środowiskowe przez `dotenv`. |
| **`--set klucz=wartość`** | Dynamiczne nadpisywanie parametrów konfiguracji w czasie działania. |
| **Tryb `--doctor`** | Pełna diagnostyka systemu (Node, Docker, TLS, SSH, Portainer). |
| **`--rollback-to`** | Przywraca poprzedni stan z pełnym zapisem audytu. |
| **Serwer Webhook (port 3000)** | Obsługuje automatyczne wdrożenia z GitHub/GitLab. |
| **Metryki Prometheus (port 9090)** | Eksportuje metryki w czasie rzeczywistym. |
| **Równoległe wdrożenia** | Obsługuje do 5 celów jednocześnie. |

---

## 💡 Wartość strategiczna dla zespołów DevOps

1. **Niezawodność i pełna audytowalność** — każda sesja generuje `./.state/last_run.json` z hashem SHA-256.  
2. **Polityka Zero-Destruction** — uniemożliwia usunięcie lub modyfikację zasobów bez potwierdzenia.  
3. **Niezależność od dostawców** — działa offline przy użyciu tylko Node.js i Dockera.  
4. **Deterministyczna powtarzalność** — te same wyniki przy każdym wdrożeniu.  
5. **Przejrzysta obserwowalność** — wbudowane metryki Prometheus dla Grafany lub Datadog.  

---

## ⚙️ Kluczowe funkcje

| Obszar | Opis |
|--------|------|
| **Integracja GitOps** | Łączy repozytoria Git bezpośrednio z Dockerem / Swarm. |
| **Samo-naprawa** | Automatycznie ponawia lub przywraca nieudane wdrożenia. |
| **Ochrona Zero-Destruction** | Blokuje destrukcyjne operacje domyślnie. |
| **Wielo-celowe wdrożenia** | Obsługa Portainera, Swarma i środowisk lokalnych. |
| **Wykonywanie równoległe** | Do 5 wdrożeń jednocześnie. |
| **Rollback z audytem** | Natychmiastowe przywrócenie do poprzedniego stanu. |
| **Wymuszanie TLS/SSH** | TLS ≥ 1.2 i ścisła weryfikacja kluczy hosta. |
| **Dynamiczne nadpisywanie** | `--set` umożliwia edycję w locie. |
| **Diagnostyka** | `--doctor` sprawdza wersje i bezpieczeństwo. |
| **Metryki i Webhooki** | Zintegrowane `/metrics` i serwer webhook. |

---

## 🧩 Porównanie z innymi narzędziami

| Produkt | Architektura | Bezpieczeństwo | Wdrożenie równoległe | Samo-naprawa | Obserwowalność | Licencja |
|----------|---------------|----------------|-----------------------|---------------|----------------|-----------|
| **S.M.A.R.T v2.3** | CLI + API Standalone | ✅ Zero-Destruction + TLS 1.2+ | ✅ | ✅ | ✅ Prometheus + Audyt | OPSL-Public |
| Docker Compose CLI | Lokalna / ręczna | ⚠️ Brak polityki | ❌ | ❌ | ❌ | Apache 2.0 |
| Portainer Stacks | Web UI / API | ✅ TLS + RBAC | ⚠️ Sekwencyjne | ❌ | ⚠️ Logi podstawowe | CE / BE |
| Jenkins Pipelines | Serwer | ⚠️ Zależne od konfiguracji | ✅ | ⚠️ Częściowe | ⚠️ Pluginy | MIT |
| Rancher CLI | Cloud / K8s | ✅ | ❌ | ❌ | ⚠️ Tylko poziom klastra | Apache 2.0 |

---

## ⚡ Szybki start

```bash
git clone https://github.com/<user>/smart-docker-installer.git
cd smart-docker-installer
node stacklink-smart_public_v2.3.js --init
vim .env
node stacklink-smart_public_v2.3.js --config smart.config.json --dry-run
node stacklink-smart_public_v2.3.js --config smart.config.json --target prod --log-json
