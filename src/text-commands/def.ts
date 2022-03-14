// Import the Message type for text commands.
import { Message } from 'discord.js';

// Parse the JSON file.
export const defs = JSON.parse(JSON.stringify(require('../definitions.json')));

export async function execute(message: Message) {
	// Get the string argument from the command.
	const input = message.content.split(' ').slice(1).join(' ').toLowerCase();
	// Fetch the definition from the JSON table.
	const def = defs[input];
	// If a definition exists, print it, otherwise give a notice.
	await message.reply(
		def !== undefined
			? `**${input.toUpperCase()}**\n${defs[input]}`
			: "Sorry, we don't have an entry for the term yet. Check back later!"
	);
}
