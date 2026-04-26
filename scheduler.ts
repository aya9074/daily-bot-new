import cron from "node-cron";
import { sendScheduledMessage } from "./telegram";
import { logger } from "../lib/logger";

const SCHEDULE = "0 13 * * *"; // 16:00 МСК каждый день
const HEARTBEAT_INTERVAL_MS = 5 * 60 * 1000;

const HEARTBEAT_PHRASES = [
  "ожидаю отправки сообщения", "жду своего часа",
  "всё тихо, работаю в фоне", "на связи, жду 16:00",
  "готова к работе, жду команды",
];

function randomHeartbeat(): string {
  return HEARTBEAT_PHRASES[Math.floor(Math.random() * HEARTBEAT_PHRASES.length)];
}

export function startScheduler(): void {
  cron.schedule(SCHEDULE, async () => {
    logger.info("Running scheduled daily message job");
    await sendScheduledMessage();
  }, { timezone: "UTC" });

  setInterval(() => { logger.info(randomHeartbeat()); }, HEARTBEAT_INTERVAL_MS);

  logger.info({ schedule: SCHEDULE, localTime: "16:00 Moscow (UTC+3)" }, "Scheduler started");
}
