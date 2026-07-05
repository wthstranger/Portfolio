export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  playStoreUrl?: string;
  liveDemoUrl?: string;
  githubUrl: string;
  image: string;
  screenshots: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  url?: string;
  credentialId?: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  grade: string;
  period: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface GithubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: { name: string; level: number; icon?: string }[];
}
