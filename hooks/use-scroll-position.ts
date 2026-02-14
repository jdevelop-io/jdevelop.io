import { useEffect, useState } from "react";

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollPosition = () => {
      const currentScrollY = window.scrollY;

      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
      setScrollPosition(currentScrollY);

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", updateScrollPosition, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollPosition);
    };
  }, []);

  return { scrollPosition, scrollDirection };
}
