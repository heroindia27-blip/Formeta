"use client";

import { useEffect } from "react";
import { initPixel, trackPageView } from "@/lib/pixel";
import { captureAttribution } from "@/lib/attribution";
import { siteConfig } from "@/lib/config";

export function MetaPixel() {
  useEffect(() => {
    if (siteConfig.pixelId) {
      initPixel(siteConfig.pixelId);
      trackPageView();
    }
    captureAttribution();
  }, []);

  if (!siteConfig.pixelId) return null;

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${siteConfig.pixelId}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}
