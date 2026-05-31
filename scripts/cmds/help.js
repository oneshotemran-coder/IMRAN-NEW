const fs = require("fs-extra");

const axios = require("axios");

const path = require("path");

const { getPrefix } = global.utils;

const { commands, aliases } = global.GoatBot;


module.exports = {

  config: {

    name: "help2",

    version: "1.18",

    author: "FARHAN",

    countDown: 5,

    role: 0,

    shortDescription: { en: "View command usage and list all commands directly" },

    longDescription: { en: "View command usage and list all commands directly" },

    category: "info",

    guide: { en: "{pn} / help cmdName" },

    priority: 1,

  },


  onStart: async function ({ message, args, event, threadsData, role }) {

    const { threadID } = event;

    const threadData = await threadsData.get(threadID);

    const prefix = getPrefix(threadID);


    if (!args[0]) {

      // Group commands by category

      const categories = {};

      let msg = "╭───────❁\n│✨ 𝐄 𝐌 𝐑 𝐀 𝐍 𝗛𝗘𝗟𝗣 𝗟𝗜𝗦𝗧 ✨\n╰────────────❁";


      for (const [name, value] of commands) {

        if (value.config.role > 1 && role < value.config.role) continue;


        const category = value.config.category || "Uncategorized";

        categories[category] = categories[category] || { commands: [] };

        categories[category].commands.push(name);

      }


      Object.keys(categories).forEach((category) => {

        msg += `\n╭─────✰『  🗂️ ${category.toUpperCase()}  』`;

        const names = categories[category].commands.sort();

        for (let i = 0; i < names.length; i += 3) {

          const cmds = names.slice(i, i + 3).map((item) => `⚡ ${item}`);

          msg += `\n│${cmds.join("   ")}`;

        }

        msg += `\n╰────────────✰`;

      });


      const totalCommands = commands.size;

      msg += `\n\n╭─────✰[🌟 𝐄𝐍𝐉𝐎𝐘 🌟]\n│> 𝗧𝗢𝗧𝗔𝗟 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦: [${totalCommands}]\n│\n│> 𝗧𝗜𝗣𝗘: [ ${prefix}𝗛𝗘𝗟𝗣 <𝗖𝗢𝗠𝗠𝗔𝗡𝗗> ]\n│\n│> 𝗙𝗕.𝗟𝗜𝗡𝗞: [𝗛𝗧𝗧𝗣𝗦://𝗠.𝗠𝗘/𝐄𝐌𝐑𝐀𝐍.𝐁𝐎𝐒𝐒.207]\n╰────────────✰\n`;

      msg += `\n╭─────✰\n│ 💖 𝐈𝐌𝐑𝐀𝐍-𝗕𝗢𝗧 💖\n╰────────────✰`; 


      // Random help image

      const helpListImages = [

        "https://files.catbox.moe/uh4lxd.mp4",

        "https://files.catbox.moe/zj5dp9.mp4",

        "https://i.imgur.com/TqS7xxC.jpeg"

      ];

      const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];


      const stream = await axios.get(helpListImage, { responseType: "stream" }).then(res => res.data);


      await message.reply({

        body: msg,

        attachment: stream

      });


    } else {

      // Specific command info

      const commandName = args[0].toLowerCase();

      const command = commands.get(commandName) || commands.get(aliases.get(commandName));


      if (!command) {

        await message.reply(`Command "${commandName}" not found.`);

      } else {

        const configCommand = command.config;

        const roleText = roleTextToString(configCommand.role);

        const author = configCommand.author || "Unknown";

        const longDescription = configCommand.longDescription?.en || "No description";

        const guideBody = configCommand.guide?.en || "No guide available.";

        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);


        const response = `

╭───⊙

│ 🔹 Command: ${configCommand.name}

├── INFO

│ 📝 Description: ${longDescription}

│ 👑 Author: ${author}

│ ⚙ Guide: ${usage}

├── USAGE

│ 🔯 Version: ${configCommand.version || "1.0"}

│ ♻ Role: ${roleText}

╰────────────⊙`;


        await message.reply(response);

      }

    }

  },

};


// Helper function to convert role number to string

function roleTextToString(roleText) {

  switch (roleText) {

    case 0: return "0 (All users)";

    case 1: return "1 (Group administrators)";

    case 2: return "2 (Admin bot)";

    default: return "Unknown role";

  }

        }