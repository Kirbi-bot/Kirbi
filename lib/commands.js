const path = require('path');
const Kirbi = require('../kirbi');
const chalk = require('chalk');

let commandFiles;
let commandDirectory;

function getFileArray (srcPath) { 
	try { 
	  srcPath = path.join(path.dirname(require.main.filename), srcPath); 
	  return fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isFile()); 
	} catch (err) { 
	  return []; 
	} 
}
function getJsonObject (filePath) { 
	return JSON.parse(exports.getFileContents(filePath)); 
}

try {
	commandDirectory = '/modules';
	commandFiles = getFileArray(commandDirectory);
} catch (err) {
	console.log(chalk.red(err));
}

exports.setupCommands = function () {
	// Helpers
	Kirbi.Commands = {};
	Kirbi.addCommand = function (commandName, commandObject) {
		try {
			Kirbi.Commands[commandName] = commandObject;
		} catch (err) {
			console.log(err);
		}
	};
	Kirbi.commandCount = function () {
		return Object.keys(Kirbi.Commands).length;
	};

	// Load command files
	commandFiles.forEach(commandFile => {
		try {
			commandFile = Kirbi.require(`${path.join(commandDirectory, commandFile)}`);
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
		jsonCommands = getJsonObject('/config/commands.json');
	} catch (err) { }

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
				module = require(`kirbi-${module}`)(Kirbi.Config, Kirbi.Auth);
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
