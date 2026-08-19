"use client";

import { useEffect, useState } from "react";
import { getAttribution, type AttributionData } from "@/lib/attribution";
import { siteConfig } from "@/lib/config";

export function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [attribution, setAttribution] = useState<AttributionData>({});

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const timer = setTimeout(() => {
      setAttribution(getAttribution());
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const rows: [string, string | undefined][] = [
    ["Meta Pixel ID", siteConfig.pixelId || "(not set)"],
    ["Telegram URL", siteConfig.telegramUrl],
    ["fbclid", attribution.fbclid],
    ["_fbp", attribution.fbp],
    ["_fbc", attribution.fbc],
    ["utm_source", attribution.utm_source],
    ["utm_medium", attribution.utm_medium],
    ["utm_campaign", attribution.utm_campaign],
    ["utm_content", attribution.utm_content],
    ["utm_term", attribution.utm_term],
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          ml-4 mb-2 px-3 py-1.5
          bg-amber-500/90 hover:bg-amber-500
          text-black text-xs font-mono font-bold
          rounded-t-lg rounded-b-none
          transition-colors
        "
        type="button"
      >
        {isOpen ? "▼ Debug" : "▲ Debug"}
      </button>

      {isOpen && (
        <div className="bg-gray-900/95 backdrop-blur-sm border-t border-amber-500/30 p-4 text-xs font-mono">
          <div className="max-w-lg mx-auto space-y-1">
            <div className="text-amber-400 font-bold mb-2">
              🔍 Debug Panel (dev only)
            </div>
            {rows.map(([label, value]) => (
              <div key={label} className="flex gap-2">
                <span className="text-gray-400 shrink-0 w-28">{label}:</span>
                <span
                  className={
                    value && value !== "(not set)"
                      ? "text-green-400 break-all"
                      : "text-gray-600"
                  }
                >
                  {value || "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
