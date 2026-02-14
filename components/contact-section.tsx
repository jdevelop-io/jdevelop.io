"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { SectionHeading } from "@/components/section-heading";
import { SocialLink } from "@/components/social-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { socialLinks } from "@/lib/constants";
import { ContactFormData, ContactFormResponse } from "@/types";

export function ContactSection() {
  const t = useTranslations("contact");
  const [ref, isVisible] = useIntersectionObserver({ freezeOnceVisible: true });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = t("errors.nameRequired");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("errors.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("errors.emailInvalid");
    }

    if (!formData.message.trim()) {
      newErrors.message = t("errors.messageRequired");
    } else if (formData.message.trim().length < 20) {
      newErrors.message = t("errors.messageShort");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data: ContactFormResponse = await response.json();

      if (data.success) {
        toast.success(t("success"));
        setFormData({
          name: "",
          email: "",
          company: "",
          message: "",
        });
        setErrors({});
      } else {
        toast.error(data.error || data.message);
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error(t("errors.failed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" className="bg-muted/50 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading>{t("title")}</SectionHeading>

        <div className="mx-auto max-w-2xl">
          <div
            ref={ref}
            className={`space-y-8 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            } transition-all duration-700`}
          >
            {/* Social Links */}
            <div className="flex justify-center gap-4">
              {socialLinks.map((link) => (
                <SocialLink key={link.name} link={link} />
              ))}
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">
                  {t("name")} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  {t("email")} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">{t("company")}</Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">
                  {t("message")} <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={errors.message ? "border-destructive" : ""}
                />
                {errors.message && (
                  <p className="text-sm text-destructive">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full transition-transform duration-200 hover:scale-105"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="mr-2 h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    {t("sending")}
                  </>
                ) : (
                  t("send")
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
