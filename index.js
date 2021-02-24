'use strict';

const path = require("path");
const env = process.env.NODE_ENV || "dev";
const config = require(path.join(__dirname, 'config', 'config.js'))[env];

const express = require("express");
const helmet = require('helmet');
const cors = require("cors");
const morgan = require('morgan');
const { hostURL, accessLogStream } = require(path.join(__dirname, 'lib', 'helper.js'))();

(async () => {
  // Create Express server
  const app = express();

  // setup the logger
  app.use(morgan(env));
  app.use(morgan('combined', { stream: accessLogStream }))

  // Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // see https://expressjs.com/en/guide/behind-proxies.html
  app.set('trust proxy', 1);

  // Add CORS module
  app.use(cors({
    origin: hostURL
  }));

  // Enable helmet module
  app.use(helmet());

  // Server config
  app.use(express.static(path.join(__dirname, "public")));
  app.use(express.json());
  app.use(express.urlencoded({
    extended: true
  }));

  // Database models
  const db = require(path.join(__dirname, 'models', 'index.js'));

  // Synchronize with database
  try {
    await db.sequelize.sync({
      logging: config.db.logging
    });
    console.log('Connected to database');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  // Register web routes
  const webRoutes = require(path.join(__dirname, 'routes', 'web.js'))(app);

  // Register API routes
  const apiRoutes = require(path.join(__dirname, 'routes', 'api.js'))(app, db);

  // Server listening
  const server = app.listen(config.web.port, () => {
    console.log(`Server listening on: ${hostURL}`);
  });

  process.on('SIGTERM', async () => {
    console.log('\nSIGTERM signal received: stopping server');
    await server.close();
    try {
      await db.sequelize.close();
      console.log('Database connection closed');
      console.log('Server stopped');
      process.exit(0);
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  });

  process.on('SIGINT', async () => {
    console.log('\nSIGINT signal received: stopping server');
    await server.close();
    try {
      await db.sequelize.close();
      console.log('Database connection closed');
      console.log('Server stopped');
      process.exit(0);
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  });
})();
