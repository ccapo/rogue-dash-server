const fs = require('fs');
const crypto = require('crypto');

const generateToken = (len = 32) => {
  return crypto.randomBytes(len).toString('hex');
}

// Create the stream
let writeStream = fs.createWriteStream('.env');

// Write value to .env file
writeStream.write(`ENV=prod\n`);
writeStream.write(`PASS_KEY=${generateToken()}\n`);
writeStream.write(`JWT_KEY=${generateToken()}\n`);
writeStream.write(`DB_USER=${generateToken()}\n`);
writeStream.write(`DB_PASS=${generateToken()}\n`);

// the finish event is emitted when all data has been flushed from the stream
writeStream.on('finish', () => {
  console.log('Environment file created');
});

// Close the stream
writeStream.end();
