require('dotenv').config();
const express = require('express');
const { REST, Client, Routes, GatewayIntentBits } = require('discord.js');
const app = express();
const TOKEN = process.env.TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


app.get('/home', (req,res) => {
    res.send('Hello to my home')
})

async function main() {
    try {
      await client.login(TOKEN);
    } catch (err) {
      console.log(err)
    }
  }
  main();

const PORT = process.env.PORT || 3000;
app.listen(PORT)