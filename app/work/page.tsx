import type { Metadata } from "next";
import { CaseCard } from "@/components/case-card";
import { Mdx } from "@/components/mdx";
import { Row } from "@/components/shell";
import { getCaseStudies, getWorkIntro } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Three product projects by Samprat Trivedi, each starting from a question the last one left: voice mode adoption, customer feedback at scale, and how far to trust AI insights.",
  alternates: { canonical: "/work" },
  openGraph: { url: "/work", title: "Work", images: "/opengraph-image" },
};

export default function WorkIndex() {
  const studies = getCaseStudies();
  const intro = getWorkIntro();
  return (
    <>
      <header className="pt-10 pb-10 sm:pt-16 sm:pb-12">
        <h1 className="display">Work</h1>
      </header>
      {intro ? (
        <section aria-labelledby="story-heading" className="border-t-2 border-ink pt-5 pb-10 sm:pb-12">
          <Row
            aside={
              <h2 id="story-heading" className="font-medium text-ink">
                How they connect
              </h2>
            }
          >
            <Mdx source={intro} />
          </Row>
        </section>
      ) : null}
      {studies.map((study) => (
        <CaseCard key={study.slug} study={study} />
      ))}
    </>
  );
}
