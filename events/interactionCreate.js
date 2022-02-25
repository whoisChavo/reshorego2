const { MessageEmbed } = require("discord.js");
const client = require("..");
var config = require("../settings/config.json");
require("../Functions/cresiwaData.js")

client.on('interactionCreate', async interaction => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => { });

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "Bir hata oluştu" });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        if (cmd) {
            // checking user perms
            if (!interaction.member.permissions.has(cmd.permissions || [])) {
                return interaction.followUp({
                    embeds: [
                        new MessageEmbed()
                            .setColor("WHITE")
                            .setDescription(`Komutu Çalıştırmak için ${cmd.permissions} sahip değilsiniz..`)
                            .setFooter({text: client.user.username, iconURL: client.user.avatarURL({dynamic: true})})
                    ]
                })
            }

            cmd.run(client, interaction, args);

        }
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
})