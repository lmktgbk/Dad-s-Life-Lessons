import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { Book } from "@/content/site";

type HeroSectionProps = {
  book: Book;
  purchaseUrl: string;
};

export function HeroSection({ book, purchaseUrl }: HeroSectionProps) {
  return (
    <section
      id="book"
      className="border-b border-line/70 bg-paper"
    >
      <Container className="grid min-h-[calc(100svh-4rem)] items-center gap-12 py-14 md:min-h-[calc(100svh-72px)] md:py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-6">
          <div className="hero-enter">
            <SectionLabel>
              {book.volume} · {book.author}
            </SectionLabel>
          </div>

          <h1
            className="hero-enter mt-5 font-display text-[clamp(3.25rem,7vw,5.75rem)] leading-[0.92] tracking-[-0.02em] text-ink"
            style={{ animationDelay: "60ms" }}
          >
            Dad&apos;s{" "}
            <span className="block italic text-copper">Life Lessons</span>
          </h1>

          <p
            className="hero-enter mt-6 max-w-[34rem] text-lg leading-8 text-ink/75 sm:text-xl sm:leading-9"
            style={{ animationDelay: "120ms" }}
          >
            {book.deck}
          </p>

          <div
            className="hero-enter mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6"
            style={{ animationDelay: "180ms" }}
          >
            <ButtonLink href={purchaseUrl} className="w-full sm:w-auto">
              Pre-order the book
            </ButtonLink>
            <ButtonLink href="#inside" variant="quiet">
              See what&apos;s inside
            </ButtonLink>
          </div>

          <p
            className="hero-enter mt-9 border-t border-line pt-4 text-xs uppercase tracking-[0.18em] text-muted"
            style={{ animationDelay: "240ms" }}
          >
            {book.facts}
          </p>
        </div>

        {/*
          The cover is the page's LCP candidate. `priority` preloads it before
          the entrance animation runs, while the mat keeps the artwork from
          bleeding past the container edge.
        */}
        <div className="lg:col-span-6">
          <div
            className="hero-enter relative mx-auto w-full max-w-[280px] p-2.5 sm:max-w-[340px] lg:ml-auto lg:mr-0 lg:max-w-[420px]"
            style={{ animationDelay: "120ms" }}
          >
            <div aria-hidden className="absolute inset-0 bg-copper/15" />
            <Image
              src={book.cover}
              alt={book.coverAlt}
              width={1024}
              height={1536}
              preload
              quality={90}
              sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 420px"
              className="relative block h-auto w-full shadow-[0_24px_55px_-22px_rgba(23,43,69,0.45)]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
