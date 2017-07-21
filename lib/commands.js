const GReYBot = require('../greybot');

var path = require('path');

var commandFiles;
var commandDirectory;

try {
    commandDirectory = '/commands';
	commandFiles = GReYBot.getFileArray(commandDirectory);
} catch (err) { 
	GReYBot.error(err);
}

exports.init = function() {
	GReYBot.Commands = {};
	
    commandFiles.forEach(commandFile => {
        try {
            commandFile = GReYBot.require(`${path.join(commandDirectory, commandFile)}`);
        } catch (err) {
            GReYBot.logError(`Improper setup of the '${commandFile}' command file. : ${err}`);
		}
		
        if (commandFile) {
            if ('commands' in commandFile) {
				commandFile.commands.forEach(command => {
                    if (command in commandFile) {
						GReYBot.addCommand(command, commandFile[command]);
                    }
                });
            }
        }
    });

    // Load simple commands from json file
    var jsonCommands = [];

    try {
        jsonCommands = GReYBot.getJsonObject('/config/commands.json');
    } catch (err) {

    }

	jsonCommands.forEach(jsonCommand => {
        const command = jsonCommand.command;
        const description = jsonCommand.description;
        const response = jsonCommand.response;

        GReYBot.addCommand(command, {
            description: description,
            process: (msg, suffix) => {
                msg.channel.send({
                    embed: {
                        color: GReYBot.Config.defaultEmbedColor,
                        description: response
                    }
                });
            }
        });
    });

	console.log(`Loaded ${GReYBot.commandCount()} chat commands`);
};