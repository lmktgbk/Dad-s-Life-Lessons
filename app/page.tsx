import { AuthorSection } from "@/components/sections/author-section";
import { HeroSection } from "@/components/sections/hero-section";
import { InsideSection } from "@/components/sections/inside-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { OrderSection } from "@/components/sections/order-section";
import { ProgramsSection } from "@/components/sections/programs-section";
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
  audience: {
    "@type": "Audience",
    audienceType: "Adults and young adults",
  },
  offers: site.order.editions.map((edition) => ({
    "@type": "Offer",
    name: edition.name,
    price: edition.price.toFixed(2),
    priceCurrency: "USD",
    availability: "https://schema.org/PreOrder",
    url: new URL(edition.href, site.url).toString(),
  })),
};

export default function Home() {
  return (
    <>
      <SiteHeader nav={site.nav} purchaseUrl={site.purchaseUrl} />

      <main className="flex-1">
        <HeroSection book={site.book} purchaseUrl={site.purchaseUrl} />
        <InsideSection book={site.book} inside={site.inside} />
        <OrderSection order={site.order} />
        <AuthorSection author={site.author} />
        <ProgramsSection
          programs={site.programs}
          course={site.course}
          coaching={site.coaching}
          email={site.email}
        />
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
