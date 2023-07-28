import { create } from "venom-bot";
import dotenv from "dotenv";
import { DiscordBot } from "./modules/discord.bot";
import { Whatsapp } from "./modules/whatsapp";
dotenv.config();

(async () => {
  const venomClient = await create({
    session: "bot-discord-whatsapp",
    disableWelcome: true
  });

  const groupId = process.env.GROUP_ID;

  if (!groupId) throw new Error("Group ID is not defined.");

  const whatsapp = new Whatsapp(groupId, venomClient);

  const discordBot = new DiscordBot(whatsapp);

  const discordClient = discordBot.makeBot();

  discordClient.login(process.env.BOT_TOKEN);
})();
