// Import the builders for slash commands and the interactions.
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

// Parse the data from the JSON file.
export const defs = JSON.parse(JSON.stringify(require('../definitions.json')));

// Build the /def slash command.
export const data = new SlashCommandBuilder()
	.setName('def')
	.setDescription('Replies with the definition of the term requested!')
	.addStringOption((option) =>
		option
			.setName('input')
			.setDescription('The term you want to receive the definition of')
			.setRequired(true),
	);

// Reply to the user with the definition, if there is one.
export async function execute(interaction: CommandInteraction) {
	const input = interaction.options.getString('input').toLowerCase();
	const def = defs[input];
	await interaction.reply({
		content:
			def !== undefined
				? `**${input.toUpperCase()}**\n${def}`
				: 'Sorry, we don\'t have an entry for the term yet. Come back later!',
		ephemeral: false,
	});
}
