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

module.exports = config;
