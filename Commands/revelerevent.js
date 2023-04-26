const { SlashCommandBuilder, TextChannel, PermissionsBitField } = require('discord.js');
const { event_voice_channel_id, event_text_channel_id } = require('../const/channelid');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('revelerevent')
		.setDescription('changes Event Hall channel permissions for any reveler events')
        .addStringOption(option => 
            option.setName('event')
                .setDescription('What is the event being hosted')
                .setRequired(true)
                .addChoices(
                    {name: 'Opera', value: 'Night at the Opera'},
                    {name: 'Movie', value: 'Movie Night'},
                    {name: 'Lecture', value: 'Lecture'},
                    {name: 'Quiz', value: 'Quiz Night'},
                )  
        ),
	async execute({interaction, isMod}) {
        // if (interaction.user.roles.cache.some(role => role.name === ''))
        if (!isMod) {
            // unauthorized person calling the command
            console.log(`Bad Actor tried to unlock reveler channels\n
                         ${interaction.user.username} | ${interaction.user.id}`);
            return;
        }
        
        if (interaction.guild.id === process.env.OSP_GUILD_ID || interaction.guild.id === process.env.OSP_TEST_GUILD_ID) {
            const voice_channel = interaction.guild.channels.cache.find(ch => ch.id === event_voice_channel_id);
            voice_channel.permissionsOverwrites.edit(interaction.guild.id, { Connect: null });

            const text_channel = interaction.guild.channels.cache.find(ch => ch.id === event_text_channel_id);
            text_channel.permissionsOverwrites.edit(interaction.guild.id, {SendMessages: null});

            const name = interaction.options.getString('event');
            voice_channel.setName(name);
        }
        

	},
};