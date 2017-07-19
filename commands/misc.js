exports.commands = [
	'lmgtfy',
	'unshorten',
	'ping',
	'say'
]

var unshort = require('unshort');

exports.lmgtfy = {
	usage: '<Let Me Google that for You>',
	description: 'Plebs, plz.',
	process: (msg, suffix) => {
		if (suffix) {
			msg.channel.send(`<http://lmgtfy.com/?q=${encodeURI(require("remove-markdown")(suffix))}>`).then(message => msg.delete());
		}
	}
}

exports.unshorten = {
	usage: '<link to shorten>',
	description: 'Unshorten a link.',
	process: (msg, suffix) => {
		if (suffix) {
			unshort(suffix, function (err, url) {
				if (url) {
					msg.channel.send(`Original url is: ${url}`);
				} else {
					msg.channel.send('This url can\'t be expanded');
				}
			});
		}
	}
}

exports.ping = {
	description: 'responds pong, useful for checking if bot is alive',
	process: (msg, suffix) => { msg.channel.send(`${msg.author} pong!`); }
}

exports.say = {
	usage: '<message>',
	description: 'bot says message',
	process: (msg, suffix) => { msg.channel.send(suffix); }
}
