import { Reveal } from "./Reveal";
import t1 from "@/assets/t1.jpg";
import t2 from "@/assets/t2.jpg";
import t3 from "@/assets/t3.jpg";
import t4 from "@/assets/t4.jpg";

const VIDEOS = [
  { img: t1, title: "Traveler Story 1" },
  { img: t2, title: "Traveler Story 2" },
  { img: t3, title: "Traveler Story 3" },
  { img: t4, title: "Traveler Story 4" },
];

export function Testimonials() {
  return (
    <section className="px-6 py-20 md:px-12 md:py-24 max-w-7xl mx-auto">
      <Reveal>
        <div data-reveal className="text-center mb-12">
          <h2 className="font-sans text-[clamp(28px,4vw,52px)] font-bold text-slate-900 tracking-tight">
            What Other{" "}
            <span className="bg-amber-200/90 text-slate-900 px-3 py-1 rounded-lg inline-block">
              Travellers
            </span>{" "}
            Says
          </h2>
        </div>
      </Reveal>

      <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.08}>
        {VIDEOS.map((v, i) => (
          <div
            key={i}
            data-reveal
            className="group relative overflow-hidden rounded-[24px] aspect-[9/14] h-[380px] sm:h-[440px] w-full shadow-lg bg-slate-900 cursor-pointer"
          >
            <img
              src={v.img}
              alt={v.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />

            {/* Dark gradient for atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Centered White Play Icon */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="h-14 w-14 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white/40">
                <span className="text-white text-xl translate-x-0.5 font-sans">▶</span>
              </div>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
