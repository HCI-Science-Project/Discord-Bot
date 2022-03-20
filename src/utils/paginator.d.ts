// / <reference types="node" />
export = Paginator;
declare class Paginator {
	/**
     * @param {MessageEditOptions[]} data Array with edit options for each page.
     * Creds to Melmsie and the dank memer devs
     */
	constructor(data: MessageEditOptions[]);
	data: MessageEditOptions[];
	currentPage: number;
	row: MessageActionRow;
	stopRow: MessageActionRow;
	/**
     * Starts the paginator.
     * @param {object} options
     * @param {CommandInteraction} options.interaction
     * @param {number} [options.pagenum=0]
     * @param {number} [options.time=30000]
     * @returns {Promise<Message>}
     */
	start({ interaction, pagenum, time }: {
        interaction: CommandInteraction;
        pagenum?: number;
        time?: number;
    }): Promise<Message>;
    /**
     * Listener for when a button is clicked.
     * @param {ButtonInteraction} interaction
     * @param {InteractionCollector} collector
     * @returns {Promise<void>}
     */
	onClicked(interaction: ButtonInteraction, collector: InteractionCollector<any>): Promise<void>;
	/**
     * Listener for when the collector ends.
     * @param {CommandInteraction} interaction
     * @returns {Promise<void>}
     */
	onEnd(interaction: CommandInteraction): Promise<void>;
	/**
     * Gets the send options for a page.
     * @param {number} number
     */
	getPage(number: number): {
        components: MessageActionRow[];
        attachments?: import('discord.js').MessageAttachment[];
        content?: string;
        embeds?: (import('discord-api-types').APIEmbed | import('discord.js').MessageEmbed | import('discord.js').MessageEmbedOptions)[];
        files?: (import('stream').Stream | import('discord.js').BufferResolvable | import('discord.js').MessageAttachment | import('discord.js').FileOptions)[];
        flags?: import('discord.js').BitFieldResolvable<import('discord.js').MessageFlagsString, number>;
        allowedMentions?: import('discord.js').MessageMentionOptions;
    };
}
import { MessageEditOptions } from 'discord.js';
import { MessageActionRow } from 'discord.js';
import { CommandInteraction } from 'discord.js';
import { Message } from 'discord.js';
import { ButtonInteraction } from 'discord.js';
import { InteractionCollector } from 'discord.js';
