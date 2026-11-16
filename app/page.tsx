import { AuthorSection } from "@/components/sections/author-section";
import { CoursesSection } from "@/components/sections/courses-section";
import { HeroSection } from "@/components/sections/hero-section";
import { InsideSection } from "@/components/sections/inside-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";

const bookSchema = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: site.book.title,
  author: { "@type": "Person", name: site.book.author },
  bookEdition: site.book.volume,
  inLanguage: "en",
  image: new URL(site.book.cover, site.url).toString(),
  description: site.description,
};

export default function Home() {
  return (
    <>
      <SiteHeader nav={site.nav} purchaseUrl={site.purchaseUrl} />

      <main className="flex-1">
        <HeroSection book={site.book} purchaseUrl={site.purchaseUrl} />
        <InsideSection book={site.book} inside={site.inside} />
        <AuthorSection author={site.author} />
        <CoursesSection course={site.course} />
        <NewsletterSection newsletter={site.newsletter} email={site.email} />
      </main>

      <SiteFooter
        nav={site.nav}
        legal={site.legal}
        email={site.email}
        copyrightYear={site.copyrightYear}
        purchaseUrl={site.purchaseUrl}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
      />
    </>
  );
}
