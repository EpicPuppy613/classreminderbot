const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const prefix = "r!";
const helpEmbed = new Discord.MessageEmbed()
.setColor("#FF8518")
.setTitle("Class Reminder Bot Help")
.addField("r!help", "Shows this page.", true)
.addField("r!ping", "Will test bot latency.", true)
.setFooter("I automatically ping everyone when classes are starting")
.setThumbnail("/clock.png");
var CronJob = require('cron').CronJob;

var bot = new Discord.Client({
   token: config.BOT_TOKEN,
   autorun: true
});

function P1() {
	var guild = client.guilds.cache.get('731961855349620817');
	if(guild && guild.channels.cache.get('775506947637641217')){
		guild.channels.cache.get('775506947637641217').send("@everyone Period 1 (Student Connections) starts in 5 minutes.");
		console.log("Period 1 triggered")
	} else {
		console.log("Period 1 was not able to trigger.")
	}
};

client.on("message", function(message, channelID) { 
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();
	if (command === "ping") {
		console.log("Command ping by: " + message.author.username);
		const timeTaken = Date.now() - message.createdTimestamp + 50;
		message.channel.send("Pong!\nLatency: `" + timeTaken + "ms`"); 
    }   
	if (command === "help") {
		console.log("Command help by: " + message.author.username);
		message.channel.send(helpEmbed)
	}
	if (command === "hi") {
		console.log("Command hi by: " + message.author.username);
		message.reply("Hello!")
	}
});   

var Per1 = new CronJob('0 55 8 * * 1-2,4-5', P1(), null, true, 'America/Los_Angeles');

Per1.start();

client.login(config.BOT_TOKEN);

console.log("Logged In.");