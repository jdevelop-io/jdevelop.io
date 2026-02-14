import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ServicesSection } from "@/components/services-section";
import { ExpertiseSection } from "@/components/expertise-section";
import { ProjectsSection } from "@/components/projects-section";
import { MethodologiesSection } from "@/components/methodologies-section";
import { ContactSection } from "@/components/contact-section";

export default function Page() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ExpertiseSection />
        <ProjectsSection />
        <MethodologiesSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
