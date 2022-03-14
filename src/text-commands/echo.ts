import { Message } from 'discord.js';
import * as dotenv from 'dotenv';

export async function execute(message: Message) {
	const prefix = dotenv.config().parsed.PREFIX;
	// WARN: bad practice to put '5'
	// '5' is derived from 4 (length of command) + 1 (a space character)
	const args = message.content.slice(prefix.length + 5);
	await message.reply(`you entered: "${args}"`);
}
