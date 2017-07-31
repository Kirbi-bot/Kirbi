const GReYBot = require('../greybot');

exports.commands = [
	'ban',
	'kick',
	'prune'
]

var lastPruned = new Date().getTime() - (GReYBot.Config.pruneInterval * 1000);

function resolveMention(usertxt) {
	var userid = usertxt;
	if (usertxt.startsWith('<@!')) {
		userid = usertxt.substr(3, usertxt.length - 4);
	} else {
		if (usertxt.startsWith('<@')) {
			userid = usertxt.substr(2, usertxt.length - 3);
		}
	}
	return userid;
}

exports.ban = {
	usage: '<user> [days of messages to delete] [reason]',
	description: 'bans the user, optionally deleting messages from them in the last x days',
	process: function (msg, suffix) {
		var args = suffix.split(' ');
		if (args.length > 0 && args[0]) {
			if (!msg.guild.me.hasPermission('BAN_MEMBERS')) {
				msg.channel.send({
					embed: {
						color: GReYBot.Config.defaultEmbedColor,
						description: `I don't have permission to ban people!`
					}
				}).then(message => message.delete(5000));

				return;
			}

			if (!msg.member.hasPermission('BAN_MEMBERS')) {
				msg.channel.send({
					embed: {
						color: GReYBot.Config.defaultEmbedColor,
						description: `You don't have permission to ban people, ${msg.member}!`
					}
				}).then(message => message.delete(5000));

				return;
			}

			msg.guild.fetchMember(resolveMention(args[0])).then(member => {
				if (member != undefined) {
					if (!member.bannable) {
						msg.channel.send({
							embed: {
								color: GReYBot.Config.defaultEmbedColor,
								description: `I can't ban ${member}. Do they have the same or a higher role than me?`
							}
						}).then(message => message.delete(5000));
						return;
					}
					if (args.length > 1) {
						if (typeof args[1] === 'number') {
							if (args.length > 2) {
								let days = args[1];
								let reason = args.slice(2).join(' ');
								member.ban({ days: parseFloat(days), reason: reason }).then(x => {
									msg.channel.send({
										embed: {
											color: GReYBot.Config.defaultEmbedColor,
											description: `Banning ${member} from ${msg.guild} for ${reason}!`
										}
									});
								}).catch(err => msg.channel.send({
									embed: {
										color: GReYBot.Config.defaultEmbedColor,
										description: `Banning ${member} from ${msg.guild} failed!`
									}
								}));
							} else {
								let days = args[1];
								member.ban({ days: parseFloat(days) }).then(x => {
									msg.channel.send(`Banning ${member} from ${msg.guild}!`);
								}).catch(err => msg.channel.send({
									embed: {
										color: GReYBot.Config.defaultEmbedColor,
										description: `Banning ${member} from ${msg.guild} failed!`
									}
								}));
							}
						} else {
							let reason = args.slice(1).join(' ');
							member.ban({ reason: reason }).then(x => {
								msg.channel.send({
									embed: {
										color: GReYBot.Config.defaultEmbedColor,
										description: `Banning ${member} from ${msg.guild} for ${reason}!`
									}
								});
							}).catch(err => msg.channel.send({
								embed: {
									color: GReYBot.Config.defaultEmbedColor,
									description: `Banning ${member} from ${msg.guild} failed!`
								}
							}));
						}
					} else {
						member.ban().then(x => {
							msg.channel.send(`Banning ${member} from ${msg.guild}!`);
						}).catch(err => msg.channel.send({
							embed: {
								color: GReYBot.Config.defaultEmbedColor,
								description: `Banning ${member} from ${msg.guild} failed!`
							}
						}));
					}
				}
			});
		} else {
			msg.channel.send({
				embed: {
					color: GReYBot.Config.defaultEmbedColor,
					description: 'You must specify a user to ban.'
				}
			});
		};
	}
}


