"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { SectionHeading } from "@/components/section-heading";
import { ProjectDetailDialog } from "@/components/project-detail-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/constants";
import { Project } from "@/types";

export function ProjectsSection() {
  const t = useTranslations("projects");
  const [ref, isVisible] = useIntersectionObserver({ freezeOnceVisible: true });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    if (project.status === "coming-soon") return;
    setSelectedProject(project);
    setDialogOpen(true);
  };

  return (
    <section id="projects" className="bg-muted/50 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading>{t("title")}</SectionHeading>

        <div
          ref={ref}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className={`group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                project.status === "coming-soon" ? "cursor-default opacity-70" : ""
              } ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
              onClick={() => handleProjectClick(project)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {project.name}
                  </CardTitle>
                  {project.status === "live" && (
                    <Badge variant="default" className="bg-green-500">
                      {t("live")}
                    </Badge>
                  )}
                  {project.status === "coming-soon" && (
                    <Badge variant="secondary">{t("comingSoon")}</Badge>
                  )}
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>

              {project.techStack.length > 0 && (
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.techStack.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>

      <ProjectDetailDialog
        project={selectedProject}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </section>
  );
}
