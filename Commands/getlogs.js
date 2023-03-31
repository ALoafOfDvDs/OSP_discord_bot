const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getlog')
		.setDescription('retrieves mod logs')
        .addStringOption(option => 
            option.setName('link')
                .setDescription('Link to the post being reported')
                .setRequired(true)  
        ),
	async execute(interaction) {
        const link = interaction.options.getString('link');
        console.log(link);

	},
};