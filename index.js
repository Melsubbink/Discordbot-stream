const discord = require('discord.js');
const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const bot = new Discord.Client({disableEveryone: true});

// When bot is ready:
bot.on("ready", async () => {
  console.log(`${bot.user.username} is ready for action!`);
  bot.user.setActivity(`Streambot | ${config.prefix}help`, {type: 'LISTENING'}); //PLAYING, WATCHING, STREAMING, LISTENING
});

bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles.lenght <= 0) return console.log("There are commands to load...");

  console.log(`Loading ${jsfiles.lenght} commands...`);

  jsfiles.forEach((f, i) => {

    let props = require(`./commands/${f}`);
    console.log(`${i + 1}: ${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);

  if(!command.startsWith(prefix)) return;
  let cmd = bot.commands.get(command.slice(prefix.length))

  if(cmd) cmd.run(bot, message, args)
});

bot.login(config.token);
