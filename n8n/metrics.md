# Métriques à visualiser — Dashboard Grafana

Ce document liste les métriques de reporting du pipeline QA, définies en phase de conception (Sprint 2), en vue des graphiques Grafana qui seront construits au Sprint 3. Il s'appuie directement sur le schéma de base de données `pipeline_runs` / `test_results`.

---

## 1. Taux de réussite dans le temps

- **Définition** : pourcentage de tests passés sur le total, suivi dans le temps.
- **Calcul** :
  ```sql
  SELECT pr.started_at AS time,
         ROUND(100.0 * SUM(tr.passed) / NULLIF(SUM(tr.total_tests), 0), 2) AS success_rate
  FROM pipeline_runs pr
  JOIN test_results tr ON tr.run_id = pr.id
  GROUP BY pr.started_at
  ORDER BY pr.started_at;
  ```
- **Type de panel Grafana** : graphique en ligne (time series)

## 2. Durée moyenne d'exécution

- **Définition** : temps moyen d'un run complet (build + tests), utile pour détecter un ralentissement du pipeline.
- **Calcul** :
  ```sql
  SELECT pr.started_at AS time, SUM(tr.duration_seconds) AS total_duration
  FROM pipeline_runs pr
  JOIN test_results tr ON tr.run_id = pr.id
  GROUP BY pr.started_at
  ORDER BY pr.started_at;
  ```
- **Type de panel Grafana** : graphique en barres ou jauge (gauge)

## 3. Historique des derniers échecs

- **Définition** : liste des runs récents ayant au moins un test en échec, avec détail par spec.
- **Calcul** :
  ```sql
  SELECT pr.started_at, tr.spec_name, tr.failed, tr.total_tests
  FROM pipeline_runs pr
  JOIN test_results tr ON tr.run_id = pr.id
  WHERE tr.failed > 0
  ORDER BY pr.started_at DESC
  LIMIT 20;
  ```
- **Type de panel Grafana** : tableau (table panel)

## 4. Nombre total d'exécutions

- **Définition** : volume de runs du pipeline sur une période donnée (jour/semaine), pour suivre l'activité globale.
- **Calcul** :
  ```sql
  SELECT DATE(started_at) AS day, COUNT(id) AS total_runs
  FROM pipeline_runs
  GROUP BY DATE(started_at)
  ORDER BY day;
  ```
- **Type de panel Grafana** : compteur ou histogramme

## 5. Répartition des échecs par spec

- **Définition** : identifie quelle spec de test échoue le plus souvent, pour prioriser la maintenance des tests.
- **Calcul** :
  ```sql
  SELECT spec_name, SUM(failed) AS total_failures
  FROM test_results
  GROUP BY spec_name
  ORDER BY total_failures DESC;
  ```
- **Type de panel Grafana** : graphique en barres horizontales

---

## Récapitulatif

| Métrique | Panel Grafana | Ticket de création (Sprint 3) |
| --- | --- | --- |
| Taux de réussite dans le temps | Time series | Créer le graphique Grafana "taux de réussite dans le temps" |
| Durée moyenne d'exécution | Gauge / Bar chart | Créer le graphique Grafana "durée moyenne des builds/tests" |
| Historique des derniers échecs | Table | Créer la vue Grafana "historique des derniers échecs" |
| Nombre total d'exécutions | Counter / Histogram | — |
| Répartition des échecs par spec | Bar chart (horizontal) | — |
