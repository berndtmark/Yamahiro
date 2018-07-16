
const discord = require('discord.js');
const chokidar = require('chokidar');
const path = require("path");
const config = require("./config.json");
  
const client = new discord.Client();
const logger = console.log.bind(console);
  
client.on('ready', () => {
    log(`Bot Connected.`);
    
    let channel = client.channels.find("name", config.channelName);
    fileWatcher(channel);
});

let fileWatcher = (channel) => {
    const watcher = chokidar.watch(config.dir, {
        ignored: /[\/\\]\./, persistent: true, ignoreInitial: true
    });

    watcher
        .on('ready', () => { 
            log('Initial scan complete. Ready for changes.');
        })
        .on('error', error => { 
            log(`Error occured - ', ${error}`);
        })
        .on('add', file => { 
            let message = `${path.basename(file)}`;
            channel.send(message);
        });
}

let log = (message) => {
    let date = new Date();
    logger(`${date}: ${message}`);
}
    
client.login(config.token);