const GReYBot = require('../greybot');

exports.commands = [
	'prune'
]

var lastPruned = new Date().getTime() - (GReYBot.Config.pruneInterval * 1000);

exports.prune = {
	usage: '<count|1-100>',
	process: (msg, suffix) => {
		var count = parseInt(suffix) || 0;

		if (msg.member.hasPermission('MANAGE_MESSAGES')) {
			var timeSinceLastPrune = Math.floor(new Date().getTime() - lastPruned);

			if (timeSinceLastPrune > (GReYBot.Config.pruneInterval * 1000)) {
				count++;
				if (count > 1) {
					if (count > GReYBot.Config.pruneMax) count = GReYBot.Config.pruneMax;

					msg.channel.fetchMessages({ limit: count })
						.then(messages => messages.map(m => m.delete()))
						.then(function () {
							msg.channel.send({
								embed: {
									color: GReYBot.Config.defaultEmbedColor,
									description: `Pruning ${count - 1} messages...`
								}
							}).then(message => message.delete(5000));
						});

					lastPruned = new Date().getTime();
				}
			}
			else {
				var wait = Math.floor(GReYBot.Config.pruneInterval - (timeSinceLastPrune / 1000));
				msg.channel.send({
					embed: {
						color: GReYBot.Config.defaultEmbedColor,
						description: `You can't do that yet, please wait ${wait} second${wait > 1 ? "s" : ""}`
					}
				}).then(message => message.delete(5000));
			}
		}
		else {
			msg.channel.send({
				embed: {
					color: GReYBot.Config.defaultEmbedColor,
					description: `You can't do that ${msg.member}...`
				}
			}).then(message => message.delete(5000));
		}
	}
}
