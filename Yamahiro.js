// removes irrelevant warning
process.env.NTBA_FIX_319 = 1;

const telegramBot = require('node-telegram-bot-api');
const chokidar = require('chokidar');
const path = require("path");
const config = require("./config.json");

const bot = new telegramBot(config.token, {polling: true});

const watcher = chokidar.watch(config.dir, {
    ignored: /[\/\\]\./, persistent: true, ignoreInitial: true
});

watcher
    .on('ready', () => { 
        console.log('Initial scan complete.');
    })
    .on('error', error => { 
        console.warn(`File watch error: ', ${error}`);
    })
    .on('add', file => { 
        let message = `${path.basename(file)}`;
        bot.sendMessage(config.chatId, message);
    });

console.log(`Connected!`);