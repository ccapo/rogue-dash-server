module.exports = (db) => {
  const path = require("path");
  const env = process.env.NODE_ENV || "dev";
  const config = require(path.join(__dirname, '..', 'config', 'config.js'))[env];
  const crypto = require('crypto');
  const jwt = require('jsonwebtoken');
  const rfs = require('rotating-file-stream');
  const { v4: uuidv4, validate: uuidValidate } = require('uuid');
  const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
  const monsters = require(path.join(__dirname, '..', 'data', 'monsters.js'));

  const hostURL = `${config.web.protocol}://${config.web.url}:${config.web.port}`

  const pad = num => (num > 9 ? "" : "0") + num;

  const generateLogName = (time, index) => {
    if (!time) return "access.log";

    var month = time.getFullYear() + "" + pad(time.getMonth() + 1);
    var day = pad(time.getDate());
    var hour = pad(time.getHours());
    var minute = pad(time.getMinutes());

    return `${month}/${month}${day}-${hour}${minute}-${index}-access.log.gz`;
  };

  // create a rotating write stream to log requests
  const accessLogStream = rfs.createStream(generateLogName, {
    path: path.join(__dirname, '..', 'logs'),
    interval: '1d', // rotate daily
    maxFiles: 7,
    maxSize: '10M',
    compress: 'gzip'
  });

  const generateToken = (len = 32) => {
    return crypto.randomBytes(len).toString('hex');
  }

  const randomName = () => {
    return uniqueNamesGenerator({
      dictionaries: [adjectives, colors, monsters || animals],
      separator: '',
      style: 'capital'
    });
  }

  const computeScore = (m) => {
    let score = 0;
    m.forEach((v, k) => {
      switch(k) {
        case 0:
          score += v*1
          break;
        case 1:
          score += v*1
          break;
        case 2:
          score += v*2
          break;
        case 3:
          score += v*3
          break;
        case 4:
          score += v*5
          break;
        case 5:
          score += v*8
          break;
        case 6:
          score += v*13
          break;
        case 7:
          score += v*21
          break;
        case 8:
          score += v*34
          break;
        case 9:
          score += v*55
          break;
        case 10:
          score += v*89
          break;
        case 11:
          score += v*144
          break;
        case 12:
          score += v*233
          break;
        case 13:
          score += v*377
          break;
        case 14:
          score += v*610
          break;
        case 15:
          score += v*987
          break;
        case 16:
          score += v*1597
          break;
        case 17:
          score += v*2584
          break;
        case 18:
          score += v*4181
          break;
        case 19:
          score += v*6765
          break;
        case 20:
          score += v*10946
          break;
        case 21:
          score += v*17711
          break;
        default:
          // Unrecognized, skip
      }
    });
    return score;
  }

  const hashPassword = (p) => {
    return crypto.createHmac("sha256", config.secret.password).update(p).digest("hex");
  }

  const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      
      try {
        const decoded = jwt.verify(token, config.secret.jwt);
        
        // Validate uuid
        if (!uuidValidate(decoded.id)) {
          console.log(`authenticateJWT1: ${err.message}`);
          res.status(403);
          res.send('Invalid JWT');
        }
        
        // Search for user by uuid
        db.user.findOne({
          where: {
            uuid: decoded.id
          }
        }).then(user => {
          req.user = user;
          next();
        }).catch(err => {
          console.log(`authenticateJWT2: ${err.message}`);
          res.status(403);
          res.send('Invalid JWT');
        });
      } catch(err) {
        console.log(`authenticateJWT3: ${err.message}`);
        res.status(403);
        res.send('Invalid JWT');
      }
    } else {
      console.log(`authenticateJWT4: ${err.message}`);
      res.status(401);
      res.send('Missing Authorization Header');
    }
  }
  
  return {hostURL, uuidv4, accessLogStream, generateToken, randomName, computeScore, hashPassword, authenticateJWT};
};
