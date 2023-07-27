import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const prefix = "!";

client.on("ready", () => {
  if (!client.user) return;
  console.log(`Bot está online como ${client.user.tag}`);
});

client.on("messageCreate", message => {
  if (message.content == "hello") {
    message.reply({
      content: "HELLO O CARALHO!"
    });
  }

  if (message.content == "turtis") {
    message.reply({ content: "TURTAOOOOO!" });
  }
});

client.login(
  "MTEzNDIyOTA1MDkyMDAyNjI0NQ.G9Ksiw.m96SA5ADzlYZAN5gEUyKOAmGLhPpK2Ttj7ZIqw"
);
