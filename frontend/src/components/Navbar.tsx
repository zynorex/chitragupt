"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* ──────────── ICONS ──────────── */
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const ChevronIcon = ({ open = false }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="square"
    className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const ArrowUpRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

/* ──────────── DATA ──────────── */
const NAV_LINKS = [
  { name: "FEATURES", href: "/features" },
  { name: "ABOUT", href: "/about" },
  { name: "SHABD KOSH", href: "/shabd-kosh" },
];

const PORTALS = [
  { name: "SUBMIT EVIDENCE", href: "/submit", desc: "Encrypt & upload files", icon: "📤", accent: "bg-coral" },
  { name: "DASHBOARD", href: "/dashboard", desc: "Manage your vaults", icon: "📊", accent: "bg-cyan" },
  { name: "YAMADOOT PANEL", href: "/guardian", desc: "Guardian shard ops", icon: "🛡️", accent: "bg-golden" },
  { name: "VERIFICATION", href: "/verify", desc: "SHA-256 hash check", icon: "✅", accent: "bg-green-500" },
  { name: "CRYPTO SANDBOX", href: "/cryptotest", desc: "Engine test module", icon: "🧪", accent: "bg-purple" },
];

/* ──────────── LIVE CLOCK ──────────── */
function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-[var(--font-mono)] text-[0.6rem] font-bold text-gray tabular-nums tracking-widest">
      {time || "--:--:--"}
    </span>
  );
}

