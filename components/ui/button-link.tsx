import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "inverse" | "quiet" | "quietInverse";
  className?: string;
  onClick?: () => void;
};

/**
 * One link style with tone variants. `primary` is for light grounds,
 * `inverse` for navy or copper bands, and the `quiet` pair for a secondary
 * action beside a primary button (`quiet` on paper, `quietInverse` on navy).
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  onClick,
}: ButtonLinkProps) {
  const isQuiet = variant === "quiet" || variant === "quietInverse";

  return (
    <a
      href={href}
      onClick={onClick}
      className={cx(
        "group inline-flex min-h-11 items-center justify-center gap-3 text-sm font-medium tracking-wide transition-colors duration-200",
        variant === "primary" &&
          "bg-copper px-6 py-3.5 text-paper hover:bg-copper-deep active:translate-y-px",
        variant === "inverse" &&
          "bg-paper px-6 py-3.5 text-ink hover:bg-sand active:translate-y-px",
        variant === "quiet" && "link-underline py-2 text-ink hover:text-copper",
        variant === "quietInverse" &&
          "link-underline py-2 text-paper hover:text-sand",
        className,
      )}
    >
      {children}
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className={cx(
          "h-4 w-4 shrink-0 transition-transform duration-200",
          isQuiet ? "group-hover:translate-x-0.5" : "group-hover:translate-x-1",
        )}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          d="M5 12h14M13 6l6 6-6 6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
