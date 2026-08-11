🛠️ Configuration de Jenkins & Déclenchement par API HTTP
Ce guide explique comment créer votre Job Jenkins, sécuriser l'accès avec un API Token utilisateur, et déclencher le pipeline à distance via une requête HTTP (Postman ou n8n).

📋 Étape 1 : Créer le Job Jenkins (QA-Pipeline)
Connectez-vous à votre interface Jenkins (ex: http://localhost:8080).

Cliquez sur Nouveau Item (New Item) dans le menu de gauche.

Entrez le nom du job : QA-Pipeline.

Sélectionnez le type : Pipeline.

Cliquez sur OK.

📜 Étape 2 : Ajouter le Script Jenkinsfile (Pipeline)
Descendez dans la section Pipeline.

Dans Definition, choisissez Pipeline script.

Copiez-collez le script suivant dans la zone de texte :

Groovy
pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                echo 'Pipeline déclenché par API avec succès ! 🚀'
            }
        }
    }
}
Cliquez sur Enregistrer (Save).

🧪 Étape 3 : Premier Test via l'Interface Jenkins
Sur la page de votre job QA-Pipeline, cliquez sur Lancer un build (Build Now) dans le menu de gauche.

Dans Historique des builds (Build History), vérifiez qu'un build #1 apparaît avec une coche verte ✔️.

🔐 Étape 4 : Créer un Utilisateur & Générer un Token API Jenkins
Pour autoriser les appels API externes en toute sécurité :

1. Créer ou sélectionner un utilisateur dédié (n8n-bot)
Allez dans Administrer Jenkins (Manage Jenkins) > Utilisateurs (Users).

Vérifiez ou créez l'utilisateur dédié (ex: Identifiant: n8n-bot).

2. Générer le Token API
Cliquez sur l'utilisateur n8n-bot dans la liste.

Cliquez sur Configuration (dans le menu de gauche).

Descendez jusqu'à la section API Token.

Cliquez sur Add new Token, donnez-lui un nom (ex: n8n-token), puis cliquez sur Generate.

⚠️ IMPORTANT : Copiez immédiatement la chaîne de caractères générée (ex: 1117e1efdd7283582a94a56507e03fe202). Vous ne pourrez plus la revoir ensuite !

⚙️ Étape 5 : Activer le Déclenchement Distant du Job
Retournez sur le Job QA-Pipeline > cliquez sur Configurer (Configure).

Descendez jusqu'à la section Général / Triggers de build (Build Triggers).

Cochez la case : Déclencher les builds à distance (ex: depuis des scripts) (Trigger builds remotely).

Dans le champ Jeton d'authentification (Authentication Token), saisissez votre secret personnalisé :

Plaintext
MonSecretPipelineQA123
Cliquez sur Enregistrer (Save).

🌐 Étape 6 : Construire l'URL de Déclenchement HTTP
Puisque Jenkins est exposé publiquement via votre tunnel ngrok, l'URL de déclenchement finale est :

Plaintext
https://linoleum-decay-democrat.ngrok-free.dev/job/QA-Pipeline/build?token=MonSecretPipelineQA123
Détail des paramètres :

QA-Pipeline : Nom exact de votre job dans Jenkins.

token=MonSecretPipelineQA123 : Le jeton d'authentification configuré à l'étape 5.

🚀 Étape 7 : Tester le Déclenchement avec Postman
Ouvrez Postman pour valider l'appel API :

1. Méthode HTTP
Sélectionnez : POST

2. URL de la requête
Collez l'URL ngrok complète :

Plaintext
https://linoleum-decay-democrat.ngrok-free.dev/job/QA-Pipeline/build?token=MonSecretPipelineQA123
3. Authentification (Authorization)
Allez dans l'onglet Authorization.

Dans Type, sélectionnez : Basic Auth.

Remplissez les identifiants :

Username : n8n-bot (ou votre nom d'utilisateur Jenkins)

Password : ➡️ Collez l'API Token généré à l'étape 4 (ex: 1117e1efdd7283582a94a56507e03fe202).

(⚠️ Ne mettez PAS le mot de passe habituel de l'utilisateur, mais le Token API !)

4. Envoi et Résultat
Cliquez sur le bouton bleu Send.

Résultat attendu : Vous devez recevoir un code HTTP 201 Created.

Vérification Jenkins : Retournez dans votre job QA-Pipeline sur Jenkins ➔ Build History. Un nouveau build vient de se lancer automatiquement !
