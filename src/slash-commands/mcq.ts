import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageActionRow, MessageButton } from 'discord.js';

// const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const data = new SlashCommandBuilder()
	.setName('mcq')
	.setDescription('Gives a random MCQ question.');

export async function execute(interaction: CommandInteraction) {
	const questions = [
		{
			'category': 'Life Process',
			'question': 'Which of the following are energy foods?',
			'option1': 'Carbohydrates and fats',
			'option2': 'Proteins and mineral salts',
			'option3': 'Vitamins and minerals',
			'option4': 'Water and roughage',
			'answer': 1,
			'explanation': 'Carbohydrates and fats are energy rich foods.',
		},
	]; // fetch the qns from the db when the db is actually hosted (using axios or got)
	// the above is only a dummy placeholder

	const qn = questions[Math.floor(Math.random() * questions.length)];

	const options = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setCustomId('option1')
				.setLabel(qn.option1)
				.setStyle('PRIMARY'),
			new MessageButton()
				.setCustomId('option2')
				.setLabel(qn.option2)
				.setStyle('PRIMARY'),
			new MessageButton()
				.setCustomId('option3')
				.setLabel(qn.option3)
				.setStyle('PRIMARY'),
			new MessageButton()
				.setCustomId('option4')
				.setLabel(qn.option4)
				.setStyle('PRIMARY'),
		);

	const collector = interaction.channel.createMessageComponentCollector({
		filter: (i) => i.user.id === interaction.user.id,
		time: 15000,
	});

	const interactionMessage: any = await interaction.reply({ embeds: [
		{
			title: qn.question,
			description: 'You have 15 seconds to answer this question.',
		},
	], components: [options], ephemeral: false, fetchReply: true });


	setTimeout(() => {
		collector.stop('Timeout');
		for (let index = 0; index < options.components.length; index++) {
			options.components[index].setDisabled(true);
		}
		interactionMessage.edit({ embeds: [
			{
				title: 'L BOZO',
				description: 'You failed to answer in time boomer',
			},
		], components: [options], ephemeral: false, fetchReply: true });
	}, 15000);


	collector.on('collect', (i) => {
		if (i.customId === 'option' + qn.answer) {

			i.update({ embeds: [
				{
					title: qn[i.customId] + ' is correct!',
					description: qn.explanation,
				},
			], components: [] });

		}
		else {

			i.update({ embeds: [
				{
					title: qn[i.customId] + ' is incorrect!',
					description: qn.explanation,
				},
			], components: [] });

		}

		collector.stop('Option was chosen');
	});
}
