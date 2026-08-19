# Meta Ads → Telegram Landing Page

A fast, mobile-first landing page that sits between your Meta (Facebook/Instagram) ads and your Telegram channel. Provides proper Meta Pixel tracking and campaign attribution without any backend infrastructure.

## The Funnel

```text
Facebook / Instagram Ad
        ↓
https://yourdomain.com/join?utm_source=facebook&utm_medium=paid&utm_campaign=...
        ↓
Landing Page (Meta Pixel fires PageView)
        ↓
"Join Telegram" button (Meta Pixel fires TelegramClick)
        ↓
Telegram Channel
```

## Tech Stack

- **Next.js** — React framework, server-rendered pages
- **TypeScript** — Type safety
- **Tailwind CSS v4** — Styling
- **Vercel** — Deployment (zero config)

No database. No backend. No external analytics.

---

## Quick Start

### 1. Clone and install

```bash
git clone <your-repo-url>
cd meta-ads-telegram
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_TELEGRAM_URL=https://t.me/YOUR_ACTUAL_CHANNEL
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 3. Run locally

```bash
npm run dev
```

Visit [http://localhost:3000/join](http://localhost:3000/join)

### 4. Edit content

All page copy is in `src/lib/config.ts`:

```ts
hero: {
  headline: "Join Our Telegram Channel",
  description: "Get the latest updates...",
},
cta: {
  text: "Join Telegram",
},
```

---

## Vercel Deployment

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-url>
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel auto-detects Next.js — no build settings needed
5. Add environment variables:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_TELEGRAM_URL` | `https://t.me/YOUR_CHANNEL` |
| `NEXT_PUBLIC_META_PIXEL_ID` | Your Pixel ID |
| `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` |

6. Click **Deploy**

### 3. Custom domain

1. In Vercel project → **Settings** → **Domains**
2. Add your domain (e.g., `yourdomain.com`)
3. Follow the DNS instructions (A record or CNAME)
4. SSL is automatic

---

## Meta Pixel Setup

### 1. Create a Meta Pixel

