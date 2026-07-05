import React, { useState } from "react";
import { Mail, Github, Linkedin, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setStatus("success");
        setFeedbackMsg(data.message);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const err = await response.json();
        setStatus("error");
        setFeedbackMsg(err.error || "Failed to deliver message.");
      }
    } catch (err) {
      setStatus("error");
      setFeedbackMsg("Connection lost. Please retry or contact via Email directly.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch select-none">
      
      {/* Left: Contact Info / Details Grid */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <span className="text-xs font-bold text-primary tracking-widest uppercase font-mono">Get in touch</span>
          <h3 className="text-2xl md:text-3xl font-extrabold font-space text-white tracking-tight leading-none">
            Let's build something beautiful.
          </h3>
          <p className="text-sm text-zinc-400 font-sans leading-relaxed">
            I'm currently seeking Android & Flutter developer opportunities to build high-performance mobile products. Reach out for a chat or drop a message!
          </p>
        </div>

        {/* Info Rows */}
        <div className="space-y-4 select-text">
          <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-primary shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-500 block">EMAIL ENQUIRIES</span>
              <a href="mailto:gjmgopi21@gmail.com" className="text-xs text-white font-mono hover:text-primary transition-colors">
                gjmgopi21@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-500 block">PHONE / WHATSAPP</span>
              <a href="tel:+917484894985" className="text-xs text-white font-mono hover:text-cyan-400 transition-colors">
                +91 7484894985
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-500 block">CURRENT STATION</span>
              <span className="text-xs text-zinc-300 font-sans">
                Jharkhand / Bhubaneswar, India
              </span>
            </div>
          </div>
        </div>

        {/* Socials Link Row */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
          <a
            href="https://github.com/wthstranger"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer transition-all hover:-translate-y-0.5"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/gopi-kumar"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer transition-all hover:-translate-y-0.5"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Right: Glassmorphism Form container */}
      <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 flex flex-col justify-center relative select-text">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Your Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Gopi Kumar"
                className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white outline-none focus:border-rose-500/30 font-sans placeholder-zinc-700 transition-colors"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Your Email *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="gjmgopi21@gmail.com"
                className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white outline-none focus:border-rose-500/30 font-sans placeholder-zinc-700 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Opportunity for Android & Flutter Role"
              className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white outline-none focus:border-rose-500/30 font-sans placeholder-zinc-700 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Message *</label>
            <textarea
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Hi Gopi, we'd love to chat about a mobile development position we have open..."
              className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white outline-none focus:border-rose-500/30 font-sans placeholder-zinc-700 transition-colors resize-none"
            />
          </div>

          {/* Form Status Messages */}
          {status === "success" && (
            <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-900/50 flex items-center gap-2.5 text-emerald-400 text-xs">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{feedbackMsg}</span>
            </div>
          )}

          {status === "error" && (
            <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-900/50 flex items-center gap-2.5 text-rose-400 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{feedbackMsg}</span>
            </div>
          )}

          {/* Submit Trigger */}
          <button
            type="submit"
            disabled={status === "submitting" || !formData.name || !formData.email || !formData.message}
            className="w-full py-3.5 rounded-xl bg-[#FF3B3B] hover:bg-[#FF3B3B]/90 text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/10 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {status === "submitting" ? (
              <span>Encrypting and dispatching...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Transmit Secure Message</span>
              </>
            )}
          </button>

        </form>
      </div>

    </div>
  );
}
