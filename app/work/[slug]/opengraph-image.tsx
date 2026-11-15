import { getCaseStudies, getCaseStudy } from "@/lib/content";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Case study";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  return renderOg({
    label: study ? `${study.title}, ${study.kind.toLowerCase()}` : "Case study",
    title: study?.finding ?? "Case study",
  });
}
