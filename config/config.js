const dotenv = require('dotenv');
dotenv.config();
const env = process.env.NODE_ENV || "dev";

const config = {
  dev: {
    db: {
      username: "root",
      password: "",
      database: "rogue-dash",
      host: "localhost",
      dialect: "sqlite",
      storage: "./data/rogue-dash.db",
      logging: () => {}
    },
    web: {
      protocol: process.env.PROTOCOL || "http",
      url: process.env.URL || "localhost",
      port: process.env.PORT || 8080
    },
    secret: {
      password: process.env.PASS_KEY,
      jwt: process.env.JWT_KEY
    }
  },
  prod: {
    db: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: "rogue-dash",
      host: "localhost",
      dialect: "sqlite",
      storage: "./data/rogue-dash.db",
      logging: () => {}
    },
    web: {
      protocol: process.env.PROTOCOL || "https",
      url: process.env.URL || "0.0.0.0",
      port: process.env.PORT || 8080
    },
    secret: {
      password: process.env.PASS_KEY,
      jwt: process.env.JWT_KEY
    }
  }
};

// Validate config
if (!process.env.PASS_KEY) {
  console.log("Missing PASS_KEY environment variable");
  process.exit(2);
}

if (!process.env.JWT_KEY) {
  console.log("Missing JWT_KEY environment variable");
  process.exit(2);
}

if (env === "prod") {
  if (!process.env.DB_USER) {
    console.log("Missing DB_USER environment variable in prod environment");
    process.exit(2);
  }
  
  if (!process.env.DB_PASS) {
    console.log("Missing DB_PASS environment variable in prod environment");
    process.exit(2);
  }
}

module.exports = config;
