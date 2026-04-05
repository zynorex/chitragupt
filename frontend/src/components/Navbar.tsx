"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* ──────────── ICONS ──────────── */
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed z-[100] w-full transition-all duration-300 ${scrolled ? 'top-2 sm:top-4' : 'top-4 sm:top-8'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`
          relative flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 
          bg-white border-[3px] border-black transition-all duration-300
          ${scrolled ? 'shadow-[4px_4px_0px_#1A1A1A] sm:shadow-[6px_6px_0px_#1A1A1A] translate-y-0' : 'shadow-[8px_8px_0px_#1A1A1A] sm:shadow-[12px_12px_0px_#FFD93D] -translate-y-1'}
        `}>
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <Link href="/" className="relative group block shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-coral border-[3px] border-black shadow-[2px_2px_0px_#1A1A1A] flex items-center justify-center group-hover:bg-golden transition-colors group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none ease-out">
                <span className="font-[var(--font-mono)] font-bold text-xl sm:text-2xl text-white group-hover:text-black">C</span>
              </div>
              {/* Decoration cross */}
              <div className="absolute -top-2 -left-2 text-black/20 text-xs font-[var(--font-mono)] font-bold opacity-0 group-hover:opacity-100 transition-opacity">+</div>
            </Link>
            <div className="hidden sm:flex flex-col">
              <span className="font-[var(--font-display)] font-extrabold text-xl tracking-tight leading-none uppercase">Chitragupt</span>
              <span className="font-[var(--font-mono)] text-[0.6rem] font-bold text-gray uppercase tracking-[0.2em] mt-1">Protocol V1.0</span>
            </div>
          </div>

          {/* Desktop Links (Center) */}
          <div className="hidden lg:flex items-center gap-1">
            {["FEATURES", "HOW IT WORKS", "SHABD KOSH"].map((item) => (
              <Link
                key={item}
                href={`/#${item.toLowerCase().replace(/ /g, "-")}`}
                className="relative px-3 py-2 text-sm font-bold font-[var(--font-mono)] text-charcoal tracking-wide group overflow-hidden inline-flex items-center justify-center mx-1"
              >
                <span className="relative z-10 group-hover:text-black transition-colors">{item}</span>
                <span className="absolute bottom-1 left-3 right-3 h-[3px] bg-black transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                <span className="absolute inset-0 bg-golden/20 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-0 rounded-[2px]" />
              </Link>
            ))}
          </div>

          {/* Right Section (Status + CTA) */}
          <div className="flex items-center gap-4">
             {/* Status Pulse - Only Desktop */}
             <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 border-2 border-black/20 bg-ivory mr-2 hover:border-coral transition-colors cursor-default group">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-coral border border-black group-hover:bg-golden transition-colors"></span>
                </span>
                <span className="font-[var(--font-mono)] text-[0.65rem] font-bold text-gray group-hover:text-black transition-colors lowercase tracking-wider">&gt; network_secure</span>
             </div>

             {/* Desktop Action Button */}
             <Link href="/submit" className="hidden sm:flex brutal-btn brutal-btn-primary px-6 h-10 sm:h-12 items-center justify-center text-sm font-bold font-[var(--font-mono)] tracking-wider">
               OPEN VAULT
             </Link>

             {/* Mobile Menu Button */}
             <button
               onClick={() => setMobileOpen(!mobileOpen)}
               className="lg:hidden w-10 h-10 sm:w-12 sm:h-12 border-[3px] border-black flex items-center justify-center bg-cyan shadow-[3px_3px_0px_#1A1A1A] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all relative overflow-hidden group shrink-0"
               aria-expanded={mobileOpen}
               aria-label="Toggle Navigation"
             >
               <span className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform" />
               <div className="relative z-10 text-black">
                 {mobileOpen ? <CloseIcon /> : <MenuIcon />}
               </div>
             </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        <div className={`
          lg:hidden absolute top-full left-4 right-4 mt-3 border-[3px] border-black bg-ivory shadow-[6px_6px_0px_#1A1A1A]
          transition-all duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] origin-top overflow-hidden
          ${mobileOpen ? 'max-h-[500px] opacity-100 scale-y-100 translate-y-0' : 'max-h-0 opacity-0 scale-y-0 -translate-y-4'}
        `}>
          <div className="p-5 flex flex-col gap-3">
             <div className="text-[0.6rem] font-[var(--font-mono)] text-gray uppercase tracking-widest font-bold mb-2">Navigation Log</div>
            {["FEATURES", "HOW IT WORKS", "SHABD KOSH"].map((item) => (
              <Link
                key={item}
                href={`/#${item.toLowerCase().replace(/ /g, "-")}`}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-base font-bold font-[var(--font-mono)] text-black tracking-widest border-[3px] border-transparent hover:border-black hover:bg-golden hover:translate-x-2 transition-all uppercase"
              >
                <span className="text-coral mr-2">&gt;</span> {item}
              </Link>
            ))}
            <div className="border-t-[3px] border-black/20 pt-5 mt-2">
              <Link href="/submit" onClick={() => setMobileOpen(false)} className="brutal-btn brutal-btn-dark w-full flex justify-center items-center py-4 text-sm font-bold font-[var(--font-mono)] text-center">
                SUBMIT EVIDENCE
              </Link>
            </div>
            {/* Mobile Network Status */}
            <div className="flex items-center gap-3 mt-4 px-2 py-2 bg-white border-2 border-black/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan"></span>
                </span>
                <span className="font-[var(--font-mono)] text-[0.65rem] font-bold text-gray uppercase tracking-wider">Polyon Amoy Active</span>
             </div>
          </div>
        </div>

      </div>
    </nav>
  );
}
