import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Shared page gutter. Every section uses the same max width and horizontal
 * padding so the left and right edges line up from header to footer.
 */
export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cx(
        "mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12",
        className,
      )}
    >
      {children}
    </div>
  );
}
