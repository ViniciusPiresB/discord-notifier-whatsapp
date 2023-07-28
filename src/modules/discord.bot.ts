import { Client, GatewayIntentBits } from "discord.js";
import { Whatsapp } from "venom-bot";

export class DiscordBot {
  clientWhatsapp: Whatsapp;
  groupId: string;

  constructor(groupId: string, client: Whatsapp) {
    this.groupId = groupId;
    this.clientWhatsapp = client;
  }

  async sendTextMessage(message: string) {
    this.clientWhatsapp.sendText(this.groupId, message);
  }

  getClient() {
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

        this.sendTextMessage(
          `${newState.member.user.tag} entrou no canal ${newUserChannel.name}.`
        );
      }

      if (oldState.channel && !newState.channel) {
        if (!oldState.member) return;
        this.sendTextMessage(
          `${oldState.member.user.tag} saiu do canal ${oldState.channel.name}`
        );
      }
    });

    return client;
  }
}
