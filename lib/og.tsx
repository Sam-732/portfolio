import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { site } from "@/site.config";

// Link-preview images (LinkedIn, X, WhatsApp). Generated at build time, one per page.

const serif = readFileSync(join(process.cwd(), "assets/fonts/newsreader-latin-500-normal.woff"));
const sans = readFileSync(join(process.cwd(), "assets/fonts/ibm-plex-sans-latin-400-normal.woff"));

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function renderOg({ label, title }: { label: string; title: string }) {
  const clean = title.replace(/^\s*TODO:?\s*/i, "");
  const fontSize = clean.length > 110 ? 50 : clean.length > 70 ? 60 : 76;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#111111",
          padding: "64px 72px",
          borderTop: "14px solid #8a1c2b",
          fontFamily: "Plex",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#666666" }}>{label}</div>
        <div
          style={{
            display: "flex",
            fontFamily: "Newsreader",
            fontSize,
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
          }}
        >
          {clean}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
            borderTop: "2px solid #111111",
            paddingTop: 22,
          }}
        >
          <div style={{ display: "flex" }}>{site.name}</div>
          <div style={{ display: "flex", color: "#666666" }}>{site.url.replace(/^https?:\/\//, "")}</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Newsreader", data: serif, weight: 500, style: "normal" },
        { name: "Plex", data: sans, weight: 400, style: "normal" },
      ],
    },
  );
}
