const { SlashCommandBuilder, TextChannel } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('revelerevent')
		.setDescription('changes Event Hall channel permissions for any reveler events')
        .addStringOption(option => 
            option.setName('event')
                .setDescription('What is the event being hosted')
                .setRequired(true)
                .addChoices(
                    {name: 'Opera', value: 'Opera'},
                    {name: 'Movie', value: 'Movie Night'},
                    {name: 'Lecture', value: 'Lecture'},
                    {name: 'Quiz', value:'Quiz'},
                )  
        ),
	async execute(interaction) {
        // if (interaction.user.roles.cache.some(role => role.name === ''))
        const roles = interaction.user.roles.cache;
        function check_mod(role) {
            return role === 'OSP' || role === 'Team Leaders' ||
                   role === 'Archivists' || role === 'Keepers';
        }
        if (!roles.some(check_mod)) {
            // unauthorized person calling the command
            console.log(`Bad Actor tried to unlock reveler channels\n
                         ${interaction.user.username} | ${interaction.user.id}`);
            return;
        }
        
        if (interaction.guild.id === process.env.OSP_GUILD_ID) {
            // MAIN DISCORD
            const voice_channel_id = '563830509910622209';
            const voice_channel = interaction.guild.channels.cache.find(ch => ch.id === voice_channel_id);
            voice_channel.permissionsOverwrite.edit(ROLE_ID, ) // NEED TO GET THE CORRECT ROLE AND SET THAT ROLE'S PERMISSIONS


            const text_channel_id = '563830454122315776';
            const text_channel = interaction.guild.channels.cache.find(ch => ch.id === text_channel_id);
            text_channel.updateOverwrite(interaction.guild.id, {SEND_MESSAGES: null}) // NEED TO GET THE CORRECT ROLE AND SET THAT ROLE'S PERMISSIONS

            const name = interaction.getString('event');
            channel.setName(name);

        }
        else if (interaction.guild.id === process.env.OSP_TEST_GUILD_ID) {
            // TEST DISCORD
            const channel_id = '1023378369951309932';
            const channel = interaction.guild.channels.cache.find(ch => ch.id === channel_id);
            channel.setName('')
        }

	},
};