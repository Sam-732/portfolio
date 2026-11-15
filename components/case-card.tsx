import Link from "next/link";
import type { CaseStudy } from "@/lib/content";
import { isTodo, stripTodo } from "@/lib/content";
import { Bars, Compare, Figure, SplitBar } from "./figure";
import { Row } from "./shell";
import { TodoInline } from "./todo";

/** The finding is the headline. The project name is the small label beside it. */
export function CaseCard({
  study,
  visual = true,
  priority = false,
}: {
  study: CaseStudy;
  visual?: boolean;
  priority?: boolean;
}) {
  const href = `/work/${study.slug}`;
  const todo = isTodo(study.finding);
  return (
    <article className="border-t border-rule py-9 sm:py-12">
      <Row
        aside={
          <>
            <span className="block font-medium text-ink">{study.title}</span>
            <span className="block">{study.kind}</span>
          </>
        }
      >
        <h2 className="finding max-w-[40rem]">
          <Link href={href} className="title-link">
            {todo ? (
              <>
                <span className="text-muted">{stripTodo(study.finding)}</span>
              </>
            ) : (
              study.finding
            )}
          </Link>
        </h2>
        {todo ? (
          <p className="mt-3">
            <TodoInline>Headline to write</TodoInline>
          </p>
        ) : null}
        {study.counts ? (
          <p className="mt-4 max-w-[40rem] font-mono text-[0.8125rem] leading-relaxed text-muted">{study.counts}</p>
        ) : null}
        {visual ? (
          <div className="mt-6 max-w-[40rem]">
            {study.split ? (
              <SplitBar {...study.split} />
            ) : study.bars ? (
              <Bars data={study.bars} highlight={study.barsHighlight} caption={study.barsCaption} />
            ) : study.compareLeft && study.compareRight ? (
              <Compare
                left={study.compareLeft}
                right={study.compareRight}
                strike={study.compareStrike}
                caption={study.compareCaption}
              />
            ) : study.cover ? (
              <Figure src={study.cover} alt={study.coverAlt} caption={study.coverCaption} priority={priority} />
            ) : study.coverTodo ? (
              <Figure todo={study.coverTodo} />
            ) : null}
          </div>
        ) : null}
        <p className="mt-5 text-[0.9375rem]">
          <Link href={href} className="link inline-block py-1" aria-label={`Read the ${study.title} case study`}>
            Read the case study
          </Link>
        </p>
      </Row>
    </article>
  );
}
