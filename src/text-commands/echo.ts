// Import the Message type for text commands.
import { Message } from 'discord.js';

export async function execute(message: Message) {
	// Get all other words in the message except the command.
	const input = message.content.split(' ').slice(1).join(' ');
	// Reply with the other words.
	await message.reply(`you entered: "${input}"`);
}
