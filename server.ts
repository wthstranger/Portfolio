import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API if API key exists
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

const app = express();
const PORT = 3000;

app.use(express.json());

// Ensure directories and files exist for persistent local storage
const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const VISITOR_FILE = path.join(DATA_DIR, "visitor_count.json");
const CONTACTS_FILE = path.join(DATA_DIR, "contacts.json");

if (!fs.existsSync(VISITOR_FILE)) {
  fs.writeFileSync(VISITOR_FILE, JSON.stringify({ count: 128 }), "utf8"); // Seed starting count
}
if (!fs.existsSync(CONTACTS_FILE)) {
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify([]), "utf8");
}

// ----------------------------------
// API ENDPOINTS
// ----------------------------------

// 1. Visitor Count API
app.get("/api/visitor-count", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(VISITOR_FILE, "utf8"));
    data.count += 1;
    fs.writeFileSync(VISITOR_FILE, JSON.stringify(data), "utf8");
    res.json({ count: data.count });
  } catch (err) {
    res.json({ count: 142 }); // Fallback
  }
});

// 2. Cached GitHub Repositories API
let githubCache: { data: any[]; timestamp: number } | null = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

app.get("/api/github-repos", async (req, res) => {
  const now = Date.now();
  if (githubCache && now - githubCache.timestamp < CACHE_DURATION) {
    return res.json(githubCache.data);
  }

  try {
    // Fetch real repositories of Gopi Kumar (wthstranger)
    const response = await fetch(
      "https://api.github.com/users/wthstranger/repos?sort=updated&per_page=10",
      {
        headers: {
          "User-Agent": "Gopi-Kumar-Portfolio-Server",
        },
      }
    );

    if (response.ok) {
      const repos = await response.json();
      // Format to essential fields only
      const formattedRepos = repos
        .filter((r: any) => !r.fork)
        .slice(0, 6)
        .map((r: any) => ({
          name: r.name,
          description: r.description || "A highly optimized mobile or web application project.",
          html_url: r.html_url,
          stargazers_count: r.stargazers_count,
          forks_count: r.forks_count,
          language: r.language || "Dart/Java",
          updated_at: r.updated_at,
        }));

      githubCache = { data: formattedRepos, timestamp: now };
      return res.json(formattedRepos);
    }
  } catch (error) {
    // Silent fail, use fallback below
  }

  // Fallback data if GitHub is offline or rate-limited
  const fallbackRepos = [
    {
      name: "TalkHub",
      description: "Real-time social media & chat app supporting Peer-to-Peer WebRTC video/audio calls, Firebase database sync, and gaming integrations.",
      html_url: "https://github.com/wthstranger/TalkHub",
      stargazers_count: 14,
      forks_count: 3,
      language: "Java",
      updated_at: new Date().toISOString(),
    },
    {
      name: "Quiz-App",
      description: "Interactive multi-category native Android quiz app built using Java, Firestore, scoreboards, and countdown-timer challenges.",
      html_url: "https://github.com/wthstranger/Quiz-App",
      stargazers_count: 8,
      forks_count: 2,
      language: "Java",
      updated_at: new Date().toISOString(),
    },
    {
      name: "Flutter-WebRTC-Call",
      description: "Cross-platform mobile video streaming engine leveraging pure WebRTC signaling servers and Flutter Dart clients.",
      html_url: "https://github.com/wthstranger",
      stargazers_count: 5,
      forks_count: 1,
      language: "Dart",
      updated_at: new Date().toISOString(),
    }
  ];

  res.json(fallbackRepos);
});

// 3. Contacts Submission API
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required." });
  }

  try {
    const contacts = JSON.parse(fs.readFileSync(CONTACTS_FILE, "utf8"));
    const newContact = {
      id: Date.now(),
      name,
      email,
      subject: subject || "No Subject",
      message,
      date: new Date().toISOString(),
    };
    contacts.push(newContact);
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2), "utf8");
    res.json({ success: true, message: "Thank you for reaching out, Gopi's AI representation has recorded your message!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to store message." });
  }
});

// 4. Interactive AI Terminal API
const GOPI_CONTEXT = `
You are Gopi Kumar's personal AI Representation and Portfolio Assistant.
You speak on Gopi's behalf in a highly modern, professional, developer-focused, articulate, and intelligent tone. Your goal is to tell visitors about Gopi's expertise, answer questions about his skills, projects, and experiences, and represent him with standard-setting Polish.

Gopi Kumar is an Android and Flutter Developer from India.
Key stats and facts about Gopi:
- Contact Info: Email is gjmgopi21@gmail.com, LinkedIn is linkedin.com/in/gopi-kumar, GitHub is github.com/wthstranger, phone +91 7484894985.
- Technical Mastery:
  - Languages: Java, Dart, Python, XML
  - Mobile: Android Native (Java, XML, Android Studio), Flutter (Dart, Cross-Platform)
  - Realtime & Backend: Firebase (Firestore, Auth, Cloud Messaging), NestJS, WebRTC, WebSockets, REST APIs
  - Databases: PostgreSQL, SQLite, Firebase Firestore
  - Security Fundamentals: Web Application Penetration Testing, Application Security (understands vulnerability assessments and secure mobile coding).
  - Practices: DSA, OOP, Git/GitHub, Agile/Scrum basics, Networking.
- Professional Experience:
  - Android Development Intern at Ducat India, Noida (May 2025 - July 2025)
    - Developed 3+ Android modules, designed 10+ UI screens, integrated Firebase Auth and Firestore, consumed REST APIs, worked on Git/GitHub, and resolved 15+ complex production bugs.
- Key Projects:
  - TalkHub: Real-time social media & chat app on the Google Play Store! Supports real-time text chats, social posting/likes/comments, Peer-to-Peer WebRTC video/audio calls, Firestore live sync, Cloudinary uploads, and an interactive casual gaming module to increase session engagement. (Tech: Java, Firebase, WebRTC, Firestore, Cloudinary).
  - Quiz App: Native Android quiz platform with multiple categories, a live scoreboard engine, countdown timers, and live Firestore sync. (Tech: Java, XML, Firebase, Firestore).
- Education:
  - B.Tech in Computer Science & Engineering (Artificial Intelligence) at GIFT Autonomous, Bhubaneswar (CGPA: 7.22).
  - Intermediate (PCM): Marwari College, Bhagalpur (60.2% | 2022).
  - Matriculation: St. Francis High School, Poreyahat (82.2% | 2020).
- Certifications:
  - NPTEL Certification: Data Structures & Algorithms using Java.
  - Security Certification: Web Application Penetration Testing.
- Interests: Exploring emerging mobile and AI tools, video editing (Adobe Premiere Pro).
- Current Learning Target: Advanced NestJS microservices and Kotlin Multiplatform Mobile (KMM).

When a user types a command or asks a question:
- If they ask basic commands like "about", "projects", "skills", "contact", "resume", explain them elegantly in markdown.
- For other custom sentences (like "Why should I hire Gopi?" or "Explain TalkHub design" or "Is Gopi certified in Java?"), provide a direct, confident, elegant, and punchy reply as Gopi's personal AI Agent.
- Keep your answers clean, well-structured, scannable, and formatted nicely with markdown bullet points where appropriate.
- Be extremely polite, high-tech, and engaging. Avoid long-winded intro paragraphs. Get straight to the value.
`;

