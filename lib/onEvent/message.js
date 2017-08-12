const Kirbi = require('../../kirbi');

//initialize AI
if (Kirbi.Config.elizaEnabled) {
	var Eliza = require('../../extras/eliza');
	eliza = new Eliza();
	console.log('Eliza enabled.');
	eliza.memSize = 500;
};

function discordMessageCb (output, msg, expires, delCalling) {
	if (expires) {
		return msg.channel.send(output).then(message => message.delete(5000));
	}
	if (delCalling) {
		return msg.channel.send(output).then(() => msg.delete());
	}
	msg.channel.send(output);
};

function checkMessageForCommand (msg, isEdit) {
	//drop our own messages to prevent feedback loops
	if (msg.author === Kirbi.Discord.user) {
		return;
	}
	//check if message is a command
	if (msg.content.startsWith(Kirbi.Config.commandPrefix)) {
		var cmdTxt = msg.content.split(' ')[0].substring(Kirbi.Config.commandPrefix.length).toLowerCase();
		var suffix = msg.content.substring(cmdTxt.length + Kirbi.Config.commandPrefix.length + 1); //add one for the ! and one for the space
		if (msg.isMentioned(Kirbi.Discord.user)) {
			if (Kirbi.Config.elizaEnabled) {
				//If Eliza AI is enabled, respond to @mention
				var message = msg.content.replace(`${Kirbi.Discord.user} `, '');
				msg.channel.send(eliza.transform(message));
			} else {
				msg.channel.send('Yes?');
				return;
			};
		};
		var cmd = Kirbi.Commands[cmdTxt];
		if (msg.channel.type === "dm") {
			msg.channel.send(`I don't respond to direct messages.`)
		} else if (cmdTxt === 'help') {
			//help is special since it iterates over the other commands
			if (suffix) {
				var cmds = suffix.split(' ').filter(function (cmd) { return Kirbi.Commands[cmd] });
				var info = "";
				for (var i = 0; i < cmds.length; i++) {
					var cmd = cmds[i];
					if (Kirbi.Permissions.checkPermission(msg.guild.id, cmd)) {
						info += `**${Kirbi.Config.commandPrefix + cmd}**`;
						var usage = Kirbi.Commands[cmd].usage;
						if (usage) {
							info += ` ${usage}`;
						}
						var description = Kirbi.Commands[cmd].description;
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
					var sortedCommands = Object.keys(Kirbi.Commands).sort();
					for (var i in sortedCommands) {
						var cmd = sortedCommands[i];
						var info = `**${Kirbi.Config.commandPrefix + cmd}**`;
						var usage = Kirbi.Commands[cmd].usage;
						if (usage) {
							info += ` ${usage}`;
						}
						var description = Kirbi.Commands[cmd].description;
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
				if (Kirbi.Permissions.checkPermission(msg.guild.id, cmdTxt)) {
					console.log(`Treating ${msg.content} from ${msg.guild.id}:${msg.author} as command`);
					cmd.process(msg, suffix, isEdit, discordMessageCb);
				}
			} catch (err) {
				var msgTxt = `Command ${cmdTxt} failed :disappointed_relieved:`;
				if (Kirbi.Config.debug) {
					msgTxt += `\n${err.stack}`;
				}
				msg.channel.send(msgTxt);
			}
		} else {
			msg.channel.send(`${cmdTxt} not recognized as a command!`).then((message => message.delete(5000)))
		}
	};
};

Kirbi.Discord.on('message', (msg) => checkMessageForCommand(msg, false));
Kirbi.Discord.on('messageUpdate', (oldMessage, newMessage) => {
	checkMessageForCommand(newMessage, true);
});