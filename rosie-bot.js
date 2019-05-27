const tmi = require('tmi.js');
require('dotenv').config();

const diceCommand = require('./commands/command-dice');
const rosieCommand = require('./commands/command-rosie');
const CommandsCommand = require('./commands/command-commands');
const sfxCommand = require('./commands/command-sfx');
const socialCommand = require('./commands/command-social');
const lightCommand = require('./commands/command-light');
const uptimeCommand = require('./commands/command-uptime');
const lurkCommand = require('./commands/command-lurk')
const hypeCommand = require('./commands/command-hype');
const soCommand = require('./commands/command-so');
const infoCommand = require('./commands/command-info');
const spotifyCommand = require('./commands/command-spotify');
const beerCommand = require('./commands/command-beer');
const projectCommand = require('./commands/command-project');
const themeCommand = require('./commands/command-theme');

const emotesEvent = require('./events/event-emotes');
const newFollowerEvent = require('./events/event-new-follower');
const QnAEvent = require('./events/event-QnA');


const opts = {
    identity: {
        username: process.env.TWITCH_USERNAME,
        password: process.env.TWITCH_PASSWORD
    },
    channels: [
        process.env.TWITCH_CHANNEL
    ]
};

const client = new tmi.client(opts);

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect()
    .then((data) => {
        // data returns [server, port]
        console.log('connected!');
    }).catch((err) => {
        console.log(err);
    });;

const commands = {
    '!dice': diceCommand,
    '!rosie': rosieCommand,
    '!commands': CommandsCommand,
    '!hype': hypeCommand,
    '!lurk': lurkCommand,

    '!doh': sfxCommand.sfxDoh,
    '!bingit': sfxCommand.sfxBingit,
    '!fup': sfxCommand.sfxFup,
    '!badumts': sfxCommand.sfxBadumts,
    '!allright': sfxCommand.sfxAllright,
    '!duhduh': sfxCommand.sfxDuhDuhDuuuh,
    '!bye': sfxCommand.sfxBye,
    '!justdoit': sfxCommand.sfxJustDoIt,
    '!dundun': sfxCommand.sfxDunDun,
    '!headshot': sfxCommand.sfxHeadshot,
    '!drumroll': sfxCommand.sfxDrumroll,
    '!inception': sfxCommand.sfxInception,
    '!mclevelup': sfxCommand.sfxMCLevelUp,
    '!mcvillager': sfxCommand.sfxMCVillager,
    '!1up': sfxCommand.sfxMario1up,
    '!finishhim': sfxCommand.sfxFinishHim,
    '!doitlive': sfxCommand.sfxDoItlive,
    '!applause': sfxCommand.sfxApplause,
    '!airhorn': sfxCommand.sfxAirhorn,
    '!laugh': sfxCommand.sfxLaugh,
    '!dingdong': sfxCommand.sfxDingDong,
    '!sonic': sfxCommand.sfxSonic,
    '!inconceivable': sfxCommand.sfxInconceivable,

    '!twitter': socialCommand.socialTwitter,
    '!youtube': socialCommand.socialYoutube,
    '!discord': socialCommand.socialDiscord,
    '!git': socialCommand.socialGit,
    '!insta': socialCommand.socialInsta,
    '!merch': socialCommand.socialMerch,

    '!light': lightCommand,
    '!uptime': uptimeCommand,
    '!so': soCommand,

    '!ide': infoCommand.infoIde,

    '!song': spotifyCommand.spotifySong,

    '!beer': beerCommand,
    '!project': projectCommand,
    '!theme':themeCommand

}


async function onMessageHandler(target, context, msg, self) {
    if (!!context.emotes) {
        emotesEvent(context.emotes);
    }
    if (self) {
        return;
    } // Ignore messages from the bot
    if (msg.trim().endsWith("?")) {
        msg = await QnAEvent(client, target, msg);
    };

    handleBangCommand(msg, target, context);
}

function handleBangCommand(msg, target, context) {
    const chatMessage = msg.trim();
    const splitCommand = chatMessage.split(/\s/gi);
    const command = splitCommand[0].toLowerCase();
    if (commands.hasOwnProperty(command)) {
        commands[command](client, target, context, ...splitCommand.splice(1));
    }
}

function onConnectedHandler(addr, port) {

    newFollowerEvent(client, process.env.TWITCH_CHANNEL);

    console.log(`* Connected to ${addr}:${port}`);
}