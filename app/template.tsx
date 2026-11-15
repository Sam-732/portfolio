import type { ReactNode } from "react";

// Re-mounts on each navigation, giving every page one short fade-in.
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-in">{children}</div>;
}
