import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.on("ready", () => {
  if (!client.user) return;
  console.log(`Bot está online como ${client.user.tag}`);
});

client.on("voiceStateUpdate", (oldState, newState) => {
  const newUserChannel = newState.channel;
  const oldUserChannel = oldState.channel;

  if (!oldUserChannel && newUserChannel) {
    if (!newState.member) return;

    console.log(
      `${newState.member.user.tag} has connected to ${newUserChannel.name}.`
    );
  }

  if (oldState.channel && !newState.channel) {
    if (!oldState.member) return;

    console.log(
      `${oldState.member.user.tag} disconnected from ${oldState.channel.name}`
    );
  }
});

export default client;
