/**
 * All page copy and links live here so the layout can stay presentational.
 *
 * This is a pre-launch sample. The marketing copy is written to fit the brief;
 * the first-person note in `author.note` is placeholder voice and should be
 * replaced with a line from Justin before the page goes live. Keep purchase
 * links and the contact address in this file so swapping them later is a
 * one-line change.
 */

export type NavItem = {
  label: string;
  href: string;
};

export type BookTheme = {
  number: string;
  title: string;
  description: string;
};

export type Book = {
  title: string;
  author: string;
  volume: string;
  subtitle: string;
  cover: string;
  coverAlt: string;
  deck: string;
  facts: string;
  themes: readonly BookTheme[];
};

export type Inside = {
  heading: string;
  intro: string;
  panelNote: string;
};

export type Author = {
  name: string;
  role: string;
  heading: string;
  paragraphs: readonly string[];
  note: string;
  signature: string;
};

export type CourseModule = {
  number: string;
  title: string;
  description: string;
};

export type Course = {
  heading: string;
  description: string;
  format: readonly string[];
  modules: readonly CourseModule[];
  note: string;
};

export type NewsletterCopy = {
  heading: string;
  description: string;
  note: string;
};

export type Site = {
  name: string;
  url: string;
  description: string;
  copyrightYear: number;
  // Point this at the retailer or checkout URL when the book is on sale.
  // The sample routes the book CTAs to the pre-order list instead.
  purchaseUrl: string;
  email: string;
  nav: readonly NavItem[];
  legal: readonly NavItem[];
  book: Book;
  inside: Inside;
  author: Author;
  course: Course;
  newsletter: NewsletterCopy;
};

export const site: Site = {
  name: "Dad's Life Lessons",
  url: "https://dadslifelessons.com",
  description:
    "A father's notes on faith, family, work, and staying steady. Volume 1 by Justin Matthew.",
  // Kept as a constant because Cache Components treats `new Date()` as
  // unstable during prerendering.
  copyrightYear: 2026,
  purchaseUrl: "#subscribe",
  // Placeholder mailbox for the sample. Replace with the address that will
  // receive launch-list requests before the site is published.
  email: "hello@dadslifelessons.com",
  nav: [
    { label: "The Book", href: "#book" },
    { label: "The Author", href: "#author" },
    { label: "Courses", href: "#courses" },
  ],
  // Placeholder links until real policy pages exist. The hashes are inert:
  // they match nothing on the page, so clicking only changes the URL fragment.
  legal: [
    { label: "Terms of Service", href: "#terms" },
    { label: "Privacy Policy", href: "#privacy" },
  ],
  book: {
    title: "Dad's Life Lessons",
    author: "Justin Matthew",
    volume: "Volume 1",
    // Display line for the page. The cover carries the book's official
    // subtitle, so the page can use a shorter, less slogan-like version.
    subtitle: "Wisdom, faith, advice, and inspiration for the road ahead.",
    cover: "/images/dads-life-lessons-cover.png",
    coverAlt:
      "Cover of Dad's Life Lessons showing a father and his four daughters seated together on rocks, facing a sunset over the ocean.",
    deck:
      "A father's notes on faith, family, work, and staying steady. Written for his four daughters, kept for anyone who needs them.",
    facts: "Volume 1 · Four themes · One father's voice",
    themes: [
      {
        number: "01",
        title: "Wisdom",
        description: "For the decisions that don't come with a manual.",
      },
      {
        number: "02",
        title: "Faith",
        description: "For the seasons when the answer is 'not yet.'",
      },
      {
        number: "03",
        title: "Advice",
        description: "For the ordinary days that shape a family.",
      },
      {
        number: "04",
        title: "Inspiration",
        description: "For the work of becoming who you hope to be.",
      },
    ],
  },
  inside: {
    heading: "Four things worth passing on.",
    intro:
      "The book is built around four themes, each one meant to be read slowly and returned to.",
    panelNote: "The first volume in the Dad's Life Lessons series.",
  },
  author: {
    name: "Justin Matthew",
    role: "Author, Dad's Life Lessons",
    heading: "Written for four daughters. Kept for anyone who needs it.",
    paragraphs: [
      "Justin Matthew is a father of four and the author of Dad's Life Lessons. He wrote the book as a record of the things he hopes his daughters carry with them: faith, work, family, and the kind of person worth becoming.",
      "The lessons are short on purpose. They are meant to be read at a kitchen table, returned to in a hard week, and passed on when someone else needs them.",
    ],
    note:
      "I wrote this for my daughters: the things I wanted to say while they were still in the room.",
    signature: "Justin Matthew",
  },
  course: {
    heading: "The next volume is a classroom.",
    description:
      "A self-paced course for fathers who want to put these lessons into practice: at the table, on the drive to work, on the days that ask more of you. The first cohort will be small.",
    format: ["Video lessons", "A written workbook", "Live Q&A"],
    modules: [
      {
        number: "01",
        title: "Wisdom",
        description: "Making decisions you can live with.",
      },
      {
        number: "02",
        title: "Faith",
        description: "Holding on when answers don't come.",
      },
      {
        number: "03",
        title: "Advice",
        description: "What to do on ordinary days.",
      },
      {
        number: "04",
        title: "Inspiration",
        description: "Why it matters to keep going.",
      },
    ],
    note: "Enrollment details to be announced.",
  },
  newsletter: {
    heading: "Be first in line for Volume 1.",
    description:
      "Join the pre-order list and we'll send the order link as soon as the book is available. No noise.",
    note: "We won't share your address.",
  },
};
