declare module 'discord.js' {
  export interface Client {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }
}
import { Client, Intents, Message } from 'discord.js';
import { readdirSync } from 'fs';
import 'dotenv/config';
import console from 'consola';

process.on('unhandledRejection', console.error);

const development = process.env.NODE_ENV === 'development';
const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;

const banned = {
	'anal':        true,
	'anus':        true,
	'arse':        true,
	'ass':         true,
	'b1tch':       true,
	'ballsack':    true,
	'bastard':     true,
	'bitch':       true,
	'biatch':      true,
	'blowjob':     true,
	'bollock':     true,
	'bollok':      true,
	'boner':       true,
	'boob':        true,
	'boobs':       true,
	'buttplug':    true,
	'clitoris':    true,
	'cock':        true,
	'cum':         true,
	'cunt':        true,
	'dick':        true,
	'dildo':       true,
	'dyke':        true,
	'erection':    true,
	'fag':         true,
	'faggot':      true,
	'feck':        true,
	'fellate':     true,
	'fellatio':    true,
	'felching':    true,
	'fuck':        true,
	'fucks':       true,
	'fudgepacker': true,
	'genitals':    true,
	'hell':        true,
	'jerk':        true,
	'jizz':        true,
	'knobend':     true,
	'labia':       true,
	'masturbate':  true,
	'muff':        true,
	'nigger':      true,
	'nigga':       true,
	'penis':       true,
	'piss':        true,
	'poop':        true,
	'pube':        true,
	'pussy':       true,
	'scrotum':     true,
	'sex':         true,
	'shit':        true,
	'sh1t':        true,
	'slut':        true,
	'smegma':      true,
	'spunk':       true,
	'tit':         true,
	'tranny':      true,
	'trannies':    true,
	'tosser':      true,
	'turd':        true,
	'twat':        true,
	'vagina':      true,
	'wank':        true,
	'whore':       true,
	'tits':        true,
	'titty':       true,
	'asshole':     true,
	'fvck':        true,
	'suckass':		 true,
	'asshat':      true,
	'pu55y':       true,
	'pen1s':       true,
};

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', async () => {
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

/* client.on('messageUpdate', async (message: Message) => {
	if (Object.keys(banned).some((word) => message.content.toLowerCase().split(' ').includes(word))) {
		const msg = await message.reply('No swearing!');
		setTimeout(() => {
			msg.delete();
			message.delete();
		}, 5000);
	}
}); */

client.on('messageCreate', async (message) => {
	if (message.author === client.user) return;

	if (message.content.startsWith('I\'m')) { // totally not sus
		message.channel.send(`Hi ${message.content.slice(3).trim()}, I'm Dad!`);
	}

	if (Object.keys(banned).some((word) => message.content.toLowerCase().split(' ').includes(word))) {
		const msg = await message.reply('No swearing!');
		setTimeout(() => {
			msg.delete();
			message.delete();
		}, 5000);
	}

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

client.on('interactionCreate', async (interaction) => {
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

