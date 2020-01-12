export const environment = {
  production: false,
  port: 3000,
  NODE_ENV: "development",
  api: {
    prefix: "/api"
  },
  logs: {
    level: process.env.LOG_LEVEL || "silly"
  },
  pg: {
    user: 'postgres',
    host: 'localhost',//PostgreSQL 12 //http://127.0.0.1:54826/browser/
    database: 'nodeJs',//'api',
    password: 'superuser',
    port: 5432,
  }
};
