const Kirbi = require('../kirbi');

function Permissions() {
	var permissions = {};

	try {
		permissions = require('../config/permissions.json');
	} catch (e) {
		permissions.commands = {};
	}

	permissions.checkPermission = function (guildId, command) {
		try {
			var allowed = true;
			try {
				if (permissions.commands) {
					if (permissions.commands.hasOwnProperty(command)) {
						allowed = false;
						if (permissions.commands[command].includes(guildId)) {
							allowed = true;
						}
					}
				}
			} catch (err) { console.log(err); }
			return allowed;
		} catch (e) { }
		return false;
	}

	return permissions;
}

Kirbi.Permissions = Permissions();