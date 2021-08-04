module.exports = {
    name: 'ranks',
    description: 'Show rank of member',
    async execute(bot, message, args, Discord,Levels) {
        const target = message.mentions.users.first() || message.author; 
        console.log(target);
        try{
            const user = await Levels.fetch(target.id, message.guild.id); 
            if (!user) return message.channel.send("Seems like this user has not earned any xp so far."); 
            message.channel.send(`> **${target.tag}** is currently level ${user.level}.`); 
        }
        catch(e){
            console.log(e);
        }
        }
}