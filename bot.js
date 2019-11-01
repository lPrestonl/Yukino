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

/////////////
//Music Bot//
/////////////

client.music = require("discord.js-musicbot-addon");

client.music.start(client, {
  // Set the api key used for YouTube.

  youtubeKey: "AIzaSyDc-rweW1o3GVlKjsTRtdR8daaeonS078w",

  // The PLAY command Object.
  play: {
    // Usage text for the help command.
    usage: "{{prefix}}play some tunes",
    // Whether or not to exclude the command from the help command.
    exclude: false
  },

  // Make it so anyone in the voice channel can skip the
  // currently playing song.
  anyoneCanSkip: false,

  // Make it so the owner (you) bypass permissions for music.
  ownerOverMember: true,
  ownerID: "143085965248823296",
	botPrefix: config.prefix,

  // The cooldown Object.
  cooldown: {
    // This disables the cooldown. Not recommended.
    enabled: false
  }
});

//////////////////
//Finish Loading//
//////////////////

client.on("ready", () => {
  console.log("I am ready!");
	console.log('Bot: Hosting ' + `${client.users.size}` + ' users, in ' + `${client.channels.size}` + ' channels of ' + `${client.guilds.size}` + ' guilds.');
    client.user.setStatus('online')
    client.user.setPresence({
        game: {
            name: `Use ${config.prefix}help`,
            type: "Playing",
            url: "https://discordapp.com/"
        }
    });

});

//////////////////
//Basic Commands//
//////////////////

client.on("message", (message) => {
//!help
  if (message.content.startsWith(config.prefix + "help")) {
    const helpEmbed = new Discord.RichEmbed()
	   .setColor('#0099ff')
	   .setTitle('Help')
	   .setDescription('Looks like you needed some help?')
	   .setThumbnail('https://i.imgur.com/cwhG0lZ.png')
     .addBlankField()
	   .addField('Music', '**!play** ` Queue a Song/Playlist by URL or Name` \n **!remove** `Remove a song from the queue by position in the queue` \n **!skip** `Skip a song or song with `' + config.prefix + '`skip [number]`')
	   .setTimestamp()
	   .setFooter('Yukino By Preston#1337', 'https://i.imgur.com/cwhG0lZ.png');

    message.author.send(helpEmbed);
  }

//about
if (message.content.startsWith(config.prefix + "about")) {
  let totalSeconds = (client.uptime / 1000);
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
	/*if ${days} == 0 {
		let uptime =
	}*/
  let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ` + Math.floor(seconds) + ` seconds`;

  const aboutEmbed = new Discord.RichEmbed()
   .setColor('#0099ff')
   .setTitle('About')
   .setImage('')
   .addField('Version', '0.0.1a', true)
   .addField('Discord', `[Hf8arY4](https://discord.gg/Hf8arY4)`, true)
   .addField('Bot Invite', '[Click Me!](https://discordapp.com/api/oauth2/authorize?client_id=637818370670067712&scope=bot&permissions=8)', true)
	 .addField('Creator', 'Preston#1337', true)
	 .addField('Servers', + client.guilds.size, true)
	 .addField('Ping', + Math.round(client.ping) + " ms", true)
   .setTimestamp()
   .setFooter(`${uptime}`, 'https://i.imgur.com/cwhG0lZ.png');
  message.channel.send(aboutEmbed);
}

//Invite Command
if (message.content.startsWith(config.prefix + "invite")) {
	const inviteEmbed = new Discord.RichEmbed()
	.setColor('#0099ff')
	.setTitle('About')
	.addField('Bot Invite', '[Click Me!](https://discordapp.com/api/oauth2/authorize?client_id=637818370670067712&scope=bot&permissions=8)', true)
	.setTimestamp()
	.setFooter('Yukino Made By Preston#1337', 'https://i.imgur.com/cwhG0lZ.png');
  message.channel.send(inviteEmbed);
}

///////////////////
//Custom Commands//
///////////////////

//!snow
if (message.content.startsWith(config.prefix + "snow")) {
  const snowEmbed = new Discord.RichEmbed()
   .setColor('#ff0000')
   .setTitle('Snow is a retard')
   .setImage('http://m.quickmeme.com/img/10/10e71fd6edca008ff7ab182e9c428ea756412398815dbeec35f25092e913ed2c.jpg')
   .setTimestamp()
   .setFooter('Yukino Made By Preston#1337', 'https://i.imgur.com/cwhG0lZ.png');

  message.channel.send(snowEmbed);
  console.log("Snow is definitely a retard!");
}

//brendy
if (message.content.startsWith(config.prefix + "brendy")) {
  message.channel.send("<@217737636977180672> <:brendy:638228731801894942>");
}

});



client.login(config.token);
