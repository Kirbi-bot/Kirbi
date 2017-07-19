const GReYBot = require('../greybot');

exports.commands = [
	'welcome'
]

exports.welcome = {
	usage: `can only be used in <#${GReYBot.Config.welcomeChannel}>`,
	description: 'displays welcome message(s)',
	process: (msg, suffix) => {
		if (msg.channel.id === GReYBot.Config.welcomeChannel) {
			var path = require('path');
			var welcomeMessage = GReYBot.getFileContents('/extras/welcome.md');
			if (welcomeMessage) {
				welcomeMessage = welcomeMessage.split('=====');
				welcomeMessage.forEach(message => {
					message = message.split('-----');
					msg.channel.send({
						embed: {
							color: GReYBot.Config.defaultEmbedColor,
							title: message[0].trim(),
							description: message[1].trim()
						}
					});
				});

			}
		}
	}
}
