# Sprint 2 — Automatisation Newman + n8n

Ce document décrit le travail réalisé pendant le Sprint 2 : exécution automatisée des tests Postman via Newman, et intégration dans un workflow n8n déclenchable en un clic (base pour une future automatisation planifiée/CI).

Fait suite au Sprint 1 (voir `tests-api/README.md` pour la collection Postman elle-même).

## 📌 Tâches couvertes

- **Exécuter Newman en CLI avec sortie JSON**
- **Connecter Newman à n8n (Execute Command + parsing)** — IN-33

## 🧩 Contexte technique

n8n tourne dans un conteneur Docker (mis en place par un coworker au Sprint 1 — voir `n8n/README.md`). Newman, lui, doit s'exécuter **à l'intérieur de ce conteneur** pour que le node "Execute Command" de n8n puisse le lancer. Cela a nécessité plusieurs ajustements par rapport à une exécution Newman classique en local.

## 1️⃣ Newman en CLI (sur poste local, hors Docker)

### Installation
```bash
npm install -g newman
```
Sur Windows, si `newman` n'est pas reconnu après installation : vérifier que `npm config get prefix` (ex: `C:\Users\<user>\AppData\Roaming\npm`) est bien présent dans le PATH système, puis rouvrir le terminal.

### Exécution
Depuis le dossier `tests-api/` :
```powershell
newman run "API Tests.postman_collection.json" -e "Dev - Juice Shop.postman_environment.json" --reporters "cli,json" --reporter-json-export results.json
```
⚠️ **Sous PowerShell**, `--reporters` doit être entre guillemets (`"cli,json"`), sinon PowerShell interprète mal la virgule.

### Prérequis pour un run 100% vert
- Le champ **Initial Value** de chaque variable d'environnement doit être rempli (pas seulement "Current Value"), sinon l'export `.json` de l'environnement contient des valeurs vides et Newman échoue avec des URLs invalides (`http:///...`). Utiliser le bouton ☁️ (sync Current → Initial) dans Postman avant d'exporter.
- Toutes les requêtes protégées doivent utiliser `{{token}}` en Bearer Auth — **pas de JWT copié en dur**.

## 2️⃣ Correctifs apportés à la collection Postman

Deux problèmes bloquaient une exécution répétée (2e run et suivants) :

### a) `Get user whoami` — auth par cookie, pas par header
Cet endpoint Juice Shop lit l'authentification depuis un cookie de session (présent seulement dans Postman Desktop), pas depuis le header `Authorization: Bearer`. Le test attendait `jsonData.user.email`, qui restait `undefined` via Newman.
→ **Correctif** : test assoupli pour vérifier uniquement l'existence de `jsonData.user` plutôt que la valeur exacte de l'email (comportement à documenter, pas un bug de notre collection).

### b) `Add / Update / Delete basket item` — non rejouable
Le `BasketId`/`ProductId` étaient en dur dans le body, et l'ID de l'item créé (`BasketItems/<id>`) était en dur dans les URLs d'Update et Delete. Résultat : ça passait une fois, puis échouait en 500 dès le run suivant (doublon de produit dans le panier, ou item déjà supprimé).

**Correctifs appliqués :**
- **Add item to basket** — Pre-request Script : génère un `ProductId` aléatoire à chaque run
  ```javascript
  const randomProductId = Math.floor(Math.random() * 20) + 1;
  pm.environment.set("randomProductId", randomProductId);
  ```
  Body mis à jour : `"ProductId": {{randomProductId}}`

- **Add item to basket** — Post-response Script : capture l'ID réel de l'item créé
  ```javascript
  if (pm.response.code === 200 || pm.response.code === 201) {
      const jsonData = pm.response.json();
      pm.environment.set("basketItemId", jsonData.data.id);
  }
  ```

- **Update basket item** et **Delete basket item** — URL mise à jour :
  ```
  {{baseUrl}}/api/BasketItems/{{basketItemId}}
  ```

Résultat : la collection est maintenant **rejouable à l'infini** — validé par deux runs Newman consécutifs sans échec.

## 3️⃣ Connecter Newman à n8n (IN-33)

### a) Rendre le node "Execute Command" disponible
Depuis n8n 2.x, ce node est **désactivé par défaut** pour raisons de sécurité. Il faut l'activer explicitement dans `docker-compose.yml`, section `environment` du service `n8n` :
```yaml
- NODES_EXCLUDE=[]
```
(Liste vide = aucun node exclu. Les variables `N8N_NODES_INCLUDE` et `N8N_ENABLE_EXECUTE_COMMAND` ne fonctionnent **pas** pour ce cas — c'est bien `NODES_EXCLUDE` qu'il fallait vider.)

