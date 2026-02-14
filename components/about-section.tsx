"use client";

import { useTranslations } from "next-intl";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { SectionHeading } from "@/components/section-heading";

export function AboutSection() {
  const t = useTranslations("about");
  const [ref, isVisible] = useIntersectionObserver({ freezeOnceVisible: true });

  return (
    <section id="about" className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading>{t("title")}</SectionHeading>

        <div
          ref={ref}
          className={`mx-auto max-w-3xl space-y-6 text-center ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          } transition-all duration-700`}
        >
          <p className="text-xl leading-relaxed text-foreground md:text-2xl">
            {t.rich("intro", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>

          <p className="text-lg leading-relaxed text-foreground/80 md:text-xl">
            {t("experience")}
          </p>

          <p className="text-xl font-semibold leading-relaxed text-primary md:text-2xl">
            {t("value")}
          </p>
        </div>
      </div>
    </section>
  );
}
