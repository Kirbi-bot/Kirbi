const GReYBot = require('../../greybot');

GReYBot.Discord.on('disconnected', function() {
    console.log('Disconnected!');
    process.exit(1); //exit node.js with an error
});