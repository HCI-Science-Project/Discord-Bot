// Import the builders for slash commands and the interactions.
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Client } from 'discord.js';
import Fuse from 'fuse.js';
import Paginator from '../utils/paginator.js';

// Parse the data from the JSON file.
import defs from '../definitions.json';

const fuse = new Fuse(defs, {
	keys: ['item', 'aliases'],
});


// Build the /def slash command.
export const data = new SlashCommandBuilder()
	.setName('def')
	.setDescription('Replies with the definition of the term requested or shows you a list of terms!')
	.addStringOption((option) =>
		option
			.setName('option')
			.setDescription('Definition of terms or page no. prefixed by `page:`')
			.setRequired(false),
	);

// Reply to the user with the definition, if there is one.
export async function execute(interaction: CommandInteraction, client: Client) {
	const input = interaction.options.getString('option');
	if (input && !input?.startsWith('page:')) {
		const def = fuse.search(input.toLowerCase())[0]?.item;
		await interaction.reply({
			content:
				def !== undefined
					? `**${def?.item?.toUpperCase()}**\n${def?.definition}`
					: 'Sorry, we don\'t have an entry for the term yet. Come back later!',
			ephemeral: false,
		});
	}
	else {
		const defsList = new Paginator(
			defs.map((e) => ({
				embeds: [{
					title: e.item,
					description: e.definition,
				}],
			})),
		);

		if (!input?.startsWith('page:')) {
			defsList.start({ interaction });
			return;
		}

		if (input.startsWith('page:')) {
			const page = parseInt(input.split(':')[1]) - 1;
			defsList.start({ interaction, pagenum: page });
		}
	}
}
