const getEmbed = require("../modules/embed");
const getAnswer= require('../modules/stackoverflow')

module.exports={
    name:'stackoverflow',
    description:'Returns Answers for Stackoverflow questions ',
    async execute(bot,message, args, Discord){
        const query = args.join(' ');
        if(!query) return message.channel.send('Please enter the Question');
        stackoverflowEmbed = await getEmbed('StackOverflow Answers', await getAnswer(query));

        message.channel.send({embed: stackoverflowEmbed});

    }
}