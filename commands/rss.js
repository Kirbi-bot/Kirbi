const GReYBot = require('../greybot');

exports.commands = [
	'rss'
]

try {
	var rssFeeds = GReYBot.getJsonObject('/config/rss.json');
} catch (e) {
	console.log(`Couldn't load rss.json. See rss.json.example if you want rss feed commands. error: ${e}`);
}

function loadFeeds() {
	for (var cmd in rssFeeds) {
		exports.commands.push(cmd);
		exports[cmd] = {
			usage: '[count]',
			description: rssFeeds[cmd].description,
			url: rssFeeds[cmd].url,
			process: function (msg, suffix) {
				var count = 1;
				if (suffix != null && suffix != "" && !isNaN(suffix)) {
					count = suffix;
				}
				rssfeed(msg, this.url, count, false);
			}
		};
	}
}

loadFeeds();

function rssfeed(msg, url, count, full) {
	var FeedParser = require('feedparser');
	var feedparser = new FeedParser();
	var request = require('request');
	request(url).pipe(feedparser);
	feedparser.on('error', function (error) {
		msg.channel.send(`Failed reading feed: ${error}`);
	});
	var shown = 0;
	feedparser.on('readable', function () {
		var stream = this;
		shown += 1
		if (shown > count) {
			return;
		}
		var item = stream.read();
		msg.channel.send(`${item.title} ${item.link}`, function () {
			if (full === true) {
				var text = htmlToText.fromString(item.description, {
					wordwrap: false,
					ignoreHref: true
				});
				msg.channel.send(text);
			}
		});
		stream.alreadyRead = true;
	});
}

exports.rss = {
	description: 'Lists Available RSS Feeds',
	process: function (msg, suffix) {
		msg.channel.send('Available feeds:').then(function () {
			for (var c in rssFeeds) {
				msg.channel.send(`${c}: ${rssFeeds[c].url}`);
			}
		});
	}
}