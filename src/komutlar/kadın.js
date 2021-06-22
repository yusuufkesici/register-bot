const { dc, MessageEmbed } = require('discord.js')
const db = require('quick.db')
var ayarlar = require('../ayarlar.json')
exports.run = (client, message, args, member, guild) => {
  

  const tagayarak = ayarlar.tag 

  if(!message.member.roles.cache.get(ayarlar.kayitcirol) && !message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send('yetkin yoq mk keli')
  // Striga abime selamlar <3
  let noydracik = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  let isim = args[1]
  let yaş = args[2]
  let K = args[3]
  let uyarıembed = new MessageEmbed().setColor('GOLD').setFooter("noydra <3")
  if (!noydracik) return message.channel.send(uyarıembed.setDescription("**Doğru kullanım, !kadın @etiket İsim Yaş K**"))
  if (!isim) return message.channel.send(uyarıembed.setDescription("**Doğru kullanım, !kadın @etiket İsim Yaş K**"))
  if (!yaş) return message.channel.send(uyarıembed.setDescription("**Doğru kullanım, !kadın @etiket İsim Yaş K**"))
  if (yaş < 13) return message.channel.send(uyarıembed.setDescription("**13 yaşından küçük kişiler discord kullanamaz."))
  if (!K) return message.channel.send(uyarıembed.setDescription("**Doğru kullanım, !kadın @etiket İsim Yaş K**"))


  noydracik.setNickname(`${tagayarak} ${isim} | ${yaş}`)
  noydracik.roles.add(ayarlar.kizrol)
    noydracik.roles.remove(ayarlar.unregister)

    db.set(`k.${guild}.${noydracik}`, { 
      name: isim,
    sex: K,
    yas: yaş
  });



  let embed = new MessageEmbed()
    .setColor('GOLD')
    .setDescription(`${noydracik} **adlı üye** <@${message.author.id}> **isimli yetkili tarafından kaydedildi!** 
   ${noydracik} **üyesinin adı** \`${isim} | ${yaş}\` **olarak güncellendi.**
   <@&${ayarlar.kizrol}> **rolü verildi.**`)
message.channel.send(embed)

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["k" , "kiz" , "kadın" , "noydranınensevdiğişey"],
    permLevel: 0
};

exports.help = {
    name: "kadın"
}