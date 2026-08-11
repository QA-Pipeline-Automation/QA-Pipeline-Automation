# Tests API — OWASP Juice Shop

Collection Postman pour tester les endpoints REST critiques de l'application **OWASP Juice Shop** (application volontairement vulnérable, utilisée ici comme cible de test pour la QA/sécurité).

## 📌 Contexte (Sprint 1)

Cette collection couvre les tâches suivantes du Sprint 1 :
- **IN-15** : Choix de l'application cible — OWASP Juice Shop
- **IN-16** : Écriture de la collection Postman (11 requêtes)
- **IN-17** : Structuration des environnements (dev/test)
- **IN-18** : Documentation de la collection

## 📁 Contenu du dossier

| Fichier | Description |
|---|---|
| `API Tests.postman_collection.json` | La collection avec les 11 requêtes |
| `Dev - Juice Shop.postman_environment.json` | Environnement de développement (local) |
| `Test - Juice Shop.postman_environment.json` | Environnement de test |

## 🚀 Installation / Import

1. Ouvrir Postman
2. **Import** → glisser les 3 fichiers `.json` de ce dossier
3. Vérifier que les 3 imports apparaissent : la collection "API Tests" + les 2 environnements dans l'onglet **Environments**

## ⚙️ Prérequis

- OWASP Juice Shop doit tourner en local avant de lancer les tests :
  ```
  npm start
  ```
  (par défaut disponible sur `http://localhost:3000`)

## 🔑 Variables d'environnement

Chaque environnement contient :

| Variable | Description | Exemple |
|---|---|---|
| `baseUrl` | URL de base de l'API | `http://localhost:3000` |
| `email` | Email du compte de test (admin) | `admin@juice-sh.op` |
| `password` | Mot de passe du compte de test | `admin123` |
| `token` | JWT d'authentification (⚠️ laissé **vide** volontairement) | *(auto-rempli)* |

**Important** : la variable `token` ne doit jamais être renseignée manuellement dans les fichiers exportés. Elle est capturée automatiquement à chaque exécution de la requête **Login** grâce à un script (voir plus bas), ce qui évite de committer un token JWT en dur dans le repo.

**Avant de lancer les tests : sélectionner l'environnement voulu** (`Dev - Juice Shop` ou `Test - Juice Shop`) en haut à droite de Postman.

## 🔄 Fonctionnement de l'authentification

La requête **Login** contient un script *post-response* qui extrait le token de la réponse et le stocke automatiquement dans la variable `{{token}}` :

```javascript
pm.environment.set("token", pm.response.json().authentication.token);
```

Toutes les requêtes nécessitant une authentification utilisent ensuite `{{token}}` dans l'onglet **Authorization** (type *Bearer Token*) — inutile de le copier-coller manuellement.

👉 **Toujours exécuter Login en premier** pour que les requêtes protégées fonctionnent.

## 📋 Détail des 11 requêtes

| # | Requête | Méthode | Auth requise | Description |
|---|---|---|---|---|
| 1 | Login | POST | Non | Authentifie l'utilisateur et capture le token JWT automatiquement |
| 2 | Register user | POST | Non | Crée un nouveau compte utilisateur |
| 3 | Search product | GET | Non | Recherche des produits par mot-clé |
| 4 | Get product detail | GET | Non | Détails d'un produit via son ID |
| 5 | Get basket | GET | Oui | Contenu du panier de l'utilisateur connecté |
| 6 | Add item to basket | POST | Oui | Ajoute un produit au panier (`ProductId`/`BasketId` en **nombre**, pas en texte) |
| 7 | Update basket item | PUT | Oui | Modifie la quantité d'un item du panier |
| 8 | Delete basket item | DEL | Oui | Supprime un item du panier |
| 9 | Get non-existent product (404) | GET | Non | Test négatif — vérifie le comportement 404 |
| 10 | Create order (B2B) | POST | Oui | Crée une commande à partir du panier |
| 11 | Get user whoami | GET | Oui | Infos de l'utilisateur actuellement authentifié |

## ▶️ Exécution manuelle (Postman)

1. Sélectionner l'environnement (`Dev - Juice Shop`)
2. Lancer **Login**
3. Lancer les autres requêtes dans l'ordre souhaité

## ▶️ Exécution en ligne de commande (Newman)

```bash
npm install -g newman

newman run "API Tests.postman_collection.json" \
  -e "Dev - Juice Shop.postman_environment.json" \
  --reporters cli,json \
  --reporter-json-export results.json
```

## 🐞 Notes / points d'attention connus

- `BasketId` et `ProductId` doivent être envoyés comme **nombres** (`1`), pas comme texte (`"1"`) — sinon l'API renvoie une erreur 500 (contrainte Sequelize/SQLite).
- Le token JWT a une durée de vie limitée : relancer **Login** si les requêtes protégées renvoient une 401.
- La base de données de Juice Shop se réinitialise à chaque redémarrage du serveur (les IDs de produits/paniers créés en session ne persistent pas).

## ✅ Statut

Sprint 1 terminé (IN-15 → IN-18). Prochaine étape (Sprint 2) : intégration Newman + reporting JSON + connexion n8n.