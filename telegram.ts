// /start, /ping, /nextday, /ideapost, /ideacontent, /ideavideo, /com, /status

const LOADING_PHRASES = [
  "ща ща.. я уже работаю", "занимаюсь твоей командой",
  "опа! жди, сейчас всё будет", "секунду, думаю...",
  "уже кумекаю", "ок, момент", "принято, обрабатываю",
  "сейчас-сейчас", "почти готово", "поняла, делаю",
];
// randomLoading() — случайная фраза при каждой команде
// createBot() — регистрирует все команды
// sendScheduledMessage() — отправка по расписанию в TELEGRAM_CHAT_ID
