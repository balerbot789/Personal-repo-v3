const os = require("os");
const { createCanvas, loadImage } = require("canvas");
const fs = require("fs-extra");
const path = require("path");

// Global Cache
let cachedBackground = null;
const CACHE_PATH = path.join(__dirname, "cache");

module.exports = {
  config: {
    name: "up2",
    aliases: ["up2"],
    version: "1.7",
    author: "Mamun",
    countDown: 5,
    role: 0,
    shortDescription: "Mamun Bot Dashboard",
    longDescription: "High performance canvas dashboard",
    category: "info",
    guide: "{pn}"
  },

  onStart: async function ({ api, event, message }) {
    const startTime = Date.now();

    try {
      // ===== Bot Uptime (process.uptime) =====
      const botUptimeSec = process.uptime();
      const botUptime = formatUptime(botUptimeSec);

      // System Uptime
      const systemUptime = formatUptime(os.uptime());

      const totalMem = os.totalmem() / 1073741824;
      const usedMem = totalMem - os.freemem() / 1073741824;
      const ramUsage = `${usedMem.toFixed(2)} GB / ${totalMem.toFixed(2)} GB`;
      const cpuLoad = ((os.loadavg()[0] / os.cpus().length) * 100).toFixed(1) + "%";
      const platform = `\( {os.platform()} ( \){os.arch()})`;
      const hostname = os.hostname();
      const nodeVersion = process.version;

      // User Name
      let userName = "User";
      try {
        const info = await api.getUserInfo(event.senderID);
        userName = info[event.senderID]?.name || "User";
        if (userName.length > 16) userName = userName.substring(0, 15) + "...";
      } catch (e) {}

      // Canvas
      const canvas = createCanvas(900, 520);
      const ctx = canvas.getContext("2d");

      // Background (Cached)
      if (!cachedBackground) {
        try {
          cachedBackground = await loadImage("https://i.imgur.com/3lHp7W0.jpeg");
        } catch (e) {
          cachedBackground = null;
        }
      }

      if (cachedBackground) {
        ctx.drawImage(cachedBackground, 0, 0, 900, 520);
      } else {
        ctx.fillStyle = "#0a0f1a";
        ctx.fillRect(0, 0, 900, 520);
      }

      // Dark Overlay
      ctx.fillStyle = "rgba(0, 0, 0, 0.58)";
      ctx.fillRect(0, 0, 900, 520);

      // Outer Border
      ctx.strokeStyle = "#00f0ff";
      ctx.lineWidth = 4;
      roundRect(ctx, 10, 10, 880, 500, 16);
      ctx.stroke();

      // Left Panel
      ctx.fillStyle = "rgba(8, 12, 28, 0.82)";
      roundRect(ctx, 25, 25, 260, 470, 14);
      ctx.fill();

      // Profile Picture
      try {
        const avatarUrl = `https://graph.facebook.com/${event.senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
        const avatar = await loadImage(avatarUrl);

        ctx.save();
        ctx.beginPath();
        ctx.arc(155, 110, 64, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatar, 91, 46, 128, 128);
        ctx.restore();

        ctx.strokeStyle = "#00f0ff";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(155, 110, 67, 0, Math.PI * 2);
        ctx.stroke();
      } catch (e) {
        ctx.fillStyle = "#00f0ff";
        ctx.beginPath();
        ctx.arc(155, 110, 64, 0, Math.PI * 2);
        ctx.fill();
      }

      // Name
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 22px Arial";
      ctx.textAlign = "center";
      ctx.fillText(userName, 155, 208);

      ctx.fillStyle = "#00f0ff";
      ctx.font = "bold 13px Arial";
      ctx.fillText("SYSTEM CONTROLLER", 155, 232);

      // Online
      ctx.fillStyle = "#00ff88";
      ctx.beginPath();
      ctx.arc(118, 272, 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "15px Arial";
      ctx.textAlign = "left";
      ctx.fillText("Server Online", 134, 277);

      // Developer Box
      ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
      roundRect(ctx, 50, 420, 210, 55, 10);
      ctx.fill();
      ctx.strokeStyle = "#00f0ff";
      ctx.lineWidth = 2;
      roundRect(ctx, 50, 420, 210, 55, 10);
      ctx.stroke();

      ctx.fillStyle = "#00f0ff";
      ctx.font = "bold 13px Arial";
      ctx.textAlign = "center";
      ctx.fillText("DEVELOPER", 155, 442);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 17px Arial";
      ctx.fillText("Mamun", 155, 464);

      // ========== Title Changed ==========
      ctx.fillStyle = "#00f0ff";
      ctx.font = "bold 26px Arial";
      ctx.textAlign = "left";
      ctx.fillText("◆  MAMUN BOT DASHBOARD", 310, 58);

      // Divider
      ctx.strokeStyle = "rgba(0, 240, 255, 0.3)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(310, 72);
      ctx.lineTo(860, 72);
      ctx.stroke();

      // Info Rows (Bot Uptime first)
      const ping = Date.now() - startTime;
      const rows = [
        { label: "⏱  BOT UPTIME", value: botUptime },
        { label: "🖥  SYSTEM UPTIME", value: systemUptime },
        { label: "📶  BOT LATENCY (PING)", value: `${ping} ms` },
        { label: "💾  RAM USAGE", value: ramUsage },
        { label: "⚙️  CPU LOAD", value: cpuLoad },
        { label: "🟢  NODE.JS VERSION", value: nodeVersion },
        { label: "🌐  SERVER HOSTNAME", value: hostname }
      ];

      let y = 105;
      for (let i = 0; i < rows.length; i++) {
        ctx.fillStyle = "rgba(8, 12, 28, 0.75)";
        roundRect(ctx, 310, y, 550, 46, 8);
        ctx.fill();

        ctx.fillStyle = "#7df9ff";
        ctx.font = "bold 15px Arial";
        ctx.textAlign = "left";
        ctx.fillText(rows[i].label, 328, y + 29);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 17px Arial";
        ctx.textAlign = "right";
        ctx.fillText(rows[i].value, 840, y + 29);

        y += 55;
      }

      // Save & Send
      if (!fs.existsSync(CACHE_PATH)) fs.mkdirSync(CACHE_PATH);

      const filePath = path.join(CACHE_PATH, `uptime_${event.senderID}.png`);
      const buffer = canvas.toBuffer("image/png");
      await fs.writeFile(filePath, buffer);

      await message.reply({
        body: "📊 Mamun Bot Dashboard",
        attachment: fs.createReadStream(filePath)
      });

      setTimeout(() => {
        fs.unlink(filePath).catch(() => {});
      }, 12000);

    } catch (err) {
      console.error("Uptime Error:", err);
      return message.reply("❌ Dashboard generate করতে সমস্যা হয়েছে।");
    }
  }
};

function roundRect(ctx, x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function formatUptime(seconds) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${d}d ${h}h ${m}m ${s}s`;
      }
