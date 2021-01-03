//dependencies
const Discord = require('discord.js'); //Discord.js
const fetchAll = require('discord-fetch-all'); //fetching all messages from a channel
const ObjectsToCsv = require('objects-to-csv'); //dump an array of objects in a CSV
require('dotenv').config() //looks for the separate .env config file, which stores the token


//protocols for starting up the bot
const client = new Discord.Client(); //creates an object that lets the bot connect to the Discord API
client.login(process.env.TOKEN); //log the bot into the server using the token stored in the .env file
client.on('ready', () => { //connect the bot to the server
  console.log(`Logged in as ${client.user.tag}!`); //let us know the connection worked
});

//listens to every message, then delivers appropriate response
client.on('message', msg => {  //the function 'msg' is called when a message is received
  if (msg.author.bot) return;
  if (msg.content === 'ping') {msg.reply("Feeling fancy!")}
  else if (msg.content === 'fetch') {starMapper(msg)};
});

//separate function for fetching messages
async function starMapper(msg) {
    const allMessages = await fetchAll.messages(msg.channel, { //go get all the messages in that channel
      reverseArray: true, // Reverse the returned array
      userOnly: true, // Only return messages by users
      botOnly: false, // Only return messages by bots
      pinnedOnly: false, // Only returned pinned messages
    });
    const starBucket = allMessages.map(({ //trim the array to include only timestamp and content
      createdTimestamp,
      content
    }) => ({
      createdTimestamp,
      content
    })); 
    await convertTimestamps(starBucket); //call timestamp conversion function
    await createCSV(starBucket); //call the function that turns the array into a CSV
    await sendCSV(msg); //call the function that attaches and sends the CSV
    const consolecheck = console.log(starBucket); //print the output to the console, for testing
  }


//function to convert discord createdTimestamp to a preferred date format
async function convertTimestamps(starBucket) {
  for (let star of starBucket) {
    star.createdTimestamp = new Date(star.createdTimestamp);
  }
}

//function to save CSV file to disk:
async function createCSV(starBucket) {
  const csv = new ObjectsToCsv(starBucket);
  csv.toDisk('./starmap.csv');
}

//function to attach and send the CSV
async function sendCSV(msg){
  const CSVattachment = new Discord.MessageAttachment('starmap.csv');
  const sendmap = msg.channel.send(`Here is your starmap, explorer.`, CSVattachment);
};

