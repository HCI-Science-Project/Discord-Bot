const { MessageEmbed } = require('discord.js');

export const defs = JSON.parse(JSON.stringify(require('../questions.json')));

export const data = new SlashCommandBuilder()
    .setName('question')
    .setDescription('Gives you a question and lets you answer!')
    .addComponents(
    new MessageButton()
        .setCustomId('A')
        .setLabel('')
        .setStyle('PRIMARY')
        .setEmoji('regional_indicator_a')
    new MessageButton()
        .setCustomId('B')
        .setLabel('')
        .setStyle('PRIMARY')
        .setEmoji('regional_indicator_b')
    new MessageButton()
        .setCustomId('C')
        .setLabel('')
        .setStyle('PRIMARY')
        .setEmoji('regional_indicator_c')
    new MessageButton()
        .setCustomId('D')
        .setLabel('')
        .setStyle('PRIMARY')
        .setEmoji('regional_indicator_d')
    );
export async function execute(interaction: CommandInteraction) {
    const randint = Math.floor(Math.random()*Object.keys(obj).length)
    const randqn = obj[Object.keys(obj)[randint]]
    await interaction.reply({
	      const question = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Question')
            .addFields(
                {name: "Question", value: randqn[question]},
                {name: "Category", value: randqn[category], inline: true},
                {name: "Level", value: randqn[level], inline: true},
                {name: 'Options', value: ```A) ${randqn[options][A]},
                B) ${randqn[options][B]},
                C) ${randqn[options][C]},
                D) ${randqn[options][D]},
                ```, inline: true},
                
            )
    })
    await interaction.reply({
        if (interaction.isButton()), return;
        const result = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Question')
        
        if (interaction.customId === randqn[answer]) {
            .addFields(
                {name: "Good job!", value: "You got it right!"}
            )
        } else {
            .addFields(
                {name: "Oops!", value: "Try again next time!"}
            )
        }
    })
}
