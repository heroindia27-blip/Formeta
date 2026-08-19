export interface AttributionData {
  fbclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbp?: string;
  fbc?: string;
}

const STORAGE_KEY = "meta_attribution";

const TRACKED_PARAMS = [
  "fbclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)"
    )
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  try {
    const params = new URLSearchParams(window.location.search);
    const data: Record<string, string> = {};

    for (const key of TRACKED_PARAMS) {
      const value = params.get(key);
      if (value) {
        data[key] = value;
      }
    }

    const fbp = getCookie("_fbp");
    const fbc = getCookie("_fbc");
    if (fbp) data.fbp = fbp;
    if (fbc) data.fbc = fbc;

    if (Object.keys(data).length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  } catch {
    // silent
  }
}

export function getAttribution(): AttributionData {
  if (typeof window === "undefined") return {};

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as AttributionData;
  } catch {
    return {};
  }
}
