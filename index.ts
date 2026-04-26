import app from "./app";
import { logger } from "./lib/logger";
import { createBot } from "./bot/telegram";
import { startScheduler } from "./bot/scheduler";

const rawPort = process.env["PORT"];
if (!rawPort) throw new Error("PORT environment variable is required");
const port = Number(rawPort);
if (Number.isNaN(port) || port <= 0) throw new Error(`Invalid PORT value: "${rawPort}"`);

app.listen(port, (err) => {
  if (err) { logger.error({ err }, "Error listening on port"); process.exit(1); }
  logger.info({ port }, "Server listening");

  if (process.env.NODE_ENV === "production") {
    try {
      createBot();
      startScheduler();
      logger.info("Telegram bot and scheduler initialized");
    } catch (err) {
      logger.error({ err }, "Failed to initialize bot or scheduler");
    }
  } else {
    logger.info("Development mode — bot polling disabled to avoid conflict with production");
  }
});