app.post("/api/terminal", async (req, res) => {
  const { command } = req.body;
  if (!command) {
    return res.status(400).json({ error: "Command is required." });
  }

  const normalized = command.trim().toLowerCase();

  // Handle simple static cases first to avoid API overhead where possible
  if (normalized === "help") {
    return res.json({
      output: `### Available System Commands:
- **about**: Brief bio of Gopi Kumar
- **projects**: Premium works built by Gopi
- **skills**: Dynamic skill sphere and stack
- **contact**: How to reach Gopi or drop a note
- **resume**: Access Gopi's resume and qualifications
- **clear**: Clear the terminal screen

*Or simply type a question! E.g. "Why did you build TalkHub?" or "What did you do at Ducat India?"*`
    });
  }

  if (normalized === "about") {
    return res.json({
      output: `### About Gopi Kumar
Gopi Kumar is an **Android & Flutter Developer** who builds real-time, cross-platform mobile apps featuring robust backends (Firebase, Nest.js), low-latency WebRTC media calling, and application security. 

With a strong foundation in **Computer Science & AI** (B.Tech, 7.22 CGPA) and applied **cybersecurity**, Gopi crafts fluid user interfaces combined with clean, secure, and performant logic.`
    });
  }

  if (normalized === "projects") {
    return res.json({
      output: `### Gopi's Key Projects
1. **TalkHub** (Real-Time Social Media & Chat App)
   - *Status*: Published on Play Store!
   - *Tech*: Java, WebRTC, Firebase Firestore, Cloudinary.
   - *Highlights*: Peer-to-peer video/audio calls, live chatting, social feeds, and in-app casual games.

2. **Quiz App** (Interactive Dashboard)
   - *Tech*: Java, XML, Firebase.
   - *Highlights*: Multi-category trivia engine, competitive leaderboards, and countdown timer mechanics.`
    });
  }

  if (normalized === "skills") {
    return res.json({
      output: `### Core Technology Stack
- **Languages**: Java, Dart, Python, SQL, XML
- **Frameworks**: Flutter, Android Native, Nest.js
- **Realtime**: WebRTC, WebSockets, Firebase Cloud Messaging
- **Databases**: PostgreSQL, SQLite, Firebase Firestore
- **Security**: Web App Penetration Testing, Secure Coding`
    });
  }

  if (normalized === "contact") {
    return res.json({
      output: `### Get in Touch
- **Email**: gjmgopi21@gmail.com
- **LinkedIn**: [linkedin.com/in/gopi-kumar](https://linkedin.com/in/gopi-kumar)
- **GitHub**: [github.com/wthstranger](https://github.com/wthstranger)
- **Phone**: +91 7484894985
- **Location**: Bhubaneswar / Jharkhand, India`
    });
  }

  if (normalized === "resume") {
    return res.json({
      output: `### Gopi's Qualifications
- **B.Tech (CSE - AI)**: GIFT Autonomous (7.22 CGPA)
- **Internship**: Android Developer Intern at Ducat India, Noida (May – July 2025)
- **Certifications**: 
  - NPTEL Data Structures & Algorithms (Java)
  - Web Application Penetration Testing`
    });
  }

  // If Gemini API is available and it's a custom query, use it!
  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: command,
        config: {
          systemInstruction: GOPI_CONTEXT,
          temperature: 0.7,
        },
      });

      return res.json({ output: response.text || "Command executed successfully with no text output." });
    } catch (err: any) {
      return res.json({
        output: `*[AI Terminal offline: ${err?.message || "Internal error"}].* Here is Gopi's typical answer: Gopi is highly specialized in Android & Flutter, holds a B.Tech in CSE-AI with a 7.22 CGPA, and has worked at Ducat India.`
      });
    }
  }

  // Fallback if Gemini is not configured
  res.json({
    output: `I received: "${command}". (Configure your GEMINI_API_KEY in the Secrets panel to activate full natural language comprehension!).
    
Please type **help** to see all offline terminal commands available.`
  });
});

// ----------------------------------
// VITE DEV / PRODUCTION INTEGRATION
// ----------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
