export const dev = {
  port: 3000,
  prefix: "/api",
  db: {
    options: {
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    },
  },
  whiteList: [
    'http://localhost:4201'
  ]
};

export const production = {
  port: 3000,
  prefix: "/api",
  db: {
    options: {
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    },
  },
  whiteList: [
    'http://localhost:4201'
  ]
};
