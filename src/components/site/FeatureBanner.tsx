import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import banner from "@/assets/banner-kashmir.jpg.asset.json";

export function FeatureBanner() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-parallax-img]",
        { yPercent: -12, scale: 1.15 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
      gsap.from("[data-banner-copy] > *", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="px-6 pb-20 md:px-12">
      <div className="relative h-[62vh] min-h-[420px] overflow-hidden rounded-[26px]">
        <img
          data-parallax-img
          src={banner.url}
          alt="Shikara boat vendor on Dal Lake, Kashmir"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
        <div
          data-banner-copy
          className="relative flex h-full max-w-[620px] flex-col justify-center px-8 text-ink-foreground md:px-14"
        >
          <p className="text-[15px] font-medium">6 Days 5 Nights</p>
          <h2 className="text-display mt-1 text-[clamp(48px,8vw,104px)] text-white">KASHMIR</h2>
          <p className="mt-3 max-w-[460px] text-[14px] leading-relaxed text-white/85">
            Lorem Ipsum Dolor Sit Amet Consectetur. Felis In Pharetra Maecenas Scelerisque Enim
            Arcu. Tellus Ac Diam Volutpat Eget Urna Tellus Dis Aliquam Nunc.
          </p>
          <div className="mt-6 flex items-center gap-8">
            <span className="h-px w-[46%] bg-white/60" />
            <span className="text-krona text-[20px] text-white">₹ 18,000</span>
          </div>
        </div>
      </div>
    </section>
  );
}
