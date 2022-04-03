import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Message, Client } from 'discord.js';

export const data: SlashCommandBuilder = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with Pong!');

export async function execute(interaction: CommandInteraction, client: Client): Promise<void> {
	await interaction.reply({ content: 'Loading data...', fetchReply: true })
		.then((message: Message): void => {
			message.delete();
			message.channel.send(`🏓 Latency is ${message.createdTimestamp - interaction.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
		});
}
