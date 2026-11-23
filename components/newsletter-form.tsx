"use client";

import { useId, useState, type FormEvent } from "react";

type NewsletterFormProps = {
  email: string;
  note: string;
};

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Posts to `/api/subscribe`, which adds the address to the Brevo list and
 * lets Brevo send the double opt-in confirmation. The provider key stays on
 * the server, so nothing here needs a public credential.
 *
 * If the environment variables are missing the route answers 503 and the form
 * falls back to the contact address instead of pretending the signup landed.
 */
export function NewsletterForm({ email, note }: NewsletterFormProps) {
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const inputId = useId();
  const honeypotId = useId();
  const noteId = useId();
  const statusId = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: address, company }),
      });

      if (response.ok) {
        setStatus("sent");
        setAddress("");
        setMessage("Check your inbox and confirm the address. The first lesson follows.");
        return;
      }

      setStatus("error");

      if (response.status === 503) {
        setMessage("Signup isn't live yet.");
        return;
      }

      if (response.status === 429) {
        setMessage("That was quick. Give it a minute, then try again.");
        return;
      }

      if (response.status === 400) {
        setMessage("That address didn't look right. Check it and try again.");
        return;
      }

      setMessage("That didn't go through. Try again in a moment.");
    } catch {
      setStatus("error");
      setMessage("That didn't go through. Check your connection and try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative mt-6">
      {/*
        Honeypot. Hidden from sight and from the tab order, but present in the
        form data, so a script that fills every field identifies itself.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor={honeypotId}>Company</label>
        <input
          id={honeypotId}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />
      </div>

      <label
        htmlFor={inputId}
        className="block text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-paper"
      >
        Email address
      </label>

      <div className="mt-2.5">
        <input
          id={inputId}
          name="email"
          type="email"
          autoComplete="email"
          required
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          aria-describedby={`${noteId} ${statusId}`}
          aria-invalid={status === "error"}
          className="h-14 w-full min-w-0 border border-paper/40 bg-paper px-4 text-base text-ink placeholder:text-muted"
          placeholder="you@example.com"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-3 h-14 w-full shrink-0 bg-sand px-6 text-sm font-medium tracking-wide text-ink transition-colors duration-200 hover:bg-paper active:translate-y-px disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" ? "Sending…" : "Get the weekly lesson"}
      </button>

      <p id={noteId} className="mt-3 text-sm leading-6 text-paper">
        {status === "sent" ? (
          <>
            Check your inbox and confirm the address. The first lesson follows.
            Haven&apos;t heard anything? Write to{" "}
            <a
              href={`mailto:${email}`}
              className="underline underline-offset-4 hover:text-sand"
            >
              {email}
            </a>
            .
          </>
        ) : status === "error" ? (
          <>
            Or write to{" "}
            <a
              href={`mailto:${email}`}
              className="underline underline-offset-4 hover:text-sand"
            >
              {email}
            </a>{" "}
            and the address will be added by hand.
          </>
        ) : (
          <>
            {note} Prefer to write?{" "}
            <a
              href={`mailto:${email}`}
              className="underline underline-offset-4 hover:text-sand"
            >
              {email}
            </a>
            .
          </>
        )}
      </p>

      <p
        id={statusId}
        role="status"
        aria-live="polite"
        className={
          status === "error"
            ? "mt-3 border-l-2 border-sand pl-3 text-sm leading-6 text-paper"
            : "sr-only"
        }
      >
        {message}
      </p>
    </form>
  );
}
