"use client";

import { useTranslations } from "next-intl";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const serviceIcons = {
  saas: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
  legacy: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  ),
  training: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  ),
  consulting: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ),
};

export function ServicesSection() {
  const t = useTranslations("services");
  const [ref, isVisible] = useIntersectionObserver({ freezeOnceVisible: true });

  const services = [
    { key: "saas", icon: serviceIcons.saas },
    { key: "legacy", icon: serviceIcons.legacy },
    { key: "training", icon: serviceIcons.training },
    { key: "consulting", icon: serviceIcons.consulting },
  ];

  return (
    <section id="services" className="bg-muted/50 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading>{t("title")}</SectionHeading>

        <div
          ref={ref}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service, index) => (
            <Card
              key={service.key}
              className={`transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <CardHeader>
                <div className="mb-2 text-primary">
                  {service.icon}
                </div>
                <CardTitle className="text-lg">{t(`items.${service.key}.title`)}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {t(`items.${service.key}.description`)}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
