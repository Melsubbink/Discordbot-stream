const discord = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (bot, message, args) => {

  const help = fs.readFileSync("./help.txt", "utf8");

  let bicon = bot.user.displayAvatarURL;

  let helpEmbed = new Discord.MessageEmbed()

  .setColor("#00ffc3")
  .setTitle("**__Help__**")
  // .setThumbnail(bicon)
  .setDescription(help)
  .setTimestamp()
  .setFooter("© Copyright Mels Ubbink | All Rights Served.")

  message.channel.send(helpEmbed);

  message.delete();

};

module.exports.help = {
  name: "help"
};
