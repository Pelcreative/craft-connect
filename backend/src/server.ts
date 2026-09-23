import { app } from "./app.js";
import { env } from "./config/env.js";

const server = app.listen(env.PORT, () => {
  console.info(`CraftConnect API is listening on http://localhost:${env.PORT}`);
});

const shutdown = (signal: NodeJS.Signals) => {
  console.info(`${signal} received. Closing the API server.`);

  server.close((error) => {
    process.exit(error ? 1 : 0);
  });
};

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));
