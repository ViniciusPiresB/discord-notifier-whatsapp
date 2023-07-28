import { Whatsapp } from "venom-bot";

export const start = async (client: Whatsapp) => {
  client.sendText("120363045369706847@g.us", "TESTE BOT!");
};
