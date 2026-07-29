import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Nav } from "./Nav";
import { SearchBar } from "./SearchBar";
import { PlaneDoodle } from "./PlaneDoodle";

import bike from "@/assets/bike.png.asset.json";
import wheel from "@/assets/wheel.png.asset.json";
import sikkim from "@/assets/dest-sikkim.jpg.asset.json";
import goa from "@/assets/dest-goa.jpg.asset.json";
import punjab from "@/assets/dest-punjab.jpg.asset.json";
import banaras from "@/assets/dest-banaras.jpg.asset.json";
import hyderabad from "@/assets/dest-hyderabad.jpg.asset.json";

const DESTS = [
  { name: "SIKKIM", img: sikkim.url },
  { name: "GOA", img: goa.url },
  { name: "PUNJAB", img: punjab.url },
  { name: "BANARAS", img: banaras.url },
  { name: "HYDERABAD", img: hyderabad.url },
];

function DestinationStrip({ offset = 0 }: { offset?: number }) {
  return (
    <div
      className="flex gap-5"
      style={{ transform: `translateX(${offset}px)` }}
      data-strip
    >
      {DESTS.map((d) => (
        <button
          key={d.name}
          type="button"
          className="group relative h-[42vh] w-[17vw] min-w-[190px] shrink-0 overflow-hidden rounded-[22px] transition-transform duration-500 ease-out hover:-translate-y-2"
        >
          <img
            src={d.img}
            alt={`${d.name} destination`}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
            loading="lazy"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          <span className="vertical-label absolute bottom-5 left-4 text-display text-[26px] text-ink-foreground drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            {d.name}
          </span>
        </button>
      ))}
    </div>
  );
}

function MorphHeading({
  refA,
  refB,
}: {
  refA: React.RefObject<HTMLHeadingElement | null>;
  refB: React.RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <div className="relative h-[clamp(90px,13vw,190px)] w-full">
      <h2
        ref={refA}
        data-morph-a
        className="text-display absolute inset-0 text-right text-[clamp(34px,5.4vw,74px)] text-brand-blue uppercase"
      >
        Explore the
        <br />
        Destination
      </h2>
      <h2
        ref={refB}
        data-morph-b
        className="text-display absolute inset-0 text-right text-[clamp(34px,5.4vw,74px)] text-brand-magenta uppercase opacity-0"
      >
        Choose a
        <br />
        new experience.
      </h2>
    </div>
  );
}

