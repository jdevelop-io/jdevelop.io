import { Project, TechItem, Methodology, SocialLink } from "@/types";

export const techStack = {
  languages: [
    { name: "PHP", category: "Backend", experience: "9 years" },
    { name: "Rust", category: "Systems", experience: "3 years" },
    { name: "Go", category: "Backend", experience: "4 years" },
    { name: "Kotlin", category: "Backend/Android", experience: "3 years" },
    { name: "TypeScript", category: "Full-stack", experience: "7 years" },
  ] as TechItem[],
  frontend: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Shadcn UI",
    "Vue.js",
    "Angular",
  ],
  backend: [
    "Spring",
    "Node.js",
    "Rust (Actix/Axum)",
    "Go (Gin/Echo)",
    "Laravel",
    "Symfony",
  ],
  messageBrokers: ["NATS", "Kafka", "MQTT", "RabbitMQ"],
  databases: ["Supabase", "PostgreSQL", "MySQL", "MariaDB", "MongoDB"],
  cloud: ["AWS", "GCP", "Docker", "Kubernetes"],
  monitoring: ["ELK Stack", "Prometheus", "Grafana"],
  methodologies: [
    { name: "Pragmatic Architecture", description: "Right tool for the job" },
    { name: "Modular Monolith", description: "Simple, maintainable systems" },
    { name: "Microservices", description: "When scale demands it" },
    { name: "TDD", description: "Test-Driven Development" },
    { name: "DDD", description: "Domain-Driven Design" },
    { name: "Clean Architecture", description: "Separation of concerns" },
    { name: "Event Sourcing", description: "Event-based state management" },
    {
      name: "Event-Driven Architecture",
      description: "Asynchronous messaging",
    },
  ] as Methodology[],
  tools: ["Claude Code", "GitHub Copilot", "Git", "VS Code", "IntelliJ IDEA"],
};

export const socialLinks: SocialLink[] = [
  { name: "X", url: "https://x.com/jh3ady_", icon: "X" },
  { name: "GitHub", url: "https://github.com/jh3ady", icon: "GitHub" },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/jeandenisvidot/",
    icon: "LinkedIn",
  },
  { name: "Indie Page", url: "https://indiepa.ge/jh3ady", icon: "Globe" },
];

export const projects: Project[] = [
  {
    id: "attrk",
    name: "attrk.com",
    description: "Attribution link platform for tracking marketing campaigns",
    url: "https://attrk.com",
    status: "live",
    techStack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    features: [
      "Link shortening and tracking",
      "Campaign analytics",
      "Multi-channel attribution",
      "Real-time dashboard",
    ],
  },
  {
    id: "coming-soon",
    name: "More Projects Coming",
    description: "Exciting new SaaS products in development",
    url: null,
    status: "coming-soon",
    techStack: [],
    features: [],
  },
];

export const professionalInfo = {
  name: "Jean-Denis VIDOT",
  age: 31,
  location: "Toulouse, France",
  company: "JDevelop",
  availability: {
    status: "busy",
    until: "2026-06",
    message: "Busy until June 2026",
  },
  positions: [
    "Senior Software Developer",
    "Tech Lead / Lead Developer",
    "Individual Contributor",
  ],
  experience: {
    professional: "9 years",
    total: "Since 2005",
  },
  services: [
    "SaaS Development",
    "Legacy Systems Migrations",
    "Technical Training",
    "Software Architecture Consulting",
  ],
  tagline: "Expert in building client SaaS solutions, legacy migrations, and software craftsmanship",
};
