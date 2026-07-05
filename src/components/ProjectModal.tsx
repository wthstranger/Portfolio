import { Project } from "../types";
import { X, ExternalLink, Github, CheckCircle, Play } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 select-none">
        
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-crosshair"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-zinc-800 bg-[#0c0c0e] shadow-2xl p-6 md:p-8 flex flex-col scrollbar-none select-text"
        >
          {/* Close trigger */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-white text-zinc-400 cursor-pointer transition-all z-10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 mt-4">
            
            {/* Left: Device Mockups & Screenshot slideshow */}
            <div className="lg:col-span-5 space-y-4 flex flex-col justify-center">
              
              {/* Primary mockup display card */}
              <div className="relative aspect-[9/16] max-w-[260px] mx-auto rounded-[32px] border-[6px] border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden group">
                <div className="absolute top-0 inset-x-0 h-4 bg-zinc-800 rounded-b-xl z-20 flex justify-center items-center">
                  <span className="w-12 h-1.5 bg-black rounded-full block" />
                </div>
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-[24px] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 flex flex-col justify-end p-4">
                  <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest font-mono">Mobile UX Mock</span>
                  <h4 className="text-white text-xs font-bold">{project.title} Core UI</h4>
                </div>
              </div>

              {/* Multiple mockup grid */}
              <div className="grid grid-cols-3 gap-2.5 max-w-[260px] mx-auto">
                {project.screenshots.map((s, idx) => (
                  <div key={idx} className="aspect-[9/16] rounded-lg border border-zinc-900 overflow-hidden bg-zinc-950">
                    <img
                      src={s}
                      alt="Screenshot"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Technical specifications and descriptions */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              
              <div>
                {/* Title and tags */}
                <span className="text-xs font-bold text-primary tracking-widest uppercase font-space">Featured Project</span>
                <h2 className="text-2xl md:text-3xl font-extrabold font-space text-white tracking-tight mt-1 mb-3">
                  {project.title}
                </h2>

                <p className="text-sm text-zinc-400 font-sans leading-relaxed mb-4">
                  {project.longDescription}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono tracking-tight text-cyan-400 bg-cyan-950/40 border border-cyan-900/50 px-2.5 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Core Features list */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 font-mono">Core Specifications:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-zinc-900">
                {project.playStoreUrl && (
                  <a
                    href={project.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[140px] px-4 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-lg flex items-center justify-center gap-2 text-xs font-bold shadow-lg shadow-rose-600/10 cursor-pointer hover:-translate-y-0.5 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Live Play Store</span>
                  </a>
                )}
                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[140px] px-4 py-2.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-white rounded-lg flex items-center justify-center gap-2 text-xs font-bold cursor-pointer hover:-translate-y-0.5 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Interactive Demo</span>
                  </a>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] px-4 py-2.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white rounded-lg flex items-center justify-center gap-2 text-xs font-bold cursor-pointer hover:-translate-y-0.5 transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Inspect Codebase</span>
                </a>
              </div>

            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
