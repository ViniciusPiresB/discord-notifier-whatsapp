import { Whatsapp as wpp } from "venom-bot";

export class Whatsapp {
  clientWhatsapp: wpp;
  groupId: string;

  constructor(groupId: string, client: wpp) {
    this.groupId = groupId;
    this.clientWhatsapp = client;
  }

  sendTextMessage(message: string) {
    this.clientWhatsapp.sendText(this.groupId, message);
  }
}
