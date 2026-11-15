import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { site } from "@/site.config";

export const alt = `${site.name}: product case studies and teardowns`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ label: "Product case studies and teardowns", title: site.positioning });
}
