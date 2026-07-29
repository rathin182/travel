import { Reveal } from "./Reveal";

const COLS = [
  { title: "Explore", links: ["Destinations", "Packages", "Group Tours", "Honeymoon"] },
  { title: "Company", links: ["About Us", "Careers", "Press", "Contact Us"] },
  { title: "Support", links: ["Help Centre", "Cancellation", "Privacy", "Terms"] },
];

export function Footer() {
  return (
    <footer className="bg-ink px-6 pt-20 pb-10 text-ink-foreground md:px-12">
      <Reveal>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div data-reveal>
            <p className="text-display text-[clamp(30px,4.4vw,60px)] leading-[1.1]">
              Ready when
              <br />
              you are.
            </p>
            <button
              type="button"
              className="mt-7 rounded-full bg-ink-foreground px-7 py-3.5 text-[14px] text-ink transition-transform duration-200 hover:scale-105"
            >
              Start planning
            </button>
          </div>
          <div data-reveal className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLS.map((c) => (
              <div key={c.title}>
                <p className="text-[13px] font-semibold tracking-wide uppercase opacity-60">
                  {c.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-[14px] opacity-80 transition-opacity hover:opacity-100">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
      <div className="mt-16 flex flex-col gap-3 border-t border-ink-foreground/15 pt-6 text-[13px] opacity-60 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Go Packers. All rights reserved.</p>
        <p>Made for travellers across India.</p>
      </div>
    </footer>
  );
}
