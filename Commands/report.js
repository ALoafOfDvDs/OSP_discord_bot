const { SlashCommandBuilder } = require('discord.js');


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
        console.log(user);
        await interaction.reply({content:`User reported: ${user}`, ephemeral: true});
	},
};