import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Nav } from "./Nav";
import { SearchBar } from "./SearchBar";
import { PlaneDoodle } from "./PlaneDoodle";

import bike from "../../assets/bike.png";
import wheel from "@/assets/wheel.png.asset.json";
import sikkim from "../../assets/sikkim.jpg";
import goa from "../../assets/goa.jpg";
import punjab from "../../assets/punjab.jpg";
import banaras from "../../assets/banaras.jpg";
import hyderabad from "../../assets/hyderabad.jpg";

const DESTS = [
  { name: "SIKKIM", img: sikkim },
  { name: "GOA", img: goa },
  { name: "PUNJAB", img: punjab },
  { name: "BANARAS", img: banaras },
  { name: "HYDERABAD", img: hyderabad },
  
];

function DestinationStrip({ offset = 0 }: { offset?: number }) {
  return (
    <div className="flex gap-5" style={{ transform: `translateX(${offset}px)` }} data-strip>
      {DESTS.map((d, index) => (
        <button
          key={`${d.name}-${index}`}
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
          <span className="vertical-label absolute bottom-20 left-4 text-display text-[45px] text-ink-foreground drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
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
  refFirstLetter,
}: {
  refA: React.RefObject<HTMLHeadingElement | null>;
  refB: React.RefObject<HTMLHeadingElement | null>;
  /** Ref placed on the very first letter "E" of "Explore" for pixel-accurate bike detection */
  refFirstLetter: React.RefObject<HTMLSpanElement | null>;
}) {
  return (
    <div className="relative h-[clamp(90px,13vw,190px)] w-full">
      <h2
        ref={refA}
        data-morph-a
        className="text-display absolute inset-0 text-right text-[clamp(34px,5.4vw,74px)] text-brand-blue uppercase"
      >
        {/* This span lets GSAP read the exact screen X of the letter "E" every frame */}
        <span ref={refFirstLetter}>E</span>xplore the
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
  const root      = useRef<HTMLDivElement>(null);
  const track     = useRef<HTMLDivElement>(null);
  const bikeRef   = useRef<HTMLDivElement>(null);
  const wheelFront = useRef<HTMLImageElement>(null);
  const morphA    = useRef<HTMLHeadingElement>(null);
  const morphB    = useRef<HTMLHeadingElement>(null);
  // Pinned on the letter "E" — gives its live screen rect every animation frame
  const morphERef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx: gsap.Context | undefined;
    // We hold the ticker callback outside the ctx so we can remove it in cleanup
    let morphTicker: (() => void) | null = null;

    const frame = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
        const total  = panels.length;

        // ── Intro reveal on the hero panel ────────────────────────────────
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

        // ── Horizontal scrolling of the 3 panels ──────────────────────────
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
          { xPercent: -36, ease: "none", duration: 1 },
          0,
        );
        scroll.to(bikeRef.current, { xPercent: 14, ease: "none", duration: 1 }, 1);

        // Parallax on the destination strips
        gsap.utils.toArray<HTMLElement>("[data-strip]").forEach((strip) => {
          scroll.fromTo(strip, { x: 0 }, { x: -320, ease: "none", duration: total - 1 }, 0);
        });

        // ── MorphHeading — triggered by bike physically touching "E" ───────
        //
        // Strategy: gsap.ticker fires AFTER every GSAP render commit, so
        // getBoundingClientRect() always reflects the current animated state of
        // the bike (no scrub-lag mismatch).  We compare the bike's right edge
        // to the "E" span's left edge and drive a paused morph timeline with the
        // resulting 0→1 progress value.
        //
        // • overlap = 0   → progress 0  (morphA fully visible)
        // • overlap = coverWidth → progress 1  (morphB fully visible)
        // Scrolling back reverses the animation automatically.

        const morph = gsap.timeline({ paused: true, defaults: { ease: "power2.inOut" } });
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

        morphTicker = () => {
          const bikeEl  = bikeRef.current;
          const eSpan   = morphERef.current;
          const morphEl = morphA.current;
          if (!bikeEl || !eSpan || !morphEl) return;

          // All three rects are read after GSAP has already applied transforms
          const bikeRect  = bikeEl.getBoundingClientRect();
          const eRect     = eSpan.getBoundingClientRect();   // exact "E" pixel position
          const morphRect = morphEl.getBoundingClientRect(); // heading's right edge

          // How far the bike's CENTRE has advanced past the "E"'s left pixel.
          // Using the centre instead of the right edge means the morph only
          // starts once the middle of the bike is over the "E" — not as soon
          // as the front tip arrives.
          const bikeMid    = (bikeRect.left + bikeRect.right) / 2;
          const overlap    = bikeMid - eRect.left;
          // Morph completes once the bike centre has swept across the full heading text
          const coverWidth = Math.max(morphRect.right - eRect.left, 1);

          morph.progress(overlap <= 0 ? 0 : Math.min(overlap / coverWidth, 1));
        };

        // Register on the global GSAP ticker so it runs every animation frame
        gsap.ticker.add(morphTicker);

        // ── Wheel rotation driven by scroll velocity ───────────────────────
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

        // ── Panel 3 content fade reveal ───────────────────────────────────
        scroll.from(
          "[data-panel='3'] [data-reveal]",
          {
            opacity: 0,
            y: 60,
            duration: 0.7,
            ease: "power2.out",
          },
          1.15,
        );
      }, root);
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(frame);
      // Must remove ticker before ctx.revert() kills the morph timeline
      if (morphTicker) {
        gsap.ticker.remove(morphTicker);
        morphTicker = null;
      }
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

      <div ref={track} className="flex h-full w-[300vw]">
        {/* PANEL 1 — HERO */}
        <div
          data-panel="1"
          className="relative flex h-full w-screen shrink-0 flex-col items-center px-6 pt-28 md:px-12 md:pt-32"
        >
          <PlaneDoodle
            data-doodle
            className="absolute top-[14%] left-[3%] hidden w-[130px] text-foreground/70 md:block"
          />
          <PlaneDoodle
            data-doodle
            flip
            className="absolute top-[20%] right-[3%] hidden w-[130px] text-foreground/70 md:block"
          />

          <h1 className="text-display text-center text-[clamp(38px,4vw,96px)] font-krona">
            <span data-hero-line className="block overflow-hidden">
              <span className="block">Let&rsquo;s Create</span>
            </span>
            <span data-hero-line className="block overflow-hidden pb-3">
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
            className="absolute top-[52%] right-[20%] z-30 hidden rounded-full bg-ink px-5 py-2.5 text-[15px] font-medium text-ink-foreground md:block"
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
        <div
          data-panel="2"
          className="relative flex h-full w-screen shrink-0 flex-col justify-start px-6 pt-28 md:px-12 md:pt-32"
        >
          <div className="w-full">
            <DestinationStrip />
          </div>
          <div className="mt-auto mb-[10vh] flex justify-end">
            <div className="w-[62vw]">
              <MorphHeading refA={morphA} refB={morphB} refFirstLetter={morphERef} />
            </div>
          </div>
        </div>

        {/* PANEL 3 — EXPERIENCE STATEMENT */}
        <div
          data-panel="3"
          className="relative flex h-full w-screen shrink-0 flex-col items-center justify-start px-6 pt-[18vh] md:px-12"
        >
          <PlaneDoodle
            data-doodle
            className="absolute top-[10%] left-[3%] hidden w-[120px] text-foreground/60 md:block"
          />
          <h2
            data-reveal
            className="text-display text-center text-[clamp(30px,5.6vw,78px)] leading-[1.12] font-krona"
          >
            It&rsquo;s not just a HOLIDAY
            <br />
            It&rsquo;s a EXPERIENCE.
          </h2>
        </div>
      </div>

      {/* THE BIKE — rides above every panel, bigger for dramatic presence */}
      <div
        ref={bikeRef}
        className="pointer-events-none absolute bottom-[-5vh] left-[14vw] z-20 w-[74vw] max-w-[1080px] min-w-[560px] will-change-transform"
      >
        <div className="relative">
          <img
            src={bike}
            alt="Traveller riding a loaded motorcycle across India"
            className="w-full"
          />
          {/* <img
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
          /> */}
        </div>
      </div>
    </section>
  );
}
