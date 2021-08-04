module.exports = (Discord, bot, message,Levels) => {
    bot.on("message", async (message) => {
        if (!message.guild) return;
        if (message.author.bot) return;

        // Min 1, Max 30
        const randomAmountOfXp = Math.floor(Math.random() * 10) + 1;
        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
        if (hasLeveledUp) {
            const user = await Levels.fetch(message.author.id, message.guild.id);
            message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`);
        }
    });
}