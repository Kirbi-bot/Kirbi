![Kirbi!](/../util/kirbi_icon.png?raw=true)
# Kirbi
A modular chat bot for Discord, using [discord.js](https://github.com/hydrabolt/discord.js/)

[![license](https://img.shields.io/github/license/richardson-media-house/kirbi.svg?style=flat-square&colorB=00aaff)](https://github.com/richardson-media-house/kirbi) [![Issues Open](https://img.shields.io/github/issues-raw/richardson-media-house/kirbi.svg?style=flat-square&label=issues%20open&colorB=ff0000)](https://waffle.io/richardson-media-house/kirbi) [![Issues Accepted](https://img.shields.io/github/issues-raw/richardson-media-house/kirbi/accepted.svg?style=flat-square&label=issues%20reviewed&colorB=00aaff)](https://waffle.io/richardson-media-house/kirbi) [![Issues in Progress](https://img.shields.io/github/issues-raw/richardson-media-house/kirbi/in-progress.svg?style=flat-square&label=issues%20in%20progress&colorB=0000ff)](http://waffle.io/richardson-media-house/kirbi) [![Issues Ready](https://img.shields.io/github/issues-raw/richardson-media-house/kirbi/ready-for-review.svg?style=flat-square&label=issues%20ready&colorB=ff00aa)](http://waffle.io/richardson-media-house/kirbi)

Invite the bot to your server [here](https://discordapp.com/oauth2/authorize?client_id=345207331295854593&scope=bot&permissions=66186303).

# Features:

- @botname => responds when @mentioned

- !brew *query* => returns a summary of a specific beer or brewery

- !roll 1d20 => roll for initiative! Or something else, using whatever combo of dice.

- !unshorten *shortlink* => unshorten a shortened link, so you can see if it's shady or not.

- !lmgtfy *query* => googles something for an idiot!

- !say *text* => echos text

- !cat_fact

- !dog_fact

- !bacon gifs!

- !smifffact => facts about Will Smith!

- !gitgud *optional @mention* => tell someone to get gud!

- ask the magic !8ball stuff!

- !choose *optional number of items, comma separated* => ask the bot to decide things for you!

- !wiki *query* => returns the summary of the first search result on Wikipedia

- !urban *query* => returns result from Urban Dictionary

- !xkcd *optional comic number*

- !topic => passive-aggressively remind your users of the channel topic!

Commands requiring permissions
- !prune *optional number* => prunes a number of messages from the channel.

MUSIC!
- !play most audio sources
- !skip songs
- !queue and !dequeue songs
- !pause !resume and adjust the !volume

And more! Try !help to get a full list of available commands

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
