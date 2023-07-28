import client from "./modules/discord.bot";
import dotenv from "dotenv";

dotenv.config();

client.login(process.env.BOT_TOKEN);
