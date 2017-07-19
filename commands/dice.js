const GReYBot = require('../greybot');

exports.commands = [
	"roll"
]

var d20 = require('d20')

exports.roll = {
	usage: '[# of sides] or [# of dice]d[# of sides]( + [# of dice]d[# of sides] + ...)',
	description: 'roll one die with x sides, or multiple dice using d20 syntax. Default value is 10',
	process: (msg, suffix) => {
		if (suffix.split('d').length <= 1) {
			msg.channel.send(`${msg.author} rolled a ${d20.roll(suffix || '10')}`);
		}
		else if (suffix.split('d').length > 1) {
			var eachDie = suffix.split("+");
			var passing = 0;
			for (var i = 0; i < eachDie.length; i++) {
				if (eachDie[i].split('d')[0] < 50) {
					passing += 1;
				};
			}

			var response;

			if (passing == eachDie.length) {
				response = `${msg.author} rolled a ${d20.roll(suffix)}`;
			} else {
				response = `${msg.author} tried to roll too many dice at once!`;
			}

			msg.channel.send({
				embed: {
					color: GReYBot.Config.defaultEmbedColor,
					description: `${response}`
				}
			});
		}
	}
}
