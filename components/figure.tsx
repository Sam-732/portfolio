/* eslint-disable @next/next/no-img-element */
import type { Split } from "@/lib/content";

/**
 * Image with a caption.
 * In MDX:
 *   <Figure src="/images/voc-themes.png" alt="..." caption="..." width={1600} height={900} />
 * Leave out `src` and pass `todo="what to add"` to show a marked placeholder.
 */
export function Figure({
  src,
  alt = "",
  caption,
  todo,
  width = 1600,
  height = 900,
  priority = false,
}: {
  src?: string;
  alt?: string;
  caption?: string;
  todo?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  return (
    <figure>
      {src ? (
        <a href={src} aria-label="Open the image at full size">
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="h-auto w-full border border-rule"
          />
        </a>
      ) : (
        <div className="flex aspect-[16/9] w-full items-center justify-center border border-dashed border-accent bg-wash p-6 text-center">
          <p className="max-w-sm text-[0.9375rem] leading-normal text-muted">
            <span className="mr-2 font-mono text-[0.8125rem] text-accent">Image to add</span>
            {todo ?? "Screenshot or chart"}
          </p>
        </div>
      )}
      {caption ? (
        <figcaption className="mt-2 text-sm leading-snug text-muted">
          {caption}
          {src ? " Select the image to open it at full size." : ""}
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * A two-part bar: one share highlighted against the rest.
 * In MDX:  <SplitBar value={84} label="1 or 5 stars" rest="2 to 4 stars" caption="..." />
 */
export function SplitBar({ value, label, rest, caption }: Split) {
  const v = Math.max(0, Math.min(100, Number(value)));
  return (
    <figure>
      <div
        role="img"
        aria-label={`${v}% ${label}, ${100 - v}% ${rest}`}
        className="flex h-12 w-full sm:h-14"
      >
        <div className="bg-accent" style={{ width: `${v}%` }} />
        <div className="border-y border-r border-rule bg-wash" style={{ width: `${100 - v}%` }} />
      </div>
      <div className="mt-2 flex justify-between gap-4 font-mono text-[0.8125rem] leading-snug">
        <span>
          {v}% {label}
        </span>
        <span className="text-right text-muted">
          {100 - v}% {rest}
        </span>
      </div>
      {caption ? <figcaption className="mt-2 text-sm leading-snug text-muted">{caption}</figcaption> : null}
    </figure>
  );
}

/**
 * Horizontal bar chart from plain text, so it can be written in MDX or front matter.
 * In MDX:
 *   <Bars data="Late delivery | 486; Support | 242; Fees | 181" highlight="2" unit="reviews" caption="..." />
 * Each item is "label | number" (add "| note" for a third part). `highlight` is the row to colour (1 = first).
 */
export function Bars({
  data,
  highlight,
  unit,
  caption,
}: {
  data: string;
  highlight?: string | number;
  unit?: string;
  caption?: string;
}) {
  const rows = data
    .split(";")
    .map((r) => r.split("|").map((x) => x.trim()))
    .filter((r) => r.length >= 2 && r[0])
    .map(([label, value, note]) => ({ label, value: Number(value.replace(/,/g, "")), note }));
  const max = Math.max(...rows.map((r) => r.value), 1);
  const hi = highlight ? Number(highlight) - 1 : -1;
  const fmt = (n: number) => n.toLocaleString("en-IN");
  return (
    <figure>
      <ul className="!list-none !pl-0" aria-label={caption}>
        {rows.map((r, i) => (
          <li key={r.label} className="!mt-0 py-[0.4rem]">
            <div className="flex items-baseline justify-between gap-4 text-[0.9375rem] leading-snug">
              <span className={i === hi ? "font-medium" : ""}>{r.label}</span>
              <span className="shrink-0 font-mono text-[0.8125rem] whitespace-nowrap">
                {r.note?.startsWith("=") ? (
                  r.note.slice(1).trim()
                ) : (
                  <>
                    {fmt(r.value)}
                    {r.note ? <span className="text-muted"> {r.note}</span> : unit && i === 0 ? <span className="text-muted"> {unit}</span> : null}
                  </>
                )}
              </span>
            </div>
            <div className="mt-1 h-2.5 w-full bg-wash">
              <div
                className={i === hi ? "h-full bg-accent" : "h-full bg-muted/45"}
                style={{ width: `${Math.max((r.value / max) * 100, 0.6)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      {caption ? <figcaption className="mt-2 text-sm leading-snug text-muted">{caption}</figcaption> : null}
    </figure>
  );
}

const parts = (text: string, sep: string) =>
  text
    .split(sep)
    .map((x) => x.trim())
    .filter(Boolean);

/**
 * A metric tree: one root with branches under it.
 * In MDX:
 *   <Tree root="North star | Weekly users who log 2+ workouts" items="Activation | Second workout within 7 days; Retention | Still logging at week 12" caption="..." />
 */
export function Tree({ root, items, caption }: { root: string; items: string; caption?: string }) {
  const [rootLabel, rootText] = parts(root, "|");
  const rows = parts(items, ";").map((r) => parts(r, "|"));
  return (
    <figure>
      <div className="border-2 border-ink px-4 py-3">
        <div className="text-sm text-accent">{rootLabel}</div>
        <div className="font-serif text-[1.25rem] leading-snug">{rootText}</div>
      </div>
      <ul className="!mt-0 ml-4 !list-none border-l border-ink !pl-0 pt-1">
        {rows.map(([label, text]) => (
          <li key={label} className="relative !mt-0 py-2 pl-7 before:absolute before:top-[1.25rem] before:left-0 before:h-px before:w-5 before:bg-ink">
            <span className="block text-[0.9375rem] leading-snug font-medium">{label}</span>
            {text ? <span className="block text-[0.9375rem] leading-snug text-muted">{text}</span> : null}
          </li>
        ))}
      </ul>
      {caption ? <figcaption className="mt-2 text-sm leading-snug text-muted">{caption}</figcaption> : null}
    </figure>
  );
}

/**
 * One bar cut into labelled parts, sized by their numbers.
 * In MDX:
 *   <Segments data="Usual rest | 120 | 2:00; Heavy-set extension | 30 | +0:30" highlight="2" caption="..." />
 * Each item is "label | size | text shown for the size".
 */
export function Segments({ data, highlight, caption }: { data: string; highlight?: string | number; caption?: string }) {
  const rows = parts(data, ";").map((r) => {
    const [label, size, shown] = parts(r, "|");
    return { label, size: Number(size), shown: shown ?? size };
  });
  const total = rows.reduce((a, r) => a + r.size, 0) || 1;
  const hi = highlight ? Number(highlight) - 1 : -1;
  return (
    <figure>
      <div className="flex h-11 w-full gap-0.5" role="img" aria-label={rows.map((r) => `${r.label}: ${r.shown}`).join(", ")}>
        {rows.map((r, i) => (
          <div key={r.label} className={i === hi ? "bg-accent" : "bg-muted/45"} style={{ width: `${(r.size / total) * 100}%` }} />
        ))}
      </div>
      <div className="mt-2 flex w-full gap-0.5">
        {rows.map((r, i) => (
          <div key={r.label} className="min-w-0 pr-2 leading-snug" style={{ width: `${(r.size / total) * 100}%` }}>
            <span className="block font-mono text-[0.8125rem]">{r.shown}</span>
            <span className={`block text-[0.8125rem] ${i === hi ? "font-medium" : "text-muted"}`}>{r.label}</span>
          </div>
        ))}
      </div>
      {caption ? <figcaption className="mt-3 text-sm leading-snug text-muted">{caption}</figcaption> : null}
    </figure>
  );
}

/**
 * Two columns side by side. The right column is the highlighted one.
 * In MDX:
 *   <Compare left="Hevy | Unlimited logging; 4 routines" right="Splitwise | 4 expenses a day" caption="..." />
 * Add strike="left" to cross out the left column (an idea that turned out wrong).
 */
export function Compare({
  left,
  right,
  strike,
  caption,
}: {
  left: string;
  right: string;
  strike?: string;
  caption?: string;
}) {
  const col = (text: string) => {
    const [head, ...rest] = parts(text, "|");
    return { head, items: parts(rest.join("|"), ";") };
  };
  const l = col(left);
  const r = col(right);
  const struck = strike === "left";
  return (
    <figure>
      <div className="grid grid-cols-2 gap-x-5 sm:gap-x-8">
        <div className="border-t-2 border-muted/60 pt-2">
          <div className="text-sm text-muted">{l.head}</div>
          <ul className="!mt-1 !list-none !pl-0">
            {l.items.map((x) => (
              <li key={x} className={`!mt-0 py-1 text-[0.9375rem] leading-snug ${struck ? "text-muted line-through decoration-1" : ""}`}>
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t-2 border-accent pt-2">
          <div className="text-sm text-accent">{r.head}</div>
          <ul className="!mt-1 !list-none !pl-0">
            {r.items.map((x) => (
              <li key={x} className="!mt-0 py-1 text-[0.9375rem] leading-snug font-medium">
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {caption ? <figcaption className="mt-3 text-sm leading-snug text-muted">{caption}</figcaption> : null}
    </figure>
  );
}

/**
 * A sequence of steps, left to right on wide screens and top to bottom on phones.
 * In MDX:
 *   <Flow steps="Scrape | 13,000 reviews; Clean | 4,126 with content; Cluster | 24 clusters" highlight="3" caption="..." />
 */
export function Flow({ steps, highlight, caption }: { steps: string; highlight?: string | number; caption?: string }) {
  const rows = parts(steps, ";").map((r) => parts(r, "|"));
  const hi = highlight ? Number(highlight) - 1 : -1;
  return (
    <figure>
      <ol className="!list-none !pl-0 sm:flex sm:gap-3">
        {rows.map(([label, note], i) => (
          <li
            key={label}
            className={`!mt-0 flex gap-3 border-l-2 py-2 pl-3 sm:block sm:flex-1 sm:border-t-2 sm:border-l-0 sm:pt-2 sm:pl-0 ${
              i === hi ? "border-accent" : "border-muted/60"
            }`}
          >
            <span className={`block w-5 shrink-0 font-mono text-[0.8125rem] ${i === hi ? "text-accent" : "text-muted"}`}>{i + 1}</span>
            <span className="block min-w-0">
              <span className="block text-[0.9375rem] leading-snug font-medium">{label}</span>
              {note ? <span className="block text-[0.8125rem] leading-snug text-muted">{note}</span> : null}
            </span>
          </li>
        ))}
      </ol>
      {caption ? <figcaption className="mt-3 text-sm leading-snug text-muted">{caption}</figcaption> : null}
    </figure>
  );
}
