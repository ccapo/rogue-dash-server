const crypto = require('crypto');

const generateToken = (len = 32) => {
  return crypto.randomBytes(len).toString('hex');
}

console.log(`PASS_KEY=${generateToken()} JWT_KEY=${generateToken()} pm2 start index.js`);
