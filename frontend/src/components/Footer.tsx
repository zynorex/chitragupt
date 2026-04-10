"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* ──────────── ICONS ──────────── */
const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

/* ──────────── DATA ──────────── */
const SITEMAP_GENERAL = [
  { name: "Features", href: "/features" },
  { name: "About / Manifesto", href: "/about" },
  { name: "Shabd Kosh", href: "/shabd-kosh" },
];

const SITEMAP_PORTALS = [
  { name: "Submit Evidence", href: "/submit" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Yamadoot Panel", href: "/guardian" },
  { name: "Verification", href: "/verify" },
  { name: "Crypto Sandbox", href: "/cryptotest" },
];

const TECH_STACK = [
  { label: "ENCRYPTION", value: "AES-256-GCM", color: "text-coral" },
  { label: "KEY SPLIT", value: "Shamir SSS", color: "text-cyan" },
  { label: "CHAIN", value: "Polygon Amoy", color: "text-golden" },
  { label: "STORAGE", value: "IPFS + Arweave", color: "text-green-400" },
  { label: "CONTRACT", value: "Solidity 0.8.24", color: "text-purple-400" },
  { label: "FRONTEND", value: "Next.js 16", color: "text-coral" },
];

/* ──────────── LIVE CLOCK ──────────── */
function FooterClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="tabular-nums">{time || "--:--:--"}</span>;
}

