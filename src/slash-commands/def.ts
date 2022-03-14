import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export const defs = JSON.parse(JSON.stringify(require('../definitions.json')));

export const data = new SlashCommandBuilder()
	.setName('def')
	.setDescription('Replies with the definition of the term requested!')
	.addStringOption((option) =>
		option
			.setName('input')
			.setDescription('The term you want to receive the definition of')
			.setRequired(true)
	);

export async function execute(interaction: CommandInteraction) {
	const input = interaction.options.getString('input').toLowerCase();
	const def = defs[input];
	await interaction.reply({
		content:
			def !== undefined
				? `**${input.toUpperCase()}**\n${defs[input]}`
				: "Sorry, we don't have an entry for the term yet. Check back later!",
		ephemeral: false,
	});
}
