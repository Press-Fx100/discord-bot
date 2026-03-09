const express = require("express");
const { Client, GatewayIntentBits, Partials } = require("discord.js");

const TOKEN = process.env.DISCORD_TOKEN;
const PORT = process.env.PORT || 3000;

if (!TOKEN) {
  console.error("Missing DISCORD_TOKEN environment variable.");
  process.exit(1);
}

// Tiny web server for hosts that want an HTTP service
const app = express();

app.get("/", (req, res) => {
  res.send("Discord bot is running.");
});

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Web server listening on port ${PORT}`);
});

// Discord bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const content = message.content.trim().toLowerCase();

  if (content === "!ping") {
    await message.reply("Pong!");
  }

  if (content === "!hello") {
    await message.reply(`Hello, ${message.author.username}!`);
  }
});

client.login(TOKEN);