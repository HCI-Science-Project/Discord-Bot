// Import the builders for slash commands and the interactions.
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
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
	.setDescription('Replies with the definition of the term requested!')
	.addStringOption((option) =>
		option
			.setName('term')
			.setDescription('The term you want to receive the definition of')
			.setRequired(false),
	);

// Reply to the user with the definition, if there is one.
export async function execute(interaction: CommandInteraction) {
	const input = interaction.options.getString('term');
	if (input) {
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

		defsList.start({ interaction });
	}
}
