export type CompanyProject = {
  id: string;
  title: string;
  company: string;
  period: string;
  domain: string;
  summary: string;
  contributions: string[];
  technologies: string[];
  source: string;
};

/** Professional contributions supplied by the owner; kept separate from public projects. */
export const companyProjects: CompanyProject[] = [
  {
    id: "cloud-protect",
    title: "Cloud Protect",
    company: "Softcell Technologies",
    period: "Nov 2025 — Present",
    domain: "Cloud security & governance",
    summary:
      "Enterprise cloud-management dashboards covering AWS/Azure security, governance, compliance, analytics, budgeting, and reporting.",
    contributions: [
      "Develop modular Next.js and TypeScript interfaces with reusable component and state-management patterns.",
      "Integrate cloud APIs and present findings through Ant Design, ApexCharts, and ECharts interfaces.",
      "Support UAT, production troubleshooting, Docker deployments, CI/CD maintenance, and SonarQube remediation.",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Ant Design",
      "AWS / Azure",
      "ApexCharts",
      "ECharts",
    ],
    source: "Owner-supplied resume and company-project description",
  },
  {
    id: "budget-management",
    title: "Budget Management",
    company: "Al Madina Logistics / Bayanat Technology",
    period: "2025",
    domain: "Financial operations",
    summary:
      "Budget-management interfaces for logistics operations, supporting departmental budgeting, approval workflows, and expense tracking.",
    contributions: [
      "Developed reusable React and TypeScript interfaces for budget and expense workflows.",
      "Worked with Node.js and MySQL-backed modules as part of the logistics software team.",
    ],
    technologies: ["React", "TypeScript", "Node.js", "MySQL"],
    source:
      "Owner-supplied project list, resume, and Naukri professional project description",
  },
  {
    id: "leave-management",
    title: "Leave Management HR Application",
    company: "Al Madina Logistics",
    period: "2025",
    domain: "Human resources",
    summary:
      "HR application interfaces for employee leave requests, leave balances, resumption submissions, payslips, and profile management.",
    contributions: [
      "Built responsive leave-management and employee self-service interfaces using reusable React components.",
      "Contributed to related payroll, attendance, and HR workflows within the logistics application suite.",
    ],
    technologies: ["React", "TypeScript", "REST APIs"],
    source:
      "Owner-supplied project list, resume, and Naukri HR Flow project description",
  },
  {
    id: "learning-management",
    title: "Learning Management System",
    company: "Global Minds Limited",
    period: "2023 — 2024",
    domain: "Learning platforms",
    summary:
      "LMS interface development with responsive screens and backend service integration, delivered as part of the Global Minds engineering team.",
    contributions: [
      "Developed user-facing LMS interfaces with React and TypeScript.",
      "Integrated REST APIs, resolved production UI issues, and supported usability improvements and deployments.",
    ],
    technologies: ["React", "TypeScript", "REST APIs"],
    source:
      "Owner-supplied company-project list and professional profile; resume for API and production-support experience",
  },
];
