const GReYBot = require('../../greybot');

GReYBot.Discord.on('guildDelete', guild => {
	GReYBot.Discord.user.setGame(`${GReYBot.Config.commandPrefix}help | ${GReYBot.Discord.guilds.array().length} Servers`);

	// Upon the bot leaving a server, we should no longer keep their antiraid settings.
	delete GReYBot.antiraidGuilds[guild.id]
});
