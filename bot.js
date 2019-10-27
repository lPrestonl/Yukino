const fs = require('fs');
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log("I am ready!");

});

client.on("message", (message) => {
//!help
  if (message.content.startsWith(config.prefix + "help")) {
    const helpEmbed = new Discord.RichEmbed()
	   .setColor('#0099ff')
	   .setTitle('Help')
	   .setDescription('Looks like you needed some help?')
	   .setThumbnail('https://i.imgur.com/cwhG0lZ.png')
     .addBlankField()
	   .addField('Music', '**!play** `URL or Song Name`')
	   .setTimestamp('2019-10-27T07:54:45.739Z')
	   .setFooter('Yukino By Preston#1337', 'https://i.imgur.com/cwhG0lZ.png');

    message.author.send(helpEmbed);
  }

//!snow
if (message.content.startsWith(config.prefix + "snow")) {
  const snowEmbed = new Discord.RichEmbed()
   .setColor('#ff0000')
   .setTitle('Snow is a retard')
   .setImage('http://m.quickmeme.com/img/10/10e71fd6edca008ff7ab182e9c428ea756412398815dbeec35f25092e913ed2c.jpg')
   .setTimestamp('2019-10-27T07:54:45.739Z')
   .setFooter('Yukino Made By Preston#1337', 'https://i.imgur.com/cwhG0lZ.png');

  message.channel.send(snowEmbed);
  console.log("Snow is definitely a retard!");
}
//about
if (message.content.startsWith(config.prefix + "about")) {
  let totalSeconds = (client.uptime / 1000);
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

  const aboutEmbed = new Discord.RichEmbed()
   .setColor('#0099ff')
   .setTitle('About')
   .setImage('')
   .addField('Version', '0.0.1', true)
   .addField('Creator', 'Preston#1337', true)
   .addField('Invite', 'https://shorturl.at/lpqDT', true)
   .addField('Discord', 'https://discord.gg/Hf8arY4', true)
   .addField('Uptime', uptime)
   .addField('Ping', + client.ping + " ms", true)
   .setTimestamp('2019-10-27T07:54:45.739Z')
   .setFooter('Yukino Made By Preston#1337', 'https://i.imgur.com/cwhG0lZ.png');
  message.channel.send(aboutEmbed);
}
});

client.login(config.token);
