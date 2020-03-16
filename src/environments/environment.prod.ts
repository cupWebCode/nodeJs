export const environment = {
  production: true,
  port: 3000,
  api: {
    prefix: "/api"
  },
  db: {
    database: 'node_js',
    username: 'postgres',
    password: 'superuser',
    options: {
      host: 'localhost',
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    },
  },
  whiteList: ['http://localhost:4200']
};
