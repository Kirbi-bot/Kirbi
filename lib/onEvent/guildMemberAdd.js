const Kirbi = require('../../kirbi');
const { AntiraidSettings } = require('../../extras/classes');

Kirbi.Discord.on('guildMemberAdd', member => {
	const guildId = member.guild.id;
	const guild = Kirbi.Discord.guilds.find('id', guildId);
	
	// Add the server to the list of watched guild
	if (!Kirbi.antiraidGuilds[guildId]) {
		Kirbi.antiraidGuilds[guildId] = new AntiraidSettings(guild);
	}

	// Get the settings for the server
	const guildSettings = Kirbi.antiraidGuilds[guildId];
	const channel = guildSettings.channel;
	const seconds = guildSettings.seconds;
	const limit = guildSettings.limit;

	// Determine if the antiraid needs to be disabled.
	const resetJoinCount = (
		guildSettings.kicking && 
		member.joinedTimestamp - guildSettings.recentMembers[guildSettings.recentMembers.length - 1].joinedTimestamp > seconds * 1000
	);

	if (guildSettings.recentMembers.length >= limit && !resetJoinCount) {
		// If we haven't started kicking, do so now.
		if (!guildSettings.kicking) {
			if (channel) channel.send('Antiraid measures have been activated.');
			guildSettings.recentMembers.forEach(recentMember => {
				recentMember.kick('Antiraid protection').then(() => {
					if (channel) channel.send(`${recentMember.displayName} was kicked due to antiraid protection.`)
				});
			});

			guildSettings.kicking = true;
		}

		// To prevent the array from getting too long, remove the first member and add
		// the last so we only show the people who caused the last threshold to be hit.
		guildSettings.recentMembers.shift();
		guildSettings.recentMembers.push(member);
		member.kick('Antiraid protection').then(() => {
			if (channel) channel.send(`${member.displayName} was kicked due to antiraid protection.`);
		});

		return;
	}

	// Remove all users that are outside the protection timeframe.
	if (resetJoinCount) {
		if (channel) channel.send('Antiraid measures have been deactivated.');
		guildSettings.recentMembers = [];
		guildSettings.kicking = false;
	}
	// Add the user to recent users and send the greeting.
	guildSettings.recentMembers.push(member);
	

	if(!guildSettings.kicking && member.guild.id === Kirbi.Config.welcomeGuild) {
		member.send(`Welcome, ${member.user.username}, to the GReY Community!\nBe sure to read our <#${Kirbi.Config.welcomeChannel}> channel for an overview of our rules and features.`);
		if (channel) channel.send(`@here, please Welcome ${member.user.username} to ${member.guild.name}!`);	
	}
});
