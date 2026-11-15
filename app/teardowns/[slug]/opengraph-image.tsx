import { getTeardown, getTeardowns } from "@/lib/content";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Product teardown";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getTeardowns().map((t) => ({ slug: t.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const teardown = getTeardown(slug);
  return renderOg({ label: "Product teardown", title: teardown?.title ?? "Teardown" });
}
