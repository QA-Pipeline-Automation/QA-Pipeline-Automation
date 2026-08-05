# OWASP Juice Shop API Testing

## 📋 Description

Ce projet a été réalisé dans le cadre d'un stage en **Assurance Qualité (QA)**.

L'objectif principal est de mettre en pratique les tests d'API REST en utilisant **Postman** sur l'application **OWASP Juice Shop**. Les travaux réalisés couvrent le choix de l'application, la création d'une collection Postman, la configuration des environnements et la documentation des tests.

---

# 🎯 Objectifs du projet

- Découvrir le fonctionnement des API REST.
- Utiliser Postman pour tester des services web.
- Vérifier les réponses HTTP et le contenu des réponses JSON.
- Structurer les tests à l'aide d'environnements Postman.
- Documenter les tests réalisés.
- Appliquer les bonnes pratiques en Assurance Qualité (QA).

---

# 🛠️ Technologies utilisées

- OWASP Juice Shop
- Node.js
- npm
- Postman
- REST API
- JSON
- Git
- GitHub

---

# 🚀 Installation

## Cloner le projet

```bash
git clone https://github.com/juice-shop/juice-shop.git
```

## Accéder au dossier

```bash
cd juice-shop
```

## Installer les dépendances

```bash
npm install
```

## Démarrer l'application

```bash
npm start
```

L'application est accessible à l'adresse suivante :

```
http://localhost:3000
```

---

# 📌 Travaux réalisés

## ✅ Tâche 1 : Choisir l'application cible à tester

L'application **OWASP Juice Shop** a été sélectionnée comme application cible pour les tests API.

Cette application est volontairement vulnérable et expose plusieurs API REST permettant de tester différentes fonctionnalités.

---

## ✅ Tâche 2 : Création d'une collection Postman

Une collection Postman a été créée afin de regrouper les principales requêtes API de l'application.

Les requêtes réalisées sont :

- Authentification utilisateur
- Récupération de tous les produits
- Recherche d'un produit
- Consultation des questions de sécurité
- Consultation des feedbacks
- Consultation des adresses utilisateur

Chaque requête a été configurée avec la méthode HTTP appropriée et testée via Postman.

---

## ✅ Tâche 3 : Configuration des environnements Postman

Deux environnements ont été créés :

### Environnement DEV

Variables configurées :

| Variable | Valeur |
|----------|--------|
| baseUrl | http://localhost:3000 |
| token | Généré automatiquement après authentification |

### Environnement TEST

Structure identique à l'environnement DEV afin de faciliter un futur déploiement sur un serveur de test.

Toutes les requêtes utilisent la variable :

```text
{{baseUrl}}
```

---

## ✅ Tâche 4 : Documentation de la collection

La collection a été documentée afin de faciliter son utilisation.

Pour chaque requête, la documentation précise :

- son objectif ;
- la méthode HTTP utilisée ;
- l'endpoint appelé ;
- le format des données échangées (JSON) ;
- le résultat attendu ;
- le code de réponse HTTP attendu.

---

# 📂 Endpoints testés

La collection Postman contient plusieurs requêtes permettant de tester les principales fonctionnalités de l'API REST de l'application OWASP Juice Shop.

---

## 1. Authentification utilisateur

| Élément | Valeur |
|---------|--------|
| Méthode | POST |
| Endpoint | `/rest/user/login` |

### Description

Cette requête permet à un utilisateur de s'authentifier en fournissant son adresse e-mail et son mot de passe. En cas de succès, l'API renvoie un jeton JWT utilisé pour accéder aux ressources protégées.

### Corps de la requête

```json
{
    "email": "test1@gmail.com",
    "password": "123qwe"
}
```

### Réponse attendue

- Code HTTP **200 OK**
- Jeton JWT
- Informations de l'utilisateur authentifié

---

## 2. Récupérer tous les produits

