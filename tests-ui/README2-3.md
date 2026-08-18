# Sprint QA Automation — Intégration Cypress → n8n → Analyse IA → Discord

## 1. Vue d'ensemble

Ce sprint met en place le pipeline complet qui relie l'exécution des tests **Cypress** (UI) à un
workflow **n8n** capable de parser les résultats, de les faire analyser par une IA (Google
Gemini), puis de notifier l'équipe sur **Discord** en cas d'échec.

```
Exécution Cypress (local)
        ↓
cypress/report.json (Mochawesome, fusionné)
        ↓
n8n : Execute Command (lecture du rapport)
        ↓
n8n : Code — parsing JSON brut → structure exploitable
        ↓
n8n : Code — extraction des échecs uniquement
        ↓
n8n : If — y a-t-il des échecs ?
        ↓ (oui)
n8n : Message a model (Google Gemini) — analyse experte des échecs
        ↓
n8n : Discord — envoi du message d'analyse dans le canal QA
```

---

## 2. Pré-requis techniques mis en place

### 2.1 Accès de n8n au rapport Cypress

Le conteneur Docker `n8n` tournait initialement isolé, sans accès au dossier du projet
(seul `tests-api` était monté, pour les futurs tests Newman/Postman). Un volume a été ajouté
dans `docker-compose.yml` pour exposer le dossier `cypress/` au conteneur :

```yaml
  n8n:
    image: n8nio/n8n:latest
    extra_hosts:
      - "host.docker.internal:host-gateway"
    ports:
      - "5678:5678"
    volumes:
      - ./n8n_data:/home/node/.n8n
      - ./tests-api:/tests-api
      - ./n8n_npm_global:/home/node/.npm-global
      - ./cypress:/cypress-data      # ← ajouté pour ce sprint
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=admin123
      - GENERIC_TIMEZONE=Africa/Casablanca
      - NODES_EXCLUDE=[]
    networks:
      - qa_network
```

Vérification de l'accès :
```powershell
docker exec qa-pipeline-automation-n8n-1 cat /cypress-data/report.json
```

**Note d'architecture :** Cypress n'est **pas** exécuté à l'intérieur du conteneur n8n (image trop
légère, pas de navigateur/Electron disponible). Les tests restent lancés localement
(`npm run test:e2e:custom`), et n8n se contente de **lire le rapport déjà généré** via le volume
monté. C'est une approche « pull » plutôt que « push », plus simple et plus robuste que
d'essayer de faire tourner Cypress dans Docker.

### 2.2 Fiabilisation du pipeline npm

- Ajout du fichier `tests-ui/cypress/support/e2e.ts` (support file manquant, requis par
  `cypress.config.ts`).
- Correction d'une erreur de syntaxe JSON dans `package.json` (virgule manquante entre
  `cy:custom` et `generate:report`).
