import { useState } from "react";
import { Reveal } from "./Reveal";
import guideAsset from "../../assets/gg.jpg";

import g1Asset from "../../assets/g1.png";
import g2Asset from "../../assets/g2.png";
import g3Asset from "../../assets/g3.png";
import g4Asset from "../../assets/g4.png";

const AMENITIES = [
  {
    id: "airport",
    label: "Airport Transfers",
    image: g1Asset,
    desc: "Seamless airport pickups and drop-offs with private verified drivers and zero wait time.",
  },
  {
    id: "hotel",
    label: "Hotel Stay",
    image: g2Asset,
    desc: "Hand-picked luxury resorts and boutique stays vetted for comfort, safety, and scenic views.",
  },
  {
    id: "guide",
    label: "Tour Guide",
    image: guideAsset,
    desc: "Lorem Ipsum Dolor Sit Amet Consectetur. Tincidunt Maecenas Sapien Pharetra Faucibus. Leo Enim Donec Sapien Morbi Ut Id Suspendisse. Tristique Condimentum Ultrices",
  },
  {
    id: "meals",
    label: "Free Meals",
    image: g3Asset,
    desc: "Authentic local delicacies and gourmet meals included throughout your curated journey.",
  },
  {
    id: "wifi",
    label: "Free Wi-Fi",
    image: g4Asset,
    desc: "High-speed connectivity even in remote mountain retreats and beachside destinations.",
  },
  {
    id: "insurance",
    label: "Travel Insurance",
    image: guideAsset,
    desc: "Comprehensive travel coverage ensuring peace of mind on every single trip across India.",
  },
  {
    id: "ac",
    label: "AC Transportation",
    image: g1Asset,
    desc: "Premium air-conditioned vehicles and luxury coaches tailored for long-distance comfort.",
  },
  {
    id: "gear",
    label: "Adventure Gear",
    image: g2Asset,
    desc: "Top-tier safety gear, helmets, and trekking equipment for thrilling outdoor expeditions.",
  },
];

export function AmenitiesSection() {
  const [activeId, setActiveId] = useState("guide");
  const activeItem = AMENITIES.find((a) => a.id === activeId) || AMENITIES[2];

  return (
    <section className="px-6 py-16 md:px-12 md:py-24 max-w-7xl mx-auto font-krona">
      <Reveal>
        <h2
          data-reveal
          className="font-sans text-[clamp(28px,3.8vw,48px)]  tracking-tight mb-10 text-slate-900"
        >
          Amenities For Travellers
        </h2>
      </Reveal>

      <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Interactive List */}
        <div data-reveal className="lg:col-span-6 flex flex-col space-y-1">
          {AMENITIES.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={`w-full text-left px-6 py-3.5 text-7xl sm:text-xl font-medium transition-all duration-200 flex items-center justify-between ${
                  isActive
                    ? "bg-black text-white font-semibold shadow-md"
                    : "text-slate-900/60 hover:bg-slate-100/80 "
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Column: Preview Image + Description */}
        <div data-reveal className="lg:col-span-6 flex flex-col">
          <div className="overflow-hidden  h-[300px] sm:h-[350px] w-full shadow-md bg-slate-100">
            <img
              src={activeItem.image}
              alt={activeItem.label}
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>

          <p className="mt-6 text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
            {activeItem.desc}
          </p>

          <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-100">
            <span className="font-semibold text-slate-900 text-lg font-sans">Explore</span>
            <button
              type="button"
              className="h-11 w-11 bg-neutral-900 text-white flex items-center justify-center hover:bg-black transition-all shadow-sm"
              aria-label="Explore amenity"
            >
              <span className="text-xl leading-none">↗</span>
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
