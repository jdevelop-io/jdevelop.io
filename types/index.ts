export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  error?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string | null;
  status: "live" | "coming-soon";
  techStack: string[];
  features: string[];
}

export interface TechItem {
  name: string;
  category?: string;
  experience?: string;
}

export interface Methodology {
  name: string;
  description: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
