import { useEffect, useRef, useState } from "react";

export default function HeroIllustration() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      setMouse({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || 500;
      height = canvas.height = canvas.parentElement?.clientHeight || 500;
    };
    window.addEventListener("resize", handleResize);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        // Cyan and Red particles
        this.color = Math.random() > 0.5 ? "0, 212, 255" : "255, 59, 59";
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update(mouseX: number, mouseY: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce on borders
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;

        // Interactive mouse deflection
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        c.shadowBlur = 8;
        c.shadowColor = `rgb(${this.color})`;
        c.fill();
        c.restore();
      }
    }

    const particles: Particle[] = Array.from({ length: 65 }, () => new Particle());

    const drawGrid = (c: CanvasRenderingContext2D) => {
      c.strokeStyle = "rgba(255, 255, 255, 0.015)";
      c.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        c.beginPath();
        c.moveTo(x, 0);
        c.lineTo(x, height);
        c.stroke();
      }
      for (let y = 0; y < height; y += step) {
        c.beginPath();
        c.moveTo(0, y);
        c.lineTo(width, y);
        c.stroke();
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle tech background grid
      drawGrid(ctx);

      // Ambient background glow (Cyan + Red) responding to mouse
      const glowX = mouse.x || width / 2;
      const glowY = mouse.y || height / 2;

      const gradient = ctx.createRadialGradient(glowX, glowY, 10, glowX, glowY, 280);
      gradient.addColorStop(0, "rgba(255, 59, 59, 0.035)");
      gradient.addColorStop(0.5, "rgba(0, 212, 255, 0.025)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach((p) => {
        p.update(mouse.x, mouse.y);
        p.draw(ctx);
      });

      // Draw vector lines between close particles
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 85) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / 85)})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [mouse]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Rotating floating code snippets */}
      <div className="absolute top-[15%] left-[10%] p-3 bg-zinc-950/80 border border-zinc-800 rounded-lg text-[10px] font-mono text-cyan-400 shadow-2xl animate-float opacity-75 backdrop-blur-sm pointer-events-auto hover:border-cyan-500/50 transition-colors duration-300">
        <span className="text-purple-400">import</span> WebRTC <span className="text-purple-400">from</span> <span className="text-green-400">'webrtc'</span>;<br />
        <span className="text-zinc-500">// Peer connection established</span><br />
        peer.on(<span className="text-orange-400">'stream'</span>, s =&gt; render(s));
      </div>

      <div className="absolute bottom-[20%] right-[12%] p-3 bg-zinc-950/80 border border-zinc-800 rounded-lg text-[10px] font-mono text-rose-400 shadow-2xl animate-float opacity-75 backdrop-blur-sm pointer-events-auto hover:border-rose-500/50 transition-colors duration-300" style={{ animationDelay: "3s" }}>
        <span className="text-orange-400">@Override</span><br />
        <span className="text-purple-400">protected void</span> onCreate(Bundle b) &#123;<br />
        &nbsp;&nbsp;<span className="text-blue-400">super</span>.onCreate(b);<br />
        &nbsp;&nbsp;setContentView(R.layout.activity_talkhub);<br />
        &#125;
      </div>

      <div className="absolute top-[45%] right-[8%] p-2.5 bg-zinc-950/80 border border-zinc-800 rounded-lg text-[10px] font-mono text-purple-400 shadow-2xl animate-float opacity-75 backdrop-blur-sm pointer-events-auto hover:border-purple-500/50 transition-colors duration-300" style={{ animationDelay: "1.5s" }}>
        <span className="text-blue-400">class</span> <span className="text-amber-400">FlutterApp</span> <span className="text-blue-400">extends</span> StatelessWidget &#123;<br />
        &nbsp;&nbsp;Widget build() =&gt; MaterialApp();<br />
        &#125;
      </div>
    </div>
  );
}
