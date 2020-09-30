const Discord = require("discord.js");
const client = new Discord.Client();
const bot = new Discord.Client();
const ms = require("ms");
const fs = require('fs');
const moment = require('moment');
const request = require('request');
const cmd = require("node-cmd");
const prefix = "*"; // البرافيكس
   const GUILDID = '574655055060402186'; // اي دي السيرفر  
   const CHANNELID = '574655055060402191'; // اي دي الروم
//======================================[Client]======================================


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
   client.user.setActivity("كل عام وانتم بخير ورمضان مبارك عليكم 🌙⚡",{type: 'WATCHING'})
});

const { Client } = require('discord.js');
const ytdl  = require('ytdl-core');
const url = 'https://www.youtube.com/watch?v=M6z0Qql4-qo'; // هنا فديو الخاص ب القرأن الكريم كامل 


client.on('ready',async () => {
    console.log('تـم تشغيل القرأن الكريم');
    // CODE BY KAHRBAA كههربا
    voiceStay(GUILDID, CHANNELID);
   function voiceStay(guildid, channelid) {
    if(!guildid) throw new Error('ـاكد انك حطط ايدي السيرفر');
    if(!channelid) throw new Error('تـاكد انك حطط ايدي الروم');

    let guild = client.guilds.cache.get(guildid);
    const voiceChannel = guild.channels.cache.get(channelid);;
    if (!voiceChannel) {
      return 
    }
    voiceChannel.join()
      .then(connection => {
        const stream = ytdl(url, { filter: 'audioonly' }); 
        const dispatcher = connection.play(stream);
        dispatcher.on('end', () => { 
          voiceChannel.leave();
          cmd.run("refresh")

        });
      });
  }
});


  
//======================================[Commands]======================================
  

client.on('message', message => {
    if(message.content === prefix + 'guild'){
            const millis = new Date().getTime() - message.member.user.createdAt.getTime();
    const now = new Date();
    const createdAt = millis / 1000 / 60 / 60 / 24;
    var heg = message.guild;

        const embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .addField('GuidlOwner',message.guild.owner,true)// CODE BY KAHRBAA كههربا
        .addField('Guild ID', message.guild.id,true)
        .addField('Guild MemberCount', `${message.guild.memberCount}`+` [Online : ${message.guild.members.filter(m=>m.presence.status == 'online').size}]`)
        .addField('Guild Channels',`\`🔊\` ${message.guild.channels.filter(m => m.type === 'text').size} | `+`\`#\`${message.guild.channels.filter(m => m.type === 'voice').size} `)
        .addField('Guild RolesCount',` ${message.guild.roles.size} `,true)
        .addField('Created',`\`${moment(heg.createdTimestamp).fromNow()}\`` ,true)
        .addField('Guild Region',message.guild.region,true)
        
        
        message.channel.send(embed)
    }
})

client.on('message', message => {
    if (message.content.startsWith(prefix + "stats")) {
               if(message.author.bot) return;
        if(!message.channel.guild) return message.reply(' Error : \` Guild Command \`');
    message.channel.send({
        embed: new Discord.MessageEmbed()
            .setColor('BLACK')
            .addField('Ping' , [`${Date.now() - message.createdTimestamp}` + 'MS'], true)
            .addField('RAM Usage', `[${(process.memoryUsage().rss / 1048576).toFixed()}MB]`, true)
            .addField('ID' , `[ ${client.user.id} ]` , true)
            .addField('Prefix' , `[ ${prefix} ]` , true)
            
    })
}
});
      


client.login("NzU0NzM1Njg2MzE3NTA2NTkw.X15EYQ.M_ZAOeEtUSjilLwDPVZkvyMw3gg");
