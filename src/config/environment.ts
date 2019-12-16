export const environment = {
  production: false,
  port: 3000,
  NODE_ENV: "development",
  api: {
    prefix: "/api"
  },
  logs: {
    level: process.env.LOG_LEVEL || "silly"
  }
};
