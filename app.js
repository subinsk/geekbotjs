require('dotenv').config()
var fs = require('fs');
const settings = require('./settings.json')
const keepAlive=require('./server')
const Discord = require('discord.js')
const Levels = require('./discordXP')

Levels.setURL(process.env.URI);

// Bot login
const bot = new Discord.Client();
bot.login(process.env.DISCORD_TOKEN)


if (
  process.env.LD_LIBRARY_PATH == null ||
  !process.env.LD_LIBRARY_PATH.includes(
    `${process.env.PWD}/node_modules/canvas/build/Release:`,
  )
) {
  process.env.LD_LIBRARY_PATH = `${
    process.env.PWD
  }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ''}`;
}


// Loading bot commands
bot.commands = new Discord.Collection();
bot.events = new Discord.Collection();

['commandHandler', 'eventHandler'].forEach(handler => {
  require(`./handlers/${handler}`)(bot, Discord, Levels);
})

keepAlive()
