import type { Metadata } from "next";
import Link from "next/link";
import { TodoInline } from "@/components/todo";
import { formatDate, getTeardowns, isTodo, stripTodo } from "@/lib/content";

export const metadata: Metadata = {
  title: "Teardowns",
  description: "Short product teardowns by Samprat Trivedi.",
  alternates: { canonical: "/teardowns" },
  openGraph: { url: "/teardowns", title: "Teardowns" },
};

export default function TeardownsIndex() {
  const teardowns = getTeardowns();
  return (
    <>
      <header className="pt-10 pb-10 sm:pt-16 sm:pb-12">
        <h1 className="display">Teardowns</h1>
        <p className="mt-5 max-w-[40rem] text-muted">Short product teardowns. One product, one decision the team made, and what I would test next.</p>
      </header>

      <ul className="border-t-2 border-ink">
        {teardowns.map((t) => (
          <li
            key={t.slug}
            className="border-b border-rule py-7 sm:py-9 lg:grid lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-x-12"
          >
            <div className="mb-2 text-sm leading-snug text-muted lg:mb-0 lg:pt-[0.6rem]">
              <span className="block font-medium text-ink">{t.product}</span>
              {t.favourite ? <span className="block text-accent">My favourite product</span> : null}
              <time dateTime={t.date} className="block">
                {formatDate(t.date)}
              </time>
            </div>
            <div className="max-w-[40rem]">
              <h2 className="finding">
                <Link href={`/teardowns/${t.slug}`} className="title-link">
                  {t.title}
                </Link>
              </h2>
              {t.summary ? (
                <p className="mt-3">
                  {isTodo(t.summary) ? (
                    <>
                      <TodoInline>To write</TodoInline> <span className="text-muted">{stripTodo(t.summary)}</span>
                    </>
                  ) : (
                    t.summary
                  )}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
