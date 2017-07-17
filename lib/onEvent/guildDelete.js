client.on('guildDelete', guild => {
    GReYBot.user.setGame(`${GReYBotConfig.commandPrefix}help | ${GReYBot.guilds.array().length} Servers`);
});