- Ajout de `|| exit 0` à la fin de la commande `cy:custom`, pour que le hook
  `posttest:e2e:custom` (génération du rapport) se déclenche **systématiquement**, y compris
  quand des tests Cypress échouent (essentiel : le but du pipeline est justement de détecter
  et documenter les échecs, pas de s'arrêter dessus).

---

## 3. Le workflow n8n

Nom du workflow : `Cypress Report Parser` (à exporter dans `n8n/workflows/`)

### Enchaînement des nœuds

| # | Nœud | Type | Rôle |
|---|------|------|------|
| 1 | *(déclencheur)* | Manual Trigger | Lancement manuel pour test |
| 2 | **Execute Command** | Execute Command | Lit le rapport brut : `cat /cypress-data/report.json` |
| 3 | **Json Cypress** | Code | Parse le `stdout` (texte) en JSON exploitable, extrait les stats globales et la liste des tests en échec |
| 4 | **Results echec JSON** | Code | Reformate/complète la structure des échecs (`hasFailures`, `summary`, `details.uiFailures`, etc.) |
| 5 | **If** | If | Branche `true` si `hasFailures === true`, sinon `false` (pas de notification si tout est vert) |
| 6 | **Message a model** | Google Gemini (PaLM) | Envoie le résumé structuré des échecs à l'IA avec un prompt d'expert QA/DevOps |
| 7 | **Discord** | Discord (Webhook) | Poste l'analyse générée par l'IA dans le canal Discord de l'équipe |

### 3.1 Nœud Execute Command

**Command :**
```
cat /cypress-data/report.json
```

Sortie brute (extrait) :
```json
{
  "exitCode": 0,
  "stderr": "",
  "stdout": "{\"stats\":{\"suites\":5,\"tests\":5,\"passes\":4,\"failures\":1,...}"
}
```

### 3.2 Nœud « Json Cypress » (Code)

```javascript
const raw = $input.first().json.stdout;
const report = JSON.parse(raw);

return [{
  json: {
    totalTests: report.stats.tests,
    passed: report.stats.passes,
    failed: report.stats.failures,
    passPercent: report.stats.passPercent,
    duration: report.stats.duration,
    startedAt: report.stats.start,
    failedTests: report.results.flatMap(file =>
      file.suites.flatMap(suite =>
        suite.tests
          .filter(test => test.state === 'failed')
          .map(test => ({
            spec: file.file,
            title: test.title,
            errorMessage: test.err?.message || 'Erreur non spécifiée'
          }))
      )
    )
  }
}];
```

Sortie obtenue (exemple réel) :
```json
{
  "totalTests": 5,
  "passed": 4,
  "failed": 1,
  "passPercent": 80,
  "duration": 50200,
  "startedAt": "2026-08-18T11:05:39.220Z",
  "failedTests": [
    {
      "spec": "tests-ui\\cypress\\e2e\\searchProductFailure.spec.ts",
      "title": "devrait échouer car le produit recherché n'existe pas dans le catalogue",
      "errorMessage": "AssertionError: Timed out retrying after 10000ms: Expected to find content: 'Unicorn Juice' within the element: <mat-card...> but never did."
    }
  ]
}
```

### 3.3 Nœud « Results echec JSON » (Code) + nœud « If »

Ce nœud restructure les données pour distinguer les échecs API (Newman, à venir) des échecs
UI (Cypress), sous une forme unifiée :

```json
{
  "hasFailures": true,
  "summary": {
    "totalApiFailed": 0,
    "totalUiFailed": 1,
    "executionDate": "2026-08-18T15:05:42.918Z"
  },
  "details": {
    "apiFailures": [],
    "uiFailures": [
      {
        "spec": "tests-ui\\cypress\\e2e\\searchProductFailure.spec.ts",
        "title": "devrait échouer car le produit recherché n'existe pas dans le catalogue",
        "errorMessage": "AssertionError: Timed out retrying after 10000ms: ..."
      }
    ]
  }
}
```

Le nœud **If** vérifie `hasFailures === true` : la branche `true` va vers l'analyse IA + Discord,
la branche `false` s'arrête là (pas de bruit inutile si tous les tests passent).

### 3.4 Nœud « Message a model » (Google Gemini)

- **Credential :** Google Gemini (PaLM) API account
- **Modèle :** `models/gemini-2.5-flash`
- **Opération :** Message a Model

**Prompt système (Values 1 — role: Model) :**
```
Tu es un expert QA et DevOps. Analyse les échecs de nos tests automatisés (Newman API et
Cypress UI). Identifie la cause racine et la solution corrective. Structure ta réponse avec :
- Analyse des Échecs par test (titre, message d'erreur)
- Cause Racine
- Origine du Problème (Frontend / Backend / Test lui-même)
- Solution Corrective
```

**Contenu injecté (Values 2 — role: User) :**
```
{{ JSON.stringify($json.details) }}
```

**Exemple de réponse générée par l'IA (extrait réel) :**

> En tant qu'expert QA et DevOps, voici l'analyse des échecs de vos tests automatisés :
>
> **Analyse des Échecs**
> **Échec 1 : Cypress UI Test Failure (`searchProductFailure.spec.ts`)**
> - **Titre du test :** "devrait échouer car le produit recherché n'existe pas dans le catalogue"
> - **Message d'erreur :** `AssertionError: ... Expected to find content: 'Unicorn Juice' ... but never did.`
> - **Cause Racine :** L'intitulé du test indique qu'il est censé vérifier qu'un produit
>   inexistant ne devrait pas être trouvé. Or l'assertion Cypress s'attend à trouver ce
>   produit — il y a une inversion de la logique d'assertion par rapport à l'objectif déclaré
>   du test.
> - **Origine du Problème :** Frontend (code du test Cypress), pas un bug de l'application.
> - **Solution Corrective :** Corriger le test pour s'assurer que le produit "Unicorn Juice"
>   **n'est pas** affiché dans les résultats, plutôt que d'attendre qu'il le soit.

*(Note : cette lecture de l'IA est un excellent exemple de la valeur du sprint — elle a
correctement identifié que le test échoue « pour la bonne raison » et a même souligné une
piste d'amélioration sur la formulation de l'assertion.)*

### 3.5 Nœud « Discord »

- **Connection Type :** Webhook
- **Credential :** Discord Webhook account
- **Operation :** Send a Message
- **Message :**
```
{{ $json.content.parts[0].text.substring(0, 1900) }}
```
*(troncature à 1900 caractères pour respecter la limite de 2000 caractères par message Discord)*

**Résultat obtenu :** message posté avec succès dans le canal Discord `QA Alert Bot`, le
18 août 2026 à 16:05, contenant l'intégralité de l'analyse structurée ci-dessus.

---

## 4. Sauvegarde du workflow

Le workflow a été exporté depuis l'interface n8n (menu `···` → Download) et placé dans :
```
n8n/workflows/cypress-report-parser.json
```
aux côtés des workflows existants (`Newman - Juice Shop Tests.json`, `pipeline-start.json`).

---

## 5. État d'avancement du sprint

| Tâche | Statut |
|---|---|
| Choisir l'application cible à tester (volet UI) | ✅ Fait |
| Écrire 3-4 tests Cypress basiques | ✅ Fait (5 specs : 4 succès + 1 échec volontaire) |
| Installer Mochawesome/Allure pour Cypress | ✅ Fait |
| Documenter les tests Cypress | ✅ Fait |
| Exécuter Cypress en CLI headless avec reporter | ✅ Fait |
| Connecter Cypress à n8n (Execute Command + parsing) | ✅ Fait |
| Valider la lisibilité des rapports Mochawesome | ✅ Fait |
| Finaliser le parsing des résultats Cypress dans n8n | ✅ Fait |
| Test d'intégration bout en bout — cas succès | ✅ Fait |
| Test d'intégration bout en bout — cas échec | ✅ Fait |
| Rédiger et tester le prompt d'analyse des logs (IA) | ✅ Fait (Google Gemini 2.5 Flash) |
| Ajouter des tests Cypress supplémentaires (couverture) | ⏳ À faire |

---

## 6. Pistes d'amélioration identifiées

- Corriger `searchProductFailure.spec.ts` pour que l'assertion corresponde réellement à
  l'intention du test (vérifier l'**absence** du produit plutôt que sa présence), suite à la
  remarque pertinente soulevée par l'analyse IA elle-même.
- Étendre le nœud « Results echec JSON » pour intégrer les résultats Newman (tests API), le
  champ `apiFailures` étant déjà prévu dans la structure mais pas encore alimenté.
- Nettoyer le dossier `cypress/debug/` (utilisé pour le diagnostic pendant le développement des
  specs, plus nécessaire en usage normal).
- Envisager de déclencher le workflow n8n automatiquement (Webhook ou Cron) après chaque
  exécution de `npm run test:e2e:custom`, plutôt que manuellement.