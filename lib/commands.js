const Kirbi = require('../kirbi');
const fs = require('fs');
var path = require('path');

var commandFiles;
var commandDirectory;

try {
    commandDirectory = '/modules';
	commandFiles = Kirbi.getFileArray(commandDirectory);
} catch (err) { 
	Kirbi.error(err);
}

exports.init = function() {
    // Load command files
    commandFiles.forEach(commandFile => {
        try {
            commandFile = Kirbi.require(`${path.join(commandDirectory, commandFile)}`);
        } catch (err) {
            Kirbi.logError(`Improper setup of the '${commandFile}' command file. : ${err}`);
		}
		
        if (commandFile) {
            if (commandFile['commands']) {
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
    } catch (err) { }
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

    // Load external commands
    if (Kirbi.Config.externalModules && Kirbi.Config.externalModules instanceof Array) {
        Kirbi.Config.externalModules.forEach(module => {
            if (Kirbi.Commands[module]) {return};
            //grab from node_modules
            var dir = '/node_modules/kirbi-' + module;
                try {
                    module = Kirbi.require(`${path.join(dir, module)}`);
                } catch (err) {
                    Kirbi.logError(`Improper setup of the '${module}' command file. : ${err}`);
                    return;
                }
                if (module) {
                    if (module['commands']) {
                        module.commands.forEach(command => {
                            if (command in module) {
                                Kirbi.addCommand(command, module[command]);
                            }
                        });
                    }
                }
        });
    }

	console.log(`Loaded ${Kirbi.commandCount()} chat commands`);
};