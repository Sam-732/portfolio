import Link from "next/link";
import { site } from "@/site.config";
import { NavLinks, ThemeToggle } from "./nav";
import { Wrap } from "./shell";
import { TodoInline } from "./todo";

export function Header() {
  return (
    <header className="border-b-2 border-ink">
      <Wrap className="flex flex-wrap items-baseline justify-between gap-x-6 pt-5 pb-2 sm:pt-7 sm:pb-3">
        <Link href="/" className="title-link py-2 font-serif text-[1.3125rem] leading-none font-medium tracking-[-0.01em]">
          {site.name}
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap items-baseline gap-x-5 text-[0.9375rem] sm:gap-x-7">
            <NavLinks resume={site.resume || undefined} github={site.github || undefined} />
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </Wrap>
    </header>
  );
}

function handle(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export function Footer() {
  const links = [
    { label: "LinkedIn", href: site.linkedin, required: false },
    { label: "GitHub", href: site.github, required: false },
    { label: "X", href: site.x, required: false },
    { label: "Resume", href: site.resume, required: false },
  ].filter((l) => l.href || l.required);

  return (
    <footer className="mt-24 border-t border-rule sm:mt-32">
      <Wrap className="py-10 sm:py-12">
        <div className="lg:grid lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-x-12">
          <p className="mb-3 text-sm text-muted lg:mb-0 lg:pt-[0.45rem]">Contact</p>
          <div>
            <p className="font-serif text-[1.5rem] leading-tight sm:text-[1.75rem]">
              {site.emails.length > 0 ? (
                site.emails.map((email) => (
                  <a key={email} href={`mailto:${email}`} className="link block w-fit py-1 break-all">
                    {email}
                  </a>
                ))
              ) : (
                <TodoInline>Email to add in site.config.ts</TodoInline>
              )}
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[0.9375rem]">
              {links.map((l) => (
                <li key={l.label}>
                  {l.href ? (
                    <a
                      href={l.href}
                      className="link inline-block py-2"
                      {...(l.href.startsWith("http") ? { rel: "me noopener noreferrer" } : {})}
                    >
                      {l.label}
                      {l.label === "GitHub" ? <span className="text-muted"> ({handle(l.href).replace("github.com/", "")})</span> : null}
                    </a>
                  ) : (
                    <span className="inline-block py-2">
                      <TodoInline>{l.label} to add</TodoInline>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Wrap>
    </footer>
  );
}
