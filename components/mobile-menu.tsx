"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { NavItem } from "@/content/site";

type MobileMenuProps = {
  nav: readonly NavItem[];
  purchaseUrl: string;
};

/**
 * Full-width navigation sheet for small screens.
 *
 * The sheet hangs directly from the header and slides out from under it, so it
 * reads as part of the frame rather than a dialog floating over the page. The
 * trigger doubles as the close control; Tab cycles through the sheet and back
 * to it, Escape closes, and a tap outside dismisses it.
 */
export function MobileMenu({ nav, purchaseUrl }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const releaseRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    if (!panel) return;

    /*
      Freeze the page by taking the body out of flow. `overflow: hidden` alone
      is ignored by mobile Safari, which would let the page move behind the
      sheet and take the fixed header with it in some browsers.
    */
    const body = document.body;
    const root = document.documentElement;
    const header = triggerRef.current?.closest("header") ?? null;
    const scrollY = window.scrollY;
    // Classic scrollbars vanish when the page locks; hold their space instead.
    const scrollbar = window.innerWidth - root.clientWidth;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };
    const previousHeaderPadding = header?.style.paddingRight ?? "";

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    if (scrollbar > 0) {
      body.style.paddingRight = `${scrollbar}px`;
      if (header) header.style.paddingRight = `${scrollbar}px`;
    }

    /*
      Idempotent so a link can hand the page back before its own navigation,
      and the effect cleanup can still run without scrolling the visitor back
      to where the sheet was opened.
    */
    let released = false;
    function release() {
      if (released) return;
      released = true;

      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.left = previous.left;
      body.style.right = previous.right;
      body.style.width = previous.width;
      body.style.overflow = previous.overflow;
      body.style.paddingRight = previous.paddingRight;
      if (header) header.style.paddingRight = previousHeaderPadding;

      // Jump back synchronously so the fixed body does not flash at the top.
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, scrollY);
      root.style.scrollBehavior = "";
    }
    releaseRef.current = release;

    const items = Array.from(
      panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );
    // The trigger sits outside the panel, so it joins the cycle by hand.
    const trigger = triggerRef.current;
    const focusable = trigger ? [trigger, ...items] : items;
    items[0]?.focus();

    function closeFromOutside(event: PointerEvent) {
      const target = event.target as Node;
      if (panel?.contains(target) || trigger?.contains(target)) return;
      setOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("pointerdown", closeFromOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      release();
      releaseRef.current = null;

      document.removeEventListener("pointerdown", closeFromOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  // Close the sheet if the viewport grows into the desktop navigation.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    desktop.addEventListener("change", handleChange);
    return () => desktop.removeEventListener("change", handleChange);
  }, []);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  /**
   * Restore the page synchronously before an anchor or external link runs, so
   * the browser's own navigation is not fighting the scroll lock.
   */
  function leaveSheet() {
    releaseRef.current?.();
    setOpen(false);
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => (open ? close() : setOpen(true))}
        className="flex h-11 w-11 shrink-0 items-center justify-center border border-ink/20 text-ink md:hidden"
      >
        <span aria-hidden className="relative block h-5 w-5">
          <span
            className={
              open
                ? "absolute top-1/2 left-0 h-px w-5 -rotate-45 bg-current"
                : "absolute top-2 left-0 h-px w-5 bg-current"
            }
          />
          <span
            className={
              open
                ? "absolute top-1/2 left-0 h-px w-5 rotate-45 bg-current"
                : "absolute top-3.5 left-0 h-px w-5 bg-current"
            }
          />
        </span>
      </button>

      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-[60] md:hidden">
          {/* Tap-away layer; the sheet above it stays interactive. */}
          <div
            aria-hidden
            onClick={close}
            className="menu-scrim absolute inset-0 bg-ink/30"
          />

          {/* Clips the sheet as it slides down from behind the header. */}
          <div className="relative w-full overflow-hidden shadow-[0_28px_48px_-28px_rgba(23,43,69,0.55)]">
            <div
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="menu-panel max-h-[calc(100svh-4rem)] overflow-y-auto border-b border-line bg-paper"
            >
              <nav aria-label="Mobile">
                {nav.map((item, index) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={leaveSheet}
                    className="flex min-h-14 items-center justify-between gap-4 border-b border-line/80 px-5 py-3"
                  >
                    <span className="font-display text-2xl text-ink">
                      {item.label}
                    </span>
                    <span className="text-[0.625rem] uppercase tracking-[0.2em] text-muted">
                      0{index + 1}
                    </span>
                  </a>
                ))}
              </nav>

              {/* Fourth row: same rhythm as the links, full-bleed emphasis. */}
              <a
                href={purchaseUrl}
                onClick={leaveSheet}
                className="group flex min-h-14 items-center justify-between gap-4 bg-copper px-5 py-3 text-sm font-medium tracking-wide text-paper transition-colors duration-200 hover:bg-copper-deep active:translate-y-px"
              >
                Pre-order the book
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
