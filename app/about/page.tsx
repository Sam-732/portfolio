/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Mdx } from "@/components/mdx";
import { Row } from "@/components/shell";
import { getAbout } from "@/lib/content";
import { site } from "@/site.config";

const about = getAbout();

export const metadata: Metadata = {
  title: "About",
  description: about.description || site.description,
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: `About ${site.name}`, images: "/opengraph-image" },
};

export default function AboutPage() {
  return (
    <article>
      <header className="pt-10 pb-10 sm:pt-16 sm:pb-12">
        <h1 className="display">About</h1>
      </header>
      <Row
        aside={
          site.photo ? (
            <img
              src={site.photo}
              alt={`Portrait of ${site.name}`}
              width={320}
              height={320}
              className="mb-6 h-auto w-32 border border-rule lg:w-full"
            />
          ) : null
        }
      >
        <div className="text-lg">
          <Mdx source={about.body} />
        </div>
      </Row>
    </article>
  );
}
