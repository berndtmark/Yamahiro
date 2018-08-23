
const discord = require('discord.js');
const chokidar = require('chokidar');
const path = require("path");
const config = require("./config.json");
  
const client = new discord.Client();

client.on('ready', () => {
    console.log(`Connected!`);
    init();
});

client.on('error', (e) => console.error(`Discord error: ${e}`));
client.on('warn', (e) => console.warn(`Discord warning: ${e}`));

let init = () => {
    let channel = client.channels.find("name", config.channelName);
    fileWatcher(channel);
}

let fileWatcher = (channel) => {
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
            channel.send(message);
        });
}
    
client.login(config.token);