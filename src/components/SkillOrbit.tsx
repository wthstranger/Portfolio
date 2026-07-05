import { useState } from "react";
import { skillCategoriesData } from "../data";
import { Code, Terminal, Database, ShieldAlert, Cpu, Sparkles } from "lucide-react";

export default function SkillOrbit() {
  const [activeTab, setActiveTab] = useState("lang");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Orbit circular nodes
  const centralSkillNodes = [
    { name: "Java", color: "from-red-500 to-rose-600", orbit: 1, angle: 0, icon: "☕" },
    { name: "Flutter", color: "from-cyan-400 to-blue-500", orbit: 1, angle: 120, icon: "📱" },
    { name: "Firebase", color: "from-amber-500 to-orange-600", orbit: 2, angle: 45, icon: "🔥" },
    { name: "WebRTC", color: "from-emerald-400 to-teal-500", orbit: 2, angle: 180, icon: "📞" },
    { name: "NestJS", color: "from-purple-500 to-indigo-600", orbit: 3, angle: 90, icon: "🛡️" },
    { name: "Security", color: "from-rose-500 to-pink-600", orbit: 3, angle: 270, icon: "🔒" },
  ];

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "lang":
        return <Code className="w-4 h-4 text-rose-500" />;
      case "mobile":
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case "backend":
        return <Database className="w-4 h-4 text-purple-400" />;
      default:
        return <ShieldAlert className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center select-none">
      
      {/* Left: 3D-Like Orbit Ring Solar System */}
      <div className="lg:col-span-5 flex justify-center items-center py-6">
        <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full border border-zinc-900 flex items-center justify-center">
          
          {/* Orbital Ring 1 */}
          <div className="absolute w-[220px] h-[220px] rounded-full border border-zinc-800/60 animate-spin-slow" />
          
          {/* Orbital Ring 2 */}
          <div className="absolute w-[150px] h-[150px] rounded-full border border-zinc-800/40 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "12s" }} />

          {/* Central Pulsing Engine Core */}
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 to-purple-600 p-[2px] shadow-2xl animate-pulse">
            <div className="w-full h-full rounded-full bg-zinc-950 flex flex-col items-center justify-center text-center p-2">
              <Sparkles className="w-4 h-4 text-rose-400 animate-spin-slow mb-0.5" />
              <span className="text-[9px] font-mono tracking-tight font-black text-white">GOPI'S</span>
              <span className="text-[8px] font-mono tracking-widest text-zinc-400">ENGINE</span>
            </div>
          </div>

          {/* Render revolving orbital nodes */}
          {centralSkillNodes.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            // Radius of orbits
            const radius = node.orbit === 1 ? 55 : node.orbit === 2 ? 88 : 115;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;

            return (
              <div
                key={i}
                className="absolute flex flex-col items-center justify-center transition-all duration-300"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                {/* Node bubble */}
                <div
                  onMouseEnter={() => setHoveredSkill(node.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-white/20 shadow-xl flex items-center justify-center text-sm cursor-help relative group transition-transform hover:scale-110`}
                >
                  <span>{node.icon}</span>

                  {/* Bubble popup tooltips */}
                  <span className="absolute -top-7 scale-0 group-hover:scale-100 transition-transform bg-zinc-950 text-[9px] font-mono font-bold border border-zinc-800 text-cyan-400 px-1.5 py-0.5 rounded shadow-xl whitespace-nowrap z-10">
                    {node.name}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Orbit legend status indicator */}
          <div className="absolute bottom-1 right-1 bg-zinc-900/40 border border-zinc-900 px-2 py-1 rounded text-[9px] font-mono text-zinc-500">
            {hoveredSkill ? `FOCUSING: ${hoveredSkill}` : "HOVER NODE"}
          </div>

        </div>
      </div>

      {/* Right: Technical skill lists with progress cards */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* Navigation Tab Group */}
        <div className="flex flex-wrap gap-2 border-b border-zinc-900 pb-3">
          {skillCategoriesData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 flex items-center gap-2 ${
                activeTab === cat.id
                  ? "bg-gradient-to-r from-red-600/10 to-purple-600/10 border border-red-500/20 text-white"
                  : "bg-transparent border border-transparent text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {getCategoryIcon(cat.id)}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Skill Category Nodes List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skillCategoriesData
            .find((cat) => cat.id === activeTab)
            ?.skills.map((skill, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-zinc-900/70 bg-[#0c0c0e]/80 hover:border-rose-500/10 transition-all duration-300 group shadow-md"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-[10px] font-mono font-semibold text-rose-500">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress track */}
                <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-rose-600 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
        </div>

        {/* Orbit hint footer */}
        <div className="p-3 bg-zinc-950/50 border border-zinc-900/60 rounded-lg text-[10px] font-mono text-zinc-500">
          * Skills represent self-assessed capability scores, backed by 1,000+ hours of coding & real Android app builds (TalkHub, Quiz App).
        </div>

      </div>

    </div>
  );
}
