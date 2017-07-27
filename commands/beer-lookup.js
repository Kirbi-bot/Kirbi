const GReYBot = require('../greybot');

exports.commands = [
	'brew'
]

exports.brew = {
	usage: '[brew | brewery]',
	description: 'Used to retrieve specific information about a brewery or brew.',
	process: (msg, suffix) => {
		var url = 'http://api.brewerydb.com/v2/search?q=';
		if (!suffix) {
			msg.channel.send('How about asking for something in specific?');
		}
		url += encodeURIComponent(suffix);
		url += `&key=${GReYBot.Auth.brewerydb_api_key}`;
		require('request')(url, function (err, res, body) {
			var response = JSON.parse(body);
			if (typeof (response.data) !== 'undefined' && response.data.length > 0) {
				let result = response.data[0];
				if (typeof (result.description) !== 'undefined') {
					msg.channel.send({
						embed: {
							color: GReYBot.Config.defaultEmbedColor,
							title: result.name,
							thumbnail: {
								url: result.labels.medium
							},
							description: '\n' + result.description + '\n\n',
							fields: [
								{
									name: 'Style: ' + result.style.name,
									value: result.style.description
								},
								{
									name: 'ABV',
									value: result.abv,
									inline: true
								},
								{
									name: 'IBU',
									value: result.ibu,
									inline: true
								}
							]
						}
					});
				} else {
					msg.channel.send({
						embed: {
							color: GReYBot.Config.defaultEmbedColor,
							description: `${response.data[0].name} is a good beer, but I don\'t have a good way to describe it.`
						}
					});
				}
			} else {
				msg.channel.send({
					embed: {
						color: GReYBot.Config.defaultEmbedColor,
						description: `Damn, I've never heard of that.  Where do I need to go to find it?`
					}
				});
			}
		});
	}
}
