import { Client, GatewayIntentBits } from "discord.js";
import { Whatsapp } from "./whatsapp";

export class DiscordBot {
  whatsapp: Whatsapp;

  constructor(whatsapp: Whatsapp) {
    this.whatsapp = whatsapp;
  }

  private createClient() {
    const client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
      ]
    });

    return client;
  }

  private checkClientReady(client: Client) {
    client.on("ready", () => {
      if (!client.user) return;
      console.log(`Bot is online as ${client.user.tag}`);
    });
  }

  private detectVoiceStatusUpdates(client: Client) {
    client.on("voiceStateUpdate", (oldState, newState) => {
      const newUserChannel = newState.channel;
      const oldUserChannel = oldState.channel;

      if (!oldUserChannel && newUserChannel) {
        if (!newState.member) return;

        this.whatsapp.sendTextMessage(
          `${newState.member.user
            .tag} entered in channel ${newUserChannel.name}.`
        );
      }

      if (oldState.channel && !newState.channel) {
        if (!oldState.member) return;
        this.whatsapp.sendTextMessage(
          `${oldState.member.user.tag} exit from channel ${oldState.channel
            .name}`
        );
      }
    });
  }

  public makeBot() {
    const client = this.createClient();

    this.checkClientReady(client);
    this.detectVoiceStatusUpdates(client);

    return client;
  }
}
