import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx";
import { Row } from "@/components/shell";
import { TodoInline } from "@/components/todo";
import { formatDate, getTeardown, getTeardowns, isTodo, stripTodo } from "@/lib/content";

// Every page here is prerendered from generateStaticParams, so the slug is known at build time.
// This turns off the development-only check that assumes the slug might arrive at request time.
export const instant = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getTeardowns().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const teardown = getTeardown(slug);
  if (!teardown) return {};
  return {
    title: `${teardown.product || teardown.title} teardown`,
    description: teardown.description,
    alternates: { canonical: `/teardowns/${slug}` },
    openGraph: {
      type: "article",
      url: `/teardowns/${slug}`,
      title: `${teardown.product || teardown.title} teardown`,
      description: teardown.description,
      publishedTime: teardown.date,
    },
  };
}

export default async function TeardownPage({ params }: Props) {
  const { slug } = await params;
  const teardown = getTeardown(slug);
  if (!teardown) notFound();

  return (
    <article>
      <header className="pt-10 pb-10 sm:pt-16 sm:pb-12">
        <Row
          aside={
            <>
              <span className="block font-medium text-ink">{teardown.product || "Teardown"}</span>
              <span className="block">Teardown</span>
              <time dateTime={teardown.date} className="block">
                {formatDate(teardown.date)}
              </time>
            </>
          }
        >
          <h1 className="finding max-w-[40rem]">{teardown.title}</h1>
          {teardown.summary ? (
            <p className="mt-5 max-w-[40rem] text-lg leading-snug">
              {isTodo(teardown.summary) ? (
                <>
                  <TodoInline>To write</TodoInline> <span className="text-muted">{stripTodo(teardown.summary)}</span>
                </>
              ) : (
                teardown.summary
              )}
            </p>
          ) : null}
        </Row>
      </header>

      <Row>
        <Mdx source={teardown.body} />
        <p className="mt-14 text-[0.9375rem]">
          <Link href="/teardowns" className="link inline-block py-1">
            All teardowns
          </Link>
        </p>
      </Row>
    </article>
  );
}
