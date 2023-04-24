const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resetevent')
		.setDescription('Resets Event Hall channel permissions to the locked state'),
	async execute(interaction) {
        // if (interaction.user.roles.cache.some(role => role.name === ''))
        const roles = interaction.user.roles.cache;
        function check_mod(role) {
            return role === 'OSP' || role === 'Team Leaders' ||
                   role === 'Archivists' || role === 'Keepers';
        }
        if (!roles.some(check_mod)) {
            // unauthorized person calling the command
            console.log(`Bad Actor tried to reset reveler channels\n
                         ${interaction.user.username} | ${interaction.user.id}`);
            return;
        }
        
        if (interaction.guild.id === process.env.OSP_GUILD_ID) {
            // MAIN DISCORD
            const channel_id = '563830509910622209';
            const channel = interaction.guild.channels.cache.find(ch => ch.id === channel_id);
            channel.permissionsOverwrite.edit(ROLE_ID, ) // NEED TO GET THE CORRECT ROLE AND SET THAT ROLE'S PERMISSIONS
            channel.setName('The Event Hall');

        }
        else if (interaction.guild.id === process.env.OSP_TEST_GUILD_ID) {
            // TEST DISCORD
            const channel_id = '1023378369951309932';
            const channel = interaction.guild.channels.cache.find(ch => ch.id === channel_id);
            channel.setName('')
        }

	},
};