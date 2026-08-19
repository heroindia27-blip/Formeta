import { siteConfig } from "@/lib/config";
import { TelegramCTA } from "@/components/TelegramCTA";
import { DebugPanel } from "@/components/DebugPanel";
import { TelegramIcon } from "@/components/TelegramIcon";

export default function JoinPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 sm:py-20">
      <div className="hero-glow flex flex-col items-center text-center max-w-lg w-full">
        <div className="mb-6 sm:mb-8">
          <div
            className="
              inline-flex items-center justify-center
              w-16 h-16 sm:w-20 sm:h-20
              rounded-2xl
              bg-[#2AABEE]/10 border border-[#2AABEE]/20
            "
          >
            <TelegramIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#2AABEE]" />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          {siteConfig.hero.headline}
        </h1>

        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted leading-relaxed max-w-md">
          {siteConfig.hero.description}
        </p>

        <div className="mt-8 sm:mt-10 w-full flex justify-center">
          <TelegramCTA />
        </div>

        <div className="mt-6 flex items-center gap-2 text-sm text-muted">
          {siteConfig.trustSignals.map((signal, i) => (
            <span key={signal} className="flex items-center gap-2">
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
