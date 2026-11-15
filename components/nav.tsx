"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/teardowns", label: "Teardowns" },
  { href: "/about", label: "About" },
];

export function NavLinks({ resume, github }: { resume?: string; github?: string }) {
  const pathname = usePathname() ?? "/";
  return (
    <>
      {LINKS.map(({ href, label }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={`inline-block py-2 transition-colors hover:text-accent ${
                active ? "text-accent underline decoration-1 underline-offset-[0.35em]" : ""
              }`}
            >
              {label}
            </Link>
          </li>
        );
      })}
      {github ? (
        <li>
          <a href={github} rel="me noopener noreferrer" className="inline-block py-2 transition-colors hover:text-accent">
            GitHub
          </a>
        </li>
      ) : null}
      {resume ? (
        <li>
          <a href={resume} className="inline-block py-2 transition-colors hover:text-accent">
            Resume
          </a>
        </li>
      ) : null}
    </>
  );
}

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const current =
      root.getAttribute("data-theme") ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be unavailable (private mode); the choice then lasts for this page only.
    }
  }
  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle cursor-pointer py-2 text-muted transition-colors hover:text-accent"
    >
      <span className="when-light">Dark mode</span>
      <span className="when-dark">Light mode</span>
    </button>
  );
}
