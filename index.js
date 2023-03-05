const { ActionRowBuilder, 
		ButtonBuilder, ButtonStyle,
		Client, Collection, 
		EmbedBuilder, Events, 
		GatewayIntentBits, 
		Partials } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const env = require('dotenv');
env.config();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
	] }, {
	partials: [
		Partials.Message, 
		Partials.Channel, 
		Partials.Reaction
	]},
);

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'Commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	}
	else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property`);
	}
}

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});


client.on(Events.InteractionCreate, async interaction => {
	// if (!interaction.isChatInputCommand()) {
	// 	console.log(interaction);
	// 	return;
	// }
	if (interaction.isButton()) {
		if (interaction => interaction.customId === 'report_seen' && interaction.message.author.id === process.env.CLIENT_ID) {
			// clicked a button with the report seen id that was sent by my bot
			// this means I need to edit the original ephemeral message
			console.log('this is the button for marking a report as seen and needs to edit the original ephemeral message for the /report command');
		}
		if (interaction => interaction.customId === 'deliberate') {
			// This is the button associated with the /modreport command, and needs to edit the original embed sent with this button to now 
			// add the person who clicked to the button to the list of deliberating mods
			const m = interaction.message;
			console.log(m);
			const embed = m.embeds[0];
			console.log(embed);
			const buttons = m.components[0];
			console.log(buttons);
			let new_embed = new EmbedBuilder();
				// .setTitle(`${embed.title}`)
				// .setDescription(`${embed.description}`);
			for (let i = 0; i < embed.fields.length; i += 1) {
				console.log(`${i}`);
				console.log(`${embed.fields[i].name}`);
				if (i != 5) {
					new_embed.addFields({name: `${embed.fields[i].name}`, value: `${embed.fields[i].value}`});
				}
				else {
					new_embed.addFields({name: `${embed.fields[5].name}`, value: `${embed.fields[5].value}\n${interaction.user.tag}`});
				}
			}
			// let new_embed = EmbedBuilder.from(embed);
			// new_embed.fields[5] = {name: `Deliberating staff`, value: `${embed.fields[5].value}${interaction.user.tag}`};

			// new_embed.fields['Deliberating staff'] = {name: embed.fields['Deliberating staff'].name, value: `${embed.fields[5].value}\n${interaction.user.tag}`};
			m.edit({embeds:[new_embed], components:[buttons]});
		}
	}
	else if (interaction.isChatInputCommand()) {
		const command = interaction.client.commands.get(interaction.commandName);
		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found`);
			return;
		}

		try {
			await command.execute(interaction);
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: 'Something fucked up homie', ephemeral: true });
		}
	}

});

// client.on(Events.MessageReactionAdd, async (reaction, user) => {
// 	if (reaction.partial) {
// 		console.log("received partial message");
// 		message.fetch().then(fullMessage => {console.log(fullMessage.content);})
// 		.catch(error => console.log("bad fetch for partial message: ", error));
// 	}
// 	else {
// 		console.log("received non-partial message");
// 		console.log("message content = ", reaction.message);
// 		const message = reaction.message;
// 		if(!message.embeds[0]) {
// 			console.log("message is not an embed");
// 		}
// 		else {
// 			console.log('message has an embed');
// 			if(message.author.id == 1077782801635618826) {
// 				// the embed was sent by the bot
// 				if(user.id != 1077782801635618826) {
// 					// the reaction was not posted by the bot
// 				}
// 				const embed = message.embeds[0];
// 				if (embed.footer) {
// 					console.log("footer exists");
// 					const embed_message = embed.footer.text;
// 					console.log(embed_message);
// 					let x = "";
// 					let flag = false;
// 					for (var i = embed_message.length; ; i--) {
// 						const c = embed_message.charAt(i);
// 						if (!flag){
// 							if (c == ')') {
// 								flag = true;
// 							}
// 						}
// 						else {
// 							if (c == '(') {
// 								break;
// 							}
// 							x = c + x;
// 						}
// 					}
// 					const reporter_id = parseInt(x, 10);
// 					console.log(reporter_id);

// 					// const channel = embed.fields.find(f=>f.name === "Channel").value;
// 					// channel.send({content:`A moderator has seen your report`, ephemeral: true});
// 					// the above command is breaking, and due to reactions used as buttons being deprecated
// 					// I will not be trying to fix this
// 				}
// 				// const new_embed = EmbedBuilder.from(embed)
// 			}
// 		}
// 	}

// });


console.log(process.env.DISCORD_TOKEN);
client.login(process.env.DISCORD_TOKEN);