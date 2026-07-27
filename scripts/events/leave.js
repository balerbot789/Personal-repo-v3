const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "leave",
    eventType: ["log:unsubscribe"],
    version: "1.1",
    author: "MAMUN"
  },

  onStart: async ({ api, event, usersData }) => {
    try {
      const botID = api.getCurrentUserID();
      const leftID = event.logMessageData.leftParticipantFbId;

      if (leftID == botID) return;

      const user = await usersData.get(leftID);
      const name = user?.name || "Unknown User";

      const isKick = event.author != leftID;

      const msg = isKick
        ? `🚫 ${name} was removed from the group by an admin.`
        : `👋 ${name} left the group.\n\nGoodbye, we'll miss you! ❤️`;

      const imgUrl = "https://i.imgur.com/pjLcx5m.jpeg";
      const imgPath = path.join(__dirname, "cache", "leave.jpg");

      await fs.ensureDir(path.join(__dirname, "cache"));

      const res = await axios({
        url: imgUrl,
        responseType: "arraybuffer"
      });

      fs.writeFileSync(imgPath, res.data);

      api.sendMessage(
        {
          body: msg,
          attachment: fs.createReadStream(imgPath)
        },
        event.threadID,
        () => {
          if (fs.existsSync(imgPath))
            fs.unlinkSync(imgPath);
        }
      );

    } catch (e) {
      console.log(e);
    }
  }
};
