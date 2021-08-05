const Levels=require('../../discordXP')
module.exports = async (Discord,bot,message) => {
    const prefix = '>';
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = bot.commands.get(cmd);

    if (command) command.execute(bot, message, args, Discord);


    if (!message.guild) return;
    if (message.author.bot) return;

    // Min 1, Max 30
    const randomAmountOfXp = Math.floor(Math.random() * 29) + 1;
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`);
    }
}