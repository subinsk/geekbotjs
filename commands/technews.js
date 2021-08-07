require('dotenv').config({ path: '../.env' })
const fetch = require("node-fetch");
const request = require('request');

const news_url = `https://newsapi.org/v2/top-headlines?country=in&category=technology&from=2021-08-07&sortBy=popularity&apiKey=${process.env.NEWS_APIKEY}`;

let news;

function getNews() {
    return new Promise(function (resolve, reject) {
        request(news_url, function (error, response, body) {
            if (error) return reject(error);
            resolve(body);
        });
    });
}

async function main() {
    var chunk = await getNews();
    let data = JSON.parse(chunk);
    news = data['articles'].slice(1, 3);
    return news;
}

let tech;
module.exports = {
    name: 'technews',
    description: 'Gives latest tech news',
    async execute(bot, message, args, Discord) {

        let technewsEmbed = await new Discord.MessageEmbed()

        async function getEmbed() {

            tech = await main();
            let techFields = [];


            for (let i = 0; i < tech.length; i++) {

                techFields.push(

                    {
                        name: tech[i].title,
                        value: tech[i].description,
                        image: {
                            url: tech[i].urlToImage,
                        },
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
                title: 'Latest Tech News',

                author: {
                    name: 'Subin',
                    icon_url: 'https://cdn.discordapp.com/avatars/802070431938641964/175ab0128e7203adbe61e846a4e42500.png?size=256',
                    url: 'https://www.linkedin.com/in/subin-s-k-9b767219a/',
                },

                field: {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },

                fields: techFields,

                field: {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },

                timestamp: new Date(),

                footer: {
                    text: 'Developed By Subin',
                    icon_url: 'https://cdn.discordapp.com/avatars/802070431938641964/175ab0128e7203adbe61e846a4e42500.png?size=256',
                }
            }
        }

        technewsEmbed = await getEmbed();
        message.channel.send({ embed: technewsEmbed });

    }
}