const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('bulkdelete')
    .setDescription('Deletes a number of messages in the given channel')
    .addIntegerOption(option =>
        option.setName('count')
        .setDescription('number of messages to purge')
        .setRequired(true))
    .addChannelOption(option => 
        option.setName('channel')
        .setDescription('channel to purge messages from')
        .setRequired(false)),

    async execute({interaction, isMod}) {

        if (!isMod) {
            // unauthorized person calling the command
            console.log(`Bad Actor tried to unlock reveler channels\n
                         ${interaction.user.username} | ${interaction.user.id}`);
            return;
        }
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