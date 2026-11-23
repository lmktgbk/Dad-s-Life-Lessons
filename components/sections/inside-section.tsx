import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { Book, Inside } from "@/content/site";

type InsideSectionProps = {
  book: Book;
  inside: Inside;
};

export function InsideSection({ book, inside }: InsideSectionProps) {
  return (
    <section
      id="inside"
      className="border-b border-line/70 bg-paper py-20 sm:py-24 lg:min-h-[calc(100svh-72px)] lg:py-28"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <SectionLabel>The Book</SectionLabel>

            <h2 className="mt-5 max-w-[18ch] font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.015em] text-ink">
              {inside.heading}
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-ink/70">
              {inside.intro}
            </p>

            {/*
              The four themes come from the book's subtitle rather than an
              invented table of contents, which keeps the sample truthful.
            */}
            <dl className="mt-10">
              {book.themes.map((theme) => (
                <div
                  key={theme.number}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-line py-5 sm:grid-cols-[3rem_11rem_1fr] sm:items-baseline"
                >
                  <span className="row-span-2 self-start text-xs tracking-[0.16em] text-copper sm:row-span-1">
                    {theme.number}
                  </span>
                  <dt className="font-display text-xl text-ink sm:text-2xl">
                    {theme.title}
                  </dt>
                  <dd className="col-start-2 mt-1 text-sm leading-6 text-ink/70 sm:col-start-3 sm:mt-0 sm:text-base">
                    {theme.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="bg-sand p-8 sm:p-10">
              <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-ink/70">
                {book.volume}
              </p>
              <p className="mt-5 font-display text-[1.6rem] leading-snug text-ink italic">
                {book.subtitle}
              </p>
              <div aria-hidden className="mt-8 h-px w-10 bg-copper" />
              <p className="mt-5 text-sm leading-6 text-ink/70">
                {inside.audience}
              </p>
              <p className="mt-4 text-xs leading-5 text-muted">
                {inside.panelNote}
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
