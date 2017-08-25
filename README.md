
# Kirbi ![Kirbi!](/../util/kirbi_icon.png?raw=true)
A modular chat bot for Discord/Slack/& more to come.

[![license](https://img.shields.io/github/license/richardson-media-house/kirbi.svg?style=flat-square&colorB=00aaff)](https://github.com/richardson-media-house/kirbi) [![Issues Open](https://img.shields.io/github/issues-raw/richardson-media-house/kirbi.svg?style=flat-square&label=issues%20open&colorB=ff0000)](https://waffle.io/richardson-media-house/kirbi) [![Issues Accepted](https://img.shields.io/github/issues-raw/richardson-media-house/kirbi/accepted.svg?style=flat-square&label=issues%20reviewed&colorB=00aaff)](https://waffle.io/richardson-media-house/kirbi) [![Issues in Progress](https://img.shields.io/github/issues-raw/richardson-media-house/kirbi/in-progress.svg?style=flat-square&label=issues%20in%20progress&colorB=0000ff)](http://waffle.io/richardson-media-house/kirbi) [![Issues Ready](https://img.shields.io/github/issues-raw/richardson-media-house/kirbi/ready-for-review.svg?style=flat-square&label=issues%20ready&colorB=ff00aa)](http://waffle.io/richardson-media-house/kirbi)

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
	"externalModules": ["beer-lookup", "xkcd", "urbandictionary", "wikipedia", "cocktail-lookup", "dice", "dictionary", "misc", "random", "translator", "rss"],
	"elizaEnabled": true,
	"discord": {
		"enabled": true,
		"serverName": "insert your server name",
		"welcomeChannel": "insert channel id of channel where you want welcome to be",
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
		"chalk": "^2.0.1",
		"kirbi-beer-lookup": "Richardson-Media-House/kirbi-beer-lookup",
		"kirbi-cocktail-lookup": "Richardson-Media-House/kirbi-cocktail-lookup",
		"kirbi-dice": "Richardson-Media-House/kirbi-dice",
		"kirbi-dictionary": "Richardson-Media-House/kirbi-dictionary",
		"kirbi-discord": "Richardson-Media-House/kirbi-discord",
		"kirbi-discord-moderation": "Richardson-Media-House/kirbi-discord-moderation",
		"kirbi-discord-musicplayer": "Richardson-Media-House/kirbi-discord-musicplayer",
		"kirbi-misc": "Richardson-Media-House/kirbi-misc",
		"kirbi-urbandictionary": "Richardson-Media-House/kirbi-urbandictionary",
		"kirbi-random": "Richardson-Media-House/kirbi-random",
		"kirbi-rss": "Richardson-Media-House/kirbi-rss",
		"kirbi-translator": "Richardson-Media-House/kirbi-translator",
		"kirbi-wikipedia": "Richardson-Media-House/kirbi-wikipedia",
		"kirbi-xkcd": "Richardson-Media-House/kirbi-xkcd"
 	},
  ...
}
```


## Included Modules
List of available modules (via `./modules/module-name`):

*Modules for use when self-hosting*
- `admin` => adds a few administrative commands for server owners and bot admins to use.
- `server` => lists out a given list of servers and information about them.
- `welcome` => spits out a given markdown file in a pretty embed format. Useful for making a welcome/rules channel look better than if you typed it yourself.

The commands in these modules are not available on the invited version of the bot, as they are for GReY and administering the bot itself :)

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
To write a Kirbi module, create a new NPM module that exports an array named `commands` of triggers your bot will respond to. You can use a simple callback to display your message in either slack or discord (or both), depending on the features you added:

```js
exports.commands = [
	'hello'
]

exports.hello = {
	description: 'responds with hello!',
	process: (msg, suffix, isEdit, cb) => { cb('hello!', msg); }
}
```

If you think your plugin is amazing, please let us know! We'd love to add it to our list. Currently, the bot is configured to work with external repositories with the `kirbi-` prefix, and we'd like to keep that for the official modules that our team makes :)

# Installation

Written in Node.JS.

0. Install prereqs, see below for your OS.
1. Clone the repo.
2. Run `npm install` in the repo directory.

For music playback, you will need [ffmpeg](https://www.ffmpeg.org/download.html) installed and in your path variables.

## Prereqs:

### On Unix

   * `python` (`v2.7` recommended, `v3.x.x` is __*not*__ supported)
   * `make`
   * A proper C/C++ compiler toolchain, like [GCC](https://gcc.gnu.org)
   * `npm install -g node-gyp`

### On Mac OS X

   * `python` (`v2.7` recommended, `v3.x.x` is __*not*__ supported) (already installed on Mac OS X)
   * [Xcode](https://developer.apple.com/xcode/download/)
     * You also need to install the `Command Line Tools` via Xcode. You can find this under the menu `Xcode -> Preferences -> Downloads`
     * This step will install `gcc` and the related toolchain containing `make`
   * `npm install -g node-gyp`

### On Windows

#### Option 1

Install all the required tools and configurations using Microsoft's [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools) using `npm install --global --production windows-build-tools` from an elevated PowerShell or CMD.exe (run as Administrator).

#### Option 2

Install tools and configuration manually:
   * Visual C++ Build Environment:
     * Option 1: Install [Visual C++ Build Tools](http://landinghub.visualstudio.com/visual-cpp-build-tools) using the **Default Install** option.

     * Option 2: Install [Visual Studio 2015](https://www.visualstudio.com/products/visual-studio-community-vs) (or modify an existing installation) and select *Common Tools for Visual C++* during setup. This also works with the free Community and Express for Desktop editions.

     > :bulb: [Windows Vista / 7 only] requires [.NET Framework 4.5.1](http://www.microsoft.com/en-us/download/details.aspx?id=40773)

   * Install [Python 2.7](https://www.python.org/downloads/) (`v3.x.x` is not supported), and run `npm config set python python2.7` (or see below for further instructions on specifying the proper Python version and path.)
   * Launch cmd, `npm config set msvs_version 2015`

   If the above steps didn't work for you, please visit [Microsoft's Node.js Guidelines for Windows](https://github.com/Microsoft/nodejs-guidelines/blob/master/windows-environment.md#compiling-native-addon-modules) for additional tips.

### Then, install node-gyp using `npm install -g node-gyp`

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

[![Issues Open](https://img.shields.io/github/issues-raw/richardson-media-house/kirbi.svg?style=flat-square&label=issues%20open&colorB=ff0000)](https://waffle.io/richardson-media-house/kirbi) [![Issues Accepted](https://img.shields.io/github/issues-raw/richardson-media-house/kirbi/accepted.svg?style=flat-square&label=issues%20reviewed&colorB=00aaff)](https://waffle.io/richardson-media-house/kirbi) [![Issues in Progress](https://img.shields.io/github/issues-raw/richardson-media-house/kirbi/in-progress.svg?style=flat-square&label=issues%20in%20progress&colorB=0000ff)](http://waffle.io/richardson-media-house/kirbi)

# Help
If you need help join us on [discord](https://discord.gg/A8a2yeP).

[![Discord](https://img.shields.io/discord/294483428651302924.svg?style=flat-square)](https://discord.gg/A8a2yeP)