/* ──────────── COMPONENT ──────────── */
export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="bg-charcoal border-t-[6px] border-black text-ivory relative overflow-hidden z-10 w-full mt-auto">
      {/* Blueprint grid bg */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* ═══ MARQUEE STRIP ═══ */}
      <div className="border-b-[3px] border-white/10 overflow-hidden py-3 bg-black/30">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="font-[var(--font-mono)] text-[0.65rem] font-bold tracking-[0.3em] uppercase whitespace-pre">
              <span className="text-white/20">TRUTH CANNOT BE DELETED</span>
              <span className="text-coral/40 mx-4">◆</span>
              <span className="text-golden/30">सत्यम् एव जयते</span>
              <span className="text-cyan/40 mx-4">◆</span>
              <span className="text-white/20">DECENTRALIZED PROTOCOL</span>
              <span className="text-coral/40 mx-4">◆</span>
              <span className="text-golden/30">CENSORSHIP PROOF</span>
              <span className="text-cyan/40 mx-4">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 sm:pt-20 pb-8">

        {/* ROW 1: Brand + Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-14">

          {/* ─── Brand Column ─── */}
          <div className="lg:col-span-5 flex flex-col items-start gap-6">
            {/* Logo + Name */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-coral border-[3px] border-black shadow-[3px_3px_0px_#FFD93D] flex items-center justify-center shrink-0">
                <span className="font-[var(--font-mono)] font-bold text-2xl text-white">C</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-[var(--font-display)] text-3xl sm:text-4xl font-black tracking-tighter uppercase text-white">
                  CHITRAGUPT
                </span>
                <span className="font-[var(--font-mono)] text-[0.6rem] font-bold text-golden uppercase tracking-[0.3em]">
                  Protocol Architecture V1.0
                </span>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-lg sm:text-xl max-w-sm font-bold text-white/70 leading-snug font-[var(--font-display)]">
              Permanent, uncensorable truth storage.
              <br />
              Built for the fearless. Designed to outlast.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mt-2">
              <a
                href="https://github.com/zynorex/chitragupt"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-black border-[2px] border-white/15 flex items-center justify-center hover:border-coral hover:bg-coral text-white hover:text-black transition-all shadow-[3px_3px_0_rgba(255,255,255,0.08)] hover:shadow-none hover:translate-y-[3px] hover:translate-x-[3px] group"
              >
                <GithubIcon />
              </a>
              <a
                href="https://x.com/ayusheith"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-black border-[2px] border-white/15 flex items-center justify-center hover:border-cyan hover:bg-cyan text-white hover:text-black transition-all shadow-[3px_3px_0_rgba(255,255,255,0.08)] hover:shadow-none hover:translate-y-[3px] hover:translate-x-[3px] group"
              >
                <XIcon />
              </a>
              <a
                href="/shabd-kosh"
                className="h-12 px-5 bg-black border-[2px] border-white/15 flex items-center justify-center gap-2 hover:border-golden hover:bg-golden text-white hover:text-black transition-all shadow-[3px_3px_0_rgba(255,255,255,0.08)] hover:shadow-none hover:translate-y-[3px] hover:translate-x-[3px] font-[var(--font-mono)] font-bold text-xs tracking-widest uppercase"
              >
                DOCS <ExternalLinkIcon />
              </a>
            </div>
          </div>

          {/* ─── Navigation Columns ─── */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 w-full">
            {/* Column: General */}
            <div className="flex flex-col gap-5">
              <h4 className="font-[var(--font-mono)] text-[0.65rem] font-bold uppercase tracking-[0.25em] text-black bg-coral inline-block w-fit px-3 py-1.5 border-[2px] border-black shadow-[2px_2px_0_rgba(255,255,255,0.15)]">
                General
              </h4>
              <nav className="flex flex-col gap-1">
                {SITEMAP_GENERAL.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`
                      font-[var(--font-display)] text-base font-bold transition-all duration-200 flex items-center gap-2 group py-1.5
                      ${pathname === link.href ? "text-golden translate-x-2" : "text-white/70 hover:text-white hover:translate-x-3"}
                    `}
                  >
                    <span className="font-[var(--font-mono)] text-golden opacity-0 transform -translate-x-3 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-sm">
                      &gt;
                    </span>
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column: Portals */}
            <div className="flex flex-col gap-5">
              <h4 className="font-[var(--font-mono)] text-[0.65rem] font-bold uppercase tracking-[0.25em] text-black bg-cyan inline-block w-fit px-3 py-1.5 border-[2px] border-black shadow-[2px_2px_0_rgba(255,255,255,0.15)]">
                Portals
              </h4>
              <nav className="flex flex-col gap-1">
                {SITEMAP_PORTALS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`
                      font-[var(--font-display)] text-base font-bold transition-all duration-200 flex items-center gap-2 group py-1.5
                      ${pathname === link.href ? "text-golden translate-x-2" : "text-white/70 hover:text-white hover:translate-x-3"}
                    `}
                  >
                    <span className="font-[var(--font-mono)] text-cyan opacity-0 transform -translate-x-3 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-sm">
                      &gt;
                    </span>
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column: System Data */}
            <div className="flex flex-col gap-5">
              <h4 className="font-[var(--font-mono)] text-[0.65rem] font-bold uppercase tracking-[0.25em] text-black bg-golden inline-block w-fit px-3 py-1.5 border-[2px] border-black shadow-[2px_2px_0_rgba(255,255,255,0.15)]">
                Protocol
              </h4>
              <div className="flex flex-col gap-3 font-[var(--font-mono)] text-[0.7rem]">
                <div className="group cursor-default">
                  <span className="text-white/40 block font-bold tracking-widest uppercase text-[0.55rem] mb-1">CONTRACT_ID</span>
                  <span className="text-golden font-bold bg-white/5 px-2.5 py-1.5 border border-white/10 block truncate group-hover:bg-white/10 transition-colors">
                    0x7F4B...99a1
                  </span>
                </div>
                <div className="group cursor-default">
                  <span className="text-white/40 block font-bold tracking-widest uppercase text-[0.55rem] mb-1">NETWORK</span>
                  <span className="text-cyan font-bold bg-white/5 px-2.5 py-1.5 border border-white/10 block group-hover:bg-white/10 transition-colors">
                    Polygon Amoy (80002)
                  </span>
                </div>
                <div className="group cursor-default">
                  <span className="text-white/40 block font-bold tracking-widest uppercase text-[0.55rem] mb-1">STATUS</span>
                  <span className="text-green-400 font-bold bg-white/5 px-2.5 py-1.5 border border-white/10 flex items-center gap-2 group-hover:bg-white/10 transition-colors">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Operational
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ ROW 2: TERMINAL BLOCK — SystemDiag Card ═══ */}
        <div className="mt-16 w-full border-[4px] border-black bg-black overflow-hidden shadow-[8px_8px_0_#FFD93D] group hover:shadow-[4px_4px_0_#FF6B6B] transition-shadow duration-500">
          {/* Terminal titlebar */}
          <div className="flex items-center justify-between px-5 py-2.5 bg-white/5 border-b-[3px] border-white/10">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-coral border border-black/30" />
              <span className="w-3 h-3 rounded-full bg-golden border border-black/30" />
              <span className="w-3 h-3 rounded-full bg-green-500 border border-black/30" />
            </div>
            <span className="font-[var(--font-mono)] text-white/30 text-[0.6rem] font-bold tracking-widest uppercase">
              chitragupt://system_diagnostics
            </span>
            <div className="hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-[var(--font-mono)] text-green-500/70 text-[0.6rem] font-bold tracking-wider">
                LIVE
              </span>
            </div>
          </div>

          {/* Terminal content */}
          <div className="p-5 sm:p-8">
            {/* System status row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                {/* Spinner */}
                <div className="w-14 h-14 bg-white/5 border-[2px] border-white/10 flex items-center justify-center shrink-0 group-hover:border-coral/50 transition-colors">
                  <div className="w-7 h-7 rounded-full border-[3px] border-coral border-t-transparent animate-spin" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-[var(--font-display)] text-xl sm:text-2xl font-black text-white group-hover:text-coral transition-colors uppercase tracking-tight">
                    Amoy Network Active
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-[var(--font-mono)] text-[0.7rem] text-white/40 font-bold uppercase tracking-wider">
                      Block sync ·  Decryption ready · <FooterClock />
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/submit"
                className="shrink-0 inline-flex items-center gap-2 bg-golden text-black border-[3px] border-black px-8 py-4 font-[var(--font-mono)] font-bold text-sm tracking-wider uppercase shadow-[4px_4px_0_#FF6B6B] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all w-full md:w-auto justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                SUBMIT EVIDENCE
              </Link>
            </div>

            {/* Tech stack row */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {TECH_STACK.map((tech, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/[0.07] px-3 py-2.5 hover:bg-white/[0.06] transition-colors cursor-default group/tech">
                    <span className="font-[var(--font-mono)] text-[0.5rem] font-bold text-white/30 tracking-widest uppercase block mb-1">
                      {tech.label}
                    </span>
                    <span className={`font-[var(--font-mono)] text-[0.7rem] font-bold ${tech.color} block group-hover/tech:text-white transition-colors`}>
                      {tech.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══ ROW 3: BOTTOM BAR ═══ */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            {/* Left: Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <p className="font-[var(--font-mono)] text-[0.7rem] text-white/40 tracking-widest font-bold whitespace-nowrap uppercase">
                &copy; {new Date().getFullYear()} Chitragupt Protocol
              </p>
              <span className="hidden sm:block text-white/10">|</span>
              <p className="font-[var(--font-mono)] text-[0.65rem] text-white/25 tracking-wider font-bold">
                Built by{" "}
                <a href="https://x.com/ayusheith" target="_blank" rel="noopener noreferrer" className="text-golden/40 hover:text-golden transition-colors">
                  @ayusheith
                </a>
              </p>
            </div>

            {/* Center: Separator line */}
            <div className="w-full flex-1 border-t border-white/5 hidden lg:block" />

            {/* Right: Sanskrit watermark */}
            <div className="text-center lg:text-right">
              <span className="text-3xl sm:text-4xl md:text-5xl font-black font-[var(--font-display)] text-white/[0.07] tracking-tighter hover:text-white/15 transition-colors cursor-default whitespace-nowrap select-none">
                सत्यम् एव जयते
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
