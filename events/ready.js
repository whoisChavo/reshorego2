const client = require("..");

client.on('ready', () => {
    console.log(`${client.user.username} botu aktif oldu`);
    client.user.setStatus("idle")
    let statuses = ['Røwn 🖤 Cяєsîwα'];
    setInterval(function() {
  		let status = statuses[Math.floor(Math.random()*statuses.length)];
  		client.user.setActivity(status, {type: "WATCHING"});
  	}, 10000)
})
