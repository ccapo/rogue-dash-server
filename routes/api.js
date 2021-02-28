module.exports = (app, db) => {
  const env = process.env.NODE_ENV || "dev";
  const path = require("path");
  const config = require(path.join(__dirname, '..', 'config', 'config.js'))[env];

  const { Op } = db.Sequelize;
  const crypto = require('crypto');
  const jwt = require('jsonwebtoken');
  const rateLimit = require("express-rate-limit");
  const router = require("express").Router();
  const { uuidv4, generateToken, randomName, computeScore, hashPassword, authenticateJWT } = require(path.join(__dirname, '..', 'lib', 'helper.js'))(db);

  // Confiure rate limiter
  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 20, // limit each IP to 20 requests per windowMs
    message: "Too many requests from this IP, please wait a minute"
  });

  const createAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 5, // start blocking after 5 requests
    message: "Too many accounts created from this IP, please try again after an hour"
  });

  // Retrieve all user scores
  router.post("/register", createAccountLimiter, (req, res) => {
    const username = randomName();
    const password = generateToken();

    // Create a new user record
    const newUser = {
      uuid: uuidv4(),
      name: username,
      passwordHash: hashPassword(password)
    };

    // Save user in the database
    db.user.create(newUser).then(data => {
      res.json({username: username, password: password});
    }).catch(err => {
      console.log(`Create user: ${err.message}`);
      res.status(500).send({
        message: "An error occurred while creating a new user"
      });
    });
  });

  // Retrieve all user scores
  router.post("/authenticate", limiter, (req, res) => {
    // read username and password from request body
    const { username, password } = req.body;
    
    db.user.findOne({
      where: {
        name: username,
        passwordHash: hashPassword(password)
      }
    }).then(user => {
      // generate an access token
      const accessToken = jwt.sign({ id: user.uuid }, config.secret.jwt, { expiresIn: 30 });
      res.json({
        accessToken
      });
    }).catch(err => {
      console.log(`Auth user: ${err.message}`);
      res.status(403);
      res.send('username or password is incorrect');
    });
  });

  // Retrieve all user scores
  router.post("/scores", limiter, (req, res) => {
    db.user.findAndCountAll({
      attributes: ["name", "score", "updatedAt"],
      where: {
        score: {
          [Op.gt]: 0
        }
      },
      limit: 1000
    }).then(results => {
      res.json({
        draw: 1,
        recordsTotal: results.count,
        recordsFiltered: results.count,
        data: results.rows
      });
    }).catch(err => {
      console.log(`Auth user: ${err.message}`);
      res.status(403);
      res.send('username or password is incorrect');
    });
  });

  // Retrieve all user scores
  router.post("/score", authenticateJWT, (req, res) => {
    const body = req.body || {};
    if (typeof(body) === "object") {
      const score = computeScore(body);
      db.user.update({score: score}, {
        where: { uuid: req.user.uuid }
      }).then(updated => {
        if (updated[0] === 1) {
          const user = JSON.parse(JSON.stringify(req.user));
          const userHistory = {
            uuid: user.uuid,
            name: user.name,
            score: score
          };
          db.user_history.create(userHistory).then(user => {
            res.json({name: user.name, score: score});
          }).catch(err => {
            console.log(`Create User History: ${err.message}`);
            res.status(500).send({
              message: "Unable to update user score"
            });
          });
        } else {
          res.status(403).send({
            message: "Unable to update user score"
          });
        }
      }).catch(err => {
        console.log(`Update User: ${err.message}`);
        res.status(500).send({
          message: "Unable to update user score"
        });
      });
    } else {
      console.log(`Unable to update user score for UUID: ${req.user.uuid}`);
      res.status(400).send({
        message: "Unable to update user score"
      });
    }
  });
  
  // Register routes
  app.use('/api', router);
};
