const GReYBot = require('../greybot');

exports.commands = [
	'log',
	'uptime',
	'servers'
]

var startTime = Date.now();

exports.log = {
	usage: '<log message>',
	description: 'logs message to bot console',
	process: (msg, suffix) => { console.log(msg.content); }
}

exports.uptime = {
	usage: '<command>',
	description: 'returns the amount of time since the bot started',
	process: (msg, suffix) => {
		var now = Date.now();
		var msec = now - startTime;
		console.log(`Uptime is ${msec} milliseconds`);
		var days = Math.floor(msec / 1000 / 60 / 60 / 24);
		msec -= days * 1000 * 60 * 60 * 24;
		var hours = Math.floor(msec / 1000 / 60 / 60);
		msec -= hours * 1000 * 60 * 60;
		var mins = Math.floor(msec / 1000 / 60);
		msec -= mins * 1000 * 60;
		var secs = Math.floor(msec / 1000);
		var timestr = "";
		if (days > 0) {
			timestr += `${days} days `;
		}
		if (hours > 0) {
			timestr += `${hours} hours `;
		}
		if (mins > 0) {
			timestr += `${mins} minutes `;
		}
		if (secs > 0) {
			timestr += `${secs} seconds `;
		}
		msg.channel.send({
			embed: {
				color: GReYBot.Config.defaultEmbedColor,
				description: `**Uptime**: ${timestr}`
			}
		});
	}
}

exports.servers = {
	usage: '<command>',
	description: 'Returns a list of servers the bot is connected to',
	process: (bot,msg) => {
		msg.channel.sendMessage(`__**${bot.user.username} is currently on the following servers:**__ \n\n${bot.guilds.map(g => `${g.name} - **${g.memberCount} Members**`).join(`\n`)}`, {split: true});
	}
}