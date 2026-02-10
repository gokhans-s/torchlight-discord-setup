const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const TOKEN = process.env.BOT_TOKEN;

client.once("ready", async () => {
  console.log(`Bot aktif: ${client.user.tag}`);

  for (const guild of client.guilds.cache.values()) {

    const roles = [
      "👑 Owner",
      "🛡️ Admin",
      "🔧 Moderatör",
      "📺 Yayıncı",
      "⭐ Abone",
      "⚔️ Veteran",
      "🔰 Yeni Oyuncu",
      "👀 İzleyici"
    ];

    for (const name of roles) {
      if (!guild.roles.cache.find(r => r.name === name)) {
        await guild.roles.create({ name });
      }
    }

    const structure = {
      "📌 | BİLGİ": [
        "📜-kurallar",
        "📣-duyurular",
        "📺-canli-yayin",
        "❓-sss"
      ],
      "💬 | TOPLULUK": [
        "💬-genel-sohbet",
        "🎮-oyun-sohbeti",
        "😂-meme-ve-eglence",
        "🖼️-ekran-goruntuleri"
      ],
      "🔥 | TORCHLIGHT INFINITE": [
        "🧠-build-rehberleri",
        "⚙️-item-ve-craft",
        "📊-meta-ve-tierlist",
        "❓-yardim-destek",
        "🗺️-sezon-sohbeti"
      ],
      "📺 | YAYIN": [
        "📢-yayin-duyurulari",
        "💬-yayin-sohbeti",
        "🎁-cekilisler"
      ]
    };

    for (const [cat, chans] of Object.entries(structure)) {
      let category = guild.channels.cache.find(
        c => c.name === cat && c.type === 4
      );

      if (!category) {
        category = await guild.channels.create({
          name: cat,
          type: 4
        });
      }

      for (const ch of chans) {
        if (!guild.channels.cache.find(c => c.name === ch)) {
          await guild.channels.create({
            name: ch,
            parent: category.id,
            type: 0
          });
        }
      }
    }

    console.log("Kurulum tamamlandı ✅");
  }

  process.exit(0);
});

client.login(TOKEN);
