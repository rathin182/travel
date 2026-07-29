import { Link } from "@tanstack/react-router";

const LINKS = ["Home", "About", "Destinations", "Packages", "Contact Us"];

export function Nav({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <header
      className={`pointer-events-auto flex w-full items-center justify-between ${
        tone === "light" ? "text-ink-foreground" : "text-foreground"
      }`}
    >
      <Link
        to="/"
        className="text-display text-2xl tracking-tight md:text-[28px]"
        aria-label="Go Packers home"
      >
        LOGO
      </Link>
      <nav className="hidden items-center gap-7 text-[15px] md:flex lg:gap-10">
        {LINKS.map((l, i) => (
          <a
            key={l}
            href="#"
            className={`relative transition-opacity hover:opacity-60 ${
              i === 0 ? "marker-underline font-medium" : "text-muted-foreground"
            }`}
          >
            {l}
          </a>
        ))}
      </nav>
      <button
        type="button"
        aria-label="Open menu"
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-border md:hidden"
      >
        <span className="block h-px w-4 bg-current" />
        <span className="block h-px w-4 bg-current" />
      </button>
    </header>
  );
}
