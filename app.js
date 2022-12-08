require('dotenv').config();
const express = require('express');
const { REST, Client, Routes, GatewayIntentBits, InteractionCollector } = require('discord.js');
const app = express();
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const rest = new REST({ version: '10' }).setToken(TOKEN)
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


client.on('ready', () => {
  console.log(`${client.user.tag} is online` )
})
app.get('/home', (req,res) => {
    res.send('Hello to my home')
})

const commands = [
  {
    name: 'img',
    description: `ask AI to generate an image`,
    options:[
      {
        name: 'query',
        description: `what's on your mind?`,
        type: 3,
        required: true,
      }
    ]
  }
]

async function main() {
    try {
      await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {body: commands})
      await client.login(TOKEN);
    } catch (err) {
      console.log(err)
    }
  }
  main();

client.on('interactionCreate', async (interation) => {
  if(!interation.isChatInputCommand()) return;

  // ai img
  if(interaction.commandName === 'img'){
    let txt = interaction.options.getString('query')
    await interation.reply(txt)
  }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT)