const getNews=require('../modules/technews')
const getEmbed=require('../modules/embed')

module.exports={
    name:'technews',
    description:'Latest Tech News',
    async execute(bot,message,args, Discord){
        newsEmbed = await getEmbed('Tech Update',await getNews());
        message.channel.send({ embed: newsEmbed })
    }
}