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
  let E = args[3]
  let uyarıembed = new MessageEmbed().setColor('GOLD').setFooter("noydra <3")
  if (!noydracik) return message.channel.send(uyarıembed.setDescription("**Doğru kullanım, !erkek @etiket İsim Yaş E**"))
  if (!isim) return message.channel.send(uyarıembed.setDescription("**Doğru kullanım, !erkek @etiket İsim Yaş E**"))
  if (yaş < 13) return message.channel.send(uyarıembed.setDescription("**13 yaşından küçük kişiler discord kullanamaz."))
  if (!E) return message.channel.send(uyarıembed.setDescription("**Doğru kullanım, !erkek @etiket İsim Yaş E**"))

  if (yaş < 13) return message.channel.send(uyarıembed.setDescription("**X Sunucusu kuralları gereği, 13 yaşından küçük üyeleri kayıt edemezsin.**"))


  noydracik.setNickname(`${tagayarak} ${isim} | ${yaş}`)
  noydracik.roles.add(ayarlar.erkekrol)
    noydracik.roles.remove(ayarlar.unregister)

    db.set(`k.${guild}.${noydracik}`, { 
      name: isim,
    sex: E,
    yas: yaş
  });



  let embed = new MessageEmbed()
    .setColor('GOLD')
    .setDescription(`<:amogus:837331843388932096> ${noydracik} **adlı üye** <@${message.author.id}> **isimli yetkili tarafından kaydedildi!** 
   ${noydracik} **üyesinin adı** \`${isim} | ${yaş}\` **olarak güncellendi.**
   <@&${ayarlar.erkekrol}> **rolü verildi.**`)
message.channel.send(embed)

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["erkek" ,"e"],
    permLevel: 0
};

exports.help = {
    name: "erkek"
}