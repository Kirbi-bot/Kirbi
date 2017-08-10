const Kirbi = require('../kirbi');

exports.commands = [
	'welcome'
]

exports.welcome = {
	usage: `can only be used in <#${Kirbi.Config.welcomeChannel}>`,
	description: 'displays welcome message(s)',
	process: (msg, suffix) => {
		if (msg.channel.id === Kirbi.Config.welcomeChannel) {
			let welcomeMessage = Kirbi.getFileContents('/extras/welcome.md');
			if (welcomeMessage) {
				welcomeMessage = welcomeMessage.split('=====');
				welcomeMessage.forEach(message => {
					message = message.split('-----');
					msg.channel.send({
						embed: {
							color: Kirbi.Config.defaultEmbedColor,
							title: message[0].trim(),
							description: message[1].trim()
						}
					});
				});
			}
		}
	}
}
