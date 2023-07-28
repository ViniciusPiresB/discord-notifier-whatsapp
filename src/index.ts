import { create } from "venom-bot";
import client from "./modules/discord.bot";
import dotenv from "dotenv";
import { start } from "./modules/whatsapp";

dotenv.config();
(async () => {
  client.login(process.env.BOT_TOKEN);

  const venomClient = await create({
    session: "bot-discord-whatsapp",
    disableWelcome: true
  });

  start(venomClient);
})();
