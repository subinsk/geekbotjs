require('dotenv').config()
var fs = require('fs');
const settings = require('./settings.json')
const Discord = require('discord.js')
const Levels = require('./discordXP')

const levels = Levels.setURL(process.env.URI);

// Bot login
const bot = new Discord.Client();
bot.login(process.env.DISCORD_TOKEN)



// Loading bot commands
bot.commands = new Discord.Collection();
bot.events=new Discord.Collection();

['commandHandler','eventHandler'].forEach(handler=>{
  require(`./handlers/${handler}`)(bot,Discord);
})

// bot.on("message", async (message) => {
//   if (!message.guild) return;
//   if (message.author.bot) return;

//   // Min 1, Max 30
//   // const randomAmountOfXp = Math.floor(Math.random() * 29) + 1;
//   const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
//   if (hasLeveledUp) {
//     const user = await Levels.fetch(message.author.id, message.guild.id);
//     message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`);
//   }
// });