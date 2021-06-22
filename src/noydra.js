const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const queue = new Map();
const db = require('quick.db')

client.queue = new Map()
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};


var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
client.on("guildMemberAdd", member => {  
  const guild = member.guild;

  const kanal = ayarlar.kayitchat
    const kayitciroll = member.guild.roles.cache.get(ayarlar.kayitcirol)
    const kuralchat = ayarlar.kuralchat
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
  const gecen = moment.duration(kurulus).format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
   
    var kontrol;
  if (kurulus < 1296000000) kontrol = '**GÜVENİLİR DEĞİL! :imp:**'
  if (kurulus > 1296000000) kontrol = '**GÜVENİLİR! :angel:**'
  moment.locale("tr");
  const lol = new Discord.MessageEmbed()
  .setDescription(`**X** sunucusuna hoş geldin! <@`+member+`> \n\n :alarm_clock: Hesabın **`+ gecen +`** önce oluşturulmuş yani hesabın `+kontrol+` \n\n Seninle beraber **` + member.guild.memberCount + `** kişi olduk! \n\n :warning: Sol taraftaki Ses Teyit odalarına girip <@&841405526850928651> rolüne sahip birinin gelmesini bekle. :warning: \n\n **Not:** <#${kuralchat}> kanalına göz atmayı unutma, yoksa kaydını boşa yapmış olacağız. \n\n **Hatırlatma!** Bu sunucu süper düper Noydra'nın kodladığı kayıt botunu kullanıyor, eğer daha önceden kayıt olduysan otomatik olarak yönlendirileceksin.`)
  member.guild.channels.cache.get(kanal).send(lol)
  member.guild.channels.cache.get(kanal).send(`<@&841405526850928651>`)
  });

client.on('guildMemberAdd', async member => {
  member.setNickname(ayarlar.unregisternick)
  member.roles.add(ayarlar.unregister)
})
    client.on('guildMemberAdd', async (message, guild, member) => {
    
  const erkrol = ayarlar.erkekrol
  const karirol = ayarlar.kizrol
  const nodiraa = ayarlar.unregister
  const kayıtsızmal = ayarlar.unregister
 

  if(db.fetch(`k.${guild}.${member}`)) {
    member.roles.remove(nodiraa);

  const data = await db.fetch(`k.${guild}.${member}`);

    
  
  const tagcuksik = ayarlar.tag
  if(data.sex == 'K') {
    member.roles.add(karirol);
    member.roles.remove(kayıtsızmal)
  } else {
    member.roles.add(erkrol);
    member.roles.remove(kayıtsızmal)
  };

  member.setNickname(`${tagcuksik} ${data.isim} | ${data.yaş}`);

}
});

    