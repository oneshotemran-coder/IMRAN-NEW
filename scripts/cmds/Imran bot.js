const axios = require("axios");

let songIndex = 0;

module.exports = {
  config: {
    name: "adminmention",
    version: "20.0.0",
    author: "Farhan-Khan",
    countDown: 0,
    role: 0,
    shortDescription: "Fast caption + song reply",
    category: "system"
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {

    // 🔒 Author Lock
    if (this.config.author !== "Farhan-Khan") return;

    const admins = [
      {
        uid: "61590253059850",
        names: ["V'K", "ইমরান", "imran", "Imran"]
      },
      {
        uid: "61586695271407",
        names: ["Admin"]
      }
    ];

    const senderID = String(event.senderID);

    // ❌ Ignore Admin Self Mention
    if (admins.some(a => a.uid === senderID)) return;

    const text = (event.body || "").toLowerCase();

    const mentionedIDs = event.mentions
      ? Object.keys(event.mentions)
      : [];

    // ✅ Detect Mention
    const isMentioning = admins.some(admin =>
      mentionedIDs.includes(admin.uid) ||
      admin.names.some(name =>
        text.includes(name.toLowerCase())
      )
    );

    if (!isMentioning) return;

    // 🎵 Songs (UPDATED)
    const songs = [
      "https://files.catbox.moe/5tsqbp.mp3",
      "https://files.catbox.moe/qvnajs.mp3",
      "https://files.catbox.moe/u24cyh.mp3",
      "https://files.catbox.moe/f2smiw.mp3",
      "https://files.catbox.moe/igayc8.mp3",
      "https://files.catbox.moe/hg2hoh.mp3",
      "https://files.catbox.moe/2apha3.mp3",
      "https://files.catbox.moe/3zilhc.mp3",
      "https://files.catbox.moe/njuqwm.mp3",
      "https://files.catbox.moe/3361cx.mp3",
      "https://files.catbox.moe/670bk7.mp3",
      "https://files.catbox.moe/e42fqi.mp3",
      "https://files.catbox.moe/5dgyw8.mp3",
      "https://files.catbox.moe/ebpv2c.mp3",
      "https://files.catbox.moe/scd8w4.mp3",
      "https://files.catbox.moe/q5bg7t.mp3",
      "https://files.catbox.moe/s81cc8.mp3",
      "https://files.catbox.moe/tx0o8l.mp3",
      "https://files.catbox.moe/9m7lj2.mp3",
      "https://files.catbox.moe/azr6x7.mp3",
      "https://files.catbox.moe/x0p3tr.mp3",
      "https://files.catbox.moe/7vjdfy.mp3",
      "https://files.catbox.moe/36sd5r.mp3",
      "https://files.catbox.moe/m076qd.mp3"
    ];

    const songUrl = songs[songIndex];
    songIndex = (songIndex + 1) % songs.length;

    // ✍️ Funny Captions
    const captions = [
      "Mantion_দিস না ইমরান বস এর মন ভালো নেই আস্কে-!💔🥀",
      "👉আমার বস ইমরান এখন বিজি আছে 😎 ইনবক্সে মেসেজ দিয়ে রাখো 🐒",
      "বস ইমরান এখন বিজি 😼 যা বলার আমাকে বলতে পারেন 🥰",
      "বস ইমরান এখন sleeping mode এ আছে 😴",
      "ইমরান বস এখন প্রেম করতে বিজি 💋🤧",
      "এত mention না দিয়া inbox এ আসো 😏 premium reply দিবো 😹",
      "বস ইমরান এখন hot mood এ আছে 🥵 সাবধানে কথা বলো 😹"
    ];

    const caption = `
✿•━━━❖❖❖━━━✿
${captions[Math.floor(Math.random() * captions.length)]}
✿•━━━❖❖❖━━━✿
`;

    try {

      const songStream = await axios({
        url: songUrl,
        method: "GET",
        responseType: "stream",
        timeout: 10000,
        headers: {
          "User-Agent": "Mozilla/5.0"
        }
      });

      await message.reply({
        body: caption,
        attachment: [songStream.data]
      });

    } catch (err) {
      console.log("❌ Song Error:", err.message);

      await message.reply({
        body: "😢 Voice দিতে পারলাম না"
      });
    }
  }
};