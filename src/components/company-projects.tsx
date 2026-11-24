import { Building2 } from "lucide-react";
import { companyProjects } from "@/content/company-projects";

export function CompanyProjects() {
  return (
    <section id="company-work" className="section company-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">PROFESSIONAL CONTRIBUTIONS</p>
          <h2>
            Company projects<span>.</span>
          </h2>
        </div>
        <p>
          Selected contributions across cloud platforms, financial operations,
          HR, and learning.
        </p>
      </div>
      <div className="company-projects">
        {companyProjects.map((project) => (
          <article className="company-project" key={project.id}>
            <div className="company-project-heading">
              <span className="company-project-domain">{project.domain}</span>
              <span className="company-project-period">{project.period}</span>
            </div>
            <h3>{project.title}</h3>
            <p className="company-name">
              <Building2 size={15} />
              {project.company}
            </p>
            <p className="company-project-summary">{project.summary}</p>
            <ul>
              {project.contributions.map((contribution) => (
                <li key={contribution}>{contribution}</li>
              ))}
            </ul>
            <div className="tags">
              {project.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
