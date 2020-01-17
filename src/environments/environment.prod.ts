export const environment = {
  production: true,
  port: 3000,
  api: {
    prefix: "/api"
  },
  pg: {
    user: 'postgres',
    host: 'localhost',
    database: 'nodeJs',
    password: 'superuser',
    port: 5432,
  },
  whiteList: ['http://localhost:4200']
};
