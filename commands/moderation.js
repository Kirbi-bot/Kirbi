const GReYBot = require('../greybot');

exports.commands = [
	'prune',
	'kick'
]

var lastPruned = new Date().getTime() - (GReYBot.Config.pruneInterval * 1000);

exports.prune = {
	usage: '<count|1-100>',
	process: (msg, suffix) => {
		var count = parseInt(suffix) || 0;

		if (msg.member.hasPermission('MANAGE_MESSAGES')) {
			var timeSinceLastPrune = Math.floor(new Date().getTime() - lastPruned);
			console.log(timeSinceLastPrune);
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

exports.kick = {
	usage: '<user> <reason>',
	description: 'Kick a user with an optional reason. Requires both the command user and the bot to have kick permission',
	process: (bot, msg, suffix) => {
		let args = suffix.split(" ");
		if (args.length > 0 && args[0]) {
			let hasPermissonToKick =  msg.guild.members.get(bot.user.id).permissions.has("KICK_MEMBERS");
			if (!hasPermissonToKick) {
				msg.channel.send( "I don't have permission to kick people!");
				return;
			}
			if (!msg.guild.members.get(msg.author.id).permissions.has("KICK_MEMBERS")) {
				msg.channel.send( "You don't have permission to kick people!");
				return;
			}
			var targetId = resolveMention(args[0]);
			let target = msg.guild.members.get(targetId);
			if (target != undefined) {
				if (!target.kickable) {
					msg.channel.send("I can't kick " + target + ". Do they have the same or a higher role than me?");
					return;
				}
				if (args.length > 1) {
					let reason = args.slice(1).join(" ");
					target.kick(reason).then(x => {
						msg.channel.send("Kicking " + target + " from " + msg.guild + " for " + reason + "!");
					}).catch(err => msg.channel.send("Kicking " + target + " failed:\n"));
				} else {
					target.kick().then(x => {
						msg.channel.send("Kicking " + target + " from " + msg.guild + "!");
					}).catch(err => msg.channel.send("Kicking " + target + " failed:\n"));
				}
			} else {
				msg.channel.send("I couldn't find a user " + args[0]);
			}
		} else {
			msg.channel.send("You must specify a user to kick!");
		}
	}
}
