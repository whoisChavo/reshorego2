const { CommandInteraction, Client, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
let config = require('../../settings/config.json');
let { CresiwaData } = require("../../Functions/cresiwaData.js")
const UserData = require("../../Models/UserData.js")
module.exports = {
    name: "kayıt",
    description: "Kayıt işlemini gerçekleştirir!",
    permissions: [""],
    options: [
        {
            name: "kullanıcı",
            description: "Kayıt edilicek kişiyi seçiniz",
            type: "USER",
            required: true,
        },
        {
            name: "cinsiyet",
            description: "Kayıt edilicek kişinin cinsiyeti",
            type: "STRING",
            required: true,
            choices: [
                {
                    "name": "Erkek",
                    "value": "erkek"
                },
                {
                    "name": "Kadın",
                    "value": "kadın"
                },

            ]
        },
        {
            name: "isim",
            description: "Kayıt edilicek kişinin ismi",
            type: "STRING",
            required: true,
        },
        {
            name: "yaş",
            description: "Kayıt edilicek kişinin yaşı",
            type: "INTEGER",
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

        function embed(msg) {
            let embed = new MessageEmbed().setColor("WHITE").setAuthor({ name: `${interaction.member.displayName}`, iconURL: `${interaction.user.avatarURL({ dynamic: true })}` }).setFooter({ text: `Røwn 🖤 cяєsîwα`, iconURL: `${interaction.guild.iconURL({ dynamic: true })}` }).setTimestamp().setDescription(msg)
            interaction.followUp({ embeds: [embed] }).sil(10)
        }

        const user = interaction.options.getUser('kullanıcı');
        const cins = interaction.options.getString('cinsiyet');
        const isim = interaction.options.getString('isim');
        const yaş = interaction.options.getInteger('yaş');

        if (!interaction.member.roles.cache.some(x => config.Role.RegisterStaff.includes(x.id))) return embed(`${client.emoji.No} **Bu komudu kullanmak için <@&${config.Role.RegisterStaff}> rolüne sahip olmanız lazım.**`);

        const member = interaction.guild.members.cache.get(user.id);
        if (!member) return embed(`${client.emoji.No} **${user} kişisini sunucuda bulamadım!** `)
        if (member.bot) return embed(`${client.emoji.No} **Herhangi bir \`botu\` kayıt edemezsin!**`)
        if (!member.manageable) return embed(`${client.emoji.No} **${member} kullanıcısını yönetebilicek yetkide değilim!**`)
        if (interaction.member.roles.highest.position <= member.roles.highest.position) return embed(`**${client.emoji.No} Kendinden üst yetkisi olan birini kayıt edemezsin!**`)


        let name_1 = isim.charAt(0).replace("i", "İ").toLocaleUpperCase() + isim.slice(1).toLocaleLowerCase();
        let name_2 = `${name_1} | ${yaş}`
        await member.setNickname(`${name_2}`);

        if (!member.roles.cache.has(config.Role.ManRole) && !member.roles.cache.has(config.Role.WomanRole)) {
            const kanal = client.channels.cache.get(config.Channel.chat)

            if (cins == "erkek") {
                await CresiwaData.man(member, interaction.user)
                await CresiwaData.setusername(member, name_2, `<@&${config.Role.ManRole}>`, `${config.Role.ManRole}`)
                embed(`${client.emoji.Yes} **${member} adlı kullanıcı başarıyla <@&${config.Role.ManRole}> rolüyle kayıt edildi**`)
                await kanal.send(`**${member} adlı kullanıcı başarıyla kayıt edildi.Hoşgeldin**`).sil(7)
            }
            if (cins == "kadın") {
                await CresiwaData.woman(member, interaction.user)
                await CresiwaData.setusername(member, name_2, `<@&${config.RoleWomanRole}>`, `${config.RoleWomanRole}`)
                embed(`${client.emoji.Yes} **${member} adlı kullanıcı başarıyla <@&${config.Role.ManRole}> rolüyle kayıt edildi**`)
                await kanal.send(`**${member} adlı kullanıcı başarıyla kayıt edildi.Hoşgeldin**`).sil(7)
            }




        } else {
            await member.setNickname(name_2)
            CresiwaData.setusername(member, name_2, "İsim Değiştirme")
            embed(`**${member} kullanıcının adı başarıya \`"${name_2}"\` olarak değiştirildi.**`)
          }

    }
}
