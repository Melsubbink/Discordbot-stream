const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

  message.channel.send("pong!");

  message.delete();
};

module.exports.help = {
  name: "ping"
};
