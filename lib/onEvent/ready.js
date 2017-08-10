const Kirbi = require('../../kirbi');

Kirbi.Discord.on('ready', function() {
    console.log(`Logged in! Serving in ${Kirbi.Discord.guilds.array().length} servers`);
    require('../../lib/commands').init();
    console.log(`type ${Kirbi.Config.commandPrefix}help in Discord for a commands list.`);
    Kirbi.Discord.user.setGame(`${Kirbi.Config.commandPrefix}help | ${Kirbi.Discord.guilds.array().length} Servers`);
});