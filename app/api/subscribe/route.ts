import { NextResponse } from "next/server";

const BREVO_CONTACTS = "https://api.brevo.com/v3/contacts";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Best-effort throttle. Serverless instances do not share memory, so this
 * catches a double submit or a person hammering the button rather than a
 * determined attacker. The honeypot and the email validation are the real
 * filters.
 */
const recent = new Map<string, number>();
const WINDOW_MS = 45_000;
const MAX_TRACKED = 500;

type Payload = {
  email?: unknown;
  company?: unknown;
};

/**
 * Adds a visitor to the Brevo list behind the weekly lesson.
 *
 * Double opt-in is a setting on the Brevo list itself (Contacts → Lists →
 * the list → Settings), not a request parameter. When it is on, Brevo sends
 * the confirmation email and the contact stays unconfirmed until they click.
 * Turn it on for the list named by `BREVO_LIST_ID`.
 *
 * The API key never reaches the browser: the form posts here and this handler
 * calls Brevo server-side.
 */
export async function POST(request: Request) {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);

  if (!apiKey || !Number.isInteger(listId) || listId <= 0) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // Bots fill the hidden field. Answer as if it worked so they learn nothing.
  if (typeof payload.company === "string" && payload.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email =
    typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";

  if (email.length === 0 || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const last = recent.get(ip) ?? 0;

  if (now - last < WINDOW_MS) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  if (recent.size >= MAX_TRACKED) recent.clear();
  recent.set(ip, now);

  try {
    const response = await fetch(BREVO_CONTACTS, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        // An address that already exists is added to the list instead of
        // failing with a duplicate error.
        updateEnabled: true,
      }),
    });

    if (!response.ok) {
      // Brevo returns 400 for a blocked address and 401 for a bad key. Log the
      // reason for the operator; tell the visitor nothing about it.
      console.error(
        "Brevo rejected the contact:",
        response.status,
        await response.text(),
      );
      return NextResponse.json({ error: "provider_error" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Brevo request failed:", error);
    return NextResponse.json(
      { error: "provider_unreachable" },
      { status: 502 },
    );
  }
}
