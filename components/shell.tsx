import type { ReactNode } from "react";

/** Page width and side padding, shared by header, main and footer. */
export function Wrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[62rem] px-5 sm:px-8 ${className}`}>{children}</div>;
}

/**
 * The page grid: a narrow margin column for labels and dates, then the
 * reading column (about 65 characters). On phones the margin note sits above.
 */
export function Row({
  aside,
  children,
  className = "",
}: {
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`lg:grid lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-x-12 ${className}`}>
      <div className="mb-3 text-sm leading-snug text-muted lg:mb-0 lg:pt-[0.45rem]">{aside}</div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
