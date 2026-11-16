import { MobileMenu } from "@/components/mobile-menu";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import type { NavItem } from "@/content/site";

type SiteHeaderProps = {
  nav: readonly NavItem[];
  purchaseUrl: string;
};

export function SiteHeader({ nav, purchaseUrl }: SiteHeaderProps) {
  return (
    <>
      {/*
        Fixed rather than sticky: the header is a fixed part of the frame, so
        no scrolling ancestor or browser quirk can pull it out of view. The
        spacer below returns its height to the document flow.
      */}
      <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-line/80 bg-paper md:h-[72px]">
        <Container className="flex h-full items-center justify-between gap-4">
          <a
            href="#top"
            className="flex min-h-11 items-center gap-2.5 text-ink"
            aria-label="Dad's Life Lessons, back to top"
          >
            <span className="whitespace-nowrap font-display text-xl font-semibold tracking-tight md:text-2xl">
              Dad&apos;s Life Lessons
            </span>
            <span className="hidden text-[0.625rem] uppercase tracking-[0.18em] text-muted lg:inline">
              by Justin Matthew
            </span>
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-6 md:flex lg:gap-8"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="link-underline inline-flex min-h-11 items-center text-sm text-ink/80 hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/*
              Hidden from the wrapper rather than the link. `ButtonLink` already
              sets `inline-flex`, and Tailwind emits `.hidden` before it, so a
              `hidden` class on the link itself would be overridden.
            */}
            <div className="hidden sm:block">
              <ButtonLink href={purchaseUrl} variant="quiet">
                Pre-order
              </ButtonLink>
            </div>
            <MobileMenu nav={nav} purchaseUrl={purchaseUrl} />
          </div>
        </Container>
      </header>

      <div aria-hidden className="h-16 md:h-[72px]" />
    </>
  );
}
