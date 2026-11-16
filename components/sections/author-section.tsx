import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { Author } from "@/content/site";

type AuthorSectionProps = {
  author: Author;
};

export function AuthorSection({ author }: AuthorSectionProps) {
  return (
    <section
      id="author"
      className="border-b border-line/70 bg-paper py-20 sm:py-24 lg:min-h-[calc(100svh-72px)] lg:py-28"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <SectionLabel>The Author</SectionLabel>

            <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.015em] text-ink">
              {author.heading}
            </h2>

            <div className="mt-6 max-w-xl space-y-5 text-base leading-7 text-ink/70">
              {author.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-9">
              <p className="font-display text-2xl italic text-copper">
                {author.signature}
              </p>
              <p className="mt-1 text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
                {author.role}
              </p>
            </div>
          </div>

          {/*
            No portrait was supplied. The quote carries the section instead of
            leaving an empty image frame, and a photograph can be dropped into
            the right column later without changing the grid.
          */}
          <div className="lg:col-span-5 lg:col-start-8">
            <figure className="border-l border-line pl-8 sm:pl-10 lg:mt-16">
              <blockquote className="font-display text-[clamp(1.75rem,2.6vw,2.4rem)] italic leading-[1.25] text-ink">
                <p>&ldquo;{author.note}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-6 text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
                From the author
              </figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}
