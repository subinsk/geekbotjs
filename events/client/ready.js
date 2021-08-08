module.exports=(Discord,bot,message)=>{
    console.log('Bot is ready!');
    bot.user.setActivity('>ping',{type:'LISTENING'}).catch(console.error);
}