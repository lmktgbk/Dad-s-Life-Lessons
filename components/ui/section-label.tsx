import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type Tone = "ink" | "paper";

type SectionLabelProps = {
  children: ReactNode;
  tone?: Tone;
};

/**
 * Reuses the cover's rule-and-caps treatment as a section marker. Keeping the
 * rule width fixed makes the labels read as one system across light and dark
 * sections.
 */
export function SectionLabel({ children, tone = "ink" }: SectionLabelProps) {
  return (
    <p
      className={cx(
        "flex items-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.2em]",
        tone === "paper" ? "text-paper" : "text-copper",
      )}
    >
      <span
        aria-hidden
        className={cx(
          "h-px w-7 shrink-0",
          tone === "paper" ? "bg-paper/50" : "bg-copper",
        )}
      />
      {children}
    </p>
  );
}
