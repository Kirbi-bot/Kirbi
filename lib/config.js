const Kirbi = require('../kirbi');

function Config() {
	var config = {};

	try {
		config = require('../config/config');
	} catch (err) {
		//no config file, use defaults
		config.debug = false;
		config.commandPrefix = '!';
		config.elizaEnabled = false;
		config.discord = {};
		config.externalModules = [];
		config.discord.enabled = true;
		config.discord.serverName = "insert your server name";
		config.discord.welcomeChannel = "insert channel id of channel where you want welcome to be";
		config.discord.pruneInterval = 10;
		config.discord.pruneMax = 100;
		config.discord.defaultEmbedColor = 5592405

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

Kirbi.Config = Config();