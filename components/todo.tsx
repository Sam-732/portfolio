import type { ReactNode } from "react";

/**
 * A visible "still to write / still to add" marker.
 * In MDX:  <Todo>What goes here</Todo>
 * Delete the tag once the real content is in.
 */
export function Todo({ children, label = "To write" }: { children: ReactNode; label?: string }) {
  return (
    <div className="border border-dashed border-accent bg-wash px-4 py-3 text-[0.9375rem] leading-normal">
      <span className="mr-2 font-mono text-[0.8125rem] text-accent">{label}</span>
      <span className="text-muted">{children}</span>
    </div>
  );
}

export function TodoInline({ children }: { children: ReactNode }) {
  return (
    <span className="border border-dashed border-accent bg-wash px-1.5 py-0.5 font-mono text-[0.8125rem] text-accent">
      {children}
    </span>
  );
}
