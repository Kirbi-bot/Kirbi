var fs = require('fs');
var path = require('path');

global.GReyBotCommands = {};

GReYBot.addCommand = function(commandName, commandObject) {
    try {
        GReyBotCommands[commandName] = commandObject;
    } catch (err) {
        console.log(err);
    }
}
GReYBot.commandCount = function() {
    return Object.keys(GReyBotCommands).length;
}
GReYBot.getFileArray = function(srcPath) {
	srcPath = path.join(path.dirname(require.main.filename), srcPath);
    return fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isFile());
}
GReYBot.getFileContents = function(filePath) {
	return require('fs').readFileSync(path.join(path.dirname(require.main.filename), filePath), 'utf-8');
}
GReYBot.getJsonObject = function(filePath) {
	return JSON.parse(GReYBot.getFileContents(filePath));
}
GReYBot.require = function(filePath){
	return require(path.join(path.dirname(require.main.filename), filePath));
}