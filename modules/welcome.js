const Kirbi = require('../kirbi');

exports.commands = [
	'welcome'
];

exports.welcome = {
	usage: `can only be used in <#${Kirbi.Config.discord.welcomeChannel}>`,
	description: 'displays welcome message(s)',
	process: (msg, suffix, isEdit, cb) => {
		if (msg.channel.id !== Kirbi.Config.discord.welcomeChannel) {
			return;
		}

		let welcomeMessage = Kirbi.getFileContents('/extras/welcome.md');
		if (welcomeMessage) {
			welcomeMessage = welcomeMessage.split('=====');
			welcomeMessage.forEach(message => {
				message = message.split('-----');
				cb({
					embed: {
						color: Kirbi.Config.discord.defaultEmbedColor,
						title: message[0].trim(),
						description: message[1].trim()
					}
				}, msg);
			});
		}
	}
};
