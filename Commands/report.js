const { ActionRowBuilder, 
        ButtonBuilder, ButtonStyle,
        EmbedBuilder, 
        SlashCommandBuilder } 
        = require('discord.js');
const axios = require('axios');
const { newSheetRow } = require('../handlers/sheetinteraction');
var moment = require('moment');
moment().format();

const {google} = require('googleapis');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('report')
		.setDescription('Report a user')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('Choose user to report')
				.setRequired(true)
        )
        .addStringOption(option => 
            option.setName('reason')
                .setDescription('Reason for report')
                .setRequired(true)  
        ),
	async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        const link = interaction.user.displayAvatarURL;

        await interaction.reply({content:`User reported: ${user}`, ephemeral: true});

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('report_seen')
                    .setLabel('Mod has seen this report')
                    .setStyle(ButtonStyle.Primary),
        );
        const embedV1 = new EmbedBuilder()
            .addFields({name: "Reported: ", value: `${user.tag}`},
                       {name: "Discord id: ", value: `${user.id}`},
                       {name: "Channel", value: `${interaction.channel}`},
                       {name: "Reason: ", value: `${reason}`},
                       {name: "Time: ", value: `<t:${moment().unix()}:f>`})

            .setFooter({text: `Sent by ${interaction.user.username} (${interaction.user.id})`});
        await interaction.channel.send('For the time being this message is sent in the current channel. This will be changed as we move closer to implementing this server-wide');
        const mod_message = await interaction.channel.send({embeds:[embedV1], components: [row]});

        try {
            await newSheetRow(mod_message.id, interaction.token);
        }
        catch (error) {
            console.log(error);
            interaction.channel.send("failed to update google sheet"); // probably change this for the final product
        }

	},
};