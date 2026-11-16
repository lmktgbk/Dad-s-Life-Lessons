import type { Metadata, Viewport } from "next";
import { Fraunces, Newsreader } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

// Two variable serif faces: Fraunces for display, Newsreader for reading.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.book.title} — ${site.book.author}`,
  description: site.description,
  authors: [{ name: site.book.author }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.book.title} — ${site.book.author}`,
    description: site.description,
    images: [
      {
        url: site.book.cover,
        width: 1024,
        height: 1536,
        alt: site.book.coverAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.book.title} — ${site.book.author}`,
    description: site.description,
    images: [site.book.cover],
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f0e4",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body
        id="top"
        className="flex min-h-full flex-col bg-paper font-body text-ink"
      >
        {children}
      </body>
    </html>
  );
}
