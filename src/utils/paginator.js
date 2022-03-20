const {
	CommandInteraction,
	ButtonInteraction,
	InteractionCollector,
	Message,
	MessageActionRow,
	MessageButton,
	MessageEditOptions,
// eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('discord.js');


class Paginator {
	/**
	 * @param {MessageEditOptions[]} data Array with edit options for each page.
	 * Creds to Melmsie and the dank memer devs
	 */
	constructor(data) {
		if (!data?.length) {throw new TypeError('Paginator data must have at least one value.');}

		this.data = data;
		this.currentPage = null; // 0-indexed
		this.row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('first')
				.setLabel('<<')
				.setStyle('PRIMARY'),
			new MessageButton()
				.setCustomId('previous')
				.setLabel('<')
				.setStyle('PRIMARY'),
			new MessageButton()
				.setCustomId('currentPage')
				.setStyle('SECONDARY')
				.setDisabled(true),
			new MessageButton()
				.setCustomId('next')
				.setLabel('>')
				.setStyle('PRIMARY'),
			new MessageButton()
				.setCustomId('last')
				.setLabel('>>')
				.setStyle('PRIMARY'),
		);
		this.stopRow = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('stop')
				.setLabel('Stop')
				.setStyle('DANGER'),
		);
	}

	/**
	 * Starts the paginator.
	 * @param {object} options
	 * @param {CommandInteraction} options.interaction
	 * @param {number} [options.pagenum=0]
	 * @param {number} [options.time=30000]
	 * @returns {Promise<Message>}
	 */
	async start({ interaction, pagenum = 0, time = 30000 }) {
		const message = await interaction.reply({
			...this.getPage(pagenum),
			fetchReply: true,
		});

		const filter = (i) => {
			return i.user.id === interaction.user.id;
		};
		const collector = message.createMessageComponentCollector({
			time,
			filter,
			componentType: 'BUTTON',
		});
		collector.on('collect', (i) => this.onClicked(i, collector));
		collector.on('end', () => this.onEnd(interaction));
	}

	/**
	 * Listener for when a button is clicked.
	 * @param {ButtonInteraction} interaction
	 * @param {InteractionCollector} collector
	 * @returns {Promise<void>}
	 */
	async onClicked(interaction, collector) {
		if (interaction.customId === 'first') {
			if (this.currentPage === 0) {
				interaction.deferUpdate();
				return;
			}
			await interaction.update(this.getPage(0));
		}
		else if (interaction.customId === 'previous') {
			if (this.currentPage === 0) {
				interaction.deferUpdate();
				return;
			}
			await interaction.update(this.getPage(this.currentPage - 1));
		}
		else if (interaction.customId === 'next') {
			if (this.currentPage === this.data.length - 1) {
				interaction.deferUpdate();
				return;
			}
			await interaction.update(this.getPage(this.currentPage + 1));
		}
		else if (interaction.customId === 'last') {
			if (this.currentPage === this.data.length - 1) {
				interaction.deferUpdate();
				return;
			}
			await interaction.update(this.getPage(this.data.length - 1));
		}
		else if (interaction.customId === 'stop') {
			collector.stop();
		}
	}

	/**
	 * Listener for when the collector ends.
	 * @param {CommandInteraction} interaction
	 * @returns {Promise<void>}
	 */
	async onEnd(interaction) {
		this.row.components.forEach((component) => component.setDisabled(true));
		await interaction.editReply({ components: [this.row] });
	}

	/**
	 * Gets the send options for a page.
	 * @param {number} number
	 */
	getPage(number) {
		this.currentPage = number;
		let data;
		if (number <= this.data.length) {
			data = this.data[number];
		}
		else {
			data = {
				embeds: [
					{
						title: 'L Bozo',
						description: 'Nothing exists here :skull:',
					},
				],
			};
		}

		this.row.components
			.find((component) => component.customId === 'currentPage')
			.setLabel(`${number + 1}/${this.data.length}`);
		return { ...data, components: [this.row, this.stopRow] };
	}
}

module.exports = Paginator;