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

function getAppearance() {
  const style = getComputedStyle(document.documentElement);
  const accent = style.getPropertyValue("--accent").trim() || "#345c40";
  return `${accent}|${style.colorScheme}`;
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
  const appearance = useSyncExternalStore(
    subscribePalette,
    getAppearance,
    () => "#345c40|light",
  );
  const [accent, mode] = appearance.split("|");
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
    <div
      className="portfolio-background"
      aria-hidden="true"
      data-paused={reducedMotion || hidden}
    >
      <Iridescence
        key={reducedMotion ? "still" : "animated"}
        className="portfolio-iridescence"
        color={accent}
        speed={0.6}
        amplitude={0.05}
        saturation={0.65}
        brightness={mode === "dark" ? 0.7 : 2.2}
        contrast={0.9}
        detail={8}
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
