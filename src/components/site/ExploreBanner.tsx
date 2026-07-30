import { Reveal } from "./Reveal";
import kashmir from "../../assets/sikkim.jpg";
import goa from "../../assets/goa.jpg";
import punjab from "../../assets/punjab.jpg";
import banaras from "../../assets/banaras.jpg";
import ex1 from "../../assets/ex1.jpg"
import ex2 from "../../assets/ex2.jpg"
import ex3 from "../../assets/ex3.jpg"

export function ExploreBanner() {
  return (
    <section className="px-6 py-12 md:px-12">
      <Reveal>
        <div
          data-reveal
          className="relative overflow-hidden rounded-[28px] bg-black p-8 sm:p-12 md:p-14 text-white shadow-2xl min-h-[440px] md:min-h-[480px] flex items-center"
        >
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 w-full">
            {/* Left Area: 2 Vertical Image Columns */}
            <div className="lg:col-span-6 xl:col-span-5 flex gap-4 relative h-[380px] sm:h-[420px] items-center">
              {/* Column 1: 2 Cards (offset slightly lower) */}
              <div className="flex flex-col gap-4 w-1/2 justify-center pt-10 sm:pt-14">
                <div className="h-[280px] sm:h-[250px] w-full rounded-[22px] overflow-hidden shadow-lg border border-white/10 shrink-0">
                  <img
                    src={ex3}
                    alt="Explore destination 1"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="h-[280px] sm:h-[250px] w-full rounded-[22px] overflow-hidden shadow-lg border border-white/10 shrink-0">
                  <img
                    src={goa}
                    alt="Explore destination 2"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              {/* Column 2: 3 Cards (Top image hidden at top, Bottom image hidden at bottom) */}
              <div className="flex flex-col gap-4 w-1/2 -mt-24 sm:-mt-28 shrink-0">
                <div className="h-[180px] sm:h-[210px] w-full rounded-[22px] overflow-hidden shadow-lg border border-white/10 shrink-0">
                  <img
                    src={ex1}
                    alt="Explore destination 3"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="h-[180px] sm:h-[210px] w-full rounded-[22px] overflow-hidden shadow-lg border border-white/10 shrink-0">
                  <img
                    src={ex2}
                    alt="Explore destination 4"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="h-[180px] sm:h-[210px] w-full rounded-[22px] overflow-hidden shadow-lg border border-white/10 shrink-0">
                  <img
                    src={kashmir}
                    alt="Explore destination 5"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: GO PACKERS Text Content */}
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center lg:pl-8">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-white/70 mb-3">
                GO PACKERS
              </p>
              <h2 className="font-krona text-[clamp(26px,3.8vw,54px)] font-bold uppercase leading-[1.18] tracking-tight text-white">
                EXPLORE THE WORLD
                <br />
                TRAVEL FOR DREAMS
              </h2>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
