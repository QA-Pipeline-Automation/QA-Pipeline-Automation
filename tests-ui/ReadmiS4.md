Sprint 4 les test :
Scénario 1 : Contenu vide ou sans échec (No Failures) :
Étape 1 : Tester la gestion d'un log vide ou sans échec
L'objectif est de vérifier le comportement de l'IA quand tous les tests Cypress/Newman réussissent.
1.	Cliquez sur le nœud Json Cypress (ou le nœud qui injecte les résultats de test au début de votre workflow).
2.	Remplacez temporairement le JSON d'entrée par un rapport de succès :
JSON
{
  "stats": { "failures": 0, "passes": 10 },
  "tests": []
}
3.	Cliquez sur Execute workflow.
4.	Résultat attendu :
o	Le nœud If doit rediriger le flux correctement.
o	L'IA doit générer une réponse du type "Tous les tests sont passés avec succès, aucun échec détecté".
o	Discord reçoit un message clair sans planter.


 
 

Étape 2 : Simuler une absence de réponse de l'IA (Erreur API / Timeout)
L'objectif est de s'assurer que le workflow ne bloque pas indéfiniment si Gemini tombe en panne.
1.	Double-cliquez sur le nœud Gemini (Message a model).
2.	Allez dans l'onglet Settings (en haut au centre, à côté de Parameters).
3.	Modifiez la configuration :
o	On Error : Changez de Stop Workflow à Continue (using error output).
o	Retry On Fail : Activez l'option (interrupteur vert).
o	Max Tries : Saisissez 2.
4.	Pour tester la panne, modifiez temporairement la clé API Gemini dans ses identifiants avec une fausse valeur.
5.	Cliquez sur Execute step.
6.	Résultat attendu :
o	Le nœud tente 2 fois de contacter Gemini.
o	Il ne bloque pas l'exécution globale et remonte une erreur gérée en sortie au lieu de faire planter brusquement le serveur n8n.
7.	N'oubliez pas de remettre la bonne clé API après le test.
8.	 
 


Étape 3 : Tester un log extrêmement volumineux (> 2000 caractères)
L'objectif est de vérifier que la fonction de découpage .substring(0, 1900) évite l'erreur d'affichage Discord.
1.	Ouvrez le nœud Message a model.
2.	Dans le panneau de droite OUTPUT, vérifiez que le texte produit par l'IA est très long (s'il est court, vous pouvez temporairement forcer le prompt de Gemini à générer un paragraphe très détaillé avec beaucoup de répétitions).
3.	Cliquez sur le nœud Discord et exécutez la demande (Execute step).
4.	Résultat attendu :
o	Le message est envoyé dans Discord sans renvoyer l'erreur 400: Bad Request (payload too large).
o	Le texte envoyé contient exactement 1900 caractères max.
 
