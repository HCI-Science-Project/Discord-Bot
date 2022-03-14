// Import the builders for slash commands and the interactions.
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

// Build the slash command, which takes a string as an argument.
export const data = new SlashCommandBuilder()
	.setName('echo')
	.setDescription('Replies with your input!')
	.addStringOption((option) =>
		option
			.setName('input')
			.setDescription('The input to echo back')
			.setRequired(true)
	);

// Reply to the user with their input.
export async function execute(interaction: CommandInteraction) {
	await interaction.reply({
		content: `you entered: "${interaction.options.getString('input')}"`,
		ephemeral: false,
	});
}
