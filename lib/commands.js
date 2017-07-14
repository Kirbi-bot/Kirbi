var path = require('path');

var commands;
var commands_directory;
var exec_dir;

try {
    commands_directory = 'commands';
	commands = GReYBot.getFileArray(commands_directory);
} catch (e) { 
	console.log(e);
}

exports.init = function() {
    var commandCount = 0;
    for (var i = 0; i < commands.length; i++) {
        var commandFile;
        try {
            commandFile = require(`${path.join(path.dirname(require.main.filename), commands_directory, commands[i])}`);
        } catch (err) {
            console.log(`Improper setup of the '${commands[i]}' command file. : ${err}`);
        }
        if (commandFile) {
            if ('commands' in commandFile) {
                for (var j = 0; j < commandFile.commands.length; j++) {
                    if (commandFile.commands[j] in commandFile) {
						GReYBot.addCommand(commandFile.commands[j], commandFile[commandFile.commands[j]]);
                        commandCount++;
                    }
                }
            }
        }
    }

    // Load simple commands from json file
    var jsonCommands = [];

    try {
        jsonCommands = GReYBot.getJsonObject('/config/commands.json');
    } catch (e) {

    }

    for (var i = 0; i < jsonCommands.length; i++) {
        const command = jsonCommands[i].command;
        const description = jsonCommands[i].description;
        const response = jsonCommands[i].response;

        GReYBot.addCommand(command, {
            description: description,
            process: (msg, suffix) => {
                msg.channel.send({
                    embed: {
                        color: GReYBotConfig.defaultEmbedColor,
                        description: response
                    }
                });
            }
        });

        commandCount++;
    }

	console.log(`Loaded ${GReYBot.commandCount()} chat commands`);
};