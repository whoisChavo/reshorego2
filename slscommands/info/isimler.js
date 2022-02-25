const { CommandInteraction, Client, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
let config = require('../../settings/config.json');
let { CresiwaData } = require("../../Functions/cresiwaData.js")
const UserData = require("../../Models/UserData.js")
module.exports = {
    name: "isimler",
    description: "Kullanıcının eski isimlerini gösterir!",
    permissions: [""],
    options: [
        {
            name: "kullanıcı",
            description: "İsmine bakılıcak kişiyi seçiniz",
            type: "USER",
            required: true,
        },

    ],


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        const user = interaction.options.getUser('kullanıcı');
        const member = interaction.guild.members.cache.get(user.id);

        function embed(msg) {
            let embed = new MessageEmbed().setColor("WHITE").setAuthor({ name: `${interaction.member.displayName}`, iconURL: `${interaction.user.avatarURL({ dynamic: true })}` }).setFooter({ text: `Résh 🖤 cяєsîwα`, iconURL: `${interaction.guild.iconURL({ dynamic: true })}` }).setTimestamp().setDescription(msg)
            interaction.followUp({ embeds: [embed] }).sil(10)
        }

        function embedd(msg) {
            let embed = new MessageEmbed().setColor("WHITE").setAuthor({ name: `${interaction.member.displayName}`, iconURL: `${interaction.user.avatarURL({ dynamic: true })}` }).setFooter({ text: `Résh 🖤 cяєsîwα`, iconURL: `${interaction.guild.iconURL({ dynamic: true })}` }).setTimestamp().setDescription(msg).setThumbnail(`${member.user.displayAvatarURL()}`)
            interaction.followUp({embeds: [embed]}).sil(10)
          }


        if (!interaction.member.roles.cache.some(x => config.Role.RegisterStaff.includes(x.id))) return embed(`${client.emoji.No} **Bu komudu kullanmak için gerekli rollere veya izinlere sahip değilsin.**`)    
        if(!member) return embed(`${client.emoji.No} **${user} kişisini sunucuda bulamadım!** `)
        if(member.user.bot) return embed(`${client.emoji.No} **Bir botun datasına bakamazsın**`)

        let kontrol = await UserData.findOne({ UserID: member.id })

        if(!kontrol) return embed(`${client.emoji.No} **${member} kişisinin hiç bir isim kaydı bulunamadı.**`);

        await UserData.find({ UserID: member.id }, async (err, data) => {
            if(err) return;
            if(data == "") return embed(`${client.emoji.No} **${member} kişisinin hiç bir isim kaydı bulunamadı.**`);
            data = data.reverse();
            let list = data.map((victim) => `\`${victim.Name}\` (${victim.Process})`).slice(0, 10).join("\n");
            embedd(`**${member} (${member.roles.highest}) kullanıcısının toplamda \`${data.length}\` isim kaydı bulundu ve son 10 ismi altta sıralandı.**\n\n**${list}**`)
          });

}
}