export function HorizontalJourney() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bikeRef = useRef<HTMLDivElement>(null);
  const wheelFront = useRef<HTMLImageElement>(null);
  const morphA = useRef<HTMLHeadingElement>(null);
  const morphB = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx: gsap.Context | undefined;
    const frame = requestAnimationFrame(() => {
    ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
      const total = panels.length;

      // Intro reveal on the hero panel
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from("[data-hero-nav]", { y: -40, opacity: 0, duration: 0.8 })
        .from(
          "[data-hero-line] span",
          { yPercent: 115, opacity: 0, duration: 1.1, stagger: 0.12 },
          "-=0.4",
        )
        .from("[data-hero-search]", { y: 40, opacity: 0, duration: 0.9 }, "-=0.7")
        .from(
          "[data-hero-badge]",
          { scale: 0.7, opacity: 0, duration: 0.7, stagger: 0.15 },
          "-=0.6",
        )
        .from(
          bikeRef.current,
          { xPercent: -55, opacity: 0, duration: 1.4, ease: "power2.out" },
          "-=1.0",
        )
        .from("[data-doodle]", { opacity: 0, duration: 1, stagger: 0.1 }, "-=1.0");

      // Horizontal scrolling of the 4 panels
      const scroll = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => "+=" + window.innerWidth * (total - 1) * 1.15,
          invalidateOnRefresh: true,
        },
      });

      scroll.to(track.current, {
        x: () => -(track.current!.scrollWidth - window.innerWidth),
        ease: "none",
        duration: total - 1,
      });

      // Bike drifts across the viewport while the world moves past it
      scroll.fromTo(
        bikeRef.current,
        { xPercent: 0 },
        { xPercent: -46, ease: "none", duration: 1 },
        0,
      );
      scroll.to(bikeRef.current, { xPercent: 28, ease: "none", duration: 1 }, 1);
      scroll.to(bikeRef.current, { xPercent: -6, ease: "none", duration: 1 }, 2);

      gsap.to(bikeRef.current, {
        y: -14,
        duration: 0.34,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Parallax on the destination strips
      gsap.utils.toArray<HTMLElement>("[data-strip]").forEach((strip) => {
        scroll.fromTo(strip, { x: 0 }, { x: -160, ease: "none", duration: total - 1 }, 0);
      });

      // Text morph: EXPLORE THE DESTINATION -> CHOOSE A NEW EXPERIENCE.
      const morph = gsap.timeline({ defaults: { ease: "power2.inOut" } });
      morph
        .to(morphA.current, {
          opacity: 0,
          yPercent: -28,
          scaleY: 1.25,
          skewX: -8,
          filter: "blur(14px)",
          duration: 0.5,
        })
        .fromTo(
          morphB.current,
          { opacity: 0, yPercent: 34, scaleY: 0.7, skewX: 10, filter: "blur(16px)" },
          { opacity: 1, yPercent: 0, scaleY: 1, skewX: 0, filter: "blur(0px)", duration: 0.5 },
          "-=0.28",
        );
      scroll.add(morph, 1.05);

      // Wheel rotation driven by scroll velocity + a constant idle spin
      const spin = gsap.to(wheelFront.current, {
        rotate: 360,
        duration: 1.1,
        repeat: -1,
        ease: "none",
        paused: true,
      });
      let idle: ReturnType<typeof setTimeout>;
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = Math.min(Math.abs(self.getVelocity()) / 900, 7);
          spin.timeScale(0.35 + v);
          spin.play();
          clearTimeout(idle);
          idle = setTimeout(() => spin.timeScale(0.28), 180);
        },
      });
      spin.play();

      // Panel content reveals
      gsap.from("[data-panel='4'] [data-reveal]", {
        scrollTrigger: { trigger: root.current, start: "top top", scrub: 1 },
        opacity: 0,
        y: 60,
        stagger: 0.2,
      });
    }, root);
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(frame);
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={root} className="relative h-screen w-screen overflow-hidden bg-background">
      {/* Sticky nav for the whole horizontal act */}
      <div
        data-hero-nav
        className="pointer-events-none absolute top-0 right-0 left-0 z-40 px-6 py-6 md:px-12 md:py-8"
      >
        <Nav />
      </div>

      <div ref={track} className="flex h-full w-[400vw]">
        {/* PANEL 1 — HERO */}
        <div data-panel="1" className="relative flex h-full w-screen flex-col items-center px-6 pt-28 md:px-12 md:pt-32">
          <PlaneDoodle
            data-doodle
            className="absolute top-[14%] left-[3%] hidden w-[130px] text-foreground/70 md:block"
          />
          <PlaneDoodle
            data-doodle
            flip
            className="absolute top-[20%] right-[3%] hidden w-[130px] text-foreground/70 md:block"
          />

          <h1 className="text-display text-center text-[clamp(38px,7vw,96px)]">
            <span data-hero-line className="block overflow-hidden">
              <span className="block">Let&rsquo;s Create</span>
            </span>
            <span data-hero-line className="block overflow-hidden">
              <span className="block">
                Memorable <span className="font-light text-muted-foreground">Journey</span>
              </span>
            </span>
          </h1>

          <div data-hero-search className="mt-10 w-full">
            <SearchBar />
          </div>

          <span
            data-hero-badge
            className="absolute top-[52%] right-[10%] z-30 hidden rounded-full bg-ink px-5 py-2.5 text-[13px] font-medium text-ink-foreground md:block"
          >
            Travel Across India
          </span>
          <span
            data-hero-badge
            className="absolute bottom-[16%] left-[6%] z-30 hidden rounded-full bg-ink px-5 py-2.5 text-[13px] font-medium text-ink-foreground md:block"
          >
            Create Unforgettable Moments
          </span>
        </div>

        {/* PANEL 2 — DESTINATIONS + EXPLORE */}
        <div data-panel="2" className="relative flex h-full w-screen flex-col justify-start px-6 pt-28 md:px-12 md:pt-32">
          <DestinationStrip />
          <div className="mt-auto mb-[22vh] flex justify-end">
            <div className="w-[62vw]">
              <MorphHeading refA={morphA} refB={morphB} />
            </div>
          </div>
        </div>

        {/* PANEL 3 — DESTINATIONS CONTINUED */}
        <div data-panel="3" className="relative flex h-full w-screen flex-col justify-center px-6 md:px-12">
          <PlaneDoodle
            data-doodle
            className="absolute top-[12%] left-[2%] hidden w-[120px] text-foreground/60 md:block"
          />
          <DestinationStrip offset={-40} />
        </div>

        {/* PANEL 4 — EXPERIENCE STATEMENT */}
        <div data-panel="4" className="relative flex h-full w-screen flex-col items-center justify-start px-6 pt-[18vh] md:px-12">
          <PlaneDoodle
            data-doodle
            className="absolute top-[10%] left-[3%] hidden w-[120px] text-foreground/60 md:block"
          />
          <h2 data-reveal className="text-display text-center text-[clamp(30px,5.6vw,78px)] leading-[1.12]">
            It&rsquo;s not just a HOLIDAY
            <br />
            It&rsquo;s a EXPERIENCE.
          </h2>
        </div>
      </div>

      {/* THE BIKE — rides above every panel */}
      <div
        ref={bikeRef}
        className="pointer-events-none absolute bottom-[-2vh] left-[24vw] z-20 w-[52vw] max-w-[880px] min-w-[420px] will-change-transform"
      >
        <div className="relative">
          <img src={bike.url} alt="Traveller riding a loaded motorcycle across India" className="w-full" />
          <img
            ref={wheelFront}
            src={wheel.url}
            alt=""
            aria-hidden="true"
            className="absolute"
            style={{
              width: `${(248 / 1408) * 100}%`,
              left: `${((1032 - 124) / 1408) * 100}%`,
              top: `${((580 - 124) / 768) * 100}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
