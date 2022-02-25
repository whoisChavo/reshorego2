const Discord = require('discord.js');
const config = require('../settings/config.json');
const moment = require('moment');
require('moment-duration-format');

const NameData = require("../Models/NameData.js")
const UserData = require("../Models/UserData.js")

Promise.prototype.sil = function(time) {
    if(this) this.then(message => {
      if(!message) return;
      if(message.deletable) 
        setTimeout(() => message.delete(), 1000 * time)
      })
    };


    class CresiwaData {

      static async man(user, admin) {
       await user.roles.cache.has(config.Role.BoosterRole) ? user.roles.set([ config.Role.ManRole, config.Role.BoosterRole ]) : user.roles.set([ config.Role.ManRole ])
     };
   
       static async woman(user, admin) {
       await user.roles.cache.has(config.Role.BoosterRole) ? user.roles.set([ config.Role.WomanRole, config.Role.BoosterRole ]) : user.roles.set([ config.Role.WomanRole ])
     };
   
     static async setusername(user, name, process, role) {
       let x = await new UserData({ UserID: user.id, Name: name, Process: process,}); x.save()
       let nameData = await NameData.findOne({ UserID: user.id });
       if(!nameData) 
       { let y = await new NameData({ UserID: user.id, LastName: name }); y.save()} 
       else
       { await NameData.findOneAndUpdate({ UserID: user.id }, { UserID: user.id, LastName: name }) }
   
   
     };
   
   
   };
   
   module.exports = {CresiwaData}