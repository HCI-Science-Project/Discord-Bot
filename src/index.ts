import { Client, Intents } from 'discord.js'
import { readdirSync } from 'fs'
import * as dotenv from 'dotenv'

const result = dotenv.config()

if (result.error) throw result.error

const TOKEN = result.parsed.TOKEN
const PREFIX = result.parsed.PREFIX
export const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

client.once('ready', () => {
	console.log(`[CLIENT] Logged in to Discord as ${client.user.tag}`)

	// Register commands into discord
	const commands = client.guilds.cache.get('952100696587640842').commands
	const commandFiles = readdirSync('./src/slash-commands').filter((file) =>
		file.endsWith('.js')
	)
	for (const file of commandFiles) {
		const command = require(`./slash-commands/${file}`)
		if (command.data) {
			commands
				?.create(command.data.toJSON())
				.catch((error) =>
					console.log(
						'[SLASH COMMANDS]: An error occured loading a command'
					)
				)
				.then(() =>
					console.log(
						`[SLASH COMMANDS]: Successfully loaded command "${command.data.name}"`
					)
				)
		}
	}
})

client.on('messageCreate', (message) => {
	if (message.author === client.user) return
	if (!message.content.startsWith(PREFIX)) return

	const command = message.content.split(' ')[0].replace('.', '').toLowerCase()
	const func = require(`./text-commands/${command}`)

	try {
		func.execute(message)
	} catch {
		console.log(
			"[TEXT COMMAND] Error executing command, or command doesn't exist"
		)
	}
})

client.on('interactionCreate', (interaction) => {
	if (!interaction.isCommand()) return

	const func = require(`./slash-commands/${interaction.commandName}`)
	try {
		func.execute(interaction)
	} catch {
		console.log('[SLASH COMMANDS]: An error occured running a command')
	}
})

client.login(TOKEN)
