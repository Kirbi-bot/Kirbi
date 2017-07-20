const GReYBot = require('../../greybot');

let recentMembers = [];
let kicking = false;
const raidProtectionSeconds = 10;
const raidProtectionUserLimit = 4;

GReYBot.Discord.on('guildMemberAdd', member => {
    const channel = GReYBot.Discord.channels.find('name', (GReYBot.Config.antiraidChannelName || 'test'));

    // Determine if the antiraid needs to be disabled.
    const resetJoinCount = (kicking && member.joinedTimestamp - recentMembers[recentMembers.length - 1].joinedTimestamp > raidProtectionSeconds * 1000);

    if (recentMembers.length >= raidProtectionUserLimit && !resetJoinCount) {
        // If we haven't started kicking, do so now.
        if (!kicking) {
            if (channel) channel.send('Antiraid measures have been activated.');
            recentMembers.forEach(recentMember => {
                recentMember.kick('Antiraid protection').then(() => {
                    if (channel) channel.send(`${recentMember.displayName} was kicked due to antiraid protection.`)
                });
            });
            kicking = true;
        }

        // To prevent the array from getting too long, remove the first member and add
        // the last so we only show the people who caused the last threshold to be hit.
        recentMembers.shift();
        recentMembers.push(member);
        member.kick('Antiraid protection').then(() => {
            if (channel) channel.send(`${member.displayName} was kicked due to antiraid protection.`);
        });
        return;
    }

    // Remove all users that are outside the protection timeframe.
    if (resetJoinCount) {
        if (channel) channel.send('Antiraid measures have been deactivated.');
        recentMembers = [];
        kicking = false;
    }
    // Add the user to recent users and send the greeting.
    recentMembers.push(member);
    member.send(`Welcome, ${member.user.username}, to the GReY Community!\nBe sure to read our <#${GReYBot.Config.welcomeChannel}> channel for an overview of our rules and features.`);
    channel.send(`@here, please Welcome ${member.user.username} to GReY!`);
});