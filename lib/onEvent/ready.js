const GReYBot = require('../../greybot');

GReYBot.Discord.on('ready', function() {
    console.log(`Logged in! Serving in ${GReYBot.Discord.guilds.array().length} servers`);
    require('../../lib/commands').init();
    console.log(`type ${GReYBot.Config.commandPrefix}help in Discord for a commands list.`);
    GReYBot.Discord.user.setGame(`${GReYBot.Config.commandPrefix}help | ${GReYBot.Discord.guilds.array().length} Servers`);
});