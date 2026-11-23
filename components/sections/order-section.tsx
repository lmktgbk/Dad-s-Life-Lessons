import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { Order } from "@/content/site";

type OrderSectionProps = {
  order: Order;
};

/*
  Three editions laid out as columns rather than cards: a rule above each one,
  the price in display type, and no boxes. It keeps the section in the same
  editorial language as the numbered theme list, and lets the three prices be
  compared at a glance on a desktop.

  Checkout is not open yet, so every CTA routes to the weekly lesson and the
  note beneath the columns says why. When the editions go on sale, point each
  `href` in `content/site.ts` at its checkout URL and the layout stays as is.
*/
export function OrderSection({ order }: OrderSectionProps) {
  return (
    <section
      id="order"
      className="border-b border-line/70 bg-sand py-20 sm:py-24 lg:min-h-[calc(100svh-72px)] lg:py-28"
    >
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <SectionLabel>Order</SectionLabel>

            <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.015em] text-ink">
              {order.heading}
            </h2>
          </div>

          <p className="max-w-md text-base leading-7 text-ink/70 lg:col-span-5 lg:justify-self-end lg:pb-2">
            {order.intro}
          </p>
        </div>

        <ul className="mt-12 grid gap-y-10 sm:mt-14 md:grid-cols-3 md:gap-x-10 md:gap-y-0">
          {order.editions.map((edition) => (
            <li key={edition.id} className="border-t border-line pt-6">
              <p className="flex items-center gap-2.5 text-[0.6875rem] uppercase tracking-[0.2em] text-copper">
                <span>{edition.number}</span>
                <span aria-hidden className="h-px w-4 bg-copper/60" />
                <span>{edition.format}</span>
              </p>

              <h3 className="mt-4 font-display text-2xl leading-tight text-ink">
                {edition.name}
              </h3>

              <p className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-[2.5rem] leading-none text-ink">
                  ${edition.price}
                </span>
                <span className="text-[0.625rem] uppercase tracking-[0.18em] text-muted">
                  USD
                </span>
              </p>

              <p className="mt-4 text-sm leading-6 text-ink/70 md:min-h-[4.5rem]">
                {edition.description}
              </p>

              <ul className="mt-5 space-y-2 text-sm leading-6 text-ink/70">
                {edition.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-[0.62rem] h-px w-3 shrink-0 bg-copper/60"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <ButtonLink
                  href={edition.href}
                  variant={edition.featured ? "primary" : "quiet"}
                >
                  {edition.ctaLabel}
                  <span className="sr-only">
                    {" "}
                    when the {edition.name} edition is live
                  </span>
                </ButtonLink>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 border-t border-line pt-5">
          <p className="max-w-2xl text-sm leading-6 text-ink/70">
            {order.note}
          </p>
        </div>
      </Container>
    </section>
  );
}
