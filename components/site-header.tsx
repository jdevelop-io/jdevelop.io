"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { professionalInfo } from "@/lib/constants";
import { useScrollPosition } from "@/hooks/use-scroll-position";

export function SiteHeader() {
  const t = useTranslations("nav");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { scrollPosition } = useScrollPosition();
  const [activeSection, setActiveSection] = useState("");

  const navigation = [
    { name: t("about"), href: "#about" },
    { name: t("services"), href: "#services" },
    { name: t("expertise"), href: "#expertise" },
    { name: t("projects"), href: "#projects" },
    { name: t("contact"), href: "#contact" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map((item) => item.href.replace("#", ""));
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isScrolled = scrollPosition > 50;

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg"
          : "bg-background/0"
      }`}
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">{professionalInfo.company}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === item.href.replace("#", "")
                  ? "text-primary"
                  : "text-foreground/70"
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {mounted && (
              <>
                {theme === "dark" ? (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </>
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden border-t bg-background/95 backdrop-blur-lg">
        <nav className="container mx-auto flex items-center justify-around px-4 py-2">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className={`text-xs font-medium transition-colors hover:text-primary ${
                activeSection === item.href.replace("#", "")
                  ? "text-primary"
                  : "text-foreground/70"
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
