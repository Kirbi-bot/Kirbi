const Kirbi = require('../../kirbi');

Kirbi.Discord.on('disconnected', function() {
    console.log('Disconnected!');
    process.exit(1); //exit node.js with an error
});