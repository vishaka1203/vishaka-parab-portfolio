"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Moon, Sun, ArrowUpRight, Menu, X } from "lucide-react";
export function Navigation() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    try {
      const stored = localStorage.getItem("portfolio-theme") || "system";
      document.documentElement.dataset.theme = stored;
    } catch {
      /* System preference remains available without storage. */
    }
  }, []);
  function toggle() {
    const dark =
      document.documentElement.dataset.theme === "dark" ||
      (document.documentElement.dataset.theme !== "light" &&
        matchMedia("(prefers-color-scheme: dark)").matches);
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {
      /* Theme still applies for this page. */
    }
  }
  return (
    <header
      className="site-header"
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <div className="nav-inner">
        <Link href="/" className="wordmark" aria-label="Vishaka Parab home">
          vp<span>.</span>
        </Link>
        <nav
          className={open ? "nav-links is-open" : "nav-links"}
          aria-label="Main navigation"
        >
          {[
            ["Work", "/#work"],
            ["About", "/#about"],
            ["Experience", "/#experience"],
          ].map(([label, href]) => (
            <Link onClick={() => setOpen(false)} key={label} href={href}>
              {label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="nav-contact"
            onClick={() => setOpen(false)}
          >
            Let’s talk <ArrowUpRight size={14} />
          </Link>
        </nav>
        <button
          className="icon-button"
          onClick={toggle}
          aria-label="Toggle color theme"
        >
          <Sun className="sun" size={17} />
          <Moon className="moon" size={17} />
        </button>
        <button
          className="icon-button mobile-menu"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
