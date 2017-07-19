const GReYBot = require('../greybot');

exports.commands = [
	'xkcd',
	'highnoon'
]

exports.xkcd = {
	usage: '[comic number]',
	description: 'Displays a given XKCD comic number (or the latest if nothing specified',
	process: (msg, suffix) => {
		var url = "http://xkcd.com/";
		if (suffix != "") url += `${suffix}/`;
		url += 'info.0.json';
		require('request')(url, function (err, res, body) {
			try {
				var comic = JSON.parse(body);
				msg.channel.send({embed: {
					color: GReYBot.Config.defaultEmbedColor,
					title: `XKCD ${comic.num} ${comic.title}`,
					image: {
						url: comic.img
					},
					footer: {
						text: comic.alt
					}
				}});
			} catch (e) {
				msg.channel.send(`Couldn't fetch an XKCD for ${suffix}`);
			}
		});
	}
}

exports.highnoon = {
	process: (msg, suffix) => {
		require('request')({
			uri: "http://imgs.xkcd.com/comics/now.png",
			followAllRedirects: true
		}, (err, resp, body) => msg.channel.send('', {file: resp.request.uri.href}));
	}
}
