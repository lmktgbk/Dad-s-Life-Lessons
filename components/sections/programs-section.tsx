import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { Coaching, Course, Programs } from "@/content/site";

type ProgramsSectionProps = {
  programs: Programs;
  course: Course;
  coaching: Coaching;
  email: string;
};

/*
  Two paths, deliberately different shapes so the section reads as a fork
  rather than a pair of feature cards: the course is a paper slab with its
  outline in view, coaching is an open frame that leans on the navy ground.

  Neither is sold from this page yet. The course waits on a list; coaching
  opens an addressed email, which is the honest version of "inquire" before
  rates and a booking calendar exist.
*/
export function ProgramsSection({
  programs,
  course,
  coaching,
  email,
}: ProgramsSectionProps) {
  const coachingHref = `mailto:${email}?subject=${encodeURIComponent(coaching.subject)}`;

  return (
    <section
      id="programs"
      data-tone="dark"
      className="bg-ink py-20 text-paper sm:py-24 lg:py-28"
    >
      <Container>
        <div className="max-w-2xl">
          <SectionLabel tone="paper">Programs</SectionLabel>

          <h2 className="mt-5 max-w-[14ch] font-display text-[clamp(2.5rem,4.4vw,4rem)] leading-[0.98] tracking-[-0.015em]">
            {programs.heading}
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-paper/75">
            {programs.description}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex h-full flex-col bg-paper p-7 text-ink sm:p-9">
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
                <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-muted">
                  Course 01
                </p>
                <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-copper">
                  First cohort forming
                </p>
              </div>

              <h3 className="mt-6 max-w-[22ch] font-display text-[clamp(1.6rem,2.2vw,2.1rem)] leading-tight">
                {course.heading}
              </h3>

              <p className="mt-3 max-w-lg text-sm leading-6 text-ink/70">
                {course.description}
              </p>

              <ol className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {course.modules.map((module) => (
                  <li
                    key={module.number}
                    className="border-t border-line/80 pt-3"
                  >
                    <p className="text-xs tracking-[0.14em] text-copper">
                      {module.number}
                    </p>
                    <p className="mt-1 text-sm font-medium text-ink">
                      {module.title}
                    </p>
                    <p className="mt-0.5 text-sm leading-6 text-ink/70">
                      {module.description}
                    </p>
                  </li>
                ))}
              </ol>

              <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line/80 pt-3">
                {course.format.map((item) => (
                  <li
                    key={item}
                    className="text-[0.6875rem] uppercase tracking-[0.18em] text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                <ButtonLink href="#subscribe">Join the course waitlist</ButtonLink>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="flex h-full flex-col border border-paper/25 p-7 sm:p-9">
              <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-paper/60">
                One-on-one
              </p>

              <h3 className="mt-5 max-w-[18ch] font-display text-[clamp(1.6rem,2.2vw,2.1rem)] leading-tight">
                {coaching.heading}
              </h3>

              <p className="mt-3 text-sm leading-6 text-paper/75">
                {coaching.description}
              </p>

              <ul className="mt-6 space-y-2.5 border-t border-paper/15 pt-5 text-sm leading-6 text-paper/80">
                {coaching.details.map((detail) => (
                  <li key={detail} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-[0.62rem] h-px w-3 shrink-0 bg-paper/40"
                    />
                    {detail}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-paper/60">
                  {coaching.note}
                </p>
                <div className="mt-3">
                  <ButtonLink href={coachingHref} variant="inverse">
                    {coaching.ctaLabel}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
