export const siteConfig = {
  telegramUrl:
    process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/YOUR_CHANNEL",

  pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",

  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com",
  siteName: "Telegram Channel",

  hero: {
    headline: "Join Our Telegram Channel",
    description:
      "Get the latest updates, exclusive content, useful resources and more — delivered directly on Telegram.",
  },

  cta: {
    text: "Join Telegram",
  },

  trustSignals: ["Free", "Instant Access", "No Spam"],

  seo: {
    title: "Join Our Telegram Channel",
    description:
      "Get the latest updates, exclusive content, and useful resources. Join our Telegram channel for free.",
  },
} as const;
