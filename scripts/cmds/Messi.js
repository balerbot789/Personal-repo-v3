const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "messi",
    aliases: ["leo"],
    version: "1.0.1",
    author: "MAMUN",
    countDown: 5,
    role: 0,
    shortDescription: "Random Messi Troll Image",
    longDescription: "Send Random Messi Troll Image",
    category: "fun",
    guide: "{pn}"
  },

  onStart: async function ({ message }) {
    try {

      const images = [
        "https://files.catbox.moe/na6yn6",
        "https://files.catbox.moe/bqmcu3",
        "https://files.catbox.moe/in1e6e",
        "https://files.catbox.moe/aagwjp",
        "https://files.catbox.moe/g4nwbc",
        "https://files.catbox.moe/tumuaa",
        "https://files.catbox.moe/yduynm",
        "https://files.catbox.moe/md5f1b",
        "https://files.catbox.moe/unwlk2",
        "https://files.catbox.moe/2tbisq"
      ];

      const img = images[Math.floor(Math.random() * images.length)];

      const cache = path.join(__dirname, "cache");
      await fs.ensureDir(cache);

      const filePath = path.join(cache, `messi_${Date.now()}.jpg`);

      const response = await axios.get(img, {
        responseType: "arraybuffer",
        timeout: 20000,
        headers: {
          "User-Agent": "Mozilla/5.0"
        }
      });

      fs.writeFileSync(filePath, Buffer.from(response.data));

      await message.reply({
        body:
`Le Togo Messi`,
        attachment: fs.createReadStream(filePath)
      });

      fs.unlinkSync(filePath);

    } catch (err) {
      console.log(err);
      return message.reply("❌ Error: " + err.message);
    }
  }
};
