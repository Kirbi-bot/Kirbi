const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

console.log(chalk.green(`Starting Kirbi...`));
console.log(chalk.green(`Node version: ${process.version}`));

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

require('./lib/auth');
require('./lib/config');
require('./lib/permissions');
require('./lib/commands').setupCommands();

//bot login
exports.login = function () {
	if (exports.Config.discord.enabled) {
		try {
			require('kirbi-discord').discordLogin();
		} catch (e) {
			exports.logError(e);
		}
	};
}
