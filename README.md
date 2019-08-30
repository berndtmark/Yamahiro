# Yamahiro
Yamahiro is a bot that notifies you on file directory changes

1) Create bot in Telegram using the BotFather, just speak to him its very easy _(see https://core.telegram.org/bots)_
3) Optional: Add your bot to a channel
2) Setup config

## Config setting
#### "token"
- Get from the BotFather 

#### "dir"
- Can be single "/mnt/mypath1" or array ["/mnt/mypath1", "/mnt/mypath2"]

#### "chatId"
- Id of the chat in which updates will be posted
- To get the chat id, send a message to the channel (or the bot directly if not using a channel)
- https://api.telegram.org/bot<YourBOTToken\>/getUpdates _(eg: https://api.telegram.org/bot12345:ABCDEFG/getUpdates)_ will return the chatid(s)
