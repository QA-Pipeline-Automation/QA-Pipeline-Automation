# README — Sprint 3 : orchestration CI/CD pipeline d'Automation QA -test 2

Ce Sprint 3 est axé sur l'intégration entre **Jenkins** et **n8n**, l'automatisation des exécutions de tests (Cypress, Newman API) et la gestion dynamique des résultats de builds (Succès / Échec) pour alimenter les workflows de notification et de métriques.

---

## 🎯 Objectifs du Sprint

1. **Pipeline Jenkins dynamique** : Mettre en place un `Jenkinsfile` unifié gérant les étapes de validation tout en permettant la simulation d'erreurs à la demande.
2. **Orchestration n8n** : Automatiser le déclenchement du pipeline Jenkins, la gestion des requêtes API, la prise en compte des timeouts et le routage des notifications (Discord, Grafana).
3. **Optimisation du dépôt Git** : Structurer la branche `feature/setup-structure`, nettoyer le suivi des dépendances lourdes (`node_modules`) et des bases de données locales `n8n_data`.

---

## 🛠️ Livrables et Fonctionnalités

### 1. Jenkinsfile (`jenkins/Jenkinsfile`)

* **É tapes exécutées** :
* `Checkout` : Récupération du code source depuis le dépôt Git (`checkout scm`).
* `Build Test` : Exécution des scripts de validation et affichage des logs de confirmation.


* **Déclenchement dynamique via `FAIL_BUILD**` :
* Intégration d'un paramètre booléen permettant de tester le workflow n8n sous deux conditions (Succès / Échec) sans modifier le code source.



```groovy
pipeline {
    agent any

    parameters {
        booleanParam(name: 'FAIL_BUILD', defaultValue: false, description: 'Simuler un échec de build')
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Récupération du code source...'
                checkout scm
            }
        }
        stage('Build Test') {
            steps {
                echo 'Pipeline déclenché par API avec succès ! 🚀'
                echo 'Exécution du build de validation...'
                sh 'echo "Build réussi sur le container Jenkins!"'

                script {
                    if (params.FAIL_BUILD.toBoolean()) {
                        error 'Échec simulé du build pour le test n8n !'
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Fin de l execution du Pipeline.'
        }
    }
}

```

---

### 2. Workflows n8n (`n8n/workflows/`)

| Fichier Workflow | Rôle & Description |
| --- | --- |
| `pipeline-start.json` | Nœud principal déclenchant le job Jenkins avec gestion fine des requêtes HTTP et des timeouts. |
| `Tests-Cypress-Ui.json` | Exécution et orchestration des tests UI Cypress. |
| `Newman - Juice Shop Tests.json` | Validation des endpoints API via Newman / Postman. |
| `Newman-Cypress-IA-Discord.json` | Traitement des résultats de tests, analyse et envoi d'alertes enrichies sur Discord. |

---

### 3. Arborescence du Projet

```text
QA-Pipeline-Automation/
├── .gitignore                      # Exclusion de node_modules, n8n_data, etc.
├── docker-compose.yml              # Services Jenkins, n8n, Grafana
├── cypress.config.ts               # Configuration des tests UI
├── jenkins/
│   └── Jenkinsfile                 # Pipeline CI/CD unifié
├── n8n/
│   └── workflows/                  # Workflows d'automation exportés en JSON
│       ├── pipeline-start.json
│       ├── Tests-Cypress-Ui.json
│       ├── Newman - Juice Shop Tests.json
│       └── Newman-Cypress-IA-Discord.json
└── grafana/
    └── GranafaSteps.md             # Guide de configuration des dashboards de métriques

```

---

## 🚀 Guide de Test et Déclenchement

Les tests d'intégration entre n8n et Jenkins s'effectuent via les requêtes HTTP configurées dans les nœuds n8n :

1. **Cas du Pipeline Réussi (Succès / Pipeline Vert)** :
* **URL appelée par n8n** :
`[http://host.docker.internal:8080/job/QA-Pipeline/build?token=jenkins-trigger](http://host.docker.internal:8080/job/QA-Pipeline/build?token=jenkins-trigger)`
* **Résultat attendu** : Statut Jenkins `SUCCESS` $\rightarrow$ Branche de succès exécutée dans n8n.


2. **Cas du Pipeline en Échec (Échec / Pipeline Rouge)** :
* **URL appelée par n8n** :
`[http://host.docker.internal:8080/job/QA-Pipeline/buildWithParameters?token=jenkins-trigger&FAIL_BUILD=true](http://host.docker.internal:8080/job/QA-Pipeline/buildWithParameters?token=jenkins-trigger&FAIL_BUILD=true)`
* **Résultat attendu** : Statut Jenkins `FAILURE` $\rightarrow$ Branche d'erreur exécutée dans n8n (Alerte Discord / Log d'erreur).
