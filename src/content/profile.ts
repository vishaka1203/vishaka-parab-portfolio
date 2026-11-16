import githubMetadata from "./github.generated.json";
import { contactEmail } from "./contact";
export const profile = {
  name: "Vishaka Parab",
  title: "Frontend Engineer",
  location: "Mumbai, India",
  summary:
    "Frontend engineer with 3+ years of experience building responsive web applications with React, Next.js and TypeScript. I turn complex workflows into clear, reusable interfaces.",
  about:
    "My work spans cloud security, governance, compliance, HR and logistics. I care about modular frontend architecture, useful data visualisation, and the small details that make an interface feel intuitive. From integrating APIs to troubleshooting production issues, I enjoy connecting thoughtful design with dependable engineering.",
  github: "https://github.com/vishaka1203",
  linkedin: "https://www.linkedin.com/in/vishakaparab/",
  email: contactEmail,
  resumeUrl: "/resume/vishaka-parab-public-resume.pdf" as string | null,
  naukri: null as string | null,
  source:
    "Owner-supplied Vishaka_Parab_Frontend_Resume.pdf; public GitHub API and repository manifests, reviewed 16 November 2026.",
};
export const experience = [
  {
    company: "Softcell Technologies",
    role: "Software Developer — Frontend",
    dates: "Nov 2025 — Present",
    location: "Mumbai",
    summary:
      "Building Cloud Protect interfaces for cloud security, governance and compliance.",
    points: [
      "Build modular Next.js dashboards for AWS/Azure security, analytics, budgeting and reporting.",
      "Create reusable Ant Design interfaces and ApexCharts / ECharts visualisations.",
      "Integrate APIs, support Docker deployments and CI/CD maintenance, and perform UAT and production testing.",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Ant Design",
      "AWS / Azure",
      "Docker",
    ],
  },
  {
    company: "Al Madina Logistics / Bayanat Technology",
    role: "Frontend Developer",
    dates: "Jan 2025 — Oct 2025",
    location: "Mumbai",
    summary: "Responsive tools for the people and operations behind logistics.",
    points: [
      "Developed HR and logistics budget-management modules.",
      "Built payroll, attendance, leave-tracking and expense interfaces with reusable component patterns.",
    ],
    technologies: ["React", "TypeScript", "Node.js", "MySQL"],
  },
  {
    company: "Global Minds Limited",
    role: "Frontend React.js Developer",
    dates: "Aug 2023 — Dec 2024",
    location: "Goa",
    summary: "Frontend components, REST integrations and production support.",
    points: [
      "Developed responsive frontend components and integrated REST APIs.",
      "Resolved UI issues, improved usability and supported Agile deployments.",
    ],
    technologies: ["React", "JavaScript", "REST APIs"],
  },
];
export const skills = {
  Interfaces: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "HTML5 / CSS3",
    "React Native",
  ],
  "Systems & state": [
    "Reusable components",
    "Tailwind CSS",
    "shadcn/ui",
    "Ant Design",
    "Material UI",
    "React Query",
    "Jotai",
    "Context API",
  ],
  "Data & APIs": [
    "Node.js",
    "Go",
    "REST APIs",
    "MySQL",
    "MongoDB",
    "SQL",
    "ApexCharts",
    "ECharts",
  ],
  "Cloud & delivery": [
    "AWS",
    "Azure",
    "Docker",
    "Git / GitLab",
    "CI/CD maintenance",
    "SonarQube",
    "Jest",
    "React Testing Library",
  ],
  "AI-assisted development": [
    "Cursor",
    "Codex",
    "Claude",
    "Structured prompting",
    "Prototyping & debugging",
  ],
};
export type Project = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
  featured: boolean;
  githubUrl: string;
  liveUrl?: string;
  art: "wushu" | "hospital" | "url" | "portfolio";
  image?: string;
  source: string;
};
const curatedProjects: Project[] = [
  {
    slug: "wushu-goa",
    title: "Wushu Goa",
    summary:
      "A TypeScript web project for Wushu Goa, built with Next.js and the Once UI system.",
    category: "Web application",
    technologies: ["Next.js", "TypeScript", "Once UI"],
    createdAt: "2026-07-13",
    updatedAt: "2026-07-13",
    featured: true,
    githubUrl: "https://github.com/vishaka1203/Wushu-Goa",
    liveUrl: "https://wushu-goa.vercel.app",
    art: "wushu",
    source: "Public GitHub metadata and package.json",
  },
  {
    slug: "url-shortener",
    title: "A shorter way to share.",
    summary:
      "A URL shortener built with Next.js and MySQL. A focused utility for turning long links into something manageable.",
    category: "Full stack",
    technologies: ["Next.js", "JavaScript", "MySQL"],
    createdAt: "2024-09-03",
    updatedAt: "2024-09-04",
    featured: true,
    githubUrl: "https://github.com/vishaka1203/URL-Shortener",
    liveUrl: "https://url-shortener-vishaka.vercel.app",
    art: "url",
    source: "Public GitHub description and metadata",
  },
  {
    slug: "hospital-research",
    title: "Care, connected.",
    summary:
      "A hospital and research centre website built with React, with a separate Node.js appointment-booking backend.",
    category: "Healthcare",
    technologies: ["React", "JavaScript", "Node.js", "CSS"],
    createdAt: "2024-04-19",
    updatedAt: "2025-10-03",
    featured: true,
    githubUrl: "https://github.com/vishaka1203/Hospital-and-Research-Center",
    art: "hospital",
    source: "Public frontend and backend GitHub repository descriptions",
  },
  {
    slug: "react-portfolio",
    title: "The first introduction.",
    summary:
      "A responsive personal portfolio built with React, balancing visual presentation and a dynamic user experience.",
    category: "Portfolio",
    technologies: ["React", "JavaScript", "CSS"],
    createdAt: "2024-03-28",
    updatedAt: "2024-04-27",
    featured: false,
    githubUrl:
      "https://github.com/vishaka1203/Portfolio-Website-using-React.js",
    liveUrl: "https://vishakaparab-portfolio.netlify.app/",
    art: "portfolio",
    source: "Public GitHub description and metadata",
  },
];
export const education = {
  degree: "B.E. Computer Science",
  school: "Agnel Institute of Technology and Design, Goa",
  dates: "2019 — 2023",
  result: "CGPA 8.8 / 10",
};

export const projects: Project[] = curatedProjects.map((p) => ({
  ...p,
  ...(
    githubMetadata as Record<string, { createdAt: string; updatedAt: string }>
  )[p.slug],
}));

export const certifications = [
  {
    title: "Oracle Cloud Infrastructure 2023 Certified Foundations Associate",
    issuer: "Oracle",
    year: "2023",
  },
  {
    title: "Oracle Cloud Data Management 2023 Certified Foundations Associate",
    issuer: "Oracle",
    year: "2023",
  },
  {
    title: "Oracle APEX Cloud Developer Certified Professional",
    issuer: "Oracle",
    year: "2023",
  },
];
