module.exports = (app) => {
  const path = require('path');
  const rateLimit = require("express-rate-limit");
  const router = require("express").Router();

  // Confiure rate limiter
  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 20, // limit each IP to 20 requests per windowMs
    message: "Too many requests from this IP, please wait a minute"
  });

  // Retrieve main page
  router.get("/", limiter, (req, res) => {
    res.sendFile('./public/home.html', { root: path.join(__dirname, '..') });
  });

  // GET /highscores
  router.get("/highscores", limiter, (req, res) => {
    res.sendFile('./public/highscores.html', { root: path.join(__dirname, '..') });
  });
  
  // Register routes
  app.use('/', router);
};
