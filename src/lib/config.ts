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
    title: "Rishita Xi | Toss Queen | Accurate Cricket Toss Predictions",
    description:
      "Join the official Telegram channel of Rishita Xi (Toss Queen). Get 100% accurate cricket toss predictions, match analysis, and premium winning tips for free.",
    keywords: [
      "toss queen",
      "rishita xi",
      "cricket toss prediction",
      "toss prediction telegram channel",
      "accurate toss prediction",
      "match prediction",
      "cricket betting tips",
      "free toss prediction",
      "toss king",
      "best telegram channel for cricket predictions"
    ],
  },
} as const;
