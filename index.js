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


const { ButtonInteraction } = require('./handlers/buttonhandler');

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
	if (interaction.isButton()) {
		ButtonInteraction(interaction);
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
	else {
		console.log('command received is neither slash command nor button interaction, cannot be handled');
		console.log(interaction);
	}

});


console.log(process.env.DISCORD_TOKEN);
client.login(process.env.DISCORD_TOKEN);