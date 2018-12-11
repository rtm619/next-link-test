const express = require('express');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(async () => {
    const server = express();
    server.get('/en-ca', (req, res) => {
      const actualPage = '/homePage';
      const queryParams = {
        locale: 'en-CA',
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/en-ca/login-page', (req, res) => {
      const actualPage = '/loginPage';
      const queryParams = {};
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/service-worker.js', (req, res) => {
      const filePath = path.join(__dirname, '.next', '/service-worker.js');

      app.serveStatic(req, res, filePath);
    });

    server.get('*', (req, res) => {
      handle(req, res, req.url);
    });

    server.listen(3100, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3100');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
