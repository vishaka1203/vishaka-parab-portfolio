"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

const Iridescence = dynamic(() => import("./backgrounds/iridescence"), {
  ssr: false,
});

function subscribePalette(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  systemTheme.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    systemTheme.removeEventListener("change", onChange);
  };
}

function getAccent() {
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim() || "#345c40"
  );
}

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

export function PortfolioBackground() {
  const accent = useSyncExternalStore(
    subscribePalette,
    getAccent,
    () => "#345c40",
  );
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );
  const hidden = useSyncExternalStore(
    subscribeVisibility,
    () => document.hidden,
    () => true,
  );

  return (
    <div className="portfolio-background" aria-hidden="true">
      <Iridescence
        key={reducedMotion ? "still" : "animated"}
        className="portfolio-iridescence"
        color={accent}
        speed={0.18}
        amplitude={0.05}
        saturation={0.65}
        brightness={1.4}
        contrast={0.9}
        detail={6}
        resolution={0.5}
        mouseReact={!reducedMotion}
        clickSwirl={false}
        stir={0.12}
        sheen={0.12}
        paused={reducedMotion || hidden}
      />
    </div>
  );
}
