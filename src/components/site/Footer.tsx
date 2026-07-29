import { Reveal } from "./Reveal";
import { Twitter, Linkedin, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white px-6 pt-20 pb-12 text-slate-800 border-t border-slate-100 md:px-12">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div data-reveal className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 mb-16">
            {/* Column 1: LOGO */}
            <div className="lg:col-span-4">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-sans">
                LOGO
              </h2>
            </div>

            {/* Column 2: Explore */}
            <div className="lg:col-span-3">
              <h3 className="text-base font-bold text-slate-900 font-sans mb-4">Explore</h3>
              <ul className="space-y-3 text-sm text-slate-500 font-sans">
                <li>
                  <a href="#" className="hover:text-slate-900 transition-colors">
                    Top Destinations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900 transition-colors">
                    Top Destinations by category
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900 transition-colors">
                    Family Destinations Planning
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900 transition-colors">
                    Couples Trip Planner
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900 transition-colors">
                    Relaxation Places
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Company */}
            <div className="lg:col-span-2">
              <h3 className="text-base font-bold text-slate-900 font-sans mb-4">Company</h3>
              <ul className="space-y-3 text-sm text-slate-500 font-sans">
                <li>
                  <a href="#" className="hover:text-slate-900 transition-colors">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900 transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900 transition-colors">
                    Terms and Conditions
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact US */}
            <div className="lg:col-span-3">
              <h3 className="text-base font-bold text-slate-900 font-sans mb-4">Contact US</h3>
              <ul className="space-y-3 text-sm text-slate-500 font-sans">
                <li>+1042233227889</li>
                <li>danielle_walker@icloud.com</li>
                <li>300 Colony Place, Plymouth MA 2360</li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Bottom Social Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-sans">
          <div className="flex items-center gap-5 text-slate-700">
            <a href="#" className="hover:text-black transition-colors" aria-label="Twitter">
              <Twitter className="h-4 w-4 fill-slate-800 stroke-none" />
            </a>
            <a href="#" className="hover:text-black transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4 fill-slate-800 stroke-none" />
            </a>
            <a href="#" className="hover:text-black transition-colors" aria-label="Facebook">
              <Facebook className="h-4 w-4 fill-slate-800 stroke-none" />
            </a>
          </div>

          <p>All Copyrights are reserved by Go Packers</p>
        </div>
      </div>
    </footer>
  );
}
