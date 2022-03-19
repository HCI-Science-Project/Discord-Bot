// Import the Message type for text commands.
import { Message } from 'discord.js';

// Parse the JSON file.
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const defs = JSON.parse(JSON.stringify(require('../definitions.json')));

export async function execute(message: Message, args: string[]) {
	// Get the string argument from the command.
	const input = args.join(' ');
	// Fetch the definition from the JSON table.
	const def = defs[input];
	// If a definition exists, print it, otherwise give a notice.
	await message.reply(
		def !== undefined
			? `**${input.toUpperCase()}**\n${def}`
			: 'Sorry, we don\'t have an entry for the term yet. Come back later!',
	);
}
