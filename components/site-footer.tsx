"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { professionalInfo, socialLinks } from "@/lib/constants";
import { SocialLink } from "@/components/social-link";

export function SiteFooter() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <h3 className="text-lg font-bold">{professionalInfo.company}</h3>
            <p className="text-sm text-foreground/70">
              {t("tagline")}
            </p>
            <Link
              href="https://www.pappers.fr/entreprise/jdevelop-938123072"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-foreground/50 transition-colors hover:text-primary"
            >
              {t("legal")}
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <SocialLink key={link.name} link={link} />
            ))}
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-foreground/70">
            © {currentYear} {professionalInfo.company}. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
