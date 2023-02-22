Overly Sarcastic Productions Discord Bot
----------------------------------
# Description
This is a bot written for the communication platform Discord. It is run using NodeJS, and interacts with Discord's API through the discord.js library. The purpose of this bot is for moderation on the Overly Sarcastic Productions Discord Server
Link to the discord server: https://discord.gg/osp

# How to run it
call "npm run dev"
This will run both the deploy-commands.js script and the index.js script, loading all commands and bringing the bot online

## index.js
This is the main file for the program. It brings the bot online, establishes the connection between the bot and discord. 
It will index through its slash (/) commands and console log errors for any commands that do not have the required data or execute fields.  

## deploy-commands.js
This file runs a script that will read through the entire "Commands" folder for every JavaScript file, and export the commands to a JSON file for index.js to read

## Commands
### report.js
Implementation of the "/report" command. This will allow a user to report another user

### getlogs.js
Implementation of the "/getlogs" command. This will allow a moderator to retrieve all logs of previous infractions of a particular user