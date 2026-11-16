import Image from "next/image";
import { ProjectArt } from "./project-art";
import type { Project } from "@/content/profile";
export function ProjectPreview({ project }: { project: Project }) {
  return project.image ? (
    <div className="screenshot-container">
      <Image
        src={project.image}
        alt={`${project.title} project screenshot`}
        fill
        sizes="(max-width: 600px) 100vw, 50vw"
        className="project-screenshot"
      />
    </div>
  ) : (
    <ProjectArt kind={project.art} />
  );
}
