import { Reveal } from "./Reveal";
import { PlaneDoodle } from "./PlaneDoodle";
import kashmir from "../../assets/place-kashmir.jpg";
import jaipur from "../../assets/place-jaipur.jpg";
import goa from "../../assets/place-goa.jpg";

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
    img: kashmir,
    tags: ["KASHMIR", "Honeymoon"],
    title: "Spent unforgettable moments in Kashmir with partner.",
    rating: "4.9",
    duration: "3 Days 2 Nights",
    price: "₹ 19,400",
  },
  {
    img: jaipur,
    tags: ["Jaipur"],
    title: "Create wall framing moments with family in Jaipur",
    rating: "3.9",
    duration: "3 Days 2 Nights",
    price: "₹ 19,400",
  },
  {
    img: goa,
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
      className="group relative transition-transform duration-500 ease-out hover:-translate-y-2"
    >
      {/* Top Image Container */}
      <div className="relative h-[270px] sm:h-[290px] w-full overflow-hidden rounded-[26px] shadow-sm">
        <img
          src={c.img}
          alt={c.title}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Right Tags using Krona One font */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          {c.tags.map((t) => (
            <span
              key={t}
              className="font-krona rounded-full bg-black/60 backdrop-blur-md px-4 py-1.5 text-[11px] sm:text-[12px] font-normal text-white uppercase tracking-wider border border-white/20 shadow-md"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Rating Pill on Bottom Left of Image */}
        <div className="absolute bottom-16 left-5 z-10">
          <span className="rounded-full bg-amber-500/30 backdrop-blur-md px-3.5 py-1 text-[12px] font-semibold text-amber-100 border border-amber-400/40 flex items-center gap-1 shadow-sm">
            <span className="text-amber-300">★</span> {c.rating}
          </span>
        </div>
      </div>

      {/* Floating White Content Card overlapping the image bottom */}
      <div className="relative z-20 -mt-12 mx-3.5 rounded-[22px] bg-white p-5 sm:p-6 text-slate-900 shadow-[0_14px_45px_-15px_rgba(0,0,0,0.18)] border border-slate-100/80">
        <h3 className="font-sans text-[15px] sm:text-[17px] leading-snug font-bold text-slate-900 tracking-tight">
          {c.title}
        </h3>

        <p className="font-sans mt-3 text-[13px] sm:text-[14px] font-medium text-slate-400">
          {c.duration}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <p className="font-sans text-[18px] sm:text-[20px] font-bold text-slate-900">{c.price}</p>

          <button
            type="button"
            className="font-sans flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-[12px] sm:text-[13px] font-medium text-white transition-all duration-200 hover:bg-neutral-800"
          >
            Know More
            <span aria-hidden="true" className="text-sm">
              →
            </span>
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
