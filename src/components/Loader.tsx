import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Terminal } from "lucide-react";

export default function Loader({ onFinish }: { onFinish: () => void }) {
  const [text, setText] = useState("");
  const [subText, setSubText] = useState("");
  const [step, setStep] = useState(0); // 0: Gopi, 1: Subtexts loop, 2: Done

  const nameToType = "GOPI KUMAR";
  const subtextRoles = [
    "Android Developer",
    "Flutter Developer",
    "Full Stack Learner",
    "Cybersecurity Student"
  ];

  // 1. Type Name
  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx <= nameToType.length) {
        setText(nameToType.substring(0, currentIdx));
        currentIdx++;
      } else {
        clearInterval(interval);
        // Transition to typing subtexts after 500ms
        setTimeout(() => setStep(1), 500);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // 2. Roll through Subtexts
  useEffect(() => {
    if (step !== 1) return;

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timer: NodeJS.Timeout;

    const typeRoles = () => {
      const currentRole = subtextRoles[roleIdx];

      if (!isDeleting) {
        setSubText(currentRole.substring(0, charIdx));
        charIdx++;

        if (charIdx > currentRole.length) {
          // Pause at the end
          isDeleting = true;
          timer = setTimeout(typeRoles, 1200);
          return;
        }
        timer = setTimeout(typeRoles, 80);
      } else {
        setSubText(currentRole.substring(0, charIdx));
        charIdx--;

        if (charIdx < 0) {
          isDeleting = false;
          charIdx = 0;
          roleIdx++;

          if (roleIdx >= subtextRoles.length) {
            // Completed all subtext roles! Move to completed state
            setStep(2);
            setTimeout(() => onFinish(), 800);
            return;
          }
        }
        timer = setTimeout(typeRoles, 40);
      }
    };

    typeRoles();
    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="fixed inset-0 z-50 bg-[#09090B] flex flex-col items-center justify-center font-mono text-white p-6 select-none">
      
      {/* Background elements */}
      <div className="absolute top-10 left-10 flex items-center gap-2 text-zinc-600 text-xs select-none">
        <Terminal className="w-4 h-4 text-primary animate-pulse" />
        <span>GOPISYS_BOOT_INIT_OK</span>
      </div>

      <div className="absolute bottom-10 right-10 text-zinc-600 text-xs flex items-center gap-2 select-none">
        <Cpu className="w-4 h-4 text-cyan-400 animate-spin-slow" />
        <span>SYS_FREQ_5.2_GHZ</span>
      </div>

      <div className="flex flex-col items-center max-w-lg w-full text-center space-y-4">
        
        {/* Animated Bracket Lines */}
        <div className="relative w-full py-8 border-y border-zinc-900/60 flex flex-col items-center justify-center">
          
          {/* Main Title Typing */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-3xl md:text-5xl font-black font-space tracking-[0.2em] text-white flex items-center gap-1"
          >
            {text}
            <span className="w-3.5 h-8 md:h-11 bg-primary animate-pulse shrink-0 block ml-1" />
          </motion.h1>

          {/* Subtitle Typing */}
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs md:text-sm text-cyan-400 font-mono tracking-[0.15em] mt-4 min-h-[2em] uppercase font-bold"
            >
              {subText}
              <span className="inline-block w-1.5 h-3.5 bg-cyan-400 ml-0.5 animate-pulse" />
            </motion.div>
          )}

        </div>

        {/* Dynamic loading bars */}
        <div className="w-48 h-1 bg-zinc-900 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute w-1/2 h-full bg-gradient-to-r from-transparent via-rose-500 to-transparent"
          />
        </div>

        {/* Boot message details */}
        <div className="text-[10px] text-zinc-500 max-w-xs uppercase tracking-wide">
          {step === 0 && "Locating user profile matrices..."}
          {step === 1 && "Instantiating real-time communication modules..."}
          {step === 2 && "Vite compile success. Entering sandbox..."}
        </div>

      </div>
    </div>
  );
}
