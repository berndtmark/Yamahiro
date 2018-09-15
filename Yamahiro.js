const Slimbot = require('slimbot');
const chokidar = require('chokidar');
const path = require("path");
const config = require("./config.json");

const slimbot = new Slimbot(config.token);

let initFileWatcher = () => {
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
            slimbot.sendMessage(config.chatId, message);
        });
}

let startUp = () => {
    console.log(`Connected!`);
    initFileWatcher();
}

startUp();
slimbot.startPolling();