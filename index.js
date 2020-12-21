const Discord = require('discord.js');
 const client = new Discord.Client();
require('dotenv').config()
const fetchAll = require('discord-fetch-all');


client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });

client.on('message', async msg => {
 if (msg.content === 'ping') {
 	msg.reply('pong');
 	} else if (msg.content === 'fetch') {
	 	const allMessages = await fetchAll.messages(msg.channel, {
		    reverseArray: true, // Reverse the returned array
		    userOnly: true, // Only return messages by users
		    botOnly: false, // Only return messages by bots
		    pinnedOnly: false, // Only returned pinned messages
	});

	console.log(allMessages);
 	}
 });

client.login(process.env.TOKEN);