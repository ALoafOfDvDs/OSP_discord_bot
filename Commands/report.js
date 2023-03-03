const { ActionRowBuilder, 
        ButtonBuilder, ButtonStyle,
        EmbedBuilder, 
        SlashCommandBuilder } 
        = require('discord.js');
var moment = require('moment');
moment().format();

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
        await interaction.channel.send({embeds:[embedV1], components: [row]});
        const m = interaction.editReply({content: 'message has been edited to say this instead', ephemeral: true});
        // await m.edit('message has been edited to say this instead');
        /*
        const embedV2 = new EmbedBuilder()
            .setAuthor({name: `${interaction.user.username}`, iconURL: `${link}`})
            .addFields({text: `**Reported** ${user.username} (ID ${user.id})\n`
                              `**Reason: ${reason}`
                              `**Channel:** ${interaction.channel}`});
        // await interaction.channel.send({embeds:[embedV2]});
        await interaction.channel.send({embeds: [embedV2]});

        */
        // await interaction.channel.send(`?modlogs ${user.id}`);

        // setTimeout(console.log("waiting"), 1000); // delays 1 second
        // setTimeout(()=>{}, 1000);
        
        // await interaction.channel.send(`?notes ${user.id}`);
	},
        
};