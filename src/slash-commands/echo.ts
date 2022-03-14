import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('echo')
	.setDescription('Replies with your input!')
	.addStringOption((option) =>
		option
			.setName('input')
			.setDescription('The input to echo back')
			.setRequired(true)
	);

export async function execute(interaction: CommandInteraction) {
	await interaction.reply({
		content: `you entered: "${interaction.options.getString('input')}"`,
		ephemeral: false,
	});
}
