import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import banner from "../../assets/banner-kashmir.jpg";

export function FeatureBanner() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-parallax-img]",
        { yPercent: -5, scale: 1.06 },
        {
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      gsap.from("[data-banner-copy] > *", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="px-6 pb-20 md:px-12">
      <div className="relative h-[72vh] min-h-[500px] max-h-[750px] w-full overflow-hidden rounded-[28px] shadow-2xl">
        <img
          data-parallax-img
          src={banner}
          alt="Shikara boat vendor on Dal Lake, Kashmir"
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
          loading="lazy"
        />
        {/* Gradient overlay for high text contrast matching screenshot */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />

        <div
          data-banner-copy
          className="relative z-10 flex h-full max-w-[680px] flex-col justify-center px-8 text-white md:px-16"
        >
          <p className="text-[17px] font-medium tracking-wide text-white/95 md:text-xl">
            6 Days 5 Nights
          </p>
          <h2 className="text-display mt-1 text-[clamp(56px,9.5vw,115px)] font-black leading-none tracking-tight text-white drop-shadow-md">
            KASHMIR
          </h2>
          <p className="mt-4 max-w-[500px] text-[14px] leading-relaxed text-white/90 md:text-[15px]">
            Lorem Ipsum Dolor Sit Amet Consectetur. Felis In Pharetra Maecenas Scelerisque Enim
            Arcu. Tellus Ac Diam Volutpat Eget Urna Tellus Dis Aliquam Nunc.
          </p>
          <div className="mt-8 flex items-center gap-6 md:gap-8">
            <span className="h-px w-full max-w-[340px] bg-white/50" />
            <span className="text-display shrink-0 text-2xl font-bold text-white md:text-3xl">
              ₹ 18,000
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}


