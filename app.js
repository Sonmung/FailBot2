require('dotenv').config();
const express = require('express');
const { REST, Client, Routes, GatewayIntentBits, InteractionCollector } = require('discord.js');
const app = express();
const axios = require('axios');
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const rest = new REST({ version: '10' }).setToken(TOKEN)
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
})
const openai = new OpenAIApi(configuration);
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
        name: 'request',
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

client.on('interactionCreate', async (interaction) => {
  if(!interaction.isChatInputCommand()) return;

  // ai img
  if(interaction.commandName === 'img'){
    let txt = interaction.options.getString('request')
    try {
      let res = await openai.createImage({
        prompt: txt,
        n: 1,
        size: '512x512'
      })
      let imageUrl = res.data.data[0].url;
      await interaction.reply(`${txt} ${imageUrl}`)
    } catch (error) {
      console.log('error');
      await interaction.reply('Image could not be generated')
    }
    
  }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT)