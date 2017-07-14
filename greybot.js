var fs = require('fs');

try {
    var Discord = require("discord.js");
} catch (e) {
    console.log(e.stack);
    console.log(process.version);
    console.log("Please run npm install and ensure it passes with no errors!");
    process.exit();
}

console.log(`Starting DiscordBot\nNode version: ${process.version}\nDiscord.js version: ${Discord.version}`);

require('./lib/config');

global.GReYBot = new Discord.Client();

require('./lib/extensions');
require('./lib/onEvent');
require('./lib/login');