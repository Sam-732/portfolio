/**
 * Everything personal lives here. Links left empty are simply not shown.
 * Run `npm run check` to list anything still unfilled.
 */
export const site = {
  name: "Samprat Trivedi",
  url: "https://samprat.org",

  // Home page: one sentence of positioning, one line of proof.
  positioning:
    "I’m a computer science student who works like a technical PM: I build my own prototypes and test my thinking against real data.",
  proof:
    "13,000 Play Store reviews narrowed to 15 complaint themes, scored against 182 reviews I labelled by hand.",

  // Used for search results and link previews.
  description:
    "Product case studies and teardowns by Samprat Trivedi, a computer science student in Ahmedabad who builds his own prototypes and tests his thinking against real data.",

  // Footer links. Leave x empty to hide it.
  // Shown in the footer, in this order.
  emails: ["samprattrivedi@gmail.com", "s.trivedi@samprat.org"],
  linkedin: "https://www.linkedin.com/in/samprat-trivedi-b01098300/",
  x: "",
  github: "https://github.com/Sam-732",

  // Put the PDF in /public (for example /public/resume.pdf) and set "/resume.pdf".
  resume: "https://drive.google.com/file/d/1X1uvkVdpftG3OQoawVWZ5k8rQklJhnHu/view",

  // About page photo: put the file in /public/images and set the path, or leave empty.
  photo: "",
};

export type Site = typeof site;
