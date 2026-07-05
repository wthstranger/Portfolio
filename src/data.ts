import { Project, Experience, Certification, Education, Service, SkillCategory } from "./types";

export const projectsData: Project[] = [
  {
    id: "talkhub",
    title: "TalkHub",
    description: "Published on Play Store: A high-fidelity, real-time social media & communication network.",
    longDescription: "TalkHub is a feature-rich, low-latency social and communication platform. It features peer-to-peer real-time audio and video calling via WebRTC, instantaneous chat, posts with reactions/likes, threaded comments, and image uploading powered by Cloudinary. It also includes integrated mini-games within the chat room to elevate engagement. Backed by Firebase Firestore for robust realtime live data synchronizations.",
    technologies: ["Java", "Firebase", "WebRTC", "Firestore", "Cloudinary", "Android SDK"],
    features: [
      "Peer-to-Peer Real-time Audio & Video calling via WebRTC protocol",
      "Instant messaging and media exchange with automatic Firestore triggers",
      "Social posts feed supporting likes, comments, and real-time count increments",
      "Custom in-app mini games to boost session lengths and user retention",
      "Integrated secure authentication and media uploads through Cloudinary CDN",
      "Optimized Android UI conforming to material design standards"
    ],
    playStoreUrl: "https://play.google.com/store", // Live Play Store badge
    githubUrl: "https://github.com/wthstranger/TalkHub",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: "quizapp",
    title: "Quiz App",
    description: "An interactive, multi-category quiz dashboard with competitive mechanics.",
    longDescription: "Quiz App is a native Android trivia game featuring responsive screens, dynamic category dashboards, countdown challenges, and real-time score keeping. It features persistent leaderboards powered by Firebase Firestore that update live when users submit their scores, providing a competitive, engaging gaming framework.",
    technologies: ["Java", "XML", "Firebase", "Firestore", "Android Studio"],
    features: [
      "Dynamic multiple category selectors pulled straight from Firestore backend",
      "Smooth visual countdown timers simulating competitive environment rules",
      "Global leaderboard syncing in real-time for immediate highscore tracking",
      "Elegant custom UI styled in Java & XML featuring beautiful vector icons",
      "Instant result breakdowns with visual stats of accuracy and correct choices"
    ],
    githubUrl: "https://github.com/wthstranger/Quiz-App",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1518133680790-398535820a1e?auto=format&fit=crop&w=600&q=80"
    ]
  }
];

export const experiencesData: Experience[] = [
  {
    id: "exp1",
    role: "Android Development Intern",
    company: "Ducat India",
    location: "Noida, UP",
    period: "May 2025 – July 2025",
    achievements: [
      "Architected and integrated 3+ production-grade Android application modules.",
      "Designed and delivered 10+ highly responsive, sleek XML layouts and UI screens.",
      "Integrated secure Firebase Authentication and real-time Firestore database architectures.",
      "Successfully consumed third-party RESTful APIs, enabling rapid external service connections.",
      "Identified and resolved 15+ complex runtime bugs, boosting app stability by 25%.",
      "Collaborated using Git/GitHub version control workflows under agile timelines."
    ]
  }
];

export const certificationsData: Certification[] = [
  {
    id: "cert1",
    title: "Data Structures & Algorithms using Java",
    issuer: "NPTEL",
    description: "Rigorous certification validating solid foundational knowledge in computing theory, complexity analysis, trees, graphs, sorting, and core Java algorithm design."
  },
  {
    id: "cert2",
    title: "Web Application Penetration Testing",
    issuer: "Drop organization",
    description: "Specialized training covering application auditing, OWASP Top 10, source code reviews, vulnerability assessment, and secure programming practices for APIs and mobile endpoints."
  }
];

export const educationData: Education[] = [
  {
    id: "edu1",
    degree: "B.Tech, Computer Science & Engineering (AI)",
    institution: "GIFT Autonomous",
    location: "Bhubaneswar, India",
    grade: "CGPA 7.22",
    period: "2022 – 2026 (Ongoing)"
  },
  {
    id: "edu2",
    degree: "Intermediate (PCM)",
    institution: "Marwari College",
    location: "Bhagalpur, India",
    grade: "60.2%",
    period: "2020 – 2022"
  },
  {
    id: "edu3",
    degree: "Matriculation",
    institution: "St. Francis High School",
    location: "Poreyahat, India",
    grade: "82.2%",
    period: "2020"
  }
];

export const servicesData: Service[] = [
  {
    id: "srv1",
    title: "Android Native Development",
    description: "Crafting highly performant, robust native Android applications utilizing Java, XML, Android Studio, and standard material guidelines.",
    iconName: "Smartphone"
  },
  {
    id: "srv2",
    title: "Flutter Cross-Platform",
    description: "Building breathtaking, fluid cross-platform mobile products for iOS and Android using modern Dart and declarative state architectures.",
    iconName: "Cpu"
  },
  {
    id: "srv3",
    title: "Firebase Full-Stack",
    description: "Setting up real-time secure backends using Firestore Database, Cloud Auth, Functions, and FCM push notifications.",
    iconName: "Flame"
  },
  {
    id: "srv4",
    title: "Realtime Systems & API",
    description: "Integrating peer-to-peer audio/video streaming via WebRTC, secure WebSockets connections, and standard RESTful JSON interfaces.",
    iconName: "Zap"
  },
  {
    id: "srv5",
    title: "Application Security Auditing",
    description: "Conducting secure code reviews, checking mobile memory safety, and executing penetration tests for API boundaries.",
    iconName: "Shield"
  },
  {
    id: "srv6",
    title: "UI/UX & Bug Squashing",
    description: "polishing layout micro-interactions, designing responsive layouts, and hunting complex memory leak and multi-thread bugs.",
    iconName: "Bug"
  }
];

export const skillCategoriesData: SkillCategory[] = [
  {
    id: "lang",
    name: "Languages",
    skills: [
      { name: "Java", level: 90 },
      { name: "Dart", level: 85 },
      { name: "Python", level: 75 },
      { name: "XML / HTML", level: 95 }
    ]
  },
  {
    id: "mobile",
    name: "Mobile Dev",
    skills: [
      { name: "Android SDK", level: 88 },
      { name: "Flutter", level: 85 },
      { name: "Material Design", level: 90 },
      { name: "Android UI Screens", level: 92 }
    ]
  },
  {
    id: "backend",
    name: "Backend & Realtime",
    skills: [
      { name: "Firebase (Auth/Db)", level: 90 },
      { name: "WebRTC P2P", level: 80 },
      { name: "REST APIs", level: 85 },
      { name: "WebSockets / NestJS", level: 70 }
    ]
  },
  {
    id: "security",
    name: "Cyber Security & DSA",
    skills: [
      { name: "Cyber Security", level: 85 },
      { name: "Bug Bounty", level: 80 },
      { name: "Penetration Testing", level: 78 },
      { name: "OWASP Top 10 Auditing", level: 82 },
      { name: "Data Structures (Java)", level: 84 },
      { name: "Git / GitHub Versioning", level: 90 }
    ]
  }
];
