import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-16 sm:py-24">
      <h1 className="display">This page doesn&rsquo;t exist.</h1>
      <p className="mt-6 max-w-[40rem]">
        The link may be old or mistyped. Go to the{" "}
        <Link href="/" className="link">
          home page
        </Link>{" "}
        or see the{" "}
        <Link href="/work" className="link">
          case studies
        </Link>
        .
      </p>
    </section>
  );
}
