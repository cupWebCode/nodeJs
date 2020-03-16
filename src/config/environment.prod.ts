export const environment = {
  production: true,
  port: "",
  NODE_ENV: "production",
  api: {
    prefix: "/api"
  },
  logs: {
    level: process.env.LOG_LEVEL || "silly"
  }
};
