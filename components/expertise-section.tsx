"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { SectionHeading } from "@/components/section-heading";
import { TechBadge } from "@/components/tech-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { techStack } from "@/lib/constants";

export function ExpertiseSection() {
  const t = useTranslations("expertise");
  const [ref, isVisible] = useIntersectionObserver({ freezeOnceVisible: true });
  const [activeTab, setActiveTab] = useState("languages");

  const categories = [
    { id: "languages", label: t("languages"), data: techStack.languages },
    { id: "frontend", label: t("frontend"), data: techStack.frontend },
    { id: "backend", label: t("backend"), data: techStack.backend },
    { id: "messageBrokers", label: t("messageBrokers"), data: techStack.messageBrokers },
    { id: "databases", label: t("databases"), data: techStack.databases },
    { id: "cloud", label: t("cloud"), data: techStack.cloud },
    { id: "monitoring", label: t("monitoring"), data: techStack.monitoring },
    { id: "methodologies", label: t("methodologies"), data: techStack.methodologies },
    { id: "tools", label: t("tools"), data: techStack.tools },
  ];

  return (
    <section id="expertise" className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading>{t("title")}</SectionHeading>

        <div
          ref={ref}
          className={`mx-auto max-w-5xl space-y-12 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          } transition-all duration-700`}
        >
          {/* Main Technologies */}
          <div>
            <h3 className="mb-4 text-center text-xl font-semibold text-foreground/80">
              {t("languages")}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.languages.map((item, index) => (
                <TechBadge
                  key={item.name}
                  name={item.name}
                  experience={item.experience}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Frontend & Backend */}
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-center text-xl font-semibold text-foreground/80">
                {t("frontend")}
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {techStack.frontend.slice(0, 6).map((item, index) => (
                  <TechBadge key={item} name={item} index={index} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-center text-xl font-semibold text-foreground/80">
                {t("backend")}
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {techStack.backend.slice(0, 6).map((item, index) => (
                  <TechBadge key={item} name={item} index={index} />
                ))}
              </div>
            </div>
          </div>

          {/* Infrastructure */}
          <div>
            <h3 className="mb-4 text-center text-xl font-semibold text-foreground/80">
              Infrastructure & Tools
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                ...techStack.databases.slice(0, 4),
                ...techStack.cloud,
                ...techStack.messageBrokers.slice(0, 2),
              ].map((item, index) => (
                <TechBadge key={item} name={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
