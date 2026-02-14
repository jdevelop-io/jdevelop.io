"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { professionalInfo } from "@/lib/constants";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  const t = useTranslations("hero");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-primary/10">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1
            className={`mb-6 text-6xl font-bold md:text-8xl ${
              mounted
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0"
            } transition-all duration-1000`}
          >
            {t("title")}
          </h1>

          <p
            className={`mb-4 text-xl text-foreground/80 md:text-2xl ${
              mounted
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            } transition-all duration-1000 delay-300`}
          >
            {t("subtitle")}
          </p>

          <p
            className={`mb-8 text-lg text-foreground/60 md:text-xl ${
              mounted
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            } transition-all duration-1000 delay-400`}
          >
            {t("tagline")}
          </p>

          <div
            className={`flex flex-col items-center gap-4 sm:flex-row sm:justify-center ${
              mounted
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            } transition-all duration-1000 delay-500`}
          >
            <Badge
              variant="outline"
              className="animate-pulse border-primary/50 bg-primary/10 text-primary"
            >
              {t("availability")}
            </Badge>
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
