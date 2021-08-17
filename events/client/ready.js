var axios = require("axios").default;
require('dotenv').config({ path: '../.env' })

// News

const request = require('request');

const news_url = `https://newsapi.org/v2/top-headlines?country=in&category=technology&from=2021-08-07&sortBy=popularity&apiKey=${process.env.NEWS_APIKEY}`;

let news;
let tech;
let quote;

function getNews() {
    return new Promise(function (resolve, reject) {
        request(news_url, function (error, response, body) {
            if (error) return reject(error);
            resolve(body);
        });
    });
}


// Quote
var options = {
    method: 'GET',
    url: 'https://quotes15.p.rapidapi.com/quotes/random/',
    params: { language_code: 'en' },
    headers: {
        'x-rapidapi-key': process.env.RAPID_APIKEY,
        'x-rapidapi-host': 'quotes15.p.rapidapi.com'
    }
};

async function main(){
    var chunk = await getNews();
    let data = JSON.parse(chunk);
    news = data['articles'].slice(1, 3);
    let quote;
    quote=await axios.request(options).catch(function (error) {
        console.error(error);
    });
    quote=quote.data;
    return {news,quote};
}


module.exports = (Discord, bot) => {
    // Ready
    console.log('Bot is ready!');
    bot.user.setActivity('>help', { type: 'LISTENING' }).catch(console.error);
    
    const channel01 = bot.channels.cache.find(channel => channel.id == '857140573302423575');

    async function main1() {

        // Embed
        let dailyEmbed = await new Discord.MessageEmbed()

        async function getEmbed() {
            mains = await main();
            tech=mains.news;
            quote=mains.quote

            let techFields = [];

            for (let i = 0; i < tech.length; i++) {

                techFields.push(

                    {
                        name: tech[i].title,
                        value: `${tech[i].description}\n${tech[i].urlToImage}`,
                      
                        inline: false
                    },

                    {
                        name: '\u200b',
                        value: '\u200b',
                        inline: false,
                    },
                )
            }

            return {
                color: 0x0099ff,
                title: 'Update',
                author: {
                    name: 'Subin',
                    icon_url: 'https://cdn.discordapp.com/avatars/802070431938641964/175ab0128e7203adbe61e846a4e42500.png?size=256',
                    url: 'https://www.linkedin.com/in/subin-s-k-9b767219a/',
                },
                field:{
                    name:'\n Quote of the Day',
                    value: `${quote.content} \n ${quote.originator.name}`,
                    inline:false,
                },
                fields: techFields,


                timestamp: new Date(),
                footer: {
                    text: 'Developed By Subin',
                    icon_url: 'https://cdn.discordapp.com/avatars/802070431938641964/175ab0128e7203adbe61e846a4e42500.png?size=256',
                }
            }
        }

        dailyEmbed = await getEmbed();
        channel01.send({ embed: dailyEmbed });
    }
    main1();
    setInterval(()=>{
        main1();

    },21600000)
}