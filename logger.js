const pino = require("pino");

module.exports = pino({
  level: process.env.PINO_LOG_LEVEL || "info",
  timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
});
