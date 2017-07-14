exports.commands = [
	'server'
]

var servers = GReYBot.getJsonObject('/config/servers.json');

exports.server = {
	usage: `list|${servers.map(server => server.key).join('|')}`,
	process: (msg, suffix) => {

		if (suffix.toLowerCase() === "list") {
			msg.channel.send({
				embed: {
					title: `${GReYBotConfig.serverName} Servers`,
					description: servers.map(server => server.key).join('\n'),
					color: GReYBotConfig.defaultEmbedColor
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
						color: GReYBotConfig.defaultEmbedColor
					}
				});
			}
		}
	}
}