| Élément | Valeur |
|---------|--------|
| Méthode | GET |
| Endpoint | `/api/Products` |

### Description

Cette requête récupère la liste complète des produits disponibles dans l'application.

### Réponse attendue

- Code HTTP **200 OK**
- Liste des produits au format JSON

Les informations récupérées comprennent notamment :

- Identifiant du produit
- Nom
- Description
- Prix
- Quantité disponible
- Image
- Catégorie

---

## 3. Rechercher un produit

| Élément | Valeur |
|---------|--------|
| Méthode | GET |
| Endpoint | `/rest/products/search?q=apple` |

### Description

Cette requête permet d'effectuer une recherche de produits à partir d'un mot-clé.

Dans ce projet, le mot-clé utilisé est :

```
apple
```

### Réponse attendue

- Code HTTP **200 OK**
- Liste des produits correspondant au mot-clé recherché

---

## 4. Questions de sécurité

| Élément | Valeur |
|---------|--------|
| Méthode | GET |
| Endpoint | `/api/SecurityQuestions` |

### Description

Cette requête récupère la liste des questions de sécurité utilisées lors de la création ou de la récupération d'un compte utilisateur.

### Réponse attendue

- Code HTTP **200 OK**
- Liste des questions de sécurité disponibles

---

## 5. Feedbacks

| Élément | Valeur |
|---------|--------|
| Méthode | GET |
| Endpoint | `/api/Feedbacks` |

### Description

Cette requête récupère l'ensemble des avis (feedbacks) publiés par les utilisateurs de l'application.

### Réponse attendue

- Code HTTP **200 OK**
- Liste des commentaires
- Évaluation associée
- Informations sur les utilisateurs (selon les données exposées)

---

## 6. Adresse de l'utilisateur

| Élément | Valeur |
|---------|--------|
| Méthode | GET |
| Endpoint | `/api/Addresss` |

### Description

Cette requête permet de consulter les adresses enregistrées pour les utilisateurs.

Cette ressource nécessite généralement une authentification valide via un jeton JWT.

### En-tête utilisé

```
Authorization: Bearer {{token}}
```

### Réponse attendue

- Code HTTP **200 OK**
- Liste des adresses enregistrées
- Informations sur le destinataire
- Ville
- Pays
- Code postal
- Adresse complète

---

# Vérifications effectuées

Pour chaque endpoint testé, les vérifications suivantes ont été réalisées :

- Validation du code de réponse HTTP.
- Vérification du format JSON retourné.
- Contrôle de la présence des données attendues.
- Vérification du temps de réponse.
- Validation du bon fonctionnement de l'API.
- Vérification de l'accessibilité des ressources.

---

# ✅ Vérifications effectuées

Les tests réalisés permettent de vérifier :

- Le code de retour HTTP.
- Le format JSON des réponses.
- Le bon fonctionnement des endpoints REST.
- La disponibilité des ressources.
- La cohérence des données renvoyées.
- Le temps de réponse des services.

---

# 📁 Structure du projet

```
juice-shop/
│
├── Postman Collection
├── Environnement DEV
├── Environnement TEST
├── Documentation
└── README.md
```

---

# 📈 Compétences acquises

Au cours de ce projet, les compétences suivantes ont été mises en pratique :

- Utilisation de Postman.
- Tests d'API REST.
- Manipulation des requêtes HTTP (GET, POST).
- Analyse des réponses JSON.
- Gestion des environnements Postman.
- Documentation des tests.
- Utilisation de Git et GitHub.

---

# ✅ Résultat

Ce projet a permis de mettre en œuvre une démarche complète de tests d'API sur l'application OWASP Juice Shop. Les différentes requêtes ont été exécutées avec succès et documentées, offrant une base solide pour la validation fonctionnelle des services REST dans un contexte d'Assurance Qualité.

---

# 👩‍💻 Auteur

**Sabrine Azzam**

Projet réalisé dans le cadre d'un stage en Assurance Qualité (QA).