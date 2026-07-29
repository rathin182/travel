import { Reveal } from "./Reveal";
import kashmir from "../../assets/sikkim.jpg";
import goa from "../../assets/goa.jpg";
import punjab from "../../assets/punjab.jpg";
import banaras from "../../assets/banaras.jpg";

export function ExploreBanner() {
  return (
    <section className="px-6 py-12 md:px-12">
      <Reveal>
        <div
          data-reveal
          className="relative overflow-hidden rounded-[28px] bg-black p-8 sm:p-12 md:p-14 text-white shadow-2xl"
        >
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Left Column: 2x2 Photo Grid */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
                <div className="h-36 sm:h-44 rounded-[18px] overflow-hidden shadow-md">
                  <img
                    src={kashmir}
                    alt="Travel destination 1"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="h-36 sm:h-44 rounded-[18px] overflow-hidden shadow-md">
                  <img
                    src={goa}
                    alt="Travel destination 2"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="h-36 sm:h-44 rounded-[18px] overflow-hidden shadow-md">
                  <img
                    src={punjab}
                    alt="Travel destination 3"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="h-36 sm:h-44 rounded-[18px] overflow-hidden shadow-md">
                  <img
                    src={banaras}
                    alt="Travel destination 4"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: GO PACKERS Text Content */}
            <div className="lg:col-span-7 flex flex-col justify-center lg:pl-6">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-white/70 mb-3">
                GO PACKERS
              </p>
              <h2 className="font-krona text-[clamp(28px,4.5vw,58px)] font-bold uppercase leading-[1.18] tracking-tight text-white">
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
