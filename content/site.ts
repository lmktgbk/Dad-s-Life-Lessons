/**
 * All page copy and links live here so the layout can stay presentational.
 *
 * Sample submission for the Dad's Life Lessons site. Two things are still
 * placeholders and are marked where they sit: the edition prices (invented so
 * the page can show a real decision) and the first-person note in
 * `author.note` (written in Justin's voice, not by him). Keep purchase links
 * and the contact address in this file so swapping them later is a one-line
 * change.
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
  audience: string;
  panelNote: string;
};

export type Edition = {
  id: string;
  number: string;
  format: string;
  name: string;
  /** Displayed as `$price`. Placeholder figure; replace before checkout opens. */
  price: number;
  description: string;
  includes: readonly string[];
  ctaLabel: string;
  href: string;
  /** The one edition the page leads with. */
  featured?: boolean;
};

export type Order = {
  heading: string;
  intro: string;
  note: string;
  editions: readonly Edition[];
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

export type Coaching = {
  heading: string;
  description: string;
  details: readonly string[];
  note: string;
  ctaLabel: string;
  /** Subject line for the inquiry email the CTA opens. */
  subject: string;
};

export type Programs = {
  heading: string;
  description: string;
};

export type NewsletterCopy = {
  label: string;
  heading: string;
  description: string;
  note: string;
  benefits: readonly string[];
};

export type Site = {
  name: string;
  url: string;
  description: string;
  copyrightYear: number;
  // Where the book is bought. The sample routes every order CTA to the order
  // section, because checkout does not open until Volume 1 is released.
  purchaseUrl: string;
  email: string;
  nav: readonly NavItem[];
  legal: readonly NavItem[];
  book: Book;
  inside: Inside;
  order: Order;
  author: Author;
  programs: Programs;
  course: Course;
  coaching: Coaching;
  newsletter: NewsletterCopy;
};

export const site: Site = {
  name: "Dad's Life Lessons",
  url: "https://dadslifelessons.com",
  description:
    "A father's notes on faith, family, work, and staying steady. Signed, print, and digital editions by Justin Matthew, with a free weekly lesson by email.",
  // Kept as a constant because Cache Components treats `new Date()` as
  // unstable during prerendering.
  copyrightYear: 2026,
  purchaseUrl: "#order",
  // Placeholder mailbox for the sample. Replace with the address that will
  // receive inquiries before the site is published.
  email: "hello@dadslifelessons.com",
  nav: [
    { label: "The Book", href: "#book" },
    { label: "Order", href: "#order" },
    { label: "The Author", href: "#author" },
    { label: "Programs", href: "#programs" },
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
    facts: "Four themes · For adults and young adults",
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
    audience:
      "Written for adults and young adults, and for anyone who wants to live the life they hope for.",
    panelNote: "The first volume in the Dad's Life Lessons series.",
  },
  order: {
    heading: "Three ways to read it.",
    intro:
      "The same four themes, in the format that suits you. The signed first printing is numbered by hand and will not be reprinted.",
    note: "Checkout opens with Volume 1. Join the weekly lesson and we'll send the order link the day each edition goes live.",
    editions: [
      {
        id: "signed",
        number: "01",
        format: "Signed",
        name: "Signed print",
        price: 34,
        description: "Numbered and signed on the title page. A first printing, made to be kept.",
        includes: ["Numbered by hand", "Signed on the title page", "First printing only"],
        ctaLabel: "Notify me",
        href: "#subscribe",
        featured: true,
      },
      {
        id: "print",
        number: "02",
        format: "Print",
        name: "Hardcover",
        price: 24,
        description: "The standard edition, for reading at the table and passing on.",
        includes: ["Cloth-bound hardcover", "All four themes", "A book to lend out"],
        ctaLabel: "Notify me",
        href: "#subscribe",
      },
      {
        id: "digital",
        number: "03",
        format: "Digital",
        name: "Ebook",
        price: 12,
        description: "Delivered to your inbox the day Volume 1 is released.",
        includes: ["ePub and PDF", "Reads on any device", "No shipping, no waiting"],
        ctaLabel: "Notify me",
        href: "#subscribe",
      },
    ],
  },
  author: {
    name: "Justin Matthew",
    role: "Author, Dad's Life Lessons",
    heading: "Written for four daughters. Kept for anyone who needs it.",
    paragraphs: [
      "Justin Matthew is a father of four and the author of Dad's Life Lessons. He wrote the book as a record of the things he hopes his daughters carry with them: faith, work, family, and the kind of person worth becoming.",
      "It began as notes. Sentences written down after conversations he did not want to forget, kept in a folder that was only ever meant for his own family. Over the years the folder grew into something a friend could borrow, and then into a book for anyone standing in the same place: raising children, holding a job, keeping faith on the ordinary days.",
      "The lessons are short on purpose. They are meant to be read at a kitchen table, returned to in a hard week, and passed on when someone else needs them.",
    ],
    note:
      "I wrote this for my daughters: the things I wanted to say while they were still in the room.",
    signature: "Justin Matthew",
  },
  programs: {
    heading: "Two ways to go deeper.",
    description:
      "A course for putting the lessons into practice, and one-on-one coaching for the questions a book can't answer.",
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
  coaching: {
    heading: "Work it through with Justin.",
    description:
      "Some things don't fit in a book. A conversation about a decision in front of you, a season with your children, or a habit you can't seem to shift.",
    details: [
      "Sessions by video or phone",
      "Scheduled directly with Justin",
      "Rates and availability on request",
    ],
    note: "Inquiries are open.",
    ctaLabel: "Ask about coaching",
    subject: "Coaching inquiry — Dad's Life Lessons",
  },
  newsletter: {
    label: "The Weekly Lesson",
    heading: "A lesson a week, in your inbox.",
    description:
      "One short note from Justin each week: a lesson from the book, and a question worth carrying into the week. Free.",
    note: "We'll send one email to confirm your address. Unsubscribe any time.",
    benefits: [
      "A new lesson every week",
      "The order link when the book opens",
      "First word on courses and coaching",
    ],
  },
};
