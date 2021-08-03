module.exports = {
    name: 'avatar',
    description: 'Avatar of Members',
    async execute(bot, message, args, Discord) {
        if (message.mentions.users.size) {
            const user = message.mentions.users.first() || message.author;
            const avatarEmbed = new Discord.MessageEmbed()
                .setColor(0x333333)
                .setAuthor(user.username)
                .setImage(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`);
            message.channel.send(avatarEmbed);
        }
        else {
            message.reply('Please tag a valid user!');
        }
    }
}