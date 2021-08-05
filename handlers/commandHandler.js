const fs= require('fs');
module.exports=(bot,Discord)=>{
    const commandFiles= fs.readdirSync('./commands/').filter(file=>file.endsWith('.js'));
    for (const file of commandFiles){
        const command = require(`../commands/${file}`);
        if(command.name){
            bot.commands.set(command.name, command);
        }
        else{
            continue;
        }
    }
}