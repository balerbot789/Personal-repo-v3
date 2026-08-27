module.exports = {
 config: {
 name: "upt",
 aliases: ["upt", "rtm", "runtime"],
 version: "1.7",
 author: "𝗧𝗠 ^〲𝗠𝗔𝗠𝗨𝗡ツ࿐ ⁰⁰⁷",
 countDown: 5,
 role: 0,
 shortDescription: {
 en: "Check bot uptime, memory & CPU",
 vi: "Xem uptime, bộ nhớ và CPU"
 },
 description: {
 en: "Shows bot uptime, memory and CPU usage",
 vi: "Hiển thị thời gian, bộ nhớ và CPU của bot"
 },
 category: "info",
 guide: {
 en: "{pn}",
 vi: "{pn}"
 }
 },

 onStart: async function ({ message }) {
 // Uptime
 const time = process.uptime();
 const hours = Math.floor(time / (60 * 60));
 const minutes = Math.floor((time % (60 * 60)) / 60);
 const seconds = Math.floor(time % 60);
 const uptimeStr = `${hours}h ${minutes}m ${seconds}s`;

 // Start time
 const startTime = new Date(Date.now() - process.uptime() * 1000);
 const startStr = startTime.toLocaleString("en-BD", {
 timeZone: "Asia/Dhaka",
 hour12: true
 });

 // Memory
 const memory = process.memoryUsage();
 const usedMB = (memory.heapUsed / 1024 / 1024).toFixed(2);
 const totalMB = (memory.heapTotal / 1024 / 1024).toFixed(2);
 const freeMB = (totalMB - usedMB).toFixed(2);

 // CPU
 const cpuUsage = process.cpuUsage();
 const totalCPU = (cpuUsage.user + cpuUsage.system) / 1000;
 const cpuPercent = ((totalCPU / (process.uptime() * 1000)) * 100).toFixed(2);

 // Prefix (safe way)
 let prefix = "/";
 try {
 prefix = global.GoatBot?.config?.prefix || "/";
 } catch (e) {
 prefix = "/";
 }

 const msg = 
`⏰ 𝗕𝗢𝗧 𝗦𝗧𝗔𝗧𝗨𝗦

⏳ 𝗨𝗽𝘁𝗶𝗺𝗲
➤ 𝗥𝘂𝗻𝗻𝗶𝗻𝗴: ${uptimeStr}
➤ 𝗦𝘁𝗮𝗿𝘁𝗲𝗱: ${startStr}
➤ 𝗣𝗿𝗲𝗳𝗶𝘅: ${prefix}

💾 𝗠𝗲𝗺𝗼𝗿𝘆
➤ 𝗨𝘀𝗲𝗱: ${usedMB} 𝗠𝗕
➤ 𝗧𝗼𝘁𝗮𝗹: ${totalMB} 𝗠𝗕
➤ 𝗙𝗿𝗲𝗲: ${freeMB} 𝗠𝗕

🖥️ 𝗖𝗣𝗨
➤ 𝗨𝘀𝗮𝗴𝗲: ${cpuPercent}%`;

 return message.reply(msg);
 }
};
