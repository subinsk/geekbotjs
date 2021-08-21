require('dotenv').config({path: '../.env'})
var KEY= process.env.GITHUB_APIKEY
const axios= require('axios')


async function getRequest(user){
    var options={
        method: 'GET',
        url:`https://api.github.com/users/${user}`
    }
    chunk= await axios.request(options)
    return chunk.data;
}
async function getUser(user){
    data= await getRequest(user);
    async function blog(){
        if(data.blog){
            return data.blog
        }
        else{
            return 'Not Available'
        }
    }
    User={
        name: data.login,
        value: `**Username:** ${data.login} \n ${data.html_url} \n **Name:** ${data.name} \n **Bio:** ${data.bio} \n **Repositories:** ${data.public_repos} \n **Followers:** ${data.followers} \n **Website:** ${await blog()}`
    }
    return User;
}
module.exports=getUser;