1. Go to [Meta Events Manager](https://business.facebook.com/events_manager)
2. Click **"Connect Data Sources"** → **"Web"**
3. Name your Pixel and click **"Create Pixel"**
4. Copy the **Pixel ID** (a long number like `123456789012345`)
5. Set it as `NEXT_PUBLIC_META_PIXEL_ID` in your environment

### 2. Events tracked

| Event | Type | When |
|---|---|---|
| `PageView` | Standard | Page loads |
| `TelegramClick` | Custom | User clicks "Join Telegram" |

### 3. Verify in Events Manager

1. Open [Events Manager](https://business.facebook.com/events_manager)
2. Select your Pixel
3. Go to **"Test Events"**
4. Visit your landing page
5. You should see `PageView` fire
6. Click the Telegram button
7. You should see `TelegramClick` fire

---

## Meta Ads Manager Setup

### 1. Ad destination URL

In your ad, set the **Website URL** to:

```
https://yourdomain.com/join
```

**NOT** `https://t.me/YOUR_CHANNEL`

### 2. URL parameters

In the ad setup, under **"URL Parameters"** (or **"Build a URL parameter"**), add:

```
utm_source=facebook&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.name}}
```

This uses Meta's dynamic macros:

| Macro | Replaced with |
|---|---|
| `{{campaign.name}}` | Your campaign name |
| `{{campaign.id}}` | Campaign ID |
| `{{adset.name}}` | Ad set name |
| `{{adset.id}}` | Ad set ID |
| `{{ad.name}}` | Ad name |
| `{{ad.id}}` | Ad ID |
| `{{placement}}` | Where the ad appeared |
| `{{site_source_name}}` | Platform (fb, ig) |

> **Tip:** Avoid spaces and special characters in campaign/ad names — they appear as `%20` in URLs and make reporting messy.

### 3. Custom conversion (optional)

To optimize ads for `TelegramClick`:

1. Go to **Events Manager** → **Custom Conversions**
2. Create a conversion based on the `TelegramClick` event
3. In your campaign, set it as the optimization event

---

## What Is Tracked

✅ **Tracked via Meta Pixel:**
- Page views (someone landed on your page)
- Telegram button clicks (someone intends to join)
- Attribution: which campaign / ad / placement drove each event

✅ **Tracked via URL parameters:**
- `fbclid` — Meta's click ID
- `utm_source` — Traffic source (e.g., `facebook`)
- `utm_medium` — Medium (e.g., `paid`)
- `utm_campaign` — Campaign name
- `utm_content` — Ad name
- `utm_term` — Keyword (if used)

## What Is NOT Tracked

❌ **Not tracked at this stage:**
- Whether the user actually joined the Telegram channel
- Telegram username or ID
- Phone numbers, emails, or any PII
- Server-side events (no Conversions API)
- Cross-device attribution beyond Pixel capabilities

> **Important:** `TelegramClick` ≠ confirmed Telegram join. It means the user clicked the button and was directed to Telegram. They may or may not have actually joined.

---

## Measuring the Funnel in Meta Ads Manager

You can measure:

```text
Ad impressions         → Ads Manager (built-in)
Link clicks            → Ads Manager (built-in)
Landing page views     → PageView event in Pixel
Telegram button clicks → TelegramClick event in Pixel
Telegram members       → Telegram channel stats (manual)
```

---

## Debug Mode

In development (`npm run dev`), a debug panel appears at the bottom of the page showing:

- Meta Pixel ID
- Telegram URL
- `fbclid`, `_fbp`, `_fbc` values
- All UTM parameters

This panel is automatically hidden in production.

Test with URL parameters:

```
http://localhost:3000/join?fbclid=test123&utm_source=facebook&utm_medium=paid&utm_campaign=test_campaign&utm_content=ad_01
```

---

## Testing Checklist

### ✅ Normal visit
- [ ] `http://localhost:3000/join` loads
- [ ] Telegram button is immediately visible
- [ ] Button links to your Telegram channel

### ✅ Meta-style visit
- [ ] `http://localhost:3000/join?fbclid=test123&utm_source=facebook&utm_medium=paid&utm_campaign=test` loads
- [ ] Debug panel shows all parameters
- [ ] Parameters are stored in sessionStorage

### ✅ CTA click
- [ ] Clicking "Join Telegram" fires `TelegramClick` in Pixel
- [ ] Telegram opens (or t.me link in browser)

### ✅ Tracking failure
- [ ] With ad blocker enabled, button still works
- [ ] With JavaScript disabled, button still links to Telegram

### ✅ Mobile
- [ ] Page looks correct at 375px width
- [ ] Button is large and easy to tap
- [ ] Telegram app opens on mobile (where installed)

---

## Future Upgrade Path

When you're ready for deeper attribution, you can add:

1. **Supabase** — Store click events with attribution data
2. **Telegram Bot** — Detect when users actually join the channel
3. **Meta Conversions API** — Server-side event reporting for better optimization
4. **Join attribution** — Match Telegram joins back to specific ads

The current architecture is designed so these can be added incrementally without rebuilding the frontend.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx         # Root layout, fonts, Meta Pixel, metadata
│   ├── page.tsx           # Redirects / → /join
│   ├── globals.css        # Tailwind + custom styles
│   └── join/
│       └── page.tsx       # The landing page
├── components/
│   ├── MetaPixel.tsx      # Pixel initialization + PageView
│   ├── TelegramCTA.tsx    # CTA button with click tracking
│   ├── DebugPanel.tsx     # Dev-only debug overlay
│   └── TelegramIcon.tsx   # Inline SVG icon
└── lib/
    ├── config.ts          # All editable site configuration
    ├── pixel.ts           # Meta Pixel helper functions
    └── attribution.ts     # UTM/fbclid capture & storage
```

---

## License

Private project. Not for redistribution.
