import { useEffect, useState } from "react";

function formatKarachiTime() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Karachi",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

/**
 * Top-right HUD: system status, PKT time, coordinates — reads on space background.
 */
export function StatusHUD() {
  const [time, setTime] = useState(formatKarachiTime);

  useEffect(() => {
    setTime(formatKarachiTime());
    const id = setInterval(() => setTime(formatKarachiTime()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="hero-scroll-out absolute right-6 top-28 z-30 hidden rounded-xl border border-white/10 bg-[#0E0E0D]/55 px-4 py-3 shadow-[0_24px_60px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl lg:block md:right-16 xl:right-10"
      role="status"
      aria-live="polite"
      aria-label="System status and local time"
    >
      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/70">
        SYS // ONLINE
      </div>
      <div className="mt-1 font-display text-sm text-white">
        {time}{" "}
        <span className="text-white/40">PKT</span>
      </div>
      <div className="mt-0.5 font-mono text-[10px] text-white/45">24.86°N · 67.00°E</div>
    </div>
  );
}
