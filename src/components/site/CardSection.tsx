import { Reveal } from "./Reveal";
import { PlaneDoodle } from "./PlaneDoodle";
import kashmir from "@/assets/place-kashmir.jpg.asset.json";
import jaipur from "@/assets/place-jaipur.jpg.asset.json";
import goa from "@/assets/place-goa.jpg.asset.json";

export type PlaceCard = {
  img: string;
  tags: string[];
  title: string;
  rating: string;
  duration: string;
  price: string;
};

const BASE: PlaceCard[] = [
  {
    img: kashmir.url,
    tags: ["KASHMIR", "Honeymoon"],
    title: "Spent unforgettable moments in Kashmir with partner.",
    rating: "4.9",
    duration: "3 Days 2 Nights",
    price: "₹ 19,400",
  },
  {
    img: jaipur.url,
    tags: ["Jaipur"],
    title: "Create wall framing moments with family in Jaipur",
    rating: "3.9",
    duration: "3 Days 2 Nights",
    price: "₹ 19,400",
  },
  {
    img: goa.url,
    tags: ["GOA", "Couples"],
    title: "Enjoy the night life and shores of goa with special one",
    rating: "5.0",
    duration: "3 Days 2 Nights",
    price: "₹ 19,400",
  },
];

export const PLACE_CARDS = [...BASE, ...BASE];

function Card({ c }: { c: PlaceCard }) {
  return (
    <article
      data-reveal
      className="group overflow-hidden rounded-[22px] bg-card shadow-[0_18px_50px_-34px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out hover:-translate-y-2"
    >
      <div className="relative h-[210px] overflow-hidden rounded-[22px]">
        <img
          src={c.img}
          alt={c.title}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {c.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-ink/85 px-3.5 py-1.5 text-[11px] font-medium text-ink-foreground backdrop-blur-sm"
            >
              {t}
            </span>
          ))}
        </div>
        <span className="absolute bottom-3 left-3 rounded-full bg-ink/85 px-2.5 py-1 text-[11px] text-highlight backdrop-blur-sm">
          ★ {c.rating}
        </span>
      </div>
      <div className="px-4 pt-3 pb-4">
        <h3 className="text-[14px] leading-snug font-semibold">{c.title}</h3>
        <p className="mt-3 text-[13px] text-muted-foreground">{c.duration}</p>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-[15px] font-medium">{c.price}</p>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[12px] text-ink-foreground transition-transform duration-200 hover:scale-105"
          >
            Know More
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export function CardSection({
  title,
  id,
  tint = false,
}: {
  title: string;
  id: string;
  tint?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative px-6 py-20 md:px-12 md:py-24 ${tint ? "bg-surface" : ""}`}
    >
      <PlaneDoodle className="pointer-events-none absolute top-10 left-2 hidden w-[110px] text-foreground/50 md:block" />
      <Reveal>
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 data-reveal className="text-display text-[clamp(26px,3.4vw,44px)]">
            {title}
          </h2>
          <a
            data-reveal
            href="#"
            className="flex items-center gap-2 text-[15px] font-medium text-brand-orange transition-opacity hover:opacity-70"
          >
            View all <span aria-hidden="true">→</span>
          </a>
        </div>
      </Reveal>
      <Reveal className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
        {PLACE_CARDS.map((c, i) => (
          <Card key={`${c.title}-${i}`} c={c} />
        ))}
      </Reveal>
    </section>
  );
}
