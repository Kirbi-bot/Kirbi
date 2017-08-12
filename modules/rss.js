const Kirbi = require('../kirbi');

exports.commands = [
	'rss'
]

try {
	var rssFeeds = Kirbi.getJsonObject('/config/rss.json');
} catch (err) {
	Kirbi.logError(`Couldn't load rss.json. See rss.json.example if you want rss feed commands. error: ${err}`);
}

function loadFeeds() {
	for (var cmd in rssFeeds) {
		exports.commands.push(cmd);
		exports[cmd] = {
			usage: '[count]',
			description: rssFeeds[cmd].description,
			url: rssFeeds[cmd].url,
			process: function (msg, suffix, isEdit, cb) {
				var count = 1;
				if (suffix != null && suffix != "" && !isNaN(suffix)) {
					count = suffix;
				}
				rssfeed(msg, this.url, count, cb);
			}
		};
	}
}

loadFeeds();

function rssfeed(msg, url, count, cb) {
	var FeedParser = require('feedparser');
	var feedparser = new FeedParser();
	var request = require('request');
	request(url).pipe(feedparser);
	feedparser.on('error', function (error) {
		cb(`Failed reading feed: ${error}`, msg);
	});
	var shown = 0;
	feedparser.on('readable', function () {
		var stream = this;
		shown += 1
		if (shown > count) {
			return;
		}
		var item = stream.read();
		cb(`${item.title} ${item.link}`, msg);
		stream.alreadyRead = true;
	});
}

exports.rss = {
	description: 'Lists Available RSS Feeds',
	process: function (msg, suffix, isEdit, cb) {
		var output = '';
		for (var c in rssFeeds) {
			output += `${c}: ${rssFeeds[c].url}\n`;
		}
		cb(`Available feeds:\n${output}`, msg);
	}
}