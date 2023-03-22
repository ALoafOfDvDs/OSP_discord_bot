const { ActionRowBuilder, 
    ButtonBuilder, ButtonStyle,
    Client, Collection, 
    EmbedBuilder, Events, 
    Partials } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const env = require('dotenv');
const {getSheetValue} = require('./sheetinteraction.js');
module.exports = {
    ButtonInteraction(interaction) {
        if (interaction.customId === 'report_seen' && interaction.message.author.id === process.env.CLIENT_ID) {
            // clicked a button with the report seen id that was sent by my bot
            // this means I need to edit the original ephemeral message
            getSheetValue(interaction.message.id);
            console.log('this is the button for marking a report as seen and needs to edit the original ephemeral message for the /report command');
        }
        if (interaction.customId === 'deliberate') {
            // This is the button associated with the /modreport command, and needs to edit the original embed sent with this button to now 
            // add the person who clicked to the button to the list of deliberating mods
            const m = interaction.message;
            const embed = m.embeds[0];
            const buttons = m.components[0];
            let new_embed = new EmbedBuilder()
                .setFooter(embed.footer);
            for (let i = 0; i < embed.fields.length; i += 1) {
                if (i != 5) {
                    new_embed.addFields({name: `${embed.fields[i].name}`, value: `${embed.fields[i].value}`});
                }
                else {
                    new_embed.addFields({name: `${embed.fields[5].name}`, value: `${embed.fields[5].value}\n${interaction.user.tag}`});
                }
            }
            m.edit({embeds:[new_embed], components:[buttons]});
        }
    }
}