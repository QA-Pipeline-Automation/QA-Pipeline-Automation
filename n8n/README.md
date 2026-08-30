# QA-orchestration: Déploiemddmment ent Test de n8n avec Docker
test
Ce dépôtt conztient le guide ccomplerrrtekt pour configurer et orchestrer un envdironnement *h*n8n** via Dhocker, ainsi qu'un exemple de workflow de test (Hello World) validé via Postmaan [cite: 1].k
llll
---
4
224
4
5
5
5
6

4
## 📋 Table des matières
1. [Prérequis et Vérification](#1-prérequis-et-vérification)
2. [Arborescence du Projet](#2-arborescence-du-projet)
3. [Configuration Docker Compose](#3-configuration-docker-compose)
4. [Lancement et Vérification des Conteneurs](#4-lancement-et-vérification-des-conteneurs)
5. [Accès à l'interface n8n](#5-accès-à-linterface-n8n)
6. [Étape 2 : Création du Workflow "Hello World"](#6-étape-2--création-du-workflow-hello-world)
7. [Test avec Postman](#7-test-avec-postman)

---

## 1. Prérequis et Vérification

Assurez-vous que **Docker** et **Docker Compose** sont installés sur votre machine [cite: 1]. Ouvrez un terminal (cmd ou PowerShell) et exécutez les commandes suivantes [cite: 1] :

- **Vérification de la version de Docker** [cite: 1] :
  ```bash
  docker --version
  ```
  *(Résultat attendu : Docker version 29.3.1 ou supérieur)* [cite: 1]

- **Vérification de la version de Docker Compose** [cite: 1] :
  ```bash
  docker compose version
  ```
  *(Résultat attendu : Docker Compose version v5.1.1 ou supérieur)* [cite: 1]

---

## 2. Arborescence du Projet

Créez la structure de dossiers suivante sur votre poste [cite: 1] :
```text
QA-Orchestration/
└── n8n/
    └── docker-compose.yml
```

---

## 3. Configuration Docker Compose

Dans le sous-dossier `n8n`, créez un fichier nommé `docker-compose.yml` avec le contenu suivant [cite: 1] :

```yaml
services:
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    ports:
      - "5678:5678"
    volumes:
      - ./n8n_data:/home/node/.n8n
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=admin123
      - GENERIC_TIMEZONE=Africa/Casablanca
    restart: always
```

### Rôle des éléments :
| Élément | Rôle |
| :--- | :--- |
| `image` | Image officielle n8n [cite: 1] |
| `container_name` | Nom du conteneur Docker [cite: 1] |
| `5678` | Port web n8n [cite: 1] |
| `volume` | Sauvegarde des workflows [cite: 1] |
| `auth` | Protection de l'interface [cite: 1] |
| `timezone` | Fuseau horaire Maroc [cite: 1] |

---

## 4. Lancement et Vérification des Conteneurs

1. Placez-vous dans le dossier `n8n` via votre terminal et lancez le conteneur en arrière-plan [cite: 1] :
   ```bash
   docker compose up -d
   ```
   *(Cette commande déclenche le téléchargement de l'image et la création du conteneur)* [cite: 1]

2. Vérifiez que le conteneur est bien installé et en cours d'exécution [cite: 1] :
   ```bash
   docker ps
   ```

---

## 5. Accès à l'interface n8n

Accédez à l'application web via votre navigateur [cite: 1] :
👉 **URL :** [http://localhost:5678](http://localhost:5678) [cite: 1]

Lors de la première connexion, utilisez les informations d'enregistrement (ou les identifiants de base définis) [cite: 1] :
- **Email :** `projectpfa@outlook.com` [cite: 1]
- **Mot de passe :** `Maryam@1234` [cite: 1]
- **First name :** `project` [cite: 1]
- **Last name :** `pfa` [cite: 1]

---

## 6. Étape 2 : Création du Workflow "Hello World"

1. Connectez-vous à n8n [cite: 1].
2. Cliquez sur **`+ Add workflow`** [cite: 1].
3. Nommez le workflow : `QA - Hello World Workflow` [cite: 1].
4. Cliquez sur **`Add first step`** [cite: 1].
5. Recherchez et sélectionnez le nœud **Webhook** (`Webhook Trigger`) [cite: 1].
6. Configurez le Webhook [cite: 1] :
   - **HTTP Method :** `POST` [cite: 1]
   - **Path :** `hello` [cite: 1]
7. Ajoutez un nœud de code (`Code Log`) et choisissez **JavaScript** [cite: 1].
8. Insérez le script JavaScript suivant [cite: 1] :
   ```javascript
   return [
     {
       json: {
         message: "QA Pipeline Started Successfully",
         status: "SUCCESS",
         timestamp: new Date()
       }
     }
   ];
   ```
9. Cliquez sur **Execute Workflow** [cite: 1].

---

## 7. Test avec Postman

Pour tester votre webhook localement, ouvrez **Postman** et effectuez la requête suivante [cite: 1] :

- **Méthode :** `POST` [cite: 1]
- **URL :** `http://localhost:5678/webhook-test/hello` [cite: 1]

**Résultat attendu affiché dans Postman :** [cite: 1]
```json
{
  "message": "QA Pipeline Started Successfully",
  "status": "SUCCESS",
  "timestamp": "2026-..."
}
```
