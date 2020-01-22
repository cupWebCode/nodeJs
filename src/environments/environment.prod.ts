export const environment = {
  production: true,
  port: 3000,
  api: {
    prefix: "/api"
  },
  db: {
    dbName: 'nodeJs',
    username: 'postgres',
    password: 'superuser',
    params: {
      host: 'localhost',
      dialect: 'postgres',
      operatorsAliases: false
    },
  },
  whiteList: ['http://localhost:4200']
};
