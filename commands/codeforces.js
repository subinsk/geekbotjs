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
    }).slice(1, 15);
    upcoming_contests.forEach((obj) => names.push(String(obj.name)))
    upcoming_contests.forEach((obj) => {
        var date = new Date(Number(obj.startTimeSeconds));
        date.toString("hh mm ss dd MM yyyy");
        dates.push(String(date))
    })
    return { names, dates };

}

let contest= main();

// async function getNames() {
//     let { names } = await main();
//     return names;
    // async function getNames(){
    //     return names;
    // }
    // async function getDates(){
    //     return dates;
    // }
// }


// names.forEach((name)=> { return String(name)})

// console.log(String(names.forEach((name)=>{return `${name}\n`})))
// Object.keys(obj)
//     .forEach(key=>{
//             obj[key]
//         })
//     );

module.exports = {
    name: 'codeforces',
    description: 'Gives details of upcoming contests ',
    async execute(bot, message, args, Discord) {
        let contestsEmbed = await new Discord.MessageEmbed()
        async function getEmbed() {
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
                fields: [
                    {
                        name: '\u200b',
                        value: '\u200b',
                        inline: false,
                    },
                    {
                        name: 'Contest Name',
                        value: `${contest.names.forEach((name)=>{return name})}`,
                        inline: true,
                    },
                    {
                        name: 'Contest Date',
                        value: `${contest.dates}`,
                        inline: true,
                    },
                    {
                        name: '\u200b',
                        value: '\u200b',
                        inline: false,
                    },
                    {
                        name: '\u200b',
                        value: '\u200b',
                        inline: false,
                    },
                ],
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

//     const contestsEmbed = await new Discord.MessageEmbed()
//         .setColor('#0099ff')
    //         .setTitle('Codeforces Upcoming Contests')
    //         .setThumbnail('https://assets.codeforces.com/images/codeforces-sponsored-by-vk-en.PNG')
    //         .addField('Name of Contest', getContestNames(), true)
    //         // .addField('Start time', dates.forEach(), true)
    //         .setImage('https://assets.codeforces.com/images/codeforces-sponsored-by-vk-en.PNG')
    //         .setTimestamp()
    //     channel.send({ embeds: [contestsEmbed] });
    // }
// }