const path = require('path');
const chalk = require('chalk');

module.exports = Kirbi => {
	let commandFiles;
	let commandDirectory;
	try {
		commandDirectory = '/modules';
		commandFiles = Kirbi.getFileArray(commandDirectory);
	} catch (err) {
		console.log(chalk.red(err));
	}

	// Helpers
	Kirbi.addCommand = (commandName, commandObject) => {
		try {
			Kirbi.Commands[commandName] = commandObject;
		} catch (err) {
			console.log(err);
		}
	};
	Kirbi.commandCount = () => {
		return Object.keys(Kirbi.Commands).length;
	};
	Kirbi.setupCommands = () => {
		Kirbi.Commands = {};

		// Load command files
		commandFiles.forEach(commandFile => {
			try {
				commandFile = require(`${path.join(commandDirectory, commandFile)}`)(Kirbi);
			} catch (err) {
				console.log(chalk.red(`Improper setup of the '${commandFile}' command file. : ${err}`));
			}

			if (commandFile) {
				if (commandFile.commands) {
					commandFile.commands.forEach(command => {
						if (command in commandFile) {
							Kirbi.addCommand(command, commandFile[command]);
						}
					});
				}
			}
		});

		// Load simple commands from json file
		let jsonCommands = [];
		try {
			jsonCommands = Kirbi.getJsonObject('/config/commands.json');
		} catch (err) { 
			console.log(chalk.red(err));
		}

		jsonCommands.forEach(jsonCommand => {
			const command = jsonCommand.command;
			const description = jsonCommand.description;
			const response = jsonCommand.response;

			Kirbi.addCommand(command, {
				description,
				process: (msg, suffix, isEdit, cb) => {
					cb({
						embed: {
							color: Kirbi.Config.discord.defaultEmbedColor,
							description: response
						}
					}, msg);
				}
			});
		});

		// Load external commands
		if (Kirbi.Config.externalModules && Array.isArray(Kirbi.Config.externalModules)) {
			Kirbi.Config.externalModules.forEach(module => {
				if (Kirbi.Commands[module]) {
					return;
				}
				try {
					module = require(`kirbi-${module}`)(Kirbi);
				} catch (err) {
					console.log(chalk.red(`Improper setup of the '${module}' command file. : ${err}`));
					return;
				}
				if (module && module.commands) {
					module.commands.forEach(command => {
						if (command in module) {
							Kirbi.addCommand(command, module[command]);
						}
					});
				}
			});
		}
	};
	Kirbi.setupCommands();
};
