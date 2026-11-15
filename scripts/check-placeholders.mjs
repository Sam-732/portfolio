// Lists everything that still needs writing or adding. Run: npm run check
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
let count = 0;
const report = (file, line, text) => {
  count++;
  console.log(`  ${file}${line ? `:${line}` : ""}  ${text.trim().slice(0, 110)}`);
};

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : p.endsWith(".mdx") && !e.name.startsWith("_") ? [p] : [];
  });
}

console.log("\nContent placeholders:");
for (const file of walk(path.join(root, "content"))) {
  fs.readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (/<Todo|todo=|TODO|coverTodo|DRAFT/.test(line)) report(path.relative(root, file), i + 1, line);
    });
}

console.log("\nsite.config.ts:");
const config = fs.readFileSync(path.join(root, "site.config.ts"), "utf8");
config.split("\n").forEach((line, i) => {
  if (/^\s*(linkedin|resume):\s*""/.test(line)) report("site.config.ts", i + 1, `${line.trim()}  <- empty, so not shown on the site`);
  if (/DRAFT/.test(line)) report("site.config.ts", i + 1, line);
});

console.log(count ? `\n${count} item(s) left to fill in.\n` : "\nNothing left to fill in.\n");
