"use client";

import { useId, useState, type FormEvent } from "react";

type NewsletterFormProps = {
  email: string;
};

/**
 * The sample has no mailing-list backend. Submitting composes a pre-filled
 * message in the visitor's mail app, which keeps the demo honest and requires
 * no account. To connect a provider later, replace `handleSubmit` with the
 * provider call and keep the markup and validation as they are.
 */
export function NewsletterForm({ email }: NewsletterFormProps) {
  const [address, setAddress] = useState("");
  const [opened, setOpened] = useState(false);
  const inputId = useId();
  const noteId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = encodeURIComponent("Pre-order Dad's Life Lessons");
    const body = encodeURIComponent(
      `Please add me to the launch list for Dad's Life Lessons.\n\nEmail: ${address}\n`,
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setOpened(true);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <label
        htmlFor={inputId}
        className="block text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-paper"
      >
        Email address
      </label>

      <div className="mt-2.5 flex flex-col gap-2 sm:flex-row">
        <input
          id={inputId}
          name="email"
          type="email"
          autoComplete="email"
          required
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          aria-describedby={noteId}
          className="h-14 w-full min-w-0 border border-paper/40 bg-paper px-4 text-base text-ink placeholder:text-muted sm:w-auto sm:flex-1"
          placeholder="you@example.com"
        />
        <button
          type="submit"
          className="h-14 shrink-0 bg-sand px-6 text-sm font-medium tracking-wide text-ink transition-colors duration-200 hover:bg-paper active:translate-y-px"
        >
          Join the list
        </button>
      </div>

      <p id={noteId} className="mt-3 text-sm leading-6 text-paper">
        This opens your email app. Send the note and you&apos;re on the list. Or
        write to{" "}
        <a
          href={`mailto:${email}?subject=${encodeURIComponent("Pre-order Dad's Life Lessons")}`}
          className="underline underline-offset-4 hover:text-sand"
        >
          {email}
        </a>
        .
      </p>

      {opened && (
        <p role="status" className="mt-2 text-sm text-paper">
          Your email app should be open with a pre-filled note.
        </p>
      )}
    </form>
  );
}
