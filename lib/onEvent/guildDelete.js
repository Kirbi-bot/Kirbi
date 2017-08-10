const Kirbi = require('../../kirbi');

Kirbi.Discord.on('guildDelete', guild => {
	Kirbi.Discord.user.setGame(`${Kirbi.Config.commandPrefix}help | ${Kirbi.Discord.guilds.array().length} Servers`);

	// Upon the bot leaving a server, we should no longer keep their antiraid settings.
	delete Kirbi.antiraidGuilds[guild.id]
});
