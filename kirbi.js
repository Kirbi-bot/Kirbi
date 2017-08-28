const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

console.log(chalk.green(`Starting Kirbi...`));
console.log(chalk.green(`Node version: ${process.version}`));

exports.require = function (filePath) {
	delete require.cache[path.join(path.dirname(require.main.filename), filePath)];
	return require(path.join(path.dirname(require.main.filename), filePath));
};
exports.Auth = require('./lib/auth');
exports.Config = require('./lib/config');
exports.Permissions = require('./lib/permissions');
require('./lib/commands').setupCommands();

// Bot login
exports.login = function () {
	if (exports.Config.discord.enabled) {
		try {
			require('kirbi-discord').discordLogin(this);
		} catch (err) {
			console.log(chalk.red(err));
		}
	}
	if (exports.Config.slack.enabled) {
		try {
			require('kirbi-slack').slackLogin(this);
		} catch (err) {
			console.log(chalk.red(err));
		}
	}
};
