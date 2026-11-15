# samprat.org

Personal portfolio for Samprat Trivedi. Next.js (App Router) + Tailwind, statically generated, deployed on Vercel.

All content is in plain files. You never need to touch the code to add or edit a case study or teardown.

## Run it on your computer

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Edits to content files show up when you save.

| Command | What it does |
| --- | --- |
| `npm run dev` | Local preview with live reload |
| `npm run check` | Lists every placeholder still to fill in |
| `npm run build` | Production build (what Vercel runs) |
| `npm run lint` | Code checks |

## Where things live

```
site.config.ts        Your name, positioning line, proof line, emails, links, resume, photo
content/
  work/*.mdx          Case studies, one file each  -> /work/<file-name>
  teardowns/*.mdx     Teardowns, one file each     -> /teardowns/<file-name>
  about.mdx           The About page
  work-intro.mdx      The "How they connect" story at the top of /work (delete the file to hide it)
public/
  images/             Screenshots and charts
  *.pdf               Decks and your resume
assets/decks/         Source for the voice mode slides (one HTML file; open it in a browser to view or print)
  resume.pdf          Put your resume here, then set resume: "/resume.pdf" in site.config.ts
```

## Placeholders

Anything not written yet shows on the site in a dashed red box, so nothing unfinished can pass as finished.
Run `npm run check` for the full list with file names and line numbers.

- In the body of a file, a placeholder is `<Todo>what goes here</Todo>`. Replace it with your text and delete the tag.
- In the header block at the top of a file, a value starting with `TODO:` is a placeholder. Replace the whole value.
- Lines marked `DRAFT` are wording put together from the project brief. Rewrite them in your own voice.
- Empty values in `site.config.ts` (email, LinkedIn, resume) show as placeholders in the footer.

## Add a case study

1. Copy `content/work/_template.mdx` to a new file, for example `content/work/my-project.mdx`.
   The file name becomes the address: `/work/my-project`. (Files starting with `_` are ignored.)
2. Fill in the header block at the top:

   | Field | What it is |
   | --- | --- |
   | `title` | Project name. Shown as the small label. |
   | `kind` | Short type, e.g. "Curiosity project". |
   | `finding` | **The headline.** The insight in one sentence, not the project name. |
   | `counts` | One line of numbers (optional). |
   | `summary` | Exactly three lines. A skimmer reads only these. |
   | `order` | Position on the home page. 1 is first. |
   | `description` | One sentence for Google and link previews. |
   | `cover` | Image for the home page card, e.g. `/images/my-chart.png` (optional). |
   | `coverAlt`, `coverCaption` | Description and caption for that image. |
   | `split` | Optional two-part bar instead of an image (see `voc-copilot.mdx`). |
   | `bars`, `barsHighlight`, `barsCaption` | Optional bar chart instead of an image (see `growpulse.mdx`). |

3. Write under the template headings, in this order: Context, Problem, What I did, Key decisions and tradeoffs,
   What I found, What I'd do differently, How it was built, Links.
4. Save. It appears on the home page, on `/work`, in the sitemap, and gets its own link-preview image.

## Add a teardown

1. Create `content/teardowns/product-name.mdx`:

   ```mdx
   ---
   title: "Product name"
   product: Product name
   date: "2026-12-01"
   summary: "One sentence on what the teardown concludes."
   favourite: false   # true pins it first and marks it as your favourite product
   description: "One sentence for Google and link previews."
   ---

   Your teardown, using ## headings.
   ```

2. Save. It appears on `/teardowns` (newest first) and on the home page.

## Images and charts

Put the file in `public/images/`, then in any `.mdx` file:

```mdx
<Figure
  src="/images/voc-themes.png"
  alt="Bar chart of 24 complaint themes ranked by review count"
  caption="The 24 themes by number of reviews."
  width={1600}
  height={900}
/>
```

- `alt` describes the image for people who can't see it. `caption` is shown underneath. Give every image both.
- `width` and `height` are the image's real pixel size. They stop the page from jumping while it loads.
- Keep images under about 300 KB (export as WebP or compressed PNG) so the site stays fast.
- For a bar chart: `<Bars data="Late delivery | 486; Support | 242" highlight="1" caption="..." />`. Each item is `label | number`; `highlight` is the row to colour.
- For a sequence of steps: `<Flow steps="Scrape | 13,000 reviews; Clean | 4,126 kept" highlight="2" />`
- For a metric tree: `<Tree root="North star | Weekly users who log 2+ workouts" items="Activation | Second workout in 7 days; Retention | Still logging at week 12" />`
- For one bar cut into parts: `<Segments data="Usual rest | 120 | 2:00; Extension | 30 | +0:30" highlight="2" />`
- For two columns side by side: `<Compare left="Title | point; point" right="Title | point; point" />` (add `strike="left"` to cross out the left side)
- For a simple "X% versus the rest" bar: `<SplitBar value={84} label="1 or 5 stars" rest="2 to 4 stars" caption="..." />`

## Colours and type

Colours are defined once at the top of `app/globals.css`: a light theme (oxblood on white) and a dark theme
(coral on carbon). The site follows the visitor's device setting, and the Dark/Light switch in the header overrides it.

Fonts are Newsreader (headings), IBM Plex Sans (body) and IBM Plex Mono (numbers), stored in `app/fonts/` so nothing
loads from a third party.

## Deploy

1. Push this folder to a GitHub repository.
2. On [vercel.com](https://vercel.com): Add New, Project, import the repository, Deploy. No settings to change.
3. In the Vercel project: Settings, Domains, add `samprat.org`, then add the DNS records Vercel shows you at your
   domain registrar. Only add those records. Leave the nameservers and MX (email) records as they are.
4. In the Vercel project: Analytics, Enable. Page views are counted without cookies, so no cookie banner is needed.

Every later push to the main branch redeploys automatically.

## How this site was built

The code was written by Claude (Anthropic's AI model) from a brief written by Samprat, who made the
structure and design decisions. The first draft of the page text was also written by Claude, from Samprat's
project repositories and notes; Samprat reviews and edits it.
