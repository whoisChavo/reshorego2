const reqEvent = events => require(`../events/${events}`)
module.exports = client => {
    client.on('guildMemberAdd', reqEvent('HgMessage.js'));
    client.on('guildMemberRemove', reqEvent('quit.js'));
    
};
