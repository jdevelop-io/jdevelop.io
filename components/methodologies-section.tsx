"use client";

import { useTranslations } from "next-intl";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { techStack } from "@/lib/constants";

export function MethodologiesSection() {
  const t = useTranslations("methodologies");
  const [ref, isVisible] = useIntersectionObserver({ freezeOnceVisible: true });

  return (
    <section id="methodologies" className="py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="mb-4 text-2xl font-semibold md:text-3xl">
            {t("title")}
          </h3>
          <p className="mb-8 text-lg text-foreground/80">
            {t("description")}
          </p>

          <div
            ref={ref}
            className={`flex flex-wrap justify-center gap-3 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            } transition-all duration-700`}
          >
            {techStack.methodologies.map((methodology, index) => (
              <Badge
                key={methodology.name}
                variant="secondary"
                className="px-3 py-1.5 text-sm"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {methodology.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