exports.kick = {
	usage: '<user> [reason]',
	description: 'Kick a user with an optional reason. Requires both the command user and the bot to have kick permission',
	process: (msg, suffix) => {
		let args = suffix.split(' ');

		if (args.length > 0 && args[0]) {
			if (!msg.guild.me.hasPermission('KICK_MEMBERS')) {
				msg.channel.send({
					embed: {
						color: GReYBot.Config.defaultEmbedColor,
						description: `I don't have permission to kick people!`
					}
				}).then(message => message.delete(5000));

				return;
			}

			if (!msg.member.hasPermission('KICK_MEMBERS')) {
				msg.channel.send({
					embed: {
						color: GReYBot.Config.defaultEmbedColor,
						description: `I don't have permission to kick people, ${msg.member}!`
					}
				}).then(message => message.delete(5000));

				return;
			}

			msg.guild.fetchMember(resolveMention(args[0])).then(member => {
				if (member != undefined) {
					if (!member.kickable) {
						msg.channel.send(`I can't kick ${member}. Do they have the same or a higher role than me?`);
						return;
					}
					if (args.length > 1) {
						let reason = args.slice(1).join(' ');
						member.kick().then(x => {
							msg.channel.send({
								embed: {
									color: GReYBot.Config.defaultEmbedColor,
									description: `Kicking ${member} from ${msg.guild} for ${reason}!`
								}
							})
						}).catch(err => msg.channel.send(`Kicking ${member} failed!`));
					} else {
						member.kick().then(x => {
							msg.channel.send({
								embed: {
									color: GReYBot.Config.defaultEmbedColor,
									description: `Kicking ${member} from ${msg.guild}!`
								}
							})
						}).catch(err => msg.channel.send({
							embed: {
								color: GReYBot.Config.defaultEmbedColor,
								description: `Kicking ${member} failed!`
							}
						}).then(message => message.delete(5000)));
					}
				} else {
					msg.channel.send(`I couldn't find a user ${args[0]}`);
				}
			});
		} else {
			msg.channel.send({
				embed: {
					color: GReYBot.Config.defaultEmbedColor,
					description: 'You must specify a user to kick.'
				}
			});
		}
	}
}


exports.prune = {
	usage: '<count|1-100>',
	process: (msg, suffix) => {
		if (!suffix) {
			msg.channel.send({
				embed: {
					color: GReYBot.Config.defaultEmbedColor,
					description: 'You must specify a number of messages to prune.'
				}
			}).then(message => message.delete(5000));

			return;
		}

		if (!msg.guild.me.hasPermission('MANAGE_MESSAGES')) {
			msg.channel.send({
				embed: {
					color: GReYBot.Config.defaultEmbedColor,
					description: `I can't prune messages, ${msg.member}...`
				}
			}).then(message => message.delete(5000));

			return;
		}

		if (!msg.member.hasPermission('MANAGE_MESSAGES')) {
			msg.channel.send({
				embed: {
					color: GReYBot.Config.defaultEmbedColor,
					description: `You can't prune messages, ${msg.member}...`
				}
			}).then(message => message.delete(5000));

			return;
		}

		var timeSinceLastPrune = Math.floor(new Date().getTime() - lastPruned);

		if (timeSinceLastPrune > (GReYBot.Config.pruneInterval * 1000)) {
			let count = parseInt(suffix)++ || 0;
			if (count > 1) {
				if (count > GReYBot.Config.pruneMax) count = GReYBot.Config.pruneMax;

				msg.channel.fetchMessages({ limit: count })
					.then(messages => messages.map(m => m.delete()))
					.then(function () {
						msg.channel.send({
							embed: {
								color: GReYBot.Config.defaultEmbedColor,
								description: `Pruning ${(count === 100) ? 100 : count - 1} messages...`
							}
						}).then(message => message.delete(5000));
					});

				lastPruned = new Date().getTime();
			}
		} else {
			var wait = Math.floor(GReYBot.Config.pruneInterval - (timeSinceLastPrune / 1000));
			msg.channel.send({
				embed: {
					color: GReYBot.Config.defaultEmbedColor,
					description: `You can't do that yet, please wait ${wait} second${wait > 1 ? 's' : ''}`
				}
			}).then(message => message.delete(5000));
		}
	}
}