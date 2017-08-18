const Kirbi = require('../kirbi');

function Auth() {
	try {
		return require('../config/auth');
	} catch (err) {
		console.log(chalk.red(`Please create an auth.json like auth.json.example with a bot token or an email and password.\n${err.stack}`));
		process.exit();
	}
}

Kirbi.Auth = Auth();