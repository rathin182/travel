import { Reveal } from "./Reveal";
import guide from "@/assets/guide.jpg.asset.json";
import g1 from "@/assets/g1.png.asset.json";
import g2 from "@/assets/g2.jpg.asset.json";
import g3 from "@/assets/g3.jpg.asset.json";
import g4 from "@/assets/g4.jpg.asset.json";

const GALLERY = [g1.url, g2.url, g3.url, g4.url];

export function GuideSection() {
  return (
    <section className="px-6 py-20 md:px-12 md:py-24">
      <Reveal className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div data-reveal className="relative h-[58vh] min-h-[380px] overflow-hidden rounded-[26px]">
          <img
            src={guide.url}
            alt="Local guide waiting beside a mountain road"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div data-reveal>
          <h2 className="text-display text-[clamp(26px,3.4vw,46px)] leading-[1.1]">
            Travel with people
            <br />
            who know the road
          </h2>
          <p className="mt-5 max-w-[520px] text-[15px] leading-relaxed text-muted-foreground">
            Local guides, vetted stays and routes shaped by riders who have done them before. You
            pick the destination, we handle the rest of the map.
          </p>
          <div className="mt-8 grid max-w-[520px] grid-cols-3 gap-6">
            {[
              ["120+", "Curated routes"],
              ["18k", "Happy travellers"],
              ["4.9", "Average rating"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-krona font-bold text-[24px] text-foreground">{n}</p>
                <p className="mt-1 text-[13px] text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-9 rounded-full bg-ink px-7 py-3.5 text-[14px] text-ink-foreground transition-transform duration-200 hover:scale-105"
          >
            Plan my journey
          </button>
        </div>
      </Reveal>

      <Reveal className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4" stagger={0.07}>
        {GALLERY.map((src, i) => (
          <div
            key={src}
            data-reveal
            className="group h-[26vh] min-h-[180px] overflow-hidden rounded-[20px]"
          >
            <img
              src={src}
              alt={`Travel moment ${i + 1}`}
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
              loading="lazy"
            />
          </div>
        ))}
      </Reveal>
    </section>
  );
}
