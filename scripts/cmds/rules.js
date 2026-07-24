module.exports = {
  config: {
    name: "rules",
    version: "1.0.0",
    author: "MAMUN",
    countDown: 5,
    role: 0,
    shortDescription: "Show group rules",
    longDescription: "Displays the group rules",
    category: "info",
    guide: "{pn}"
  },

  onStart: async function ({ message }) {
    const rules = `
📜 𝗚𝗥𝗢𝗨𝗣 𝗥𝗨𝗟𝗘𝗦 📜 

🚫 অন্য কোনো গ্রুপের প্রচার, আলোচনা বা লিংক শেয়ার করা সম্পূর্ণ নিষিদ্ধ।

🔞 ১৮+ / অশ্লীল ছবি, ভিডিও, লেখা বা যেকোনো ধরনের কনটেন্ট শেয়ার করা যাবে না।

🚷 কোনো সদস্যকে ইনবক্সে ডাকা বা অপ্রয়োজনীয়ভাবে বিরক্ত করা যাবে না।

🔇 রাজনৈতিক কোনো বিষয় নিয়ে আলোচনা করা সম্পূর্ণ নিষিদ্ধ।

⛔ কোনো সমস্যা হলে সরাসরি অ্যাডমিনের সাথে যোগাযোগ করুন।

✅ সবাই গ্রুপের নিয়ম মেনে চলবেন।

❌ উপরোক্ত যেকোনো নিয়ম ভঙ্গ করলে কোনো প্রকার নোটিশ ছাড়াই গ্রুপ থেকে Kick/Remove করা হবে।

💝 ধন্যবাদ`;

    return message.reply(rules);
  }
};
