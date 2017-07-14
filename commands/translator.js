exports.commands = [
	'yodify',
	'leet'
]

var leet = require('leet');

exports.yodify = {
	usage: '<statement>',
	description: 'Translate to Yoda speak',
	process: (msg, suffix) => {
		if (!suffix) {
			return msg.channel.send('Your statement, I must have.');
		}

		require('soap').createClient('http://www.yodaspeak.co.uk/webservice/yodatalk.php?wsdl',
			function (err, client) {
				if (err) {
					return msg.channel.send('Lost, I am. Not found, the web service is. Hrmm...');
				}

				client.yodaTalk({ inputText: suffix }, function (err, result) {
					if (err) {
						return msg.channel.send('Confused, I am. Disturbance in the force, there is. Hrmm...');
					}
					return msg.channel.send(result.return);
				});
			}
		);
	}
},

exports.leet = {
	usage: '<message>',
	description: 'converts boring regular text to 1337',
	process: (msg, suffix) => {
		msg.channel.send(leet.convert(suffix));
	}
}
