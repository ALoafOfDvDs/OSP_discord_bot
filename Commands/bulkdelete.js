const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('bulkdelete')
    .setDescription('Deletes a number of messages in the given channel')
    .addChannelOption(option => 
        option.setName('channel')
        .setDescription('channel to purge messages from')
        .setRequired(false))
    .addIntegerOption(option =>
        option.setName('count')
        .setDescription('number of messages to purge')
        .setRequired(true)),

    async execute(interaction) {
        const channel = interaction.getChannel('channel');
        if (channel === undefined) {
            channel = interaction.channel;
        }
        const count = interaction.getInteger('count');
        const mod_channel = await interaction.guild.channels.cache.find(ch => ch.id === process.env.OSP_TEST_REPORT_CHANNEL_ID);

        if (count > 100) {
            let num_to_del = count;
            while(num_to_del > 100) {
                channel.bulkDelete(count);
                num_to_del -= 100;
            }
            channel.bulkDelete(count);
            mod_channel.send(`${count} messages were bulk deleted from ${channel}`);
        }
        else {
            channel.bulkDelete(count);
            mod_channel.send(`${count} messages were bulk deleted from ${channel}`);
        }
    }
}