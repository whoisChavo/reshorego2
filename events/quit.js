const { CommandInteraction, Client, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const config = require("../settings/config.json")
const client = require("..");
const NameData = require("../Models/NameData.js")
const UserData = require("../Models/UserData.js")

module.exports = async member => {

    let namedata = await NameData.find({ UserID: member.id});
    if(!namedata.LastName) return
    let namedata1 = await NameData.findOne({ UserID: member.id});
    
    let data = await new UserData({ UserID: member.id, nickname: namedata1.LastName, Process: "Sunucudan Ayrılma"}); data.save();
};






