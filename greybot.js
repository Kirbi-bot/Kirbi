const fs = require('fs');
const path = require('path');


try {
	var Discord = require("discord.js");
} catch (e) {
	console.log(e.stack);
	console.log(process.version);
	console.log("Please run npm install and ensure it passes with no errors!");
	process.exit();
}

console.log(`Starting DiscordBot\nNode version: ${process.version}\nDiscord.js version: ${Discord.version}`);

exports.Discord = new Discord.Client();

//load auth data
try {
	exports.Auth = require('./config/auth');
} catch (e) {
	console.log(`Please create an auth.json like auth.json.example with a bot token or an email and password.\n${e.stack}`);
	process.exit();
}

//load config data
exports.Config = {};
try {
	exports.Config = require('./config/config');
} catch (e) {
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
			console.log(`WARNING: config.json found but we couldn't read it!\n${e.stack}`);
		}
	} catch (e2) {
		fs.writeFile('../config/config.json', JSON.stringify(exports.Config, null, 2), (err) => {
			if (err) console.error(err);
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
	return require('fs').readFileSync(path.join(path.dirname(require.main.filename), filePath), 'utf-8');
}
exports.getJsonObject = function (filePath) {
	return JSON.parse(exports.getFileContents(filePath));
}
exports.require = function (filePath) {
	return require(path.join(path.dirname(require.main.filename), filePath));
}
exports.login = function () {
	if (exports.Auth.bot_token) {
		console.log('Logging in with token...');
		exports.Discord.login(exports.Auth.bot_token);
	} else {
		console.log('GReYBot must have a bot token...');
	}
}

require('./lib/commands');
require('./lib/onEvent');