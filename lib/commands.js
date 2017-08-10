const Kirbi = require('../kirbi');

var path = require('path');

var commandFiles;
var commandDirectory;

try {
    commandDirectory = '/commands';
	commandFiles = Kirbi.getFileArray(commandDirectory);
} catch (err) { 
	Kirbi.error(err);
}

exports.init = function() {
    commandFiles.forEach(commandFile => {
        try {
            commandFile = Kirbi.require(`${path.join(commandDirectory, commandFile)}`);
        } catch (err) {
            Kirbi.logError(`Improper setup of the '${commandFile}' command file. : ${err}`);
		}
		
        if (commandFile) {
            if ('commands' in commandFile) {
				commandFile.commands.forEach(command => {
                    if (command in commandFile) {
						Kirbi.addCommand(command, commandFile[command]);
                    }
                });
            }
        }
    });

    // Load simple commands from json file
    var jsonCommands = [];

    try {
        jsonCommands = Kirbi.getJsonObject('/config/commands.json');
    } catch (err) {

    }

	jsonCommands.forEach(jsonCommand => {
        const command = jsonCommand.command;
        const description = jsonCommand.description;
        const response = jsonCommand.response;

        Kirbi.addCommand(command, {
            description: description,
            process: (msg, suffix) => {
                msg.channel.send({
                    embed: {
                        color: Kirbi.Config.defaultEmbedColor,
                        description: response
                    }
                });
            }
        });
    });

	console.log(`Loaded ${Kirbi.commandCount()} chat commands`);
};