require('dotenv').config({ path: '../.env' })
const crypto = require('crypto')
var request = require('request');
const cf_apiKey = process.env.CF_APIKEY;
const cf_apiSecret = process.env.CF_APISECRET;
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
let upcoming_contests = [];
const time = Math.round(new Date().getTime() / 1000);
const rand = randomNumber(100000, 999999);
const hash = crypto.createHash('sha512').update(`${rand}/contest.list?apiKey=${cf_apiKey}&time=${time}#${cf_apiSecret}`).digest('hex');
const cf_url = `https://codeforces.com/api/contest.list?apiKey=${cf_apiKey}&time=${time}&apiSig=${rand}${hash}`;

function getContest() {
    return new Promise(function (resolve, reject) {
        request(cf_url, function (error, response, body) {
            if (error) return reject(error);
            resolve(body);
        });
    });
}

var dates = [];
var names = [];

async function main() {
    var uc = await getContest();
    let data = JSON.parse(uc);
    upcoming_contests = data['result'].filter((con) => {
        return con.phase = 'BEFORE';
    }).slice(1, 10);
    upcoming_contests.forEach((obj) => names.push(String(obj.name)))
    upcoming_contests.forEach((obj) => {
        var date = new Date(Number(obj.startTimeSeconds));
        date.toString("dd MM");
        dates.push(String(date))
    })
    return { names, dates };

}

module.exports = {
    name: 'codeforces',
    description: 'Gives details of upcoming contests ',
    async execute(bot, message, args, Discord) {
        let contestsEmbed = await new Discord.MessageEmbed()
        async function getEmbed() {
            let cont=await main();
            let contFields=[];
            for(let i=0;i<cont.names.length;i++){
                contFields.push(
                    {
                        name: cont.names[i],
                        value: cont.dates[i],
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
                title: 'Codeforces Upcoming Contests',
                url: 'https://codeforces.com/',
                author: {
                    name: 'Subin',
                    icon_url: 'https://cdn.discordapp.com/avatars/802070431938641964/175ab0128e7203adbe61e846a4e42500.png?size=256',
                    url: 'https://www.linkedin.com/in/subin-s-k-9b767219a/',
                },
                thumbnail: {
                    url: 'https://assets.codeforces.com/images/codeforces-sponsored-by-vk-en.PNG',
                },
                field:{
                    
                        name: '\u200b',
                        value: '\u200b',
                        inline: false,
                    
                },
                fields: contFields,
                field:{
                    
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                
            },
                image: {
                    url: 'https://assets.codeforces.com/images/codeforces-sponsored-by-vk-en.PNG',
                },
                timestamp: new Date(),
                footer: {
                    text: 'Developed By Subin',
                    icon_url: 'https://cdn.discordapp.com/avatars/802070431938641964/175ab0128e7203adbe61e846a4e42500.png?size=256',
                }
            }
        }

        contestsEmbed = await getEmbed();
        message.channel.send({ embed: contestsEmbed });
    }
}
