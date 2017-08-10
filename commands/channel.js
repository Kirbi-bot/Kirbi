const Kirbi = require('../kirbi');

exports.commands = [
    'topic'
];

exports.topic = {
	description: 'Shows the purpose of the chat channel',
	process: (msg, suffix) => {
		response = msg.channel.topic;
		if (msg.channel.topic.trim() === '') {
			response = `There doesn't seem to be a topic for this channel. Maybe ask the mods?`
		}
		
		msg.channel.send({
			embed: {
				color: Kirbi.Config.defaultEmbedColor,
				title: `**${response}**`
			}
		});
	}
};
