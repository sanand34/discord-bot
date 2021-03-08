const axios = require("axios/index");
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
const Discord = require("discord.js");
const bot = new Discord.Client();
const TOKEN = "getyourtoken";

bot.login(TOKEN);

bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity("Created By Sanchit Anand");
});

bot.on("message", (msg) => {
  if (
    msg.mentions.users.size &&
    msg.mentions.users.first().username === "_loki"
  ) {
    msg.channel.send(`Sanchit is sus`);
  } else if (msg.content.startsWith("!")) {
    let search = /[a-z\ ]+/g.exec(msg.content);
    async function fetchData(search) {
      const request = await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=${"getapikey"}&q=${search}&limit=25&offset=0&rating=g&lang=en
        `
      );
      msg.channel.send("Le", {
        files: [request.data.data[0]?.images.downsized_medium.url],
      });
    }
    fetchData(search[0]);
  } else if (msg.content.startsWith("&")) {
    let search = /[a-z\ ]+/g.exec(msg.content);
    async function fetchData(search) {
      const request = await axios.get(
        `https://api.giphy.com/v1/stickers/search?api_key=${"getapikey"}&q=${search}&limit=25&offset=0&rating=g&lang=en`
      );
      msg.channel.send("Le", {
        files: [request.data.data[0]?.images.downsized_medium.url],
      });
    }
    fetchData(search[0]);
  }
});
app.get("/", function (req, res) {
  res.send("hello world");
});

app.listen(port, () => console.log(`Listening on port:${port}`));
