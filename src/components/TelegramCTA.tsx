"use client";

import { useCallback } from "react";
import { trackLead, trackTelegramClick } from "@/lib/pixel";
import { getAttribution } from "@/lib/attribution";
import { siteConfig } from "@/lib/config";
import { TelegramIcon } from "./TelegramIcon";

export function TelegramCTA() {
  const handleClick = useCallback(() => {
    try {
      trackLead();
      const attribution = getAttribution();
      trackTelegramClick({
        ...(attribution.utm_source && { source: attribution.utm_source }),
        ...(attribution.utm_medium && { medium: attribution.utm_medium }),
        ...(attribution.utm_campaign && { campaign: attribution.utm_campaign }),
        ...(attribution.utm_content && { content: attribution.utm_content }),
      });
    } catch {
      // silent
    }
  }, []);

  return (
    <a
      id="telegram-cta"
      href={siteConfig.telegramUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="
        group
        inline-flex items-center justify-center gap-2.5 sm:gap-3
        px-6 py-3.5 sm:px-10 sm:py-5
        bg-[#2AABEE] hover:bg-[#229ED9] active:bg-[#1A8BC7]
        text-white font-semibold text-base sm:text-xl
        rounded-2xl
        shadow-lg shadow-[#2AABEE]/25 hover:shadow-xl hover:shadow-[#2AABEE]/30
        transition-all duration-200 ease-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AABEE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]
        min-h-[48px] sm:min-h-[52px]
        w-full max-w-xs sm:max-w-sm
        select-none
      "
    >
      <TelegramIcon className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 transition-transform duration-200 group-hover:scale-110" />
      <span>{siteConfig.cta.text}</span>
    </a>
  );
}
