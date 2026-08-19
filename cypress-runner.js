const http = require('http');
const { exec } = require('child_process');
const fs = require('fs');

http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/run-tests') {
    console.log('Requête reçue, lancement des tests Cypress...');

    exec(
      'cd /project && npx rimraf cypress/results cypress/reports && npx cypress run; npm run generate:report',
      { maxBuffer: 1024 * 1024 * 20 },
      (err, stdout, stderr) => {
        console.log('--- STDOUT ---');
        console.log(stdout);
        console.log('--- STDERR ---');
        console.log(stderr);
        if (err) console.log('--- ERROR ---', err.message);

        try {
          const report = fs.readFileSync('/project/cypress/report.json', 'utf-8');
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(report);
          console.log('Rapport envoyé avec succès.');
        } catch (readErr) {
          console.log('Impossible de lire le rapport:', readErr.message);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Rapport introuvable', details: readErr.message }));
        }
      }
    );
  } else {
    res.writeHead(404);
    res.end();
  }
}).listen(4000, () => console.log('Cypress runner prêt sur le port 4000'));