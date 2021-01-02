//says: we're using discord.js library
const Discord = require('discord.js');

// says: this program is a bot (client), so make an instance of the Discord.Client class
const client = new Discord.Client();

//looks for the separate .env config file, which stores the token
require('dotenv').config()

//says: we're using the 'discord-fetch-all' package
const fetchAll = require('discord-fetch-all');

//? I think this is an 'even't which I need to learn about which
client.on('ready', () => { //? this checks whether the bot is connected to the server - not sure where 'ready' comes from
  console.log(`Logged in as ${client.user.tag}!`); //? if the connection is good, it prints this message to the console, using the bot name 
});

//? listens to every message, scanning for if it meets the conditions in the if statements
client.on('message', async msg => { //'async' was added to support the fetch/await line. Not sure how the => structure works
  if (msg.content === 'ping') { //if any user sends a message that is exactly this string
    msg.reply('Feeling fancy'); //bot responds with this string
  } else if (msg.content === 'fetch') { //if a user types this string inany channel...
    const allMessages = await fetchAll.messages(msg.channel, { //go get all the messages in that channel
      reverseArray: true, // Reverse the returned array
      userOnly: true, // Only return messages by users
      botOnly: false, // Only return messages by bots
      pinnedOnly: false, // Only returned pinned messages
    });

    // fetch only the timestamp and content of allMessages and create a new array called Starbucket
    const starBucket = allMessages.map(({
      createdTimestamp,
      content
    }) => ({
      createdTimestamp,
      content
    }));

    //convert discord createdTimestamp to a preferred date format

    for (let star of starBucket) {
      star.createdTimestamp = new Date(star.createdTimestamp);
  }

  //print starBucket in the console
  console.log(starBucket);
}
});

client.login(process.env.TOKEN); //logs the bot into the server using the token stored in the .env file