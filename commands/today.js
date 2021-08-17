const holidays=require('../modules/calender')
const getEmbed=require('../modules/embed')

module.exports={
    name:'today',
    description:'Events of current day',
    async execute(bot,message,args, Discord){
        holidaysEmbed = await getEmbed('Holidays',await holidays());
        message.channel.send({ embed: holidaysEmbed })
    }
}