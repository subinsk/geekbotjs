module.exports={
    name:'help',
    description:'Help',
    async execute(bot,message,args, Discord ){
        let helpEmbed = await new Discord.MessageEmbed()

        async function getEmbed(){
            return {
                color: 0x0099ff,
                title: 'Hey Developers!\n',
                description:'GeekBOT Here :)\n \n \n',

                author: {
                    name: 'Subin',
                    icon_url: 'https://cdn.discordapp.com/avatars/802070431938641964/175ab0128e7203adbe61e846a4e42500.png?size=256',
                    url: 'https://www.linkedin.com/in/subin-s-k-9b767219a/',
                },

                field: {
                    name: '\n',
                    value: '\n',
                    inline: false,
                },

                fields: [
                    {
                        name:'Commands:\n',
                        value:
                            '>codeforces - Latest Codeforces Contest Details\n\n'
                           +'>technews - Latest Tech related News\n\n'
                           +'>avatar *@taggedUser* - To get URL for your Discord Avatar \n\n'
                           +'>rank *@taggedUser* - To get your present rank \n\n'
                           +'>ping  - Something interesting ;) \n\n'
                           +'>help  - For help related to Bot and Commands ;) \n\n'
                    }
                ],

                field: {
                    name: '\n ',
                    value: '\n ',
                    inline: false,
                },

                timestamp: new Date(),

                footer: {
                    text: 'Developed By Subin',
                    icon_url: 'https://cdn.discordapp.com/avatars/802070431938641964/175ab0128e7203adbe61e846a4e42500.png?size=256',
                }
            }
        } 

        helpEmbed = await getEmbed();
        message.channel.send({embed: helpEmbed});
    }
}