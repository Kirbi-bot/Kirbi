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

console.log(`Starting DiscordBot\nNode version: ${process.version}\nDiscord.js version: ${Discord.version}`);

exports.Discord = new Discord.Client();

//load auth data
try {
	exports.Auth = require('./config/auth');
} catch (err) {
	console.log(chalk.red(`Please create an auth.json like auth.json.example with a bot token or an email and password.\n${err.stack}`));
	process.exit();
}

//load config data
exports.Config = {};
try {
	exports.Config = require('./config/config');
} catch (err) {
	//no config file, use defaults
	exports.Config.debug = false;
	exports.Config.commandPrefix = '!';
	exports.Config.defaultEmbedColor = 5592405;
	exports.Config.pruneInterval = 10;
	exports.Config.pruneMax = 100;
	exports.Config.serverName = 'GReY Online';
	exports.Config.welcomeChannel = '334798958587150337';

	try {
		if (fs.lstatSync('../config/config.json').isFile()) {
			console.log(chalk.yellow(`WARNING: config.json found but we couldn't read it!\n${err.stack}`));
		}
	} catch (err2) {
		fs.writeFile('../config/config.json', JSON.stringify(exports.Config, null, 2), (err3) => {
			if (err3) console.log(chalk.red(err3));
		});
	}
}

if (!exports.Config.hasOwnProperty("commandPrefix")) {
	exports.Config.commandPrefix = '!';
}

exports.Commands = {};

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
exports.getFileArray = function (srcPath) {
	srcPath = path.join(path.dirname(require.main.filename), srcPath);
	return fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isFile());
}
exports.getFileContents = function (filePath) {
	return fs.readFileSync(path.join(path.dirname(require.main.filename), filePath), 'utf-8');
}
exports.getJsonObject = function (filePath) {
	return JSON.parse(exports.getFileContents(filePath));
}
exports.require = function (filePath) {
	return require(path.join(path.dirname(require.main.filename), filePath));
}
exports.logError = function (err) {
	console.log(chalk.red(err));
}

exports.login = function () {
	if (exports.Auth.bot_token) {
		console.log('Logging in with token...');
		exports.Discord.login(exports.Auth.bot_token);
	} else {
		console.log(chalk.red('GReYBot must have a bot token...'));
	}
}

require('./lib/commands');
require('./lib/onEvent');