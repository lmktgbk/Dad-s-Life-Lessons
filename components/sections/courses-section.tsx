import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { Course } from "@/content/site";

type CoursesSectionProps = {
  course: Course;
};

export function CoursesSection({ course }: CoursesSectionProps) {
  return (
    <section
      id="courses"
      data-tone="dark"
      className="bg-ink py-20 text-paper sm:py-24 lg:min-h-[calc(100svh-72px)] lg:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <SectionLabel tone="paper">What Comes Next</SectionLabel>

            <h2 className="mt-5 max-w-[14ch] font-display text-[clamp(2.5rem,4.4vw,4rem)] leading-[0.98] tracking-[-0.015em]">
              {course.heading}
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-paper/75">
              {course.description}
            </p>

            <ul className="mt-9 grid gap-3 border-t border-paper/15 pt-6 sm:grid-cols-3">
              {course.format.map((item) => (
                <li key={item} className="text-sm text-paper/80">
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <ButtonLink href="#subscribe" variant="inverse">
                Join the course waitlist
              </ButtonLink>
            </div>
          </div>

          {/*
            This is an outline, not a storefront. The course is not live, so
            the card shows structure and leaves pricing and dates out.
          */}
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="bg-paper p-7 text-ink sm:p-9">
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
                <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-muted">
                  Course 01
                </p>
                <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-copper">
                  Course outline
                </p>
              </div>

              <h3 className="mt-6 font-display text-[1.75rem] leading-tight">
                Lessons for the Years Ahead
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink/70">
                A four-part course for fathers.
              </p>

              <ol className="mt-6">
                {course.modules.map((module) => (
                  <li
                    key={module.number}
                    className="grid grid-cols-[2rem_1fr] gap-3 border-t border-line/80 py-3.5"
                  >
                    <span className="text-xs tracking-[0.14em] text-copper">
                      {module.number}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-ink">
                        {module.title}
                      </p>
                      <p className="mt-0.5 text-sm leading-6 text-ink/70">
                        {module.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <p className="mt-5 border-t border-line pt-4 text-xs leading-5 text-muted">
                {course.note}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
