import { Message, Client } from 'discord.js';

export async function execute(message: Message, args: string[], client: Client): Promise<void> {
	message.channel.send('Loading data').then(async (msg): Promise<void> =>{
		msg.delete();
		message.channel.send(`🏓 Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
	});
}
