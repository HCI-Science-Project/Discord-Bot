import { Client, Intents } from 'discord.js';
import { readdirSync } from 'fs';
import 'dotenv/config';
import console from 'consola';

process.on('unhandledRejection', console.error);
const development = process.env.NODE_ENV === 'development';

const TOKEN = process.env.TOKEN;

const PREFIX = process.env.PREFIX;

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
	console.success(`[CLIENT] Logged in to Discord as ${client.user.tag}`);

	client.user.setUsername('HCI Science Bot');
	client.user.setActivity('You', { type: 'WATCHING' });
	client.user.setStatus('idle');

	// Register commands into discord
	const commands = client.guilds.cache.get('952100696587640842').commands;

	const commandFiles = readdirSync('./src/slash-commands').filter((file) =>
		file.endsWith(development ? '.ts' : '.js'),
	);

	for (const file of commandFiles) {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const command = require(`./slash-commands/${file}`);
		if (command.data) {
			commands
				?.create(command.data.toJSON())
				.then(() =>
					console.success(
						`[SLASH COMMANDS]: Successfully loaded command "${command.data.name}"`,
					),
				)
				.catch((error) =>
					console.error(
						'[SLASH COMMANDS]: Error loading ' +
							command.data.name +
							': ' +
							error,
					),
				);
		}
	}
});

client.on('messageCreate', (message) => {
	if (message.author === client.user) return;
	if (!message.content.startsWith(PREFIX)) return;

	const args = message.content.slice(PREFIX.length).trim().split(/ +/);

	const command = args.shift().toLowerCase();
	try {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const func = require(`./text-commands/${command}`);
		func.execute(message, args, client);
	}
	catch (error) {
		console.error(
			'[TEXT COMMAND] Error executing command, or command doesn\'t exist: ' + error,
		);
		message.reply(
			`Error executing \`${command}\`, or \`${command}\` doesn't exist.`,
		);
	}
});

client.on('interactionCreate', (interaction) => {
	if (!interaction.isCommand()) return;

	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const func = require(`./slash-commands/${interaction.commandName}`);
	try {
		func.execute(interaction, client);
	}
	catch (error) {
		console.error('[SLASH COMMANDS]: An error occured running a command: ' + error);
	}
});

client.login(TOKEN);

