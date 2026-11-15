import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SplitBar } from "@/components/figure";
import { Mdx } from "@/components/mdx";
import { Row } from "@/components/shell";
import { TodoInline } from "@/components/todo";
import { getCaseStudies, getCaseStudy, isTodo, stripTodo } from "@/lib/content";

// Every page here is prerendered from generateStaticParams, so the slug is known at build time.
// This turns off the development-only check that assumes the slug might arrive at request time.
export const instant = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  const title = `${study.title}: ${stripTodo(study.finding)}`;
  return {
    title: study.title,
    description: study.description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { type: "article", url: `/work/${slug}`, title, description: study.description },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const others = getCaseStudies().filter((c) => c.slug !== slug);
  const todo = isTodo(study.finding);

  return (
    <article>
      <header className="pt-10 pb-10 sm:pt-16 sm:pb-12">
        <Row
          aside={
            <>
              <span className="block font-medium text-ink">{study.title}</span>
              <span className="block">{study.kind}</span>
            </>
          }
        >
          <h1 className={`finding max-w-[40rem] ${todo ? "text-muted" : ""}`}>{stripTodo(study.finding)}</h1>
          {todo ? (
            <p className="mt-3">
              <TodoInline>Headline to write</TodoInline>
            </p>
          ) : null}
          {study.counts ? (
            <p className="mt-4 max-w-[40rem] font-mono text-[0.8125rem] leading-relaxed text-muted">{study.counts}</p>
          ) : null}
        </Row>
      </header>

      {study.summary.length > 0 ? (
        <section aria-labelledby="summary-heading" className="border-t-2 border-ink pt-5 pb-10 sm:pb-12">
          <Row
            aside={
              <h2 id="summary-heading" className="font-medium text-ink">
                In three lines
              </h2>
            }
          >
            <ol className="max-w-[40rem]">
              {study.summary.map((line, i) => (
                <li
                  key={i}
                  className={`py-3 text-[1.0625rem] leading-snug sm:text-lg ${i > 0 ? "border-t border-rule" : "pt-0"}`}
                >
                  {isTodo(line) ? (
                    <>
                      <TodoInline>To write</TodoInline> <span className="text-muted">{stripTodo(line)}</span>
                    </>
                  ) : (
                    line
                  )}
                </li>
              ))}
            </ol>
            {study.split ? (
              <div className="mt-8 max-w-[40rem]">
                <SplitBar {...study.split} />
              </div>
            ) : null}
          </Row>
        </section>
      ) : null}

      <Row>
        <Mdx source={study.body} />
      </Row>

      {others.length > 0 ? (
        <nav aria-labelledby="more-heading" className="mt-16 border-t-2 border-ink pt-5 sm:mt-20">
          <Row
            aside={
              <h2 id="more-heading" className="font-medium text-ink">
                Other work
              </h2>
            }
          >
            <ul className="max-w-[40rem]">
              {others.map((c, i) => (
                <li key={c.slug} className={`py-4 ${i > 0 ? "border-t border-rule" : "pt-0"}`}>
                  <span className="block text-sm text-muted">{c.title}</span>
                  <Link href={`/work/${c.slug}`} className={`title-link finding-sm ${isTodo(c.finding) ? "text-muted" : ""}`}>
                    {stripTodo(c.finding)}
                  </Link>
                </li>
              ))}
            </ul>
          </Row>
        </nav>
      ) : null}
    </article>
  );
}
