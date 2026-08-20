/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

function isFbqAvailable(): boolean {
  return typeof window !== "undefined" && typeof window.fbq === "function";
}

export function initPixel(pixelId: string): void {
  if (typeof window === "undefined" || !pixelId) return;
  if (isFbqAvailable()) return;

  try {
    const f: any = (window.fbq = function (...args: any[]) {
      if (f.callMethod) {
        f.callMethod(...args);
      } else {
        f.queue.push(args);
      }
    });

    if (!window._fbq) window._fbq = f;
    f.push = f;
    f.loaded = true;
    f.version = "2.0";
    f.queue = [];

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript?.parentNode?.insertBefore(script, firstScript);

    window.fbq("init", pixelId);
  } catch {
    // silent
  }
}

export function trackPageView(): void {
  if (!isFbqAvailable()) return;
  try {
    window.fbq("track", "PageView");
  } catch {
    // silent
  }
}

export function trackLead(): void {
  if (!isFbqAvailable()) return;
  try {
    window.fbq("track", "Lead");
  } catch {
    // silent
  }
}

export function trackTelegramClick(params?: Record<string, string>): void {
  if (!isFbqAvailable()) return;
  try {
    window.fbq("trackCustom", "TelegramClick", params || {});
  } catch {
    // silent
  }
}
