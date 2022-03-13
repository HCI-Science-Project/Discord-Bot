import { Client, Message } from 'discord.js'

export async function execute(message: Message) {
	await message.reply('pong!')
}
