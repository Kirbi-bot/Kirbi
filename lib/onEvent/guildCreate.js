const GReYBot = require('../../greybot');

GReYBot.Discord.on('guildCreate', guild => {
    GReYBot.Discord.user.setGame(`${GReYBot.Config.commandPrefix}help | ${GReYBot.Discord.guilds.array().length} Servers`);
});