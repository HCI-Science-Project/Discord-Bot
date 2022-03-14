import { Message } from 'discord.js';

export async function execute(message: Message) {
	const input = message.content.split(' ').slice(1).join(' ');
	await message.reply(`you entered: "${input}"`);
}
