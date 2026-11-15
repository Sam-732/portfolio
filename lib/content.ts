import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Content is plain MDX files:
 *   content/work/<slug>.mdx       -> /work/<slug>
 *   content/teardowns/<slug>.mdx  -> /teardowns/<slug>
 *   content/about.mdx             -> /about
 * Add a file and the page, the lists, the sitemap and the link preview follow.
 */

const ROOT = path.join(process.cwd(), "content");

export type Split = {
  value: number;
  label: string;
  rest: string;
  caption?: string;
};

export type CaseStudy = {
  slug: string;
  title: string; // project name, shown as the small label
  kind: string; // e.g. "Curiosity project"
  finding: string; // the headline
  counts?: string; // one line of numbers
  description: string; // search and link-preview text
  order: number;
  summary: string[]; // the three lines at the top
  split?: Split; // optional two-part bar chart for the card
  bars?: string; // optional bar chart for the card: "Label | 12; Label | 7"
  barsHighlight?: number;
  barsCaption?: string;
  compareLeft?: string; // optional two-column visual for the card
  compareRight?: string;
  compareStrike?: string;
  compareCaption?: string;
  cover?: string; // optional image path under /public
  coverAlt?: string;
  coverCaption?: string;
  coverTodo?: string; // describes the image still to add
  body: string;
};

export type Teardown = {
  slug: string;
  title: string;
  product: string;
  favourite: boolean; // pinned first and marked on the list
  date: string; // YYYY-MM-DD
  summary: string;
  description: string;
  body: string;
};

function readDir(dir: string) {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(full, file), "utf8");
      const { data, content } = matter(raw);
      return { slug: file.replace(/\.mdx$/, ""), data, body: content };
    });
}

function required(data: Record<string, unknown>, key: string, file: string) {
  const v = data[key];
  if (v === undefined || v === null || v === "") {
    throw new Error(`content/${file}.mdx is missing "${key}" in its front matter`);
  }
  return v;
}

export function getCaseStudies(): CaseStudy[] {
  return readDir("work")
    .map(({ slug, data, body }) => {
      const f = `work/${slug}`;
      return {
        slug,
        title: String(required(data, "title", f)),
        kind: String(data.kind ?? "Case study"),
        finding: String(required(data, "finding", f)),
        counts: data.counts ? String(data.counts) : undefined,
        description: String(data.description ?? data.finding),
        order: Number(data.order ?? 99),
        summary: Array.isArray(data.summary) ? data.summary.map(String) : [],
        split: data.split as Split | undefined,
        bars: data.bars ? String(data.bars) : undefined,
        barsHighlight: data.barsHighlight ? Number(data.barsHighlight) : undefined,
        barsCaption: data.barsCaption ? String(data.barsCaption) : undefined,
        compareLeft: data.compareLeft ? String(data.compareLeft) : undefined,
        compareRight: data.compareRight ? String(data.compareRight) : undefined,
        compareStrike: data.compareStrike ? String(data.compareStrike) : undefined,
        compareCaption: data.compareCaption ? String(data.compareCaption) : undefined,
        cover: data.cover ? String(data.cover) : undefined,
        coverAlt: data.coverAlt ? String(data.coverAlt) : undefined,
        coverCaption: data.coverCaption ? String(data.coverCaption) : undefined,
        coverTodo: data.coverTodo ? String(data.coverTodo) : undefined,
        body,
      };
    })
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getCaseStudy(slug: string) {
  return getCaseStudies().find((c) => c.slug === slug);
}

export function getTeardowns(): Teardown[] {
  return readDir("teardowns")
    .map(({ slug, data, body }) => {
      const f = `teardowns/${slug}`;
      const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(required(data, "date", f));
      return {
        slug,
        title: String(required(data, "title", f)),
        product: String(data.product ?? ""),
        favourite: Boolean(data.favourite),
        date,
        summary: String(data.summary ?? ""),
        description: String(data.description ?? data.summary ?? data.title),
        body,
      };
    })
    .sort((a, b) => Number(b.favourite) - Number(a.favourite) || b.date.localeCompare(a.date));
}

export function getTeardown(slug: string) {
  return getTeardowns().find((t) => t.slug === slug);
}

/** Optional intro shown at the top of /work, from content/work-intro.mdx. */
export function getWorkIntro() {
  const file = path.join(ROOT, "work-intro.mdx");
  return fs.existsSync(file) ? matter(fs.readFileSync(file, "utf8")).content : "";
}

export function getAbout() {
  const raw = fs.readFileSync(path.join(ROOT, "about.mdx"), "utf8");
  const { data, content } = matter(raw);
  return { description: String(data.description ?? ""), body: content };
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "2026-11-14" -> "14 November 2026". No time zones involved. */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m) return iso;
  return `${d ? `${d} ` : ""}${MONTHS[m - 1]} ${y}`;
}

/** Marks text that still needs writing: front matter values starting with "TODO". */
export function isTodo(text?: string) {
  return !!text && /^\s*TODO\b/i.test(text);
}
export function stripTodo(text: string) {
  return text.replace(/^\s*TODO:?\s*/i, "");
}
