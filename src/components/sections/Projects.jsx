import { useGsapContext } from "../../hooks/useGsapContext";
import { bindStaggerReveal } from "../../animations/scrollReveal";
import { bindProjectsSequentialReveal } from "../../animations/projectsReveal";
import { projects, projectsSection } from "../../data/projects";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { ProjectCard } from "../features/projects/ProjectCard";

export function Projects() {
  const headingRef = useGsapContext((el) => {
    if (!el) return;
    bindStaggerReveal(
      el,
      "[data-reveal]",
      { autoAlpha: 0, y: 36 },
      { autoAlpha: 1, y: 0 },
      { start: "top 88%", stagger: 0.08 }
    );
  }, []);

  const gridRef = useGsapContext((el) => {
    if (!el) return;
    bindProjectsSequentialReveal(el, { start: "top 78%", stagger: 0.14 });
  }, []);

  return (
    <Section id="projects" className="bg-gray-50 dark:bg-surface-raised/30 transition-colors duration-300" parallax>
      <Container>
        <div ref={headingRef}>
          <SectionHeading
            eyebrow={projectsSection.eyebrow}
            title={projectsSection.title}
            subtitle={projectsSection.subtitle}
          />
        </div>

        <div ref={gridRef} className="mt-12 grid gap-5 sm:gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
