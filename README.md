
# Kirbi ![Kirbi!](/../util/kirbi_icon.png?raw=true)
A modular chat bot for Discord/Slack/& more to come.

[![license](https://img.shields.io/github/license/richardson-media-house/kirbi.svg?style=flat-square&colorB=00aaff)](https://github.com/richardson-media-house/kirbi) [![Backlog](https://img.shields.io/waffle/label/richardson-media-house/kirbi/backlog.svg?style=flat-square)](https://waffle.io/richardson-media-house/kirbi) [![Issues Accepted](https://img.shields.io/waffle/label/richardson-media-house/kirbi/accepted.svg?style=flat-square&label=issues%20accepted&colorB=00aaff)](https://waffle.io/richardson-media-house/kirbi) [![Issues in Progress](https://img.shields.io/waffle/label/richardson-media-house/kirbi/in-progress.svg?style=flat-square&label=issues%20in%20progress)](http://waffle.io/richardson-media-house/kirbi) [![Build Status](https://img.shields.io/travis/Richardson-Media-House/Kirbi.svg?style=flat-square)](https://github.com/richardson-media-house/kirbi) [![XO code style](https://img.shields.io/badge/code_style-XO-000000.svg?style=flat-square)](https://github.com/sindresorhus/xo)

Invite the bot to your server: [here](https://discordapp.com/oauth2/authorize?client_id=345207331295854593&scope=bot&permissions=66186303).

# Modules

Kirbi absorbs the functionality of whatever you add to him! We've included a few base features to help with your modules, which we will describe below.

Modules for Kirbi can add commands or other functionality. For example, the [kirbi-beer-lookup](https://github.com/Richardson-Media-House/kirbi-beer-lookup) module adds the !brew command which returns information on breweries and specific brews!

## Using Modules

Modules can be autoloaded from either a single file in `./modules/module-name.js` or an NPM module/Github repo named `kirbi-module-name`.

To autoload a module, add the plugin name to the `externalModules` (or the `modules` array under the appropriate api name for an api-specific module) array in `config/config.json` (without the `kirbi-`):

```json
{
	...
	"externalModules": ["beer-lookup", "xkcd", "urbandictionary"],
	"discord": {
		"modules": ["musicplayer", "moderation"],
		...
	}
}
```

and make sure to include any external modules as dependencies in the `package.json` file:

```json
{
  ...
	"dependencies": {
		"kirbi-beer-lookup": "Richardson-Media-House/kirbi-beer-lookup",
		"kirbi-urbandictionary": "Richardson-Media-House/kirbi-urbandictionary",
		"kirbi-xkcd": "Richardson-Media-House/kirbi-xkcd"
		...
 	},
  ...
}
```

## Official Modules
List of external modules for you to include with your installation (if you wish):

*API-Specific Modules*
- [slack](https://github.com/Richardson-Media-House/kirbi-slack) => adds Slack support to Kirbi
- [discord](https://github.com/Richardson-Media-House/kirbi-discord) => adds Discord support to Kirbi
- [discord-moderation](https://github.com/Richardson-Media-House/kirbi-discord-moderation) => adds a collection of Discord-specific moderation commands
- [discord-musicplayer](https://github.com/Richardson-Media-House/kirbi-discord-musicplayer) => adds commands to play music in voice channels

*General Modules*
- [xkcd](https://github.com/Richardson-Media-House/kirbi-xkcd) => adds the !xkcd command
- [wikipedia](https://github.com/Richardson-Media-House/kirbi-wikipedia) => adds the !wiki command
- [urbandictionary](https://github.com/Richardson-Media-House/kirbi-urbandictionary) => adds the !urban command
- [random](https://github.com/Richardson-Media-House/kirbi-random) => adds a bunch of random fact commands and fun stuff
- [dictionary](https://github.com/Richardson-Media-House/kirbi-dictionary) => adds the !define command
- [dice](https://github.com/Richardson-Media-House/kirbi-dice) => adds the !roll command
- [cocktail-lookup](https://github.com/Richardson-Media-House/kirbi-cocktail-lookup) => adds the !cocktail command
- [beer-lookup](https://github.com/Richardson-Media-House/kirbi-beer-lookup) => adds the !brew command
- [translator](https://github.com/Richardson-Media-House/kirbi-translator) => adds translation commands
- [rss](https://github.com/Richardson-Media-House/kirbi-rss) => adds rss feed related commands
- [misc](https://github.com/Richardson-Media-House/kirbi-misc) => adds misc commands that don't fall into other categories

## Writing Modules
To write a Kirbi module, create a new NPM module that exports an array named `commands` of triggers your bot will respond to. You can use a simple callback to display your message in both Slack and Discord, depending on the features you added:

```js
module.exports = (Kirbi) => {
	return {
		commands: [
			'hello'
		],
		hello: {
			description: 'responds with hello!',
			process: (msg, suffix, isEdit, cb) => { cb('hello!', msg); }
		}
	};
};
```

If you think your plugin is amazing, please let us know! We'd love to add it to our list. Currently, the bot is configured to work with external repositories with the `kirbi-` prefix, and we'd like to keep that for the official modules that our team makes :)

# Installation

Written in Node.JS.

1. Clone the repo.
2. Run `npm install` in the repo directory.

For music playback, you will need [ffmpeg](https://www.ffmpeg.org/download.html) installed and in your path variables.

## Customization
The examples directory contains example files for the configs, as well as some example commands, rss feeds, and more! These files need to be renamed, without the .example extension, and placed in the `/config/` folder.

# Running
Before first run you will need to create an `auth.json` file. A bot token is required. The other credentials are not required for the bot to run, but highly recommended as commands that depend on them will malfunction. See `auth.json.example`.

To start the bot just run
`node start`.

# Updates
If you update the bot, please run `npm update` before starting it again. If you have
issues with this, you can try deleting your node_modules folder and then running
`npm install` again. Please see [Installation](#Installation).

# To Do:
Check out our our [status page](https://waffle.io/richardson-media-house/kirbi).

[![Backlog](https://img.shields.io/waffle/label/richardson-media-house/kirbi/backlog.svg?style=flat-square)](https://waffle.io/richardson-media-house/kirbi) [![Issues Accepted](https://img.shields.io/waffle/label/richardson-media-house/kirbi/accepted.svg?style=flat-square&label=issues%20accepted&colorB=00aaff)](https://waffle.io/richardson-media-house/kirbi) [![Issues in Progress](https://img.shields.io/waffle/label/richardson-media-house/kirbi/in-progress.svg?style=flat-square&label=issues%20in%20progress)](http://waffle.io/richardson-media-house/kirbi)

# Help
If you need help join us on [discord](https://discord.gg/A8a2yeP).

[![Discord](https://img.shields.io/discord/294483428651302924.svg?style=flat-square)](https://discord.gg/A8a2yeP)
