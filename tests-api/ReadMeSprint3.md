DOCUMENT DE SYNTHÈSE — SPRINT 3 : PIPELINE CI/CD, EXTENSION DE COUVERTURE & TESTS E2E

1. Objectifs du Sprint

Étendre la couverture des tests fonctionnels de l'API OWASP Juice Shop.

Assurer la persistance et l'export correct de la collection Postman et de l'environnement.

Finaliser le traitement/parsing des métriques d'exécution Newman dans le workflow n8n.

Valider l'intégration bout en bout (E2E) en cas de succès et en cas d'échec du service.

Documenter la matrice de couverture des tests API.

2. Étapes réalisées & Actions techniques

Étape 1 : Extension de la couverture des tests API

Ajout de requêtes supplémentaires dans Postman (Search Products et Get Feedbacks).

Implémentation d'assertions automatisées (Status 200 OK, vérification du type de données en retour).

Synchronisation et export des fichiers mis à jour dans le répertoire tests-api/.

Étape 2 : Parsing & Traitement des résultats dans n8n

Configuration du nœud Code in JavaScript pour lire la sortie JSON générée par Newman.

Extraction dynamique des indicateurs clés : status global (PASSED/FAILED), total des assertions, assertions réussies, assertions échouées, et requêtes exécutées.

Étape 3 : Validation du test d'intégration E2E — Cas Succès

Exécution du workflow n8n avec le service Juice Shop actif (docker start juice-shop).

Confirmation du résultat : status: PASSED, failedAssertions: 0.

Étape 4 : Validation du test d'intégration E2E — Cas Échec

Simulation d'une panne de service en arrêtant le conteneur (docker stop juice-shop).

Exécution du workflow n8n et vérification de la détection d'anomalie : status: FAILED, failedAssertions > 0.

Redémarrage du conteneur Juice Shop.

Étape 5 : Documentation de la couverture

Création du fichier tests-api/README.md contenant la matrice de couverture des endpoints testés.

3. Matrice de Couverture des Tests API
Endpoint API,Méthode,Type de Test,Assertion principale
/rest/user/login,POST,Authentification,HTTP 200 + Capture du token JWT
/rest/user/whoami,GET,Profil utilisateur,HTTP 200 + Validation des données
/api/BasketItems/,POST,Gestion du panier,HTTP 200/201 + Extraction de basketItemId
/api/BasketItems/{id},PUT,Gestion du panier,HTTP 200 + Validation de mise à jour de quantité
/api/BasketItems/{id},DELETE,Gestion du panier,HTTP 200 + Confirmation de suppression
/rest/products/search,GET,Recherche,HTTP 200 + Validation du tableau de résultats
/api/Feedbacks/,GET,Feedback client,HTTP 200 OK