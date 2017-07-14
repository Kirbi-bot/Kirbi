//initialize AI
if (GReYBotConfig.elizaEnabled) {
    var Eliza = require('../../extras/eliza');
    eliza = new Eliza();
    console.log('Eliza enabled.');
    eliza.memSize = 500;
}

function checkMessageForCommand(msg, isEdit) {
    //drop our own messages to prevent feedback loops
    if (msg.author === GReYBot.user) {
        return;
    }
    //check if message is a command
    if (msg.content.startsWith(GReYBotConfig.commandPrefix)) {
        console.log(`treating ${msg.content} from ${msg.author} as command`);
        var cmdTxt = msg.content.split(' ')[0].substring(GReYBotConfig.commandPrefix.length).toLowerCase();
        var suffix = msg.content.substring(cmdTxt.length + GReYBotConfig.commandPrefix.length + 1); //add one for the ! and one for the space
        if (msg.isMentioned(GReYBot.user)) {
            try {
                cmdTxt = msg.content.split(' ')[1];
                suffix = msg.content.substring(GReYBot.user.mention().length + cmdTxt.length + GReYBotConfig.commandPrefix.length + 1);
            } catch (e) {
                msg.channel.send('Yes?');
                return;
            }
        }
        var cmd = GReyBotCommands[cmdTxt];
        if (cmdTxt === 'help') {
            //help is special since it iterates over the other commands
            if (suffix) {
                var cmds = suffix.split(' ').filter(function(cmd) { return GReyBotCommands[cmd] });
                var info = "";
                for (var i = 0; i < cmds.length; i++) {
                    var cmd = cmds[i];
                    info += `**${GReYBotConfig.commandPrefix + cmd}**`;
                    var usage = GReyBotCommands[cmd].usage;
                    if (usage) {
                        info += ` ${usage}`;
                    }
                    var description = GReyBotCommands[cmd].description;
                    if (description instanceof Function) {
                        description = description();
                    }
                    if (description) {
                        info += `\n\t${description}`;
                    }
                    info += '\n'
                }
                msg.channel.send(info);
            } else {
                msg.author.send('**Available Commands:**').then(function() {
                    var batch = '';
                    var sortedCommands = Object.keys(GReyBotCommands).sort();
                    for (var i in sortedCommands) {
                        var cmd = sortedCommands[i];
                        var info = `**${GReYBotConfig.commandPrefix + cmd}**`;
                        var usage = GReyBotCommands[cmd].usage;
                        if (usage) {
                            info += ` ${usage}`;
                        }
                        var description = GReyBotCommands[cmd].description;
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
                cmd.process(msg, suffix, isEdit);
            } catch (e) {
                var msgTxt = `command ${cmdTxt} failed :disappointed_relieved:`;
                if (GReYBotConfig.debug) {
                    msgTxt += `\n${e.stack}`;
                }
                msg.channel.send(msgTxt);
            }
        } else {
            msg.channel.send(`${cmdTxt} not recognized as a command!`).then((message => message.delete(5000)))
        }
    } else if (GReYBotConfig.elizaEnabled === true && msg.isMentioned(GReYBot.user)) {
        //If Eliza AI is enabled, respond to @mention
        var message = msg.content.replace(`${GReYBot.user} `, '');
        msg.channel.send(eliza.transform(message));
    }
}

GReYBot.on('message', (msg) => checkMessageForCommand(msg, false));
GReYBot.on('messageUpdate', (oldMessage, newMessage) => {
    checkMessageForCommand(newMessage, true);
});