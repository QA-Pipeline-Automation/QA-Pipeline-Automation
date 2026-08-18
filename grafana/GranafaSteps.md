📖 README — Guide Complet : Observabilité & Monitoring Grafana
Ce document regroupe l'ensemble des étapes de configuration réalisées dans Grafana pour suivre et visualiser les performances des pipelines de test QA (Cypress & Newman).

🐘 1. Connexion de la Data Source PostgreSQL
Naviguer vers Administration > Data Sources > Add data source.

Sélectionner PostgreSQL dans la liste des bases de données.

Configurer les paramètres de connexion :

Host : localhost:5432 (ou le nom de votre conteneur qa_postgres)

Database Name : qa_pipeline_db (ou qa_metrics_db)

User / Password : Identifiants PostgreSQL (ex: qa_user)

SSL Mode : disable

Cliquer sur Save & Test pour valider la communication avec la base de données.

📊 2. Construction du Dashboard & Réconciliation SQL
Un nouveau tableau de bord a été créé pour regrouper les métriques de la suite de tests, en s'appuyant sur la jointure entre les tables pipeline_runs et test_results.

Requête SQL finale utilisée :
SQL
SELECT 
  p.started_at AS time,
  COALESCE(ROUND(AVG(t.duration_seconds), 2), 0) AS "Durée Tests (s)"
FROM pipeline_runs p
LEFT JOIN test_results t ON p.id = t.run_id
GROUP BY p.started_at
ORDER BY p.started_at ASC;
🔧 3. Résolution des Problèmes d'Affichage (Troubleshooting)
Lors du paramétrage du panneau, plusieurs blocages techniques ont été identifiés et résolus :

Ajustement du filtre temporel (Time Range) :

Problème : Message No Data renvoyé avec la plage par défaut Last 6 hours.

Solution : Extension du filtre horaire (en haut à droite) sur Last 30 days pour englober les exécutions enregistrées.

Correction du type de visualisation :

Problème : Sélection automatique du mode State timeline affichant une simple bande verticale sans axe de valeurs.

Solution : Basculement vers le mode Time series via Change > All visualizations > Time series.

🎨 4. Personnalisation & Unités de Mesure
Dans le panneau de configuration latéral droit :

Titre du panneau : Saisie du nom officiel Durée moyenne des builds/tests dans la section Panel options.

Gestion des unités : Configuration dans Standard options > Unit > Time > Seconds (s) pour afficher un axe vertical gradué en secondes.

Légende : Activation de la légende synthétique en bas du graphique.