import { useEffect, useRef, useState } from "react";
import honeymoon from "@/assets/honeymoon.jpg";
import family from "@/assets/family.jpg";
import friends from "@/assets/friends.jpg";
import couples from "@/assets/couples.jpg";

const DESTINATIONS = [
  "Kashmir, India",
  "Goa, India",
  "Jaipur, India",
  "Sikkim, India",
  "Hyderabad, India",
  "Banaras, India",
];

const DATES = ["This weekend", "Next week", "3 Days 2 Nights", "6 Days 5 Nights", "Flexible dates"];

const PEOPLE = ["1 Traveller", "2 Travellers", "3 Travellers", "4 Travellers", "5+ Travellers"];

const CATEGORIES = [
  { label: "Honeymoon", img: honeymoon },
  { label: "Family", img: family },
  { label: "Friends", img: friends },
  { label: "Couples", img: couples },
];

type FieldKey = "where" | "when" | "many";

function Field({
  id,
  label,
  placeholder,
  value,
  options,
  open,
  onToggle,
  onSelect,
  divider,
}: {
  id: FieldKey;
  label: string;
  placeholder: string;
  value: string | null;
  options: string[];
  open: boolean;
  onToggle: () => void;
  onSelect: (v: string) => void;
  divider?: boolean;
}) {
  return (
    <div className={`relative flex-1 ${divider ? "md:border-l md:border-border" : ""}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="group w-full rounded-full px-6 py-3.5 text-left transition-colors hover:bg-secondary"
      >
        <span className="block text-[11px] font-medium tracking-wide text-foreground">{label}</span>
        <span
          className={`block truncate text-[13px] ${
            value ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {value ?? placeholder}
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={label}
          className="animate-scale-in absolute top-[calc(100%+10px)] left-2 z-50 max-h-64 w-[min(280px,80vw)] origin-top overflow-auto rounded-3xl border border-border bg-popover p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.28)]"
        >
          {options.map((o) => (
            <li key={o}>
              <button
                type="button"
                role="option"
                aria-selected={value === o}
                onClick={() => onSelect(o)}
                className={`w-full rounded-2xl px-4 py-2.5 text-left text-[13px] transition-colors hover:bg-secondary ${
                  value === o ? "bg-secondary font-medium" : ""
                }`}
              >
                {o}
              </button>
            </li>
          ))}
        </ul>
      )}
      <span className="sr-only">{id}</span>
    </div>
  );
}

export function SearchBar() {
  const [open, setOpen] = useState<FieldKey | null>(null);
  const [where, setWhere] = useState<string | null>(null);
  const [when, setWhen] = useState<string | null>(null);
  const [many, setMany] = useState<string | null>(null);
  const [category, setCategory] = useState("Honeymoon");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const toggle = (k: FieldKey) => setOpen((c) => (c === k ? null : k));

  return (
    <div ref={ref} className="relative z-30 mx-auto w-full max-w-[640px]">
      <div className="flex items-center rounded-full border border-border bg-card px-1.5 py-1.5 shadow-[0_18px_50px_-28px_rgba(0,0,0,0.4)]">
        <Field
          id="where"
          label="Where"
          placeholder="Search destinations"
          value={where}
          options={DESTINATIONS}
          open={open === "where"}
          onToggle={() => toggle("where")}
          onSelect={(v) => {
            setWhere(v);
            setOpen("when");
          }}
        />
        <Field
          id="when"
          label="When"
          placeholder="Add dates"
          value={when}
          options={DATES}
          open={open === "when"}
          onToggle={() => toggle("when")}
          onSelect={(v) => {
            setWhen(v);
            setOpen("many");
          }}
          divider
        />
        <Field
          id="many"
          label="How Many"
          placeholder="Add peoples"
          value={many}
          options={PEOPLE}
          open={open === "many"}
          onToggle={() => toggle("many")}
          onSelect={(v) => {
            setMany(v);
            setOpen(null);
          }}
          divider
        />
        <button
          type="button"
          aria-label="Search trips"
          className="ml-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-ink-foreground transition-transform duration-200 hover:scale-105"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.2-3.2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="mt-3 flex justify-center">
        <div className="no-scrollbar flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-border bg-card p-1.5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.4)]">
          {CATEGORIES.map((c) => (
            <button
              key={c.label}
              type="button"
              onClick={() => setCategory(c.label)}
              aria-pressed={category === c.label}
              className={`flex shrink-0 items-center gap-2 rounded-full py-1.5 pr-4 pl-1.5 text-[13px] transition-colors ${
                category === c.label ? "bg-secondary font-medium" : "hover:bg-secondary/70"
              }`}
            >
              <img
                src={c.img}
                alt=""
                className="h-7 w-7 rounded-full object-cover"
                loading="lazy"
              />
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
