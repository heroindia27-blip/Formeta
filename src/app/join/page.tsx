import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { TelegramCTA } from "@/components/TelegramCTA";
import { DebugPanel } from "@/components/DebugPanel";

export default function JoinPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-5 py-10 sm:px-6 sm:py-20">
      <div className="hero-glow flex flex-col items-center text-center max-w-lg w-full">
        <div className="mb-5 sm:mb-8">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-2 ring-[#2AABEE]/30 ring-offset-4 ring-offset-[#0a0a0f]">
            <Image
              src={siteConfig.hero.image}
              alt={siteConfig.siteName}
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width: 640px) 96px, 128px"
            />
          </div>
        </div>

        <h1 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug px-2">
          {siteConfig.hero.headline}
        </h1>

        <p className="mt-3 sm:mt-5 text-sm sm:text-base text-muted leading-relaxed max-w-sm sm:max-w-md">
          {siteConfig.hero.description}
        </p>

        <div className="mt-6 sm:mt-10 w-full flex justify-center">
          <TelegramCTA />
        </div>

        <div className="mt-5 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted">
          {siteConfig.trustSignals.map((signal, i) => (
            <span key={signal} className="flex items-center gap-1.5 sm:gap-2">
              {i > 0 && (
                <span
                  className="w-1 h-1 rounded-full bg-muted/40"
                  aria-hidden="true"
                />
              )}
              <span>{signal}</span>
            </span>
          ))}
        </div>
      </div>

      <DebugPanel />
    </main>
  );
}
