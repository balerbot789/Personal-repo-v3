const multipliers = [
  1.10, 1.25, 1.50, 1.75, 2.00,
  2.50, 3.00, 4.00, 5.00, 7.00,
  10.00
];

module.exports = {
  config: {
    name: "crash",
    version: "1.0.1",
    author: "MAMUN-author cng korle tor ammu ke xudi",
    countDown: 5,
    role: 0,
    shortDescription: "Crash Game",
    longDescription: "Bet coins and test your luck.",
    category: "game",
    guide: {
      en: "{pn} <bet>"
    }
  },

  onStart: async function ({ message, event, args, usersData }) {
    const bet = parseInt(args[0]);

    if (isNaN(bet) || bet < 100)
      return message.reply("❌ Minimum bet is 100 coins.");

    const userData = await usersData.get(event.senderID);

    if (!userData || (userData.money || 0) < bet)
      return message.reply("❌ You don't have enough coins.");

    const crashPoint = Number((Math.random() * 9 + 1).toFixed(2));
    const cashOut = multipliers[Math.floor(Math.random() * multipliers.length)];

    let money = userData.money || 0;

    if (cashOut <= crashPoint) {
      const reward = Math.floor(bet * cashOut);
      const profit = reward - bet;
      money += profit;

      await usersData.set(event.senderID, {
        ...userData,
        money
      });

      return message.reply(
`🚀 CRASH GAME

💸 Bet: ${bet} coins
📈 Cash Out: ${cashOut}x
💥 Crash: ${crashPoint}x

🎉 You won ${reward} coins!
💰 Profit: ${profit} coins`
      );
    } else {
      money -= bet;

      await usersData.set(event.senderID, {
        ...userData,
        money
      });

      return message.reply(
`🚀 CRASH GAME

💸 Bet: ${bet} coins
📈 Cash Out: ${cashOut}x
💥 Crash: ${crashPoint}x

💀 You lost ${bet} coins!`
      );
    }
  }
};
