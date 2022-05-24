const { Client } = require('discord.js-selfbot-v11'),
    Enmap = require('enmap'),
    fs = require('fs');

const RPC = require('./rpcModule'),
    rpc = new RPC()

const client = new Client(), { token, prefix } = require('./config.json')

client.commands = new Enmap();
require('colors_express')

process.on('unhandledRejection', e => {});
process.on('uncaughtException', e => {});
process.on('uncaughtRejection', e => {});
process.warn = () => {};

client.on("error", (e) => {});
client.on("warn", (e) => {});

function nullReturn() {
    return
}

(async function() {
    console.clear()
    process.title = '[Midnight] Loading...'
    console.log(`

    ██╗      ██████╗  █████╗ ██████╗ ██╗███╗   ██╗ ██████╗ 
    ██║     ██╔═══██╗██╔══██╗██╔══██╗██║████╗  ██║██╔════╝ 
    ██║     ██║   ██║███████║██║  ██║██║██╔██╗ ██║██║  ███╗
    ██║     ██║   ██║██╔══██║██║  ██║██║██║╚██╗██║██║   ██║
    ███████╗╚██████╔╝██║  ██║██████╔╝██║██║ ╚████║╚██████╔╝
    ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
                                                        `.yellow);

    client.on('ready', async() => {
        console.clear()
        rpc.run()
        process.title = `[Midnight] Connected in ${client.user.username}`
        console.log(`
                              aaaaaaaaaaaaaaaa               *
                          aaaaaaaaaaaaaaaaaaaaaaaa
                       aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                     aaaaaaaaaaaaaaaaa           aaaaaa
                   aaaaaaaaaaaaaaaa                  aaaa
                  aaaaaaaaaaaaa aa                      
 *               aaaaaaaa      aa                         github.com/d1ekaue
                 aaaaaaa aa aaaa        ███╗   ███╗██╗██████╗ ███╗   ██╗██╗ ██████╗ ██╗  ██╗████████╗
           *    aaaaaaaaa     aaa       ████╗ ████║██║██╔══██╗████╗  ██║██║██╔════╝ ██║  ██║╚══██╔══╝
                aaaaaaaaaaa aaaaaaa     ██╔████╔██║██║██║  ██║██╔██╗ ██║██║██║  ███╗███████║   ██║      *
                aaaaaaa    aaaaaaaaaa   ██║╚██╔╝██║██║██║  ██║██║╚██╗██║██║██║   ██║██╔══██║   ██║ 
                aaaaaa a aaaaaa aaaaaa  ██║ ╚═╝ ██║██║██████╔╝██║ ╚████║██║╚██████╔╝██║  ██║   ██║
                 aaaaaaa  aaaaaaa       ╚═╝     ╚═╝╚═╝╚═════╝ ╚═╝  ╚═══╝╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝
                 aaaaaaaa                                 Prefix '${prefix}' | Moon: ${client.user.username}
                  aaaaaaaaaa                            
                   aaaaaaaaaaaaaaaa                  aaaa
                     aaaaaaaaaaaaaaaaa           aaaaaa        *
       *               aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                          aaaaaaaaaaaaaaaaaaaaaaaa
                       *      aaaaaaaaaaaaaaaa
        `.brightMagenta)
        console.log(`
                         ${prefix}die       ownz the server
            ┬ ┬┌─┐┬  ┌─┐ ${prefix}banall    ban all souls
            ├─┤├┤ │  ├─┘ ${prefix}chn       create reaper channels
            ┴ ┴└─┘┴─┘┴   ${prefix}everyone  raid everyone ping
                         ${prefix}prune     purge inactive members
        `.italic.bold)
    })
	

    fs.readdir("./commands/", (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            let props = require(`./commands/${file}`);
            let commandName = file.split(".")[0];
            client.commands.set(commandName, props);
        });
    });

    client.on('message', async(msg) => {
        if (msg.content.indexOf(prefix) !== 0) return;

        const args = msg.content.slice(prefix.length).trim().split(/ +/g),
            command = args.shift().toLowerCase(),
            cmd = client.commands.get(command);

        if (msg.author.id !== client.user.id) return;
        cmd ? cmd.run(client, msg, args) : nullReturn()
    })

    client.login(token).catch(() => {
        console.log(` 
         ██████████                                       
        ░░███░░░░░█                                       
         ░███  █ ░  ████████  ████████   ██████  ████████ 
         ░██████   ░░███░░███░░███░░███ ███░░███░░███░░███
         ░███░░█    ░███ ░░░  ░███ ░░░ ░███ ░███ ░███ ░░░ 
         ░███ ░   █ ░███      ░███     ░███ ░███ ░███     
         ██████████ █████     █████    ░░██████  █████    
        ░░░░░░░░░░ ░░░░░     ░░░░░      ░░░░░░  ░░░░░     
                                                          
               verify the token on config.json                                      
        `.red.bold.italic);
    });
})();