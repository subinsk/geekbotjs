const getEmbed = require("../modules/embed");
const getUser= require('../modules/github')

module.exports={
    name:'github',
    description:'Returns Github of Users ',
    async execute(bot,message, args, Discord){
        const query = args.join(' ');
        if(!query) return message.channel.send('Please enter name of User');
        githubEmbed = await getEmbed('Github Profile', await getUser(query));

        message.channel.send({embed: githubEmbed});

    }
}