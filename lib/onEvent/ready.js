GReYBot.on('ready', function() {
    console.log(`Logged in! Serving in ${GReYBot.guilds.array().length} servers`);
    require('../../lib/commands').init();
    console.log(`type ${GReYBotConfig.commandPrefix}help in Discord for a commands list.`);
    GReYBot.user.setGame(`${GReYBotConfig.commandPrefix}help | ${GReYBot.guilds.array().length} Servers`);
});