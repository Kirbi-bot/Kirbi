const GReYBot = require('../greybot');

exports.commands = [
	'server'
]

var servers = GReYBot.getJsonObject('/config/servers.json');

exports.server = {
	usage: `list|${servers.map(server => server.key).join('|')}`,
	process: (msg, suffix) => {

		if (suffix.toLowerCase() === "list" || suffix.trim() === "") {
			msg.channel.send({
				embed: {
					title: `${GReYBot.Config.serverName} Servers`,
					description: servers.map(server => server.key).join('\n'),
					color: GReYBot.Config.defaultEmbedColor
				}
			});
		}
		else {
			var info = servers.filter(server => server.key === suffix.toLowerCase())[0];

			if (info) {
				msg.channel.send({
					embed: {
						title: info.title,
						description: info.description,
						color: GReYBot.Config.defaultEmbedColor
					}
				});
			}
		}
	}
}