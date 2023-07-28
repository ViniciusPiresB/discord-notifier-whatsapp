import { create } from "venom-bot";
import dotenv from "dotenv";
import { DiscordBot } from "./modules/discord.bot";
dotenv.config();

(async () => {
  const venomClient = await create({
    session: "bot-discord-whatsapp",
    disableWelcome: true
  });

  const discordBot = new DiscordBot("120363045369706847@g.us", venomClient);

  const discordClient = discordBot.getClient();

  discordClient.login(process.env.BOT_TOKEN);
})();
