import Link from "next/link";
import { CaseCard } from "@/components/case-card";
import { Row } from "@/components/shell";
import { getCaseStudies, getTeardowns } from "@/lib/content";
import { site } from "@/site.config";

export default function Home() {
  const studies = getCaseStudies();
  const teardowns = getTeardowns().slice(0, 3);

  return (
    <>
      <section className="pt-10 pb-12 sm:pt-16 sm:pb-16">
        <h1 className="display max-w-[20em]">{site.positioning}</h1>
        <p className="mt-6 max-w-[40rem] font-mono text-[0.8125rem] leading-relaxed text-muted sm:text-sm">
          {site.proof}
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-[0.9375rem]">
          {site.resume ? (
            <li>
              <a href={site.resume} className="link inline-block py-1">
                Resume
              </a>
            </li>
          ) : null}
          {site.linkedin ? (
            <li>
              <a href={site.linkedin} rel="me noopener noreferrer" className="link inline-block py-1">
                LinkedIn
              </a>
            </li>
          ) : null}
          {site.github ? (
            <li>
              <a href={site.github} rel="me noopener noreferrer" className="link inline-block py-1">
                GitHub
              </a>
            </li>
          ) : null}
          {site.emails[0] ? (
            <li>
              <a href={`mailto:${site.emails[0]}`} className="link inline-block py-1">
                {site.emails[0]}
              </a>
            </li>
          ) : null}
        </ul>
      </section>

      <section aria-label="Case studies">
        {studies.map((study, i) => (
          <CaseCard key={study.slug} study={study} priority={i === 0} />
        ))}
      </section>

      {teardowns.length > 0 ? (
        <section aria-labelledby="teardowns-heading" className="border-t border-rule py-9 sm:py-12">
          <Row
            aside={
              <h2 id="teardowns-heading" className="font-medium text-ink">
                Teardowns
              </h2>
            }
          >
            <ul className="max-w-[40rem]">
              {teardowns.map((t, i) => (
                <li key={t.slug} className={`py-4 ${i > 0 ? "border-t border-rule" : "pt-0"}`}>
                  <span className="block text-sm text-muted">{t.product}</span>
                  <Link href={`/teardowns/${t.slug}`} className="title-link finding-sm">
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Row>
        </section>
      ) : null}
    </>
  );
}
