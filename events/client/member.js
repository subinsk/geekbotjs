module.exports=(bot,message)=>{
   
        bot.on("guildMemberAdd", function (member) {
            member.guild.channels.find("name", "general").send(member.toString() + ` Welcome to ${member.guild.name}`);
          
            member.addRole(member.guild.roles.find("name", "Members")).then(() => {
              console.log("joined and has been given The Member Role");
            })
          });
          
          bot.on("guildMemberRemove", function (member) {
            member.guild.channels.find("name", "general").send(`Goodbye!` + member.toString());
          
        });
    }
