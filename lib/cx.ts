export type ClassValue = string | false | null | undefined;

/**
 * Joins conditional class names without pulling in a utility dependency.
 * Later classes still win by source order, matching Tailwind's expectations.
 */
export function cx(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(" ");
}
