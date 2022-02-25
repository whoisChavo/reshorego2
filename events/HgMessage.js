const { CommandInteraction, Client, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const config = require("../settings/config.json")
const client = require("..");
const UserData = require("../Models/UserData.js")
const fs = require("fs");
const moment = require('moment');
const ms = require('ms');
module.exports = async member => {

    let channel = client.channels.cache.get(config.Channel.KayıtChat);
    let chat = client.channels.cache.get(config.Channel.chat)

    var üyesayısı = member.guild.memberCount.toString().replace(/ /g, "    ")
    var üs = üyesayısı.match(/([0-9])/g)
    üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
    if (üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
            return {
                '0': `${client.emoji.say0}`,
                '1': `${client.emoji.say1}`,
                '2': `${client.emoji.say2}`,
                '3': `${client.emoji.say3}`,
                '4': `${client.emoji.say4}`,
                '5': `${client.emoji.say5}`,
                '6': `${client.emoji.say6}`,
                '7': `${client.emoji.say7}`,
                '8': `${client.emoji.say8}`,
                '9': `${client.emoji.say9}`
            }[d];
        })
    }


    let security = Date.now() - member.user.createdTimestamp > 1000 * 60 * 60 * 24 * 15 ? "güvenli" : "şüpheli"

    let schannel = client.channels.cache.get(config.Channel.şüpheli);
    let embed = new MessageEmbed().setColor("RANDOM").setAuthor({ name: `${member.guild.name}`, iconURL: `${member.guild.iconURL({ dynamic: true })}` }).setFooter({ text: `Résh 🖤 cяєsîwα`, iconURL: `${member.guild.iconURL({ dynamic: true })}` }).setTimestamp()
    if (security === "şüpheli") {
        await member.setNickname("Şüpheli")
        await member.roles.add(config.Role.Suspicious);
        await member.roles.remove(config.Role.Unregistered);
        channel.send({ embeds: [embed.setDescription(`${member} (${member.id}) az önce sunucuya katıldı, fakat hesabı \`${moment(member.user.createdAt).locale("tr").format("LLL")}\` tarihinde \`(${client.giris(member.user.createdAt)})\` açıldığı için <@&${config.Role.Suspicious}> rolü verildi`)] });
        schannel.send({ embeds: [embed.setDescription(`**${member} (${member.id}) az önce sunucuya katıldın, fakat \`${moment(member.user.createdAt).locale("tr").format("LLL")}\` tarihinde \`(${client.giris(member.user.createdAt)})\` açıldığı için <@&${config.Role.Suspicious}> rolü verildi.\nYetkililer en kısa sürede ilgilenecektir.**`)] })
    } else if (security === "güvenli"){
        member.roles.add(config.Role.Unregistered);
         channel.send(`${client.emoji.hgmsj} **Merhabalar ${member} aramıza hoş geldin.\n\n ${client.emoji.hgmsj} Seninle beraber sunucumuz ${üyesayısı} üye sayısına ulaştı.\n\n${client.emoji.hgmsj} Hesabın \`${moment(member.user.createdAt).locale("tr").format("LLL")}\` tarihinde oluşturulmuş.\n\n${client.emoji.hgmsj} \`V.Confirmation\` ses kanallarına girip kayıt olabilirsiniz\n\n ${client.emoji.hgmsj} Teyit rolüne sahip(<@&${config.Role.RegisterStaff}>) yetkililerimiz sizinle ilgilenecektir!\n\n Sunucumuzun <#${config.Channel.kurallar}> kanalına göz atmayı unutmayınız. Kayıt olduktan sonra kuralları okuduğunuzu varsayacağız!**`)
        };
    


};
