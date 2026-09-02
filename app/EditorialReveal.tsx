"use client";

import { useEffect } from "react";

type RevealGroup = {
  selector: string;
  variant: "text" | "card" | "photo";
  step: number;
};

const revealGroups: RevealGroup[] = [
  { selector: ".homeOriginal .congressCopy > *", variant: "text", step: 70 },
  { selector: ".homeOriginal .pillars > article", variant: "card", step: 80 },
  { selector: ".homeOriginal .visionCopy > *", variant: "text", step: 70 },
  { selector: ".homeOriginal .joinCopy > p, .homeOriginal .joinCopy > h2, .homeOriginal .joinCopy > .joinForm", variant: "text", step: 70 },
  { selector: ".homeOriginal .congress > img, .homeOriginal .visionPhoto, .homeOriginal .joinPhoto", variant: "photo", step: 0 },
];

export default function EditorialReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    const targets: HTMLElement[] = [];

    revealGroups.forEach(({ selector, variant, step }) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        element.dataset.editorialReveal = variant;
        element.style.setProperty("--reveal-delay", `${Math.min(index * step, 280)}ms`);
        targets.push(element);
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const frame = window.requestAnimationFrame(() => {
      targets.forEach((element) => {
        const bounds = element.getBoundingClientRect();
        if (bounds.top < window.innerHeight * 0.92 && bounds.bottom > 0) element.classList.add("is-visible");
        else observer.observe(element);
      });
      root.classList.add("editorial-reveal-ready");
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      root.classList.remove("editorial-reveal-ready");
      targets.forEach((element) => {
        element.classList.remove("is-visible");
        delete element.dataset.editorialReveal;
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, []);

  return null;
}
