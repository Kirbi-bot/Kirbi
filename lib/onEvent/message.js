const GReYBot = require('../../greybot');

//initialize AI
if (GReYBot.Config.elizaEnabled) {
	var Eliza = require('../../extras/eliza');
	eliza = new Eliza();
	console.log('Eliza enabled.');
	eliza.memSize = 500;
}

function checkMessageForCommand(msg, isEdit) {
	//drop our own messages to prevent feedback loops
	if (msg.author === GReYBot.Discord.user) {
		return;
	}
	//check if message is a command
	if (msg.content.startsWith(GReYBot.Config.commandPrefix)) {
		var cmdTxt = msg.content.split(' ')[0].substring(GReYBot.Config.commandPrefix.length).toLowerCase();
		var suffix = msg.content.substring(cmdTxt.length + GReYBot.Config.commandPrefix.length + 1); //add one for the ! and one for the space
		if (msg.isMentioned(GReYBot.Discord.user)) {
			try {
				cmdTxt = msg.content.split(' ')[1];
				suffix = msg.content.substring(GReYBot.Discord.user.mention().length + cmdTxt.length + GReYBot.Config.commandPrefix.length + 1);
			} catch (err) {
				msg.channel.send('Yes?');
				return;
			}
		}
		var cmd = GReYBot.Commands[cmdTxt];
		if (msg.channel.type === "dm") {
			msg.channel.send(`I don't respond to direct messages.`)
		} else if (cmdTxt === 'help') {
			//help is special since it iterates over the other commands
			if (suffix) {
				var cmds = suffix.split(' ').filter(function (cmd) { return GReYBot.Commands[cmd] });
				var info = "";
				for (var i = 0; i < cmds.length; i++) {
					var cmd = cmds[i];
					if (GReYBot.Permissions.checkPermission(msg.guild.id, cmd)) {
						info += `**${GReYBot.Config.commandPrefix + cmd}**`;
						var usage = GReYBot.Commands[cmd].usage;
						if (usage) {
							info += ` ${usage}`;
						}
						var description = GReYBot.Commands[cmd].description;
						if (description instanceof Function) {
							description = description();
						}
						if (description) {
							info += `\n\t${description}`;
						}
						info += '\n'
					}
				}
				msg.channel.send(info);
			} else {
				msg.author.send('**Available Commands:**').then(function () {
					var batch = '';
					var sortedCommands = Object.keys(GReYBot.Commands).sort();
					for (var i in sortedCommands) {
						var cmd = sortedCommands[i];
						var info = `**${GReYBot.Config.commandPrefix + cmd}**`;
						var usage = GReYBot.Commands[cmd].usage;
						if (usage) {
							info += ` ${usage}`;
						}
						var description = GReYBot.Commands[cmd].description;
						if (description instanceof Function) {
							description = description();
						}
						if (description) {
							info += `\n\t${description}`;
						}
						var newBatch = `${batch}\n${info}`;
						if (newBatch.length > (1024 - 8)) { //limit message length
							msg.author.send(batch);
							batch = info;
						} else {
							batch = newBatch
						}
					}
					if (batch.length > 0) {
						msg.author.send(batch);
					}
				});
			}
		} else if (cmd) {
			try {
				if (GReYBot.Permissions.checkPermission(msg.guild.id, cmdTxt)) {
					console.log(`Treating ${msg.content} from ${msg.guild.id}:${msg.author} as command`);
					cmd.process(msg, suffix, isEdit);
				}
			} catch (err) {
				var msgTxt = `Command ${cmdTxt} failed :disappointed_relieved:`;
				if (GReYBot.Config.debug) {
					msgTxt += `\n${err.stack}`;
				}
				msg.channel.send(msgTxt);
			}
		} else {
			msg.channel.send(`${cmdTxt} not recognized as a command!`).then((message => message.delete(5000)))
		}
	} else if (GReYBot.Config.elizaEnabled === true && msg.isMentioned(GReYBot.Discord.user)) {
		//If Eliza AI is enabled, respond to @mention
		var message = msg.content.replace(`${GReYBot.Discord.user} `, '');
		msg.channel.send(eliza.transform(message));
	}
}

GReYBot.Discord.on('message', (msg) => checkMessageForCommand(msg, false));
GReYBot.Discord.on('messageUpdate', (oldMessage, newMessage) => {
	checkMessageForCommand(newMessage, true);
});