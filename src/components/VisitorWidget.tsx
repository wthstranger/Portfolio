import { useState, useEffect } from "react";
import { Eye, MapPin, Clock, Moon, Sun, BookOpen, Music } from "lucide-react";

interface VisitorWidgetProps {
  isLightMode: boolean;
  onToggleTheme: () => void;
}

export default function VisitorWidget({ isLightMode, onToggleTheme }: VisitorWidgetProps) {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState("");

  // Live Clock for India (UTC+5:30)
  useEffect(() => {
    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setCurrentTime(formatter.format(new Date()));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch real persistent visitor counter
  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const res = await fetch("/api/visitor-count");
        if (res.ok) {
          const data = await res.json();
          setVisitorCount(data.count);
        }
      } catch (err) {
        setVisitorCount(164); // Fallback
      }
    };
    fetchVisitorCount();
  }, []);

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-between p-5 frosted-card relative overflow-hidden select-none">
      
      {/* Light/Dark Toggle and Visitor Count */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Toggle Theme Button */}
        <button
          onClick={onToggleTheme}
          className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer flex items-center justify-center shadow-lg"
          title={isLightMode ? "Switch to Dark" : "Switch to Light"}
        >
          {isLightMode ? (
            <Moon className="w-4 h-4 text-purple-400" />
          ) : (
            <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
          )}
        </button>

        {/* Real visitor counter */}
        <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
          <Eye className="w-4 h-4 text-cyan-400" />
          <div className="text-xs font-mono">
            <span className="text-zinc-400 mr-1">VISITORS:</span>
            <span className="text-white font-bold tracking-wider">
              {visitorCount !== null ? visitorCount.toLocaleString() : "..."}
            </span>
          </div>
        </div>
      </div>

      {/* Spotify style Learning ticker */}
      <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 px-4 py-2 rounded-xl max-w-full md:max-w-md flex-1">
        <div className="relative flex h-3 w-3 items-center justify-center shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
        </div>
        <BookOpen className="w-4 h-4 text-[#FF3B3B] shrink-0" />
        <div className="overflow-hidden whitespace-nowrap text-xs text-ellipsis">
          <span className="text-zinc-400 mr-1 font-semibold">Gopi is learning:</span>
          <span className="text-zinc-300 font-mono tracking-tight font-medium">
            Cyber Security & Bug Bounty Methodologies
          </span>
        </div>
      </div>

      {/* Clock and Location */}
      <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 shrink-0">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-zinc-400" />
          <span>India</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 border border-white/10 rounded-xl">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-white font-bold">{currentTime || "00:00:00 AM"}</span>
          <span className="text-zinc-500 text-[10px]">IST</span>
        </div>
      </div>

    </div>
  );
}
