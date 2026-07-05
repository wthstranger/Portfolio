import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Cpu,
  Briefcase,
  GraduationCap,
  Award,
  Terminal as TerminalIcon,
  ChevronRight,
  Code,
  Smartphone,
  Flame,
  Shield,
  Bug,
  ArrowUpRight,
  ChevronDown,
  Layers,
  Heart,
  CheckCircle2,
} from "lucide-react";

// Components
import HeroIllustration from "./components/HeroIllustration";
import InteractiveTerminal from "./components/InteractiveTerminal";
import VisitorWidget from "./components/VisitorWidget";
import Loader from "./components/Loader";
import ProjectModal from "./components/ProjectModal";
import SkillOrbit from "./components/SkillOrbit";
import ContactForm from "./components/ContactForm";
import GithubReposList from "./components/GithubReposList";

// Static Data
import {
  projectsData,
  experiencesData,
  certificationsData,
  educationData,
  servicesData,
} from "./data";
import { Project } from "./types";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isLightMode, setIsLightMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  // Monitor scroll height progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollPercent((window.scrollY / scrollHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme Persistence
  useEffect(() => {
    const storedTheme = localStorage.getItem("gopi-theme");
    if (storedTheme === "light") {
      setIsLightMode(true);
    }
  }, []);

  const handleToggleTheme = () => {
    setIsLightMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem("gopi-theme", newTheme ? "light" : "dark");
      return newTheme;
    });
  };

  // Generate dynamic premium resume download
  const handleDownloadResume = () => {
    const resumeText = `# GOPI KUMAR
Android & Flutter Developer
Location: Jharkhand / Bhubaneswar, India
Phone: +91 7484894985 | Email: gjmgopi21@gmail.com
LinkedIn: linkedin.com/in/gopi-kumar | GitHub: github.com/wthstranger

## PROFILE SUMMARY
Android & Flutter Developer with hands-on experience building and shipping real-time, cross-platform mobile applications featuring Firebase backends, WebRTC audio/video calling, and RESTful integrations. Skilled in Java, Dart, and Firestore, with a working foundation in secure application design from applied cybersecurity certification. Seeking an Android/Flutter Developer role to build scalable, production-grade mobile products.

## TECHNICAL SKILLS
- Languages: Java, Dart, Python, SQL, XML
- Mobile Development: Android Native (Java, XML, Android Studio), Flutter (Dart, VS Code), Cross-Platform UI Design
- Backend & Realtime: Firebase (Firestore, Auth, Cloud Messaging), Nest.js, WebRTC, WebSockets, REST APIs
- Databases: PostgreSQL, SQLite, Firebase Firestore
- Tools & Practices: Git, GitHub, REST API Integration, Agile/Scrum basics, DSA, OOP, Networking
- Security: Application Security fundamentals, Web Application Penetration Testing, Secure Programming

## RECENT EXPERIENCE
### Android Development Intern - Ducat India, Noida
*May 2025 – July 2025*
- Developed 3+ Android application modules using Java, XML, and Android Studio.
- Designed 10+ responsive UI screens and integrated Firebase Authentication and Firestore for secure user management.
- Consumed REST APIs and resolved 15+ bugs, improving application stability and user experience.
- Managed 20+ Git commits and collaborated on 2 Android projects using Git/GitHub.

## SELECTED PROJECTS
### TalkHub (Real-Time Social Media & Chat Application)
*Live on Play Store*
- Built and published a full-featured social app supporting real-time chat, posts, likes, comments, and image uploads, integrated with Firebase Firestore for live data sync.
- Implemented peer-to-peer audio and video calling using WebRTC, enabling low-latency real-time communication between users.
- Designed in-app interactive games to increase session engagement, contributing to improved daily active usage.

### Quiz App (Interactive Multi-Category Quiz Platform)
*GitHub: github.com/wthstranger/Quiz-App*
- Developed a native Android quiz platform (Java, XML) supporting multiple categories, a live scoring engine, and a leaderboard system.
- Integrated Firebase Firestore to store and sync quiz questions and user performance data in real time.
- Implemented a countdown-timer mechanic to simulate competitive, time-boxed quiz sessions.

## EDUCATION
- B.Tech in Computer Science & Engineering (Artificial Intelligence) — GIFT Autonomous, Bhubaneswar (CGPA: 7.22 | Ongoing)
- Intermediate (PCM) — Marwari College, Bhagalpur (60.2% | 2022)
- Matriculation — St. Francis High School, Poreyahat (82.2% | 2020)

## CERTIFICATIONS
- NPTEL Certification — Data Structures & Algorithms using Java
- Security Certification — Web Application Penetration Testing
`;

    const blob = new Blob([resumeText], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Gopi_Kumar_Resume.md";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Smartphone":
        return <Smartphone className="w-5 h-5 text-rose-500" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case "Flame":
        return <Flame className="w-5 h-5 text-amber-500" />;
      case "Zap":
        return <Layers className="w-5 h-5 text-purple-400" />;
      case "Shield":
        return <Shield className="w-5 h-5 text-emerald-400" />;
      default:
        return <Bug className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className={`min-h-screen grid-bg relative overflow-hidden ${isLightMode ? "light-mode bg-zinc-50" : "bg-[#09090B] text-zinc-100"}`}>
      
      {/* Ambient Mesh Gradients from design system */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#FF3B3B] opacity-[0.08] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-[#00D4FF] opacity-[0.08] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600 opacity-[0.05] blur-[150px] rounded-full pointer-events-none" />

      {/* 1. Cinematic Loading overlay screen */}
      <AnimatePresence>
        {loading && <Loader onFinish={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          {/* Scroll Progress indicator */}
          <div className="fixed top-0 left-0 w-full h-[3px] bg-zinc-950 z-50">
            <div
              className="h-full bg-gradient-to-r from-red-500 via-rose-500 to-cyan-400 transition-all duration-100"
              style={{ width: `${scrollPercent}%` }}
            />
          </div>

          {/* Floating Glassmorphism Header */}
          <header className="fixed top-4 inset-x-4 max-w-5xl mx-auto rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl px-6 py-3.5 flex items-center justify-between z-40 shadow-xl select-none">
            <a href="#" className="flex items-center gap-2 group">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span className="font-space font-extrabold text-sm text-white tracking-widest uppercase group-hover:text-primary transition-colors">
                GOPI_KUMAR
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-400 tracking-wide">
              <a href="#about" className="hover:text-white transition-colors">ABOUT</a>
              <a href="#stack" className="hover:text-white transition-colors">STACK</a>
              <a href="#projects" className="hover:text-white transition-colors">PROJECTS</a>
              <a href="#timeline" className="hover:text-white transition-colors">CAREER</a>
              <a href="#services" className="hover:text-white transition-colors">SERVICES</a>
              <a href="#terminal" className="hover:text-white transition-colors">AI_CONSOLE</a>
            </nav>

            <a
              href="#contact"
              className="px-4 py-1.5 rounded-full bg-[#FF3B3B] hover:bg-[#FF3B3B]/90 text-black text-xs font-bold shadow-md shadow-rose-600/15 cursor-pointer transition-colors"
            >
              HIRE_ME
            </a>
          </header>

          {/* 2. Full-Screen Hero Section */}
          <section className="relative min-h-[96vh] md:min-h-screen flex items-center justify-center pt-24 px-4 overflow-hidden">
            <HeroIllustration />

            <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 py-12">
              
              {/* Hero Left: Bio, stats and downloads */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left select-none">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FF3B3B]/20 bg-[#FF3B3B]/10 text-[10px] font-mono tracking-widest text-[#FF3B3B] font-bold uppercase">
                    <Sparkles className="w-3 h-3 text-rose-500 animate-spin-slow" />
                    <span>Android & Flutter Architect</span>
                  </div>
                  
                  <h1 className="text-4xl sm:text-6xl font-black font-space tracking-tight text-white leading-none">
                    Hello, I'm <br />
                    <span className="bg-gradient-to-r from-[#FF3B3B] via-rose-500 to-[#00D4FF] bg-clip-text text-transparent">
                      Gopi Kumar
                    </span>
                  </h1>

                  <h3 className="text-lg sm:text-xl font-bold font-sans text-zinc-300">
                    Android & Cross-Platform Mobile Engineer
                  </h3>
                </div>

                <p className="text-sm md:text-base text-zinc-400 max-w-xl font-sans leading-relaxed select-text">
                  I craft state-of-the-art mobile experiences using **Java**, **Flutter**, and custom backend integrations. Specializing in secure application patterns, WebRTC communications, and high-performance layouts.
                </p>

                {/* Hero Action Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 justify-center lg:justify-start">
                  <button
                    onClick={handleDownloadResume}
                    className="px-5 py-3 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-extrabold flex items-center gap-2.5 shadow-lg shadow-rose-600/10 cursor-pointer hover:-translate-y-0.5 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>DOWNLOAD CV (MD)</span>
                  </button>

                  <a
                    href="#projects"
                    className="px-5 py-3 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-extrabold flex items-center gap-2 cursor-pointer hover:-translate-y-0.5 transition-all"
                  >
                    <span>VIEW PROJECTS</span>
                    <ChevronDown className="w-4 h-4" />
                  </a>
                </div>

                {/* Hero Socials */}
                <div className="flex items-center justify-center lg:justify-start gap-4 text-zinc-500 select-text">
                  <a
                    href="https://github.com/wthstranger"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-xs font-mono"
                  >
                    <Github className="w-4 h-4" />
                    <span>GITHUB</span>
                  </a>
                  <span className="text-zinc-800">•</span>
                  <a
                    href="https://linkedin.com/in/gopi-kumar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-rose-500 transition-colors flex items-center gap-1.5 text-xs font-mono"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LINKEDIN</span>
                  </a>
                  <span className="text-zinc-800">•</span>
                  <a
                    href="mailto:gjmgopi21@gmail.com"
                    className="hover:text-purple-400 transition-colors flex items-center gap-1.5 text-xs font-mono"
                  >
                    <Mail className="w-4 h-4" />
                    <span>EMAIL</span>
                  </a>
                </div>
              </div>

              {/* Hero Right: Multi-layered glowing card layout representing mobile development layers */}
              <div className="lg:col-span-5 flex justify-center py-6 select-none relative">
                <div className="relative w-72 h-[420px] rounded-[36px] bg-white/[0.03] backdrop-blur-xl border border-white/10 p-4 shadow-2xl flex flex-col justify-between overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-4 bg-white/10 rounded-b-xl z-20 flex justify-center items-center">
                    <span className="w-12 h-1.5 bg-black/60 rounded-full block" />
                  </div>
                  
                  {/* Card Glowing Core overlay */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[#FF3B3B]/5 blur-[60px]" />

                  {/* Header representation */}
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-[10px] font-mono font-bold text-slate-400">TALKHUB.EXE</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00D4FF] animate-pulse" />
                  </div>

                  {/* Body interactive representation */}
                  <div className="my-auto space-y-4">
                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                      <span className="text-[9px] font-mono text-[#00D4FF]">WebRTC SIGNALING:</span>
                      <p className="text-[10px] text-slate-300 font-sans leading-relaxed">
                        Peer connection state is stable. Low-latency media channel open.
                      </p>
                    </div>

                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                      <span className="text-[9px] font-mono text-[#FF3B3B]">FIRESTORE SYNC:</span>
                      <p className="text-[10px] text-slate-300 font-sans leading-relaxed">
                        Live score updates delivered to 14 active clients globally.
                      </p>
                    </div>
                  </div>

                  {/* Core indicators */}
                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
                    <span>FRAME_60_FPS</span>
                    <span>9.21 MB/S</span>
                  </div>
                </div>

                {/* Additional abstract decoration ring */}
                <div className="absolute -z-10 -bottom-10 -right-10 w-44 h-44 rounded-full bg-cyan-500/10 blur-[80px]" />
              </div>

            </div>
          </section>

          {/* Visitor Widget Spacer Row */}
          <section className="max-w-5xl mx-auto px-4 py-4 relative z-10 select-none">
            <VisitorWidget isLightMode={isLightMode} onToggleTheme={handleToggleTheme} />
          </section>

          {/* 3. About Section with Animated Counters */}
          <section id="about" className="max-w-5xl mx-auto px-4 py-20 relative z-10 select-none">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-5">
                <span className="text-xs font-bold text-primary tracking-widest uppercase font-mono">01. BIOGRAPHY</span>
                <h2 className="text-3xl md:text-4xl font-extrabold font-space text-white tracking-tight leading-none">
                  A passionate mobile creator seeking to build scalable products.
                </h2>
                
                <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-sans select-text">
                  I am a passionate Android and Flutter Developer with hands-on experience building production-ready applications. My experience ranges from crafting native Java Android applications with complex WebRTC streaming media channels to implementing cross-platform Flutter engines backed by Firestore.
                </p>

                <p className="text-sm text-zinc-500 leading-relaxed font-sans select-text">
                  Having a strong foundation in computer science theory (data structures, algorithms) and applied cybersecurity auditing, I write code that is not only robust and highly optimized but also hardened against security vulnerabilities.
                </p>
              </div>

              {/* Bento counters right */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <div className="p-5 frosted-card flex flex-col justify-between hover:scale-[1.02] transition-transform">
                  <h3 className="text-4xl font-black font-space text-white mb-2">1+</h3>
                  <p className="text-xs font-mono text-slate-400">YEARS PRACTICAL LEARNING</p>
                </div>

                <div className="p-5 frosted-card flex flex-col justify-between hover:scale-[1.02] transition-transform">
                  <h3 className="text-4xl font-black font-space text-[#00D4FF] mb-2">3+</h3>
                  <p className="text-xs font-mono text-slate-400">PRODUCTION-READY APPS</p>
                </div>

                <div className="p-5 frosted-card flex flex-col justify-between hover:scale-[1.02] transition-transform">
                  <h3 className="text-4xl font-black font-space text-purple-400 mb-2">2+</h3>
                  <p className="text-xs font-mono text-slate-400">ADVANCED CERTIFICATIONS</p>
                </div>

                <div className="p-5 frosted-card flex flex-col justify-between hover:scale-[1.02] transition-transform">
                  <h3 className="text-4xl font-black font-space text-[#FF3B3B] mb-2">1000+</h3>
                  <p className="text-xs font-mono text-slate-400">HOURS SYSTEM CODING</p>
                </div>
              </div>

            </div>
          </section>

          {/* 4. Tech Stack Skill Orbit Section */}
          <section id="stack" className="max-w-5xl mx-auto px-4 py-20 relative z-10 select-none">
            <div className="text-center space-y-2 mb-12">
              <span className="text-xs font-bold text-primary tracking-widest uppercase font-mono">02. TECHNICAL MATRIX</span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-space text-white tracking-tight">
                Skill Orbits & Toolchains
              </h2>
              <p className="text-sm text-zinc-400 max-w-lg mx-auto font-sans">
                Glow on hover to explore dynamic proficiencies and underlying technologies.
              </p>
            </div>

            <SkillOrbit />
          </section>

          {/* 5. Featured Projects Section */}
          <section id="projects" className="max-w-5xl mx-auto px-4 py-20 relative z-10 select-none">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div className="space-y-2">
                <span className="text-xs font-bold text-primary tracking-widest uppercase font-mono">03. ENGINEERING WORKS</span>
                <h2 className="text-3xl md:text-4xl font-extrabold font-space text-white tracking-tight">
                  Featured Case Studies
                </h2>
              </div>
              <p className="text-sm text-zinc-400 max-w-md font-sans">
                Explore fully realized, deployed mobile applications. Click on any card to inspect full features list, screenshots, and live demo buttons.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projectsData.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group frosted-card overflow-hidden cursor-pointer flex flex-col"
                >
                  <div className="aspect-video w-full overflow-hidden relative bg-zinc-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end p-6">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
                          {project.technologies.slice(0, 3).join(" • ")}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 group-hover:bg-[#FF3B3B]/10 transition-all">
                          <ArrowUpRight className="w-4 h-4 group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-xl font-bold font-space text-white tracking-tight mb-2">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-3 select-text">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          className="text-[9px] font-mono text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Dynamic GitHub list of other repository projects */}
            <div className="mt-16 pt-12 border-t border-zinc-900">
              <GithubReposList />
            </div>

          </section>

          {/* 6. Timeline Career & Education Section */}
          <section id="timeline" className="max-w-5xl mx-auto px-4 py-20 relative z-10 select-none">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Column: Experience Timeline */}
              <div className="lg:col-span-6 space-y-8">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-primary tracking-widest uppercase font-mono">04. TIMELINE</span>
                  <h3 className="text-2xl md:text-3xl font-extrabold font-space text-white tracking-tight leading-none">
                    Work Experience
                  </h3>
                </div>

                <div className="space-y-6 relative border-l border-zinc-800 pl-6 ml-3 select-text">
                  {experiencesData.map((exp) => (
                    <div key={exp.id} className="relative space-y-2">
                      {/* Node circle */}
                      <span className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 bg-primary rounded-full ring-4 ring-[#09090B]" />
                      
                      <span className="text-[10px] font-mono tracking-widest text-primary font-bold uppercase">{exp.period}</span>
                      <h4 className="text-base font-bold text-white leading-tight font-space">{exp.role}</h4>
                      <p className="text-xs font-bold text-zinc-400">{exp.company} — <span className="text-zinc-500 font-normal">{exp.location}</span></p>

                      <ul className="space-y-1.5 pt-2 text-xs text-zinc-400 font-sans list-none">
                        {exp.achievements.map((ach, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary mt-1 shrink-0">•</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Education & Certifications Timeline */}
              <div className="lg:col-span-6 space-y-12">
                
                {/* Education */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#00D4FF] tracking-widest uppercase font-mono">05. ACADEMICS</span>
                    <h3 className="text-2xl font-extrabold font-space text-white tracking-tight leading-none">
                      Education
                    </h3>
                  </div>

                  <div className="space-y-6 relative border-l border-zinc-800 pl-6 ml-3 select-text">
                    {educationData.map((edu) => (
                      <div key={edu.id} className="relative space-y-1">
                        <span className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 bg-[#00D4FF] rounded-full ring-4 ring-[#09090B]" />
                        
                        <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase">{edu.period}</span>
                        <h4 className="text-sm font-bold text-white leading-tight font-space">{edu.degree}</h4>
                        <p className="text-xs text-zinc-400 font-sans">
                          {edu.institution} {edu.location && `— ${edu.location}`}
                        </p>
                        <span className="inline-block text-[10px] font-mono bg-cyan-950/30 border border-cyan-900/45 text-cyan-400 px-2 py-0.5 rounded mt-1 font-bold">
                          {edu.grade}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications with popup hover trigger */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-purple-400 tracking-widest uppercase font-mono">06. CERTIFICATIONS</span>
                    <h3 className="text-2xl font-extrabold font-space text-white tracking-tight leading-none">
                      Credentials
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {certificationsData.map((cert) => (
                      <div
                        key={cert.id}
                        className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md hover:border-purple-500/30 transition-all duration-300 cursor-help group"
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <Award className="w-4 h-4 text-purple-400" />
                          <h4 className="text-xs font-bold text-white group-hover:text-purple-400 transition-colors font-space">
                            {cert.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-400 font-mono">ISSUED BY: {cert.issuer}</p>
                        <p className="text-[11px] text-slate-300 leading-relaxed font-sans mt-2 select-text">
                          {cert.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </section>

          {/* 7. Services Bento Section */}
          <section id="services" className="max-w-5xl mx-auto px-4 py-20 relative z-10 select-none">
            <div className="text-center space-y-2 mb-12">
              <span className="text-xs font-bold text-primary tracking-widest uppercase font-mono">07. CAPABILITIES</span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-space text-white tracking-tight">
                Solutions I Deliver
              </h2>
              <p className="text-sm text-zinc-400 max-w-lg mx-auto font-sans">
                Full-cycle mobile production from architectural wireframing to secure distribution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-text">
              {servicesData.map((srv) => (
                <div
                  key={srv.id}
                  className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 hover:scale-[1.02] transition-all duration-300 shadow-md group flex flex-col justify-between space-y-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {getServiceIcon(srv.iconName)}
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-white group-hover:text-[#00D4FF] transition-colors font-space">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {srv.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 8. Embedded Interactive Terminal AI Section */}
          <section id="terminal" className="max-w-5xl mx-auto px-4 py-20 relative z-10 select-none">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-5 space-y-5">
                <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase font-mono">08. SANDBOX</span>
                <h2 className="text-3xl md:text-4xl font-extrabold font-space text-white tracking-tight leading-none">
                  Interactive AI <br />Command Line
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed font-sans select-text">
                  Write commands or ask custom questions directly to Gopi Kumar's **Gemini-3.5-Flash** powered portfolio representation. Try asking: <br />
                  <span className="text-xs font-mono text-cyan-400 mt-2 block bg-zinc-950/60 p-2.5 rounded border border-zinc-900 select-all">
                    "Tell me about your Ducat India internship achievements" or "Why should I hire Gopi?"
                  </span>
                </p>
              </div>

              <div className="lg:col-span-7">
                <InteractiveTerminal />
              </div>

            </div>
          </section>

          {/* 9. Contact section */}
          <section id="contact" className="max-w-5xl mx-auto px-4 py-20 relative z-10">
            <ContactForm />
          </section>

          {/* 10. Footer Section */}
          <footer className="max-w-5xl mx-auto px-4 pt-16 pb-8 text-center relative z-10 select-none">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent mb-8" />
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
              <p className="flex items-center justify-center gap-1">
                <span>Made with</span>
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500/25" />
                <span>by Gopi Kumar © {new Date().getFullYear()}</span>
              </p>
              <div className="flex items-center gap-4">
                <a href="#about" className="hover:text-white transition-colors">BACK_TO_TOP</a>
                <span>•</span>
                <a href="https://github.com/wthstranger" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GITHUB</a>
                <span>•</span>
                <a href="https://linkedin.com/in/gopi-kumar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LINKEDIN</a>
              </div>
            </div>
          </footer>

          {/* Render details Modal when project is selected */}
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />

        </>
      )}

    </div>
  );
}
