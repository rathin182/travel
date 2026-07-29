import { Reveal } from "./Reveal";
import t1 from "@/assets/t1.jpg.asset.json";
import t2 from "@/assets/t2.jpg.asset.json";
import t3 from "@/assets/t3.jpg.asset.json";
import t4 from "@/assets/t4.jpg.asset.json";

const ITEMS = [
  {
    img: t1.url,
    name: "Ananya Sharma",
    place: "Kashmir",
    text: "Every detail was handled before we even asked. The valley at sunrise is something I still think about.",
  },
  {
    img: t2.url,
    name: "Rohit Verma",
    place: "Goa",
    text: "Booked in ten minutes, travelled for six days, zero stress. The stay picks were genuinely great.",
  },
  {
    img: t3.url,
    name: "Meera Iyer",
    place: "Jaipur",
    text: "Our family trip felt designed around us — the pacing, the food stops, the little surprises.",
  },
  {
    img: t4.url,
    name: "Kabir Singh",
    place: "Sikkim",
    text: "Riding through the passes with everything pre-arranged made it the smoothest trip I have taken.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-surface px-6 py-20 md:px-12 md:py-24">
      <Reveal>
        <h2 data-reveal className="text-display max-w-[720px] text-[clamp(26px,3.4vw,44px)]">
          Stories from people who
          <br />
          rode with us
        </h2>
      </Reveal>
      <Reveal className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
        {ITEMS.map((t) => (
          <figure
            key={t.name}
            data-reveal
            className="rounded-[22px] bg-card p-5 shadow-[0_18px_50px_-36px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:-translate-y-2"
          >
            <blockquote className="text-[14px] leading-relaxed text-foreground/85">
              &ldquo;{t.text}&rdquo;
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <img
                src={t.img}
                alt={t.name}
                className="h-11 w-11 rounded-full object-cover"
                loading="lazy"
              />
              <span>
                <span className="block text-[14px] font-semibold">{t.name}</span>
                <span className="block text-[12px] text-muted-foreground">{t.place}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </Reveal>
    </section>
  );
}
