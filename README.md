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

## handlers
### buttonhandler.js
This module is called by the main file when a button interaction is received. It determines what button has been pressed and contains all logic that is run when a button is pressed. 

### sheetinteraction.js
This module is used to interact with a google sheet. The interactions with the google sheet are currently hardcoded so it interacts with a particular sheet. This is necessary to allow the "/report" command to work fully, as it relies on a google sheet as a database to store and track specific data. 

### messagehandler.js
This module is used to handle any direct interactions with a message. This means deleting or editing a message is handled by this module.

### slashcommandhandler.js
This module houses functions necessary for checks that may be used in multiple slash commands. 

## Commands
### report.js
Implementation of the "/report" command. This will allow a user to report another user

### getlogs.js
Implementation of the "/getlogs" command. This will allow a moderator to retrieve all logs of previous infractions of a particular user

### modreport.js
Implementation of the "/modreport" command. This creates an embed to help moderators keep track of what case they are handling, as well as who is participating in the deliberation process

### bulkdelete.js
Implementation of "/bulkdelete" command. This will take a certain number of messages in the specified channel, or current channel if none specified, and delete that many messages from the channel

### revelerevent.js
Implementation of the "/revelerevent" command. This will take the type of event that is about to happen, and then edit event channel permissions to unlock them for general admission. 

### revelereventreset.js
Implementation of the "/revelereventreset" command. This will immediately reset the event channel permissions to a locked state. 

## const
### channelid.js
This file contains all of the const variables referencing various channel ids for both the testing and production discord servers. 