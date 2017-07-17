var fs = require('fs');

//load auth data
try {
	global.GReYBotAuth = require('../config/auth');
} catch (e) {
	console.log(`Please create an auth.json like auth.json.example with a bot token or an email and password.\n${e.stack}`);
	process.exit();
}

//load config data
global.GReYBotConfig = {};
try {
	GReYBotConfig = require('../config/config');
} catch (e) {
	//no config file, use defaults
	GReYBotConfig.debug = false;
	GReYBotConfig.commandPrefix = '!';
	GReYBotConfig.defaultEmbedColor = 5592405;
	GReYBotConfig.pruneInterval = 10;
	GReYBotConfig.pruneMax = 100;
	GReYBotConfig.serverName = 'GReY Online';
	GReYBotConfig.welcomeChannel = '334798958587150337';

	try {
		if (fs.lstatSync('../config/config.json').isFile()) {
			console.log(`WARNING: config.json found but we couldn't read it!\n${e.stack}`);
		}
	} catch (e2) {
		fs.writeFile('../config/config.json', JSON.stringify(GReYBotConfig, null, 2), (err) => {
			if (err) console.error(err);
		});
	}
}

if (!GReYBotConfig.hasOwnProperty("commandPrefix")) {
	GReYBotConfig.commandPrefix = '!';
}