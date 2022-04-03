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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const data: any = new SlashCommandBuilder()
	.setName('def')
	.setDescription('Replies with the definition of the term requested or shows you a list of terms!')
	.addStringOption((option) =>
		option
			.setName('option')
			.setDescription('Definition of terms or page no. prefixed by `page:`')
			.setRequired(false),
	);

// Reply to the user with the definition, if there is one.
export async function execute(interaction: CommandInteraction): Promise<void> {

	const defsList: Paginator = new Paginator(
		defs.map((e): {
      embeds: {
        title: string;
        description: string;
      }[]
    } => ({
			embeds: [{
				title: e.item,
				description: e.definition,
			}],
		})),
	);

	const input = interaction.options.getString('option');
	if (input && !input?.startsWith('page:')) {
		const def = fuse.search(input.toLowerCase())[0]?.item;

		const pagenum = defs.indexOf(def);

		defsList.start({ interaction, pagenum });
	}
	else {
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
