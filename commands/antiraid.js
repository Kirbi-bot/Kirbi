const GReYBot = require('../greybot');
const { AntiraidSettings } = require('../extras/classes');

// Instantiate the guild watcher for antiraid
GReYBot.antiraidGuilds = {};

exports.commands = [
	'antiraid',
];

exports.antiraid = {
	usage: '<parameter> <new value?>',
	description: 'Accesses the servers antiraid parameters. Adding a value will update the parameter.',
	process: (msg, suffix) => { 
        const parameters = suffix.split(' ');
        const parameter = parameters[0].trim();
        const settingTypes = AntiraidSettings.settingTypes();

        // There must be at least one parameter passed to the command.
        if (parameter === '') {
            msg.channel.send({
                embed: {
                    color: GReYBot.Config.defaultEmbedColor,
                    description: `Please specify a property of the antiraid settings. \nAvailable properties: ${Object.keys(settingTypes).join(', ')}.`
                }
            });
            return;
        }

        // Get the antiraid settings for the guild that the command was run from or instantiate it if it doesn't already exist.
        let antiraidSettings = GReYBot.antiraidGuilds[msg.guild.id];
        if (!antiraidSettings) {
            GReYBot.antiraidGuilds[msg.guild.id] = new AntiraidSettings(GReYBot.Discord.guilds.find('id', msg.guild.id));
            antiraidSettings = GReYBot.antiraidGuilds[msg.guild.id];
        }

        // Only some values of the antiraid are allowed to be viewed and updated.
        const settingType = settingTypes[parameter];
        if (!settingType) {
            msg.channel.send({
                embed: {
                    color: GReYBot.Config.defaultEmbedColor,
                    description: `That property is not available.`
                }
            });
            return;
        }

        // If there is only one parameter, we just want to display the current value.
        let value = antiraidSettings[parameter];
        if (parameters.length === 1) {
            if (settingType === 'Channel') {
                value = value ? value.id : 'none';
            }

            msg.channel.send({
                embed: {
                    color: GReYBot.Config.defaultEmbedColor,
                    description: `That ${parameter} antiraid setting is currently set to '${value}'.`
                }
            });
            return;
        }

        // Ensure that the value is properly typed for the antraid setting.
        value = parameters[1].trim();
        let message = `The ${parameter} antiraid setting has been set to '${value}'.`;
        switch (settingType) {
            case 'int':
                value = Math.max(0, Number.parseInt(value));
                break;
            case 'Channel':
                const guild = GReYBot.Discord.guilds.find('id', msg.guild.id);
                value = guild ? guild.channels.find('id', value) : null;
                if (!value) {
                    message = `The ${parameter} antiraid setting has been set to 'none'.`;
                }
                break;
        }

        // Attempt to set the value of the parameter.
        try {
            antiraidSettings[parameter] = value;
        } catch(e) {
            message = "Something went wrong setting the antiraid setting.";
        }
        
        // Display a message when done.
        msg.channel.send({
            embed: {
                color: GReYBot.Config.defaultEmbedColor,
                description: message
            }
        });
    }
}