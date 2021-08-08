module.exports=(Discord,bot,member)=>{
    member.guild.channels.find("name", "general").send(`Goodbye!` + member.toString());
}