import type { ComponentProps } from "react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Bars, Compare, Figure, Flow, Segments, SplitBar, Tree } from "./figure";
import { Todo } from "./todo";

function A({ href = "", children, ...rest }: ComponentProps<"a">) {
  if (href.startsWith("/") && !/\.[a-z0-9]+$/i.test(href)) {
    return <Link href={href}>{children}</Link>;
  }
  const external = /^https?:\/\//.test(href);
  return (
    <a href={href} {...(external ? { rel: "noopener noreferrer", target: "_blank" } : {})} {...rest}>
      {children}
    </a>
  );
}

const components = { a: A, Bars, Compare, Figure, Flow, Segments, SplitBar, Todo, Tree };

/** Renders an MDX string. Figure, Bars, Compare, Segments, SplitBar, Tree and Todo are available in every file. */
export function Mdx({ source }: { source: string }) {
  return (
    <div className="essay">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
