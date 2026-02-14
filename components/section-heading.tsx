"use client";

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  const [ref, isVisible] = useIntersectionObserver({ freezeOnceVisible: true });

  return (
    <div ref={ref} className="mb-12 text-center">
      <h2
        className={`text-4xl font-bold md:text-5xl ${className} ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        } transition-all duration-700`}
      >
        {children}
      </h2>
      <div
        className={`mx-auto mt-4 h-1 w-20 rounded-full bg-primary ${
          isVisible ? "scale-x-100" : "scale-x-0"
        } transition-transform duration-700 delay-300`}
      />
    </div>
  );
}
