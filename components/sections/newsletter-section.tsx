import { NewsletterForm } from "@/components/newsletter-form";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { NewsletterCopy } from "@/content/site";

type NewsletterSectionProps = {
  newsletter: NewsletterCopy;
  email: string;
};

/*
  The pitch and the form are both short, so pairing them alone leaves a tall
  copper void under the form. The benefits move to a full-width strip beneath
  both columns, which levels the pair and lets the band end on content.
*/
export function NewsletterSection({
  newsletter,
  email,
}: NewsletterSectionProps) {
  return (
    <section
      id="subscribe"
      data-tone="copper"
      className="bg-copper py-20 text-paper sm:py-24 lg:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <SectionLabel tone="paper">{newsletter.label}</SectionLabel>

            <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(2.4rem,4.2vw,3.8rem)] leading-[1.0] tracking-[-0.015em]">
              {newsletter.heading}
            </h2>

            <p className="mt-6 max-w-md text-base leading-7 text-paper">
              {newsletter.description}
            </p>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:pt-2">
            <NewsletterForm email={email} note={newsletter.note} />
          </div>
        </div>

        <ul className="mt-12 border-t border-paper/25 sm:mt-14 md:grid md:grid-cols-3 md:gap-x-8">
          {newsletter.benefits.map((benefit, index) => (
            <li
              key={benefit}
              className="flex items-baseline gap-3 border-b border-paper/20 py-4 md:border-b-0 md:py-5"
            >
              <span
                aria-hidden
                className="text-[0.625rem] uppercase tracking-[0.2em] text-paper/60"
              >
                0{index + 1}
              </span>
              <span className="text-sm leading-6">{benefit}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