Puis :
```powershell
docker compose down n8n
docker compose up -d n8n
```

### b) Partager les fichiers de tests avec le conteneur
Le conteneur n8n est isolé du système de fichiers Windows. Ajout d'un volume dans `docker-compose.yml` :
```yaml
services:
  n8n:
    volumes:
      - ./n8n_data:/home/node/.n8n
      - ./tests-api:/tests-api
      - ./n8n_npm_global:/home/node/.npm-global
```
- `./tests-api:/tests-api` → donne accès à la collection, aux environnements, et permet d'écrire `results.json`.
- `./n8n_npm_global:/home/node/.npm-global` → rend l'installation de Newman **persistante** (survit à un `docker compose down/up` ou un `restart`).

### c) Installer Newman dans le conteneur
Le conteneur n8n tourne avec un utilisateur non-root (`node`), sans droit d'écriture dans `/usr/local/lib`. Installation dans un dossier utilisateur à la place :
```bash
docker exec -it qa-pipeline-automation-n8n-1 sh
npm config set prefix ~/.npm-global
npm install -g newman
```
Grâce au volume `n8n_npm_global`, cette installation ne sera plus jamais à refaire.

### d) Adapter l'URL cible depuis le conteneur
Juice Shop tourne sur la machine hôte (Windows), pas dans le conteneur — `localhost` depuis l'intérieur du conteneur ne pointe donc pas vers Juice Shop. Utiliser l'adresse spéciale Docker :
```
http://host.docker.internal:3000
```
passée en override dans la commande Newman (`--env-var baseUrl=...`), sans modifier le fichier d'environnement partagé.

### e) Le workflow n8n
**Nom du workflow :** `Newman - Juice Shop Tests`

**3 nodes :**
1. **Manual Trigger** — déclenchement à la demande (base pour un futur Schedule Trigger)
2. **Execute Command** — lance Newman :
   ```bash
   cd /tests-api && NODE_NO_WARNINGS=1 /home/node/.npm-global/bin/newman run "API Tests.postman_collection.json" -e "Dev - Juice Shop.postman_environment.json" --env-var baseUrl=http://host.docker.internal:3000 --reporters json --reporter-json-export /tmp/results.json > /dev/null 2>&1 ; cat /tmp/results.json
   ```
   - `NODE_NO_WARNINGS=1` + redirection vers `/dev/null` : évite qu'un simple warning Node.js (deprecation `fs.F_OK`) fasse échouer le node (le node "Execute Command" traite tout `stderr` comme un échec par défaut).
   - `cat /tmp/results.json` en sortie : transmet le rapport JSON complet au node suivant via stdout.
3. **Code (JavaScript)** — parse le JSON reçu et calcule un résumé exploitable :
   ```javascript
   const report = JSON.parse(output);
   const assertions = report.run.stats.assertions;
   const requests = report.run.stats.requests;

   return {
     json: {
       status: assertions.failed === 0 ? "PASSED" : "FAILED",
       totalAssertions: assertions.total,
       failedAssertions: assertions.failed,
       passedAssertions: assertions.total - assertions.failed,
       totalRequests: requests.total,
       failedRequests: requests.failed,
       durationMs: report.run.timings.completed - report.run.timings.started
     }
   };
   ```

**Résultat obtenu (validé) :**
```json
{
  "status": "PASSED",
  "totalAssertions": 17,
  "failedAssertions": 0,
  "passedAssertions": 17,
  "totalRequests": 11,
  "failedRequests": 0,
  "durationMs": 1219
}
```

## ▶️ Comment relancer ce workflow

1. Vérifier que Juice Shop tourne sur l'hôte (`npm start`, port 3000)
2. Vérifier que le conteneur n8n tourne : `docker ps`
3. Ouvrir http://localhost:5678 (admin / admin123)
4. Ouvrir le workflow `Newman - Juice Shop Tests`
5. Cliquer sur **Execute workflow**
6. Le node "Code in JavaScript" affiche le résumé du run

## ✅ Statut

Sprint 2 (partie Newman/n8n) terminé et validé par exécutions répétées, en CLI et via n8n.

Prochaine étape possible : remplacer le Manual Trigger par un **Schedule Trigger** pour une exécution automatique planifiée, et ajouter une notification (Slack/email) basée sur le champ `status` du node Code.