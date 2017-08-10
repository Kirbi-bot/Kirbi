const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

try {
	var Discord = require("discord.js");
} catch (err) {
	console.log(chalk.red(err.stack));
	console.log(chalk.red(process.version));
	console.log(chalk.red('Please run npm install and ensure it passes with no errors!'));
	process.exit();
}

console.log(`Starting Kirbi\nNode version: ${process.version}\nDiscord.js version: ${Discord.version}`);

exports.Discord = new Discord.Client();

//load auth data
function Auth() {
	try {
		return require('./config/auth');
	} catch (err) {
		console.log(chalk.red(`Please create an auth.json like auth.json.example with a bot token or an email and password.\n${err.stack}`));
		process.exit();
	}
}

exports.Auth = Auth();

//load config data
function Config() {
	var config = {};

	try {
		config = require('./config/config');
	} catch (err) {
		//no config file, use defaults
		config.debug = false;
		config.commandPrefix = '!';
		config.defaultEmbedColor = 5592405;
		config.pruneInterval = 10;
		config.pruneMax = 100;
		config.serverName = 'GReY Online';
		config.welcomeChannel = '334798958587150337';

		try {
			if (fs.lstatSync('../config/config.json').isFile()) {
				console.log(chalk.yellow(`WARNING: config.json found but we couldn't read it!\n${err.stack}`));
			}
		} catch (err2) {
			fs.writeFile('../config/config.json', JSON.stringify(config, null, 2), (err3) => {
				if (err3) console.log(chalk.red(err3));
			});
		}
	}

	if (!config.hasOwnProperty("commandPrefix")) {
		config.commandPrefix = '!';
	}

	return config;
}

exports.Config = Config();

//command functions
exports.Commands = {};

//permissions
function Permissions() {
	var permissions = {};

	try {
		permissions = require('./config/permissions.json');
	} catch (e) {
		permissions.commands = {};
	}

	permissions.checkPermission = function (guildId, command) {
		try {
			var allowed = true;
			try {
				if (permissions.commands) {
					if (permissions.commands.hasOwnProperty(command)) {
						allowed = false;
						if (permissions.commands[command].includes(guildId)) {
							allowed = true;
						}
					}
				}
			} catch (err) { console.log(err); }
			return allowed;
		} catch (e) { }
		return false;
	}

	return permissions;
}

exports.Permissions = Permissions();

exports.addCommand = function (commandName, commandObject) {
	try {
		exports.Commands[commandName] = commandObject;
	} catch (err) {
		console.log(err);
	}
}
exports.commandCount = function () {
	return Object.keys(exports.Commands).length;
}

//helpers
exports.getFileArray = function (srcPath) {
	try {
		srcPath = path.join(path.dirname(require.main.filename), srcPath);
		return fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isFile());
	} catch (err) {
		return [];
	}
}
exports.getFileContents = function (filePath) {
	try {
		return fs.readFileSync(path.join(path.dirname(require.main.filename), filePath), 'utf-8');
	} catch (err) {
		return '';
	}
}
exports.getJsonObject = function (filePath) {
	return JSON.parse(exports.getFileContents(filePath));
}
exports.require = function (filePath) {
	delete require.cache[path.join(path.dirname(require.main.filename), filePath)];
	return require(path.join(path.dirname(require.main.filename), filePath));
}
exports.logError = function (err) {
	console.log(chalk.red(err));
}

//bot login
exports.login = function () {
	if (exports.Auth.bot_token) {
		console.log('Logging in with token...');
		exports.Discord.login(exports.Auth.bot_token);
	} else {
		console.log(chalk.red('Kirbi must have a bot token...'));
	}
}

require('./lib/commands');
require('./lib/onEvent');