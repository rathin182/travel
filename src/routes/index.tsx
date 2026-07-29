import { createFileRoute } from "@tanstack/react-router";

import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { HorizontalJourney } from "@/components/site/HorizontalJourney";
import { CardSection } from "@/components/site/CardSection";
import { FeatureBanner } from "@/components/site/FeatureBanner";
import { AmenitiesSection } from "@/components/site/AmenitiesSection";
import { ExploreBanner } from "@/components/site/ExploreBanner";
import { Testimonials } from "@/components/site/Testimonials";
import { Footer } from "@/components/site/Footer";

const TITLE = "Go Packers — Curated Journeys Across India";
const DESC =
  "Plan memorable trips across Kashmir, Goa, Jaipur, Sikkim and more. Curated routes, vetted stays and local guides for honeymoons, families, friends and couples.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useSmoothScroll();

  return (
    <main className="overflow-x-hidden bg-background text-foreground">
      <h1 className="sr-only">Go Packers — curated travel journeys across India</h1>
      <HorizontalJourney />
      <CardSection id="top-places" title="Top Places to visit" />
      <FeatureBanner />
      <CardSection id="packages" title="Best Tour Packages" tint />
      <AmenitiesSection />
      <ExploreBanner />
      <Testimonials />
      <Footer />
    </main>
  );
}
