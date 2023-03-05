const { ActionRowBuilder, 
    ButtonBuilder, ButtonStyle,
    EmbedBuilder, 
    SlashCommandBuilder } 
    = require('discord.js');
var moment = require('moment');
moment().format();

module.exports = {
data: new SlashCommandBuilder()
    .setName('modreport')
    .setDescription('Report a user (staff only)')
    .addUserOption(option =>
        option.setName('user')
            .setDescription('Input User ID')
            .setRequired(true)
    )
    .addStringOption(option => 
        option.setName('reason')
            .setDescription('Input Link to message to be reported')
            .setRequired(true)  
    ),


    async execute(interaction) {
        console.log(interaction.channel.id);
        if (interaction.channel.id !== '1023378368923697274') /* && interaction.channel.id !== '1023378368923697274')*/ {
            await interaction.reply({content:`Warning, this command is for staff members only`, ephemeral: true});
            console.log('wrong channel')
            return;
        }
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');    
    
    
    
         
        await interaction.reply({content:`(${interaction.user.tag}) reported: ${user}`, ephemeral: false});
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('deliberate')
                    .setLabel('Click to deliberate')
                    .setStyle(ButtonStyle.Primary),
        );
        const embedV1 = new EmbedBuilder()
            .addFields({name: "Reported: ", value: `${user.tag}`},
                       {name: "Discord id: ", value: `${user.id}`},
                       {name: "Channel", value: `${interaction.channel}`},
                       {name: "Link: ", value: `${reason}`},
                       {name: "Time: ", value: `<t:${moment().unix()}:f>`},
                       {name: "Deliberating staff", value: `${interaction.user.tag}`})
    
            .setFooter({text: `Sent by ${interaction.user.username} (${interaction.user.id})`});
        await interaction.channel.send('For the time being this message is sent in the current channel. This will be changed as we move closer to implementing this server-wide');
        await interaction.channel.send({embeds:[embedV1], components: [row]});
        const m = interaction.editReply({content: 'Staff in deliberation: ', ephemeral: false});

    },
    


    
};