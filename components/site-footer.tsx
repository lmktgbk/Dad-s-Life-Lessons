import { Container } from "@/components/ui/container";
import type { NavItem } from "@/content/site";

type SiteFooterProps = {
  nav: readonly NavItem[];
  legal: readonly NavItem[];
  email: string;
  copyrightYear: number;
  purchaseUrl: string;
};

/**
 * The footer closes the page with a short colophon on the left and the
 * practical links on the right: navigation, contact, and the pre-order route.
 * Everything on the right aligns to the outer edge on desktop; on narrow
 * screens the block stacks left so the reading order stays natural.
 */
export function SiteFooter({
  nav,
  legal,
  email,
  copyrightYear,
  purchaseUrl,
}: SiteFooterProps) {
  return (
    <footer data-tone="dark" className="bg-ink text-paper">
      <Container className="py-10 lg:py-12">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="font-display text-2xl tracking-tight">
              Dad&apos;s Life Lessons
            </p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-paper/70">
              A father&apos;s notes for the years ahead. Volume&nbsp;1 by
              Justin Matthew.
            </p>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <div className="flex flex-col gap-8 md:text-right lg:flex-row lg:justify-end lg:gap-16">
              <nav aria-label="Footer" className="md:ml-auto md:w-fit">
                <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-paper/60 md:text-right">
                  Explore
                </p>
                {/* Column cells stay left-aligned so the grid keeps a square edge. */}
                <ul className="mt-3 grid w-fit grid-cols-2 gap-x-8 md:text-right md:mt-4">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="link-underline inline-flex min-h-11 items-center text-sm text-paper/80 hover:text-paper"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#subscribe"
                      className="link-underline inline-flex min-h-11 items-center text-sm text-paper/80 hover:text-paper"
                    >
                      Weekly lesson
                    </a>
                  </li>
                </ul>
              </nav>

              <div>
                <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-paper/60">
                  Contact
                </p>
                <div className="mt-1 md:mt-4">
                  <a
                    href={`mailto:${email}`}
                    className="link-underline inline-flex min-h-11 items-center text-sm text-paper/80 hover:text-paper"
                  >
                    {email}
                  </a>
                </div>
                <div>
                  <a
                    href={purchaseUrl}
                    className="link-underline inline-flex min-h-11 items-center text-sm text-paper/80 hover:text-paper"
                  >
                    Order the book
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 border-t border-paper/15 pt-4 text-xs text-paper/70">
          <p>
            © {copyrightYear} Dad&apos;s Life Lessons.
            <span className="hidden sm:inline">{" "}All rights reserved.</span>
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5">
            {legal.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="link-underline inline-flex min-h-11 items-center hover:text-paper"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
