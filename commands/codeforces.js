const getContest=require('../modules/codeforces')
const getEmbed=require('../modules/embed')

module.exports={
    name:'codeforces',
    description:'Codeforces contest',
    async execute(bot,message,args, Discord){
        contestsEmbed = await getEmbed('Codeforces Contest',await getContest());
        message.channel.send({ embed: contestsEmbed })
    }
}