
if (GReYBotAuth.bot_token) {
    console.log('Logging in with token...');
    GReYBot.login(GReYBotAuth.bot_token);
} else {
    console.log('GReYBot must have a bot token...');
}