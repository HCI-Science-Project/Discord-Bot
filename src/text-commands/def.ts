import { Message } from 'discord.js';
export const defs = JSON.parse(JSON.stringify(require('../definitions.json')));

export async function execute(message: Message) {
	const input = message.content.split(' ').slice(1).join(' ').toLowerCase();
	const def = defs[input];
	await message.reply(
		def !== undefined
			? `**${input.toUpperCase()}**\n${defs[input]}`
			: "Sorry, we don't have an entry for the term yet. Check back later!"
	);
}
