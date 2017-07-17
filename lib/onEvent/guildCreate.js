client.on("guildCreate", guild => {
    GReYBot.user.setGame(`${GReYBotConfig.commandPrefix}help | ${GReYBot.guilds.array().length} Servers`);
});