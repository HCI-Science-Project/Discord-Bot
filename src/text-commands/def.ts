// Import the Message type for text commands.
import { Message } from 'discord.js';
import Fuse from 'fuse.js';

// Parse the JSON file.
// eslint-disable-next-line @typescript-eslint/no-var-requires
import defs from '../definitions.json';

const fuse = new Fuse(defs, {
	keys: ['item'],
});

export async function execute(message: Message, args: string[]) {
	// Get the string argument from the command.
	const input = args.join(' ');
	// Fetch the definition from the JSON table.
	const def = fuse.search(input)[0]?.item;
	// If a definition exists, print it, otherwise give a notice.
	await message.reply(
		def !== undefined
			? `**${def?.item?.toUpperCase()}**\n${def?.definition}`
			: 'Sorry, we don\'t have an entry for the term yet. Come back later!',
	);
}
