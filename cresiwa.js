const { Client, Message, MessageEmbed, Collection, MessageActionRow, MessageButton, MessageSelectMenu, SelectMenuInteraction  } = require("discord.js");
const fs = require("fs");
const mongoose = require('mongoose');


const client = new Client({
    messageCacheLifetime: 60,
    fetchAllbuttons: false,
    messageCacheMaxSize: 10,
    restTimeOffset: 0,
    restWsBridgetimeout: 100,
    shards: "auto",
    allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: true,
    },
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    intents: 32767,
});
module.exports = client;




const config = require("./settings/config.json");

const { clear } = require("console");
const prefix = config.prefix;
const token = config.token;




// Global Variables
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.cooldowns = new Collection();
client.slashCommands = new Collection();
client.emoji = require("./settings/emoji.json");

["event_handler", "slash_handler"].forEach((handler) => {
    require(`./handlers/${handler}`)(client)
});
require('./util/Loader.js')(client);


///////// MongoDb ////////////

mongoose.connect(config.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    });
    mongoose.connection.on("connected", () => {
      console.log("MongoDB'ye bağlı")
    });
    mongoose.connection.on("error", () => {
      console.log("MongoDB'ye bağlanamadım");
    });

///////// MongoDb ////////////








 



    






client.login(token);
