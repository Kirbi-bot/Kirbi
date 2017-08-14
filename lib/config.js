const Kirbi = require('../kirbi');

function Config() {
	var config = {};

	try {
		config = require('../config/config');
	} catch (err) {
		//no config file, use defaults
		config.debug = false;
		config.commandPrefix = '!';
		config.defaultEmbedColor = 5592405;
		config.elizaEnabled = false;
		config.discordEnabled = false;
		config.slackEnabled = false;
		config.discordOptions = {};
		config.discordOptions.serverName = "insert your server name";
		config.discordOptions.welcomeChannel = "insert channel id of channel where you want welcome to be";
		config.pruneInterval = 10;
		config.pruneMax = 100;
		config.defaultEmbedColor = 5592405

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