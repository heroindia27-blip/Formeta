export const siteConfig = {
  telegramUrl:
    process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/YOUR_CHANNEL",

  pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",

  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com",
  siteName: "⚜️💎 𝐑𝐈𝐒𝐇𝐈𝐓𝐀 𝐗𝐈⚜️𝐓𝐎𝐒𝐒 𝐐𝐔𝐄𝐄𝐍⚜️💎",

  hero: {
    headline: "⚜️💎 𝐑𝐈𝐒𝐇𝐈𝐓𝐀 𝐗𝐈⚜️𝐓𝐎𝐒𝐒 𝐐𝐔𝐄𝐄𝐍⚜️💎",
    description:
      "Exclusive toss predictions with proven accuracy — join for free today.",
    image: "/profile.png",
  },

  cta: {
    text: "Join Telegram",
  },

  trustSignals: ["Free", "Instant Access", "Exclusive Content"],

  seo: {
    title: "⚜️💎 RISHITA XI ⚜️ TOSS QUEEN ⚜️💎 — Join on Telegram",
    description:
      "Join the exclusive Telegram channel of Rishita Xi — Toss Queen. Get the latest updates, premium content, and more.",
  },
} as const;