/* ──────────── COMPONENT ──────────── */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const openDropdown = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };
  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  const isPortalActive = PORTALS.some((p) => pathname === p.href);

  return (
    <>
      {/* ─── TOP TICKER BAR ─── */}
      <div
        className={`fixed w-full transition-all duration-500 ${scrolled ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
        style={{ zIndex: 10000 }}
      >
        <div className="bg-charcoal border-b-[3px] border-black overflow-hidden">
          <div className="flex items-center justify-between max-w-[1920px] mx-auto">
            {/* Scrolling marquee */}
            <div className="flex-1 overflow-hidden py-1.5">
              <div className="flex whitespace-nowrap animate-marquee">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span key={i} className="font-[var(--font-mono)] text-[0.6rem] font-bold text-golden/70 tracking-[0.25em] uppercase whitespace-pre">
                    TRUTH CANNOT BE DELETED · सत्यम् एव जयते · DECENTRALIZED · CENSORSHIP PROOF · AES-256 · POLYGON AMOY ·{" "}
                  </span>
                ))}
              </div>
            </div>

            {/* Right side info pills */}
            <div className="hidden md:flex items-center gap-3 px-4 shrink-0 border-l-[3px] border-white/10 py-1.5">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="font-[var(--font-mono)] text-[0.6rem] font-bold text-white/50 tracking-wider uppercase">
                  Amoy
                </span>
              </div>
              <span className="text-white/20">|</span>
              <LiveClock />
            </div>
          </div>
        </div>
      </div>

      {/* ─── MAIN NAVBAR ─── */}
      <nav
        className={`fixed w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? "top-0" : "top-[30px]"}`}
        style={{ zIndex: 9999 }}
      >
        <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8">
          <div
            className={`
              relative flex items-center justify-between px-4 sm:px-6 transition-all duration-500
              bg-white border-[3px] border-black
              ${scrolled
                ? "h-14 sm:h-16 shadow-[3px_3px_0px_#1A1A1A] rounded-none -mx-3 sm:-mx-5 lg:-mx-8"
                : "h-16 sm:h-[72px] shadow-[6px_6px_0px_#1A1A1A] sm:shadow-[8px_8px_0px_#FFD93D] mt-2 sm:mt-3"
              }
            `}
          >
            {/* ─── LEFT: LOGO ─── */}
            <Link href="/" className="relative group flex items-center gap-3 shrink-0">
              {/* Logo mark */}
              <div className="relative">
                <div className="w-9 h-9 sm:w-11 sm:h-11 bg-coral border-[3px] border-black shadow-[2px_2px_0px_#1A1A1A] flex items-center justify-center group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:bg-golden transition-all duration-200">
                  <span className="font-[var(--font-mono)] font-bold text-lg sm:text-xl text-white group-hover:text-black transition-colors">
                    C
                  </span>
                </div>
                {/* Corner deco */}
                <span className="absolute -top-1.5 -left-1.5 text-black/20 text-[0.6rem] font-bold opacity-0 group-hover:opacity-100 transition-opacity select-none">+</span>
                <span className="absolute -bottom-1.5 -right-1.5 text-black/20 text-[0.6rem] font-bold opacity-0 group-hover:opacity-100 transition-opacity select-none">+</span>
              </div>
              {/* Text */}
              <div className="hidden sm:flex flex-col leading-none">
                <span className="font-[var(--font-display)] font-extrabold text-[1.1rem] tracking-tight uppercase">
                  Chitragupt
                </span>
                <span className="font-[var(--font-mono)] text-[0.55rem] font-bold text-gray uppercase tracking-[0.25em] mt-0.5">
                  Protocol V1.0
                </span>
              </div>
            </Link>

            {/* ─── CENTER: DESKTOP LINKS ─── */}
            <div className="hidden lg:flex items-center">
              {/* Nav Links */}
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`
                      relative px-4 py-2 text-[0.8rem] font-bold font-[var(--font-mono)] tracking-wider
                      inline-flex items-center justify-center transition-all duration-200 mx-0.5
                      ${isActive
                        ? "text-black bg-golden/40 border-b-[3px] border-black"
                        : "text-charcoal hover:text-black"
                      }
                    `}
                  >
                    <span className="relative z-10">{link.name}</span>
                    {!isActive && (
                      <span className="absolute bottom-1 left-4 right-4 h-[2.5px] bg-black transform scale-x-0 origin-left group-hover:scale-x-100 peer-hover:scale-x-100 hover:scale-x-100 transition-transform duration-300 ease-out" />
                    )}
                  </Link>
                );
              })}

              {/* Separator dot */}
              <span className="w-1 h-1 bg-black/20 rounded-full mx-2" />

              {/* PORTALS Dropdown */}
              <div
                className="relative"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <button
                  className={`
                    flex items-center gap-1.5 px-4 py-2 text-[0.8rem] font-bold font-[var(--font-mono)] tracking-wider
                    transition-all duration-200 border-[2px]
                    ${dropdownOpen || isPortalActive
                      ? "bg-charcoal text-white border-black"
                      : "text-charcoal border-transparent hover:border-black/20 hover:bg-ivory"
                    }
                  `}
                >
                  <LockIcon />
                  PORTALS
                  <ChevronIcon open={dropdownOpen} />
                </button>

                {/* Mega Dropdown */}
                <div
                  className={`
                    absolute top-full right-0 pt-3 w-[340px]
                    transition-all duration-300 origin-top-right
                    ${dropdownOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}
                  `}
                  style={{ zIndex: 10001 }}
                >
                  <div className="bg-white border-[3px] border-black shadow-[8px_8px_0px_#1A1A1A] overflow-hidden">
                    {/* Header */}
                    <div className="bg-charcoal px-5 py-3 border-b-[3px] border-black flex items-center justify-between">
                      <span className="font-[var(--font-mono)] text-golden text-[0.65rem] font-bold tracking-[0.3em] uppercase">
                        System Portals
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="font-[var(--font-mono)] text-white/40 text-[0.6rem] font-bold">ONLINE</span>
                      </span>
                    </div>

                    {/* Links */}
                    <div className="p-2">
                      {PORTALS.map((portal, idx) => (
                        <Link
                          key={portal.name}
                          href={portal.href}
                          onClick={() => setDropdownOpen(false)}
                          className={`
                            flex items-center gap-4 p-3.5 transition-all duration-200 group
                            hover:bg-ivory border-[2px] border-transparent hover:border-black
                            ${pathname === portal.href ? "bg-golden/20 border-golden!" : ""}
                          `}
                        >
                          {/* Icon circle */}
                          <div className={`w-10 h-10 ${portal.accent} border-[2px] border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#1A1A1A] group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all text-sm`}>
                            {portal.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="font-[var(--font-mono)] text-[0.75rem] font-bold text-black block tracking-wide group-hover:text-coral transition-colors">
                              {portal.name}
                            </span>
                            <span className="font-[var(--font-display)] text-[0.7rem] text-gray font-semibold block mt-0.5">
                              {portal.desc}
                            </span>
                          </div>
                          <ArrowUpRight />
                        </Link>
                      ))}
                    </div>

                    {/* Footer mini-bar */}
                    <div className="bg-ivory border-t-[3px] border-black px-5 py-2.5 flex items-center justify-between">
                      <span className="font-[var(--font-mono)] text-[0.6rem] font-bold text-gray tracking-widest uppercase">
                        5 Active Modules
                      </span>
                      <span className="font-[var(--font-mono)] text-[0.6rem] font-bold text-coral tracking-wider">
                        v1.0.0-α
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── RIGHT: STATUS + CTA + HAMBURGER ─── */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Network status — desktop only */}
              <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-ivory border-[2px] border-black/15 hover:border-coral transition-colors cursor-default group">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-coral border border-black/30 group-hover:bg-golden transition-colors" />
                </span>
                <span className="font-[var(--font-mono)] text-[0.6rem] font-bold text-gray group-hover:text-black transition-colors tracking-wider uppercase">
                  Secured
                </span>
              </div>

              {/* CTA Button — desktop */}
              <Link
                href="/submit"
                className="hidden sm:inline-flex items-center gap-2 bg-charcoal text-golden border-[3px] border-black px-5 h-10 sm:h-11 font-[var(--font-mono)] font-bold text-[0.75rem] tracking-wider uppercase shadow-[3px_3px_0px_#FFD93D] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-coral hover:text-white hover:border-black transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                OPEN VAULT
              </Link>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 sm:w-11 sm:h-11 border-[3px] border-black flex items-center justify-center bg-cyan shadow-[3px_3px_0px_#1A1A1A] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all relative overflow-hidden group shrink-0"
                aria-expanded={mobileOpen}
                aria-label="Toggle Navigation"
              >
                <span className="absolute inset-0 bg-coral transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <div className="relative z-10 text-black group-hover:text-white transition-colors">
                  {mobileOpen ? <CloseIcon /> : <MenuIcon />}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ─── MOBILE PANEL ─── */}
        {/* Backdrop */}
        <div
          className={`lg:hidden fixed inset-0 bg-black/60 transition-opacity duration-400 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          style={{ zIndex: 9997 }}
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <div
          className={`
            lg:hidden fixed top-0 right-0 h-full w-[85vw] max-w-[380px] bg-ivory border-l-[4px] border-black
            shadow-[-12px_0_40px_rgba(0,0,0,0.3)]
            transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${mobileOpen ? "translate-x-0" : "translate-x-full"}
            flex flex-col
          `}
          style={{ zIndex: 9998 }}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b-[3px] border-black bg-charcoal">
            <span className="font-[var(--font-mono)] text-golden font-bold text-sm tracking-[0.2em] uppercase">
              Navigation
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-9 h-9 border-[2px] border-white/20 flex items-center justify-center text-white hover:bg-coral hover:border-coral transition-all"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-2">
            {/* Section: General */}
            <div className="font-[var(--font-mono)] text-[0.6rem] text-gray uppercase tracking-[0.3em] font-bold mb-3 px-1">
              General
            </div>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`
                  block px-4 py-3.5 text-base font-bold font-[var(--font-mono)] tracking-wider
                  border-[3px] transition-all duration-200 uppercase
                  ${pathname === link.href
                    ? "bg-golden border-black text-black translate-x-2"
                    : "border-transparent text-charcoal hover:border-black hover:bg-white hover:translate-x-2"
                  }
                `}
              >
                <span className="text-coral mr-2">&gt;</span>
                {link.name}
              </Link>
            ))}

            {/* Section: Portals */}
            <div className="font-[var(--font-mono)] text-[0.6rem] text-gray uppercase tracking-[0.3em] font-bold mt-6 mb-3 px-1">
              System Portals
            </div>
            {PORTALS.map((portal) => (
              <Link
                key={portal.name}
                href={portal.href}
                className={`
                  flex items-center gap-3 px-4 py-3.5 text-sm font-bold font-[var(--font-mono)] tracking-wider
                  border-[3px] border-black bg-white transition-all duration-200 uppercase
                  ${pathname === portal.href
                    ? "bg-golden text-black shadow-none translate-x-1 translate-y-1"
                    : "shadow-[3px_3px_0px_#1A1A1A] hover:bg-coral hover:text-white hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
                  }
                `}
              >
                <span className="text-lg">{portal.icon}</span>
                <div className="flex flex-col">
                  <span>{portal.name}</span>
                  <span className="text-[0.6rem] text-gray font-bold tracking-widest normal-case opacity-60">{portal.desc}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Panel Footer */}
          <div className="border-t-[3px] border-black p-5 bg-white space-y-4">
            <Link
              href="/submit"
              onClick={() => setMobileOpen(false)}
              className="brutal-btn brutal-btn-dark w-full flex justify-center items-center py-4 text-sm font-bold font-[var(--font-mono)] tracking-widest"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" className="mr-2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              OPEN VAULT
            </Link>

            {/* Network badge */}
            <div className="flex items-center justify-between px-3 py-2.5 bg-ivory border-[2px] border-black/10">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan" />
                </span>
                <span className="font-[var(--font-mono)] text-[0.6rem] font-bold text-gray uppercase tracking-wider">
                  Polygon Amoy Active
                </span>
              </div>
              <LiveClock />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
