"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

/* ──────────── HOOKS ──────────── */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useCounter(target: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(!startOnView);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [started, target, duration]);

  return { count, ref };
}

/* ──────────── ICONS ──────────── */
const ShieldIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const LockIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const KeyIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
    <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);

const ClockIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const CloudIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
  </svg>
);

const UsersIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const GlobeIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    <path d="M2 12h20" />
  </svg>
);

const CheckIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowRightIcon = ({ className = "" }) => (
  <svg className={`w-6 h-6 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* ──────────── DATA ──────────── */
const THREAT_DATA = [
  { label: "Journalists killed globally (2024)", value: "99+", source: "UNESCO" },
  { label: "Whistleblower retaliation rate", value: "83%", source: "GAP Report" },
  { label: "Gov takedown requests to Google", value: "45K+", source: "Google Transparency" },
  { label: "Leaked documents intercepted pre-publish", value: "61%", source: "RSF Analysis" },
];

const PIPELINE_STEPS = [
  {
    num: "01",
    title: "SELECT EVIDENCE",
    sanskrit: "साक्ष्य चयन",
    romanized: "Saakshya Chayan",
    desc: "The Satyavadi selects the raw evidence files — documents, images, video, or audio — from their local device. Maximum 50MB per vault for optimal IPFS distribution. The browser reads the file into an ArrayBuffer entirely in client-side memory.",
    icon: ShieldIcon,
    color: "bg-cyan",
  },
  {
    num: "02",
    title: "CLIENT-SIDE ENCRYPTION",
    sanskrit: "कवच निर्माण",
    romanized: "Kavach Nirman",
    desc: "The browser generates an ephemeral AES-256-GCM symmetric key using window.crypto.subtle — the same cryptographic engine used by military and banking systems. The raw file buffer is encrypted into a ciphertext blob. No plaintext ever leaves your RAM.",
    icon: LockIcon,
    color: "bg-coral",
  },
  {
    num: "03",
    title: "KEY FRAGMENTATION",
    sanskrit: "कुंजी विभाजन",
    romanized: "Kunji Vibhajan",
    desc: "The AES key is instantly destroyed — but not before being mathematically shattered into N polynomial shards using Shamir's Secret Sharing. A minimum K shards are needed to intersect and derive the master key. No single shard is useful alone.",
    icon: KeyIcon,
    color: "bg-golden",
  },
  {
    num: "04",
    title: "IMMUTABLE STORAGE",
    sanskrit: "नित्य भंडार",
    romanized: "Nitya Bhandaar",
    desc: "The encrypted blob is uploaded to IPFS via Web3.Storage for primary distribution, then permanently anchored on Arweave's Permaweb. This creates dual content-addressed immutability — the file cannot be altered without invalidating its own address.",
    icon: CloudIcon,
    color: "bg-purple",
  },
  {
    num: "05",
    title: "ON-CHAIN REGISTRATION",
    sanskrit: "लेखा स्थापना",
    romanized: "Lekhaa Sthapana",
    desc: "A Lekhaa (vault record) is created on the Polygon blockchain containing: the SHA-256 hash of the original evidence, the IPFS CID, Arweave TX ID, guardian addresses, threshold geometry (K of N), and the check-in interval parameters.",
    icon: GlobeIcon,
    color: "bg-cyan",
  },
  {
    num: "06",
    title: "AUTOMATED RELEASE",
    sanskrit: "सत्य प्रकाश",
    romanized: "Satya Prakash",
    desc: "Chainlink Keepers continuously monitor the check-in timestamp. If block.timestamp exceeds lastCheckin + interval, the Dead Man's Switch triggers autonomously. Guardians submit shards → threshold met → evidence reconstructed and publicly released.",
    icon: ClockIcon,
    color: "bg-coral",
  },
];

const PRINCIPLES = [
  {
    title: "Zero Trust",
    subtitle: "We do not know you",
    desc: "No accounts. No emails. No IP logging. No cookies. No analytics. The protocol is Tor-compatible by design. Your identity is invisible to the infrastructure itself.",
    icon: "👁️‍🗨️",
  },
  {
    title: "Client-Side Only",
    subtitle: "Your machine, your keys",
    desc: "Every cryptographic operation — key generation, encryption, sharding, hashing — executes entirely within your browser's Web Crypto API. No plaintext data ever touches any server, API endpoint, or third-party service.",
    icon: "🔐",
  },
  {
    title: "No Admin Keys",
    subtitle: "Nobody can stop it",
    desc: "The smart contract has zero privileged roles. No pause function. No upgrade proxy. No multisig override. Once deployed, the protocol is immutable and self-executing. Not even its creators can intervene.",
    icon: "🚫",
  },
  {
    title: "Redundant Immutability",
    subtitle: "Survives everything",
    desc: "Encrypted evidence is stored on both IPFS and Arweave simultaneously. IPFS provides global distribution. Arweave guarantees 200+ year persistence via economic endowments. Destroy one — the other persists.",
    icon: "♾️",
  },
  {
    title: "Threshold Cryptography",
    subtitle: "Mathematically secure",
    desc: "No single guardian can unseal a vault. Shamir's polynomial interpolation distributes trust: K of N shards must mathematically intersect to reconstruct the key. This is information-theoretically secure — not just computationally hard.",
    icon: "🧮",
  },
  {
    title: "Autonomous Failsafe",
    subtitle: "The switch fires itself",
    desc: "The Dead Man's Switch isn't monitored by a server that can be seized. Chainlink's decentralized oracle network of independent hardware nodes continuously polls the blockchain. No human intervention required.",
    icon: "⏱️",
  },
];

const TIMELINE = [
  { phase: "Phase 1", period: "Q2 2026", title: "Core Architecture", status: "active", desc: "Smart contracts, crypto engine, frontend scaffold" },
  { phase: "Phase 2", period: "Q3 2026", title: "Platform Integration", status: "upcoming", desc: "IPFS/Arweave, Chainlink Keepers, Guardian UX" },
  { phase: "Phase 3", period: "Q4 2026", title: "Security Hardening", status: "upcoming", desc: "Tier-1 audits, pen testing, bug bounty" },
  { phase: "Phase 4", period: "Q1 2027", title: "Mainnet Launch", status: "upcoming", desc: "Polygon mainnet, Tor service, gasless TX" },
  { phase: "Phase 5", period: "Q2 2027", title: "ZK Expansion", status: "upcoming", desc: "zk-SNARKs identity, cross-chain CCIP" },
  { phase: "Phase 6", period: "Q4 2027+", title: "Enterprise Grade", status: "upcoming", desc: "Corporate APIs, TEE enclaves, L3 chain" },
];

/* ──────────── PAGE ──────────── */
export default function AboutPage() {
  useScrollReveal();

  const stat1 = useCounter(256, 1800);
  const stat2 = useCounter(5, 1200);
  const stat3 = useCounter(72, 1500);
  const stat4 = useCounter(0, 1000);

  return (
    <div className="flex flex-col min-h-screen">

      {/* ═══════════════════════════════════════════════════════
          SECTION 1: CINEMATIC HERO
      ═══════════════════════════════════════════════════════ */}
      <header className="relative py-28 sm:py-36 md:py-44 lg:py-52 px-4 sm:px-6 lg:px-8 border-b-[6px] border-black bg-ivory overflow-hidden">
        {/* Decorative geo elements */}
        <div className="absolute top-12 left-8 w-20 h-20 border-[4px] border-black/10 animate-spin-slow hidden lg:block" />
        <div className="absolute top-28 right-16 w-12 h-12 bg-coral border-[3px] border-black rounded-full animate-float hidden lg:block" />
        <div className="absolute bottom-16 left-20 w-16 h-16 bg-cyan/30 border-[3px] border-black hidden lg:block animate-float" style={{ animationDelay: "1.5s" }} />
        <div className="absolute bottom-24 right-28 text-5xl font-bold text-black/10 hidden lg:block">+</div>
        <div className="absolute top-40 left-1/4 text-4xl font-bold text-black/10 hidden lg:block">+</div>

        {/* Giant watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[20rem] sm:text-[30rem] md:text-[40rem] font-black text-black/[0.025] font-[var(--font-display)] leading-none tracking-tighter">C</span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="reveal-on-scroll inline-flex items-center gap-2 bg-white border-[3px] border-black px-5 py-2.5 shadow-[4px_4px_0px_#1A1A1A] font-[var(--font-mono)] font-bold text-sm tracking-[0.25em] uppercase text-charcoal mb-10 hover:-rotate-2 transition-transform cursor-default">
            <span className="w-2 h-2 bg-coral rounded-full animate-pulse" />
            THE MANIFESTO
          </div>

          {/* Main Headline */}
          <h1
            className="reveal-on-scroll font-[var(--font-display)] text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black leading-[0.85] tracking-tighter uppercase mb-10"
            style={{ animationDelay: "100ms" }}
          >
            Truth Is <br />
            <span className="relative inline-block">
              <span className="relative z-10 text-coral">Absolute.</span>
              <span className="absolute bottom-2 sm:bottom-3 left-0 w-full h-4 sm:h-6 md:h-8 bg-golden -z-0 transform -skew-x-6" />
            </span>
          </h1>

          {/* Sanskrit subline */}
          <div
            className="reveal-on-scroll bg-charcoal text-golden px-6 py-3 border-[3px] border-black shadow-[5px_5px_0px_#FFD93D] font-[var(--font-mono)] font-bold text-lg sm:text-xl tracking-widest mb-10 transform rotate-1 hover:rotate-0 transition-transform"
            style={{ animationDelay: "250ms" }}
          >
            सत्यम् एव जयते — Truth Alone Triumphs
          </div>

          {/* Description */}
          <p
            className="reveal-on-scroll max-w-3xl text-lg sm:text-xl md:text-2xl font-[var(--font-mono)] font-bold text-charcoal/80 leading-relaxed"
            style={{ animationDelay: "400ms" }}
          >
            We believe that vital information belongs to humanity — not to corporations, corrupt governments, or systemic oppressors. This protocol exists because whistleblowers should never have to choose between speaking the truth and surviving.
          </p>

          {/* Scroll indicator */}
          <div className="reveal-on-scroll mt-20 flex flex-col items-center gap-3 text-gray group cursor-default" style={{ animationDelay: "600ms" }}>
            <span className="font-[var(--font-mono)] text-xs font-bold uppercase tracking-[0.3em]">Scroll to descend</span>
            <div className="w-8 h-14 border-[3px] border-black rounded-full flex items-start justify-center p-2 group-hover:border-coral transition-colors">
              <div className="w-2 h-3 bg-black rounded-full animate-bounce group-hover:bg-coral transition-colors" />
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2: THE MYTHOLOGY — ORIGIN STORY
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-36 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden border-b-[4px] border-black">
        {/* Watermark letter */}
        <div className="absolute -top-20 -right-20 text-[35rem] font-black text-black/[0.02] pointer-events-none font-[var(--font-mono)] leading-none select-none hidden lg:block">
          चि
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">
          {/* Left content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="reveal-on-scroll">
              <div className="brutal-badge bg-golden text-black inline-flex mb-6 transform -rotate-2 hover:rotate-0 transition-transform border-[3px] border-black shadow-[3px_3px_0px_#1A1A1A]">
                Origin ▪ Vol. I
              </div>
              <h2 className="font-[var(--font-display)] text-5xl sm:text-7xl font-black uppercase tracking-tighter mb-10 text-black leading-[0.9]">
                The <br />
                <span className="text-golden underline decoration-[6px] sm:decoration-8 underline-offset-8 decoration-black">Divine</span> Record
              </h2>
            </div>

            <div className="space-y-8 text-lg sm:text-xl font-medium text-gray leading-relaxed">
              <p className="reveal-on-scroll" style={{ animationDelay: "100ms" }}>
                In ancient Hindu cosmology, <strong className="text-black">Chitragupt</strong> is the celestial scribe — the cosmic accountant born from Lord Brahma&apos;s body to maintain the <em>Akashic Records</em>. He logs every deed, every truth, and every action of every soul — without bias, forgetfulness, or corruption.
              </p>
              <p className="reveal-on-scroll" style={{ animationDelay: "200ms" }}>
                His record is immutable. No deity, no demon, no mortal can alter what Chitragupt has written. The ledger is permanent. The truth is absolute. It is the ultimate accountability mechanism of the universe.
              </p>
              <p className="reveal-on-scroll" style={{ animationDelay: "300ms" }}>
                In the modern digital battleground, truth is constantly rewritten. Whistleblowers are silenced before they can speak. Evidence is destroyed before it&apos;s published. Servers are seized. Sources are exposed. History is edited by the powerful.
              </p>

              <div
                className="reveal-on-scroll p-6 sm:p-8 border-[4px] border-black bg-ivory shadow-[8px_8px_0_#FF6B6B] text-black font-bold font-[var(--font-mono)] text-base sm:text-lg transform -rotate-1 hover:rotate-0 transition-transform leading-relaxed"
                style={{ animationDelay: "400ms" }}
              >
                &quot;Our protocol is the digital incarnation of this ancient principle — a tamper-proof, decentralized vault where evidence cannot be deleted, intercepted, or suppressed. The blockchain is our Akashic Record.&quot;
              </div>
            </div>
          </div>

          {/* Right — Art panel */}
          <div className="lg:col-span-5 flex items-center justify-center reveal-on-scroll" style={{ animationDelay: "300ms" }}>
            <div className="w-full h-full min-h-[500px] lg:min-h-[600px] border-[6px] border-black bg-black p-8 sm:p-10 relative shadow-[16px_16px_0_#FFD93D] flex flex-col justify-between group hover:shadow-[12px_12px_0_#FF6B6B] transition-shadow duration-500">
              {/* Top bar */}
              <div className="flex justify-between items-center w-full">
                <div className="flex gap-2">
                  <span className="w-3 h-3 bg-coral rounded-full animate-pulse" />
                  <span className="w-3 h-3 bg-golden rounded-full" />
                  <span className="w-3 h-3 bg-cyan rounded-full" />
                </div>
                <span className="text-golden font-[var(--font-mono)] text-xs font-bold tracking-widest uppercase bg-white/10 px-3 py-1 border border-white/20">
                  System Lore // Vol 1
                </span>
              </div>

              {/* Center content */}
              <div className="text-center relative py-8 flex-1 flex flex-col items-center justify-center">
                <div className="text-[5rem] sm:text-[7rem] lg:text-[8rem] font-bold text-white/[0.04] absolute inset-0 flex items-center justify-center pointer-events-none font-[var(--font-mono)] select-none">
                  सत्यम्
                </div>
                <div className="relative z-10">
                  <h3 className="font-[var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight">
                    IMMUTABLE.
                    <br />
                    <span className="text-coral">FEARLESS.</span>
                    <br />
                    <span className="text-golden">PERMANENT.</span>
                  </h3>
                  <div className="mt-8 font-[var(--font-mono)] text-white/40 text-sm font-bold tracking-widest">
                    The cosmic ledger cannot be edited.
                  </div>
                </div>
              </div>

              {/* Bottom terminal line */}
              <div className="w-full border-t border-white/15 pt-4 flex flex-wrap gap-4 justify-between text-white/40 font-[var(--font-mono)] text-xs uppercase font-bold tracking-widest">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Encryption: AES-256
                </span>
                <span>Network: Polygon Amoy</span>
                <span className="text-coral group-hover:text-golden transition-colors">Nodes: 482 Active</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3: THREAT LANDSCAPE — DATA WALL
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-charcoal border-b-[4px] border-black relative overflow-hidden">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 reveal-on-scroll">
            <div className="brutal-badge bg-coral text-white inline-flex mb-6 border-[3px] border-black shadow-[3px_3px_0px_#1A1A1A]">
              Why This Exists
            </div>
            <h2 className="font-[var(--font-display)] text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">
              The Threat<br />
              <span className="text-coral">Landscape</span>
            </h2>
            <p className="font-[var(--font-mono)] font-bold text-white/50 text-lg max-w-2xl mx-auto">
              These are the real numbers. This is why we build.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {THREAT_DATA.map((item, idx) => (
              <div
                key={idx}
                className="reveal-on-scroll border-[4px] border-white/10 bg-black/50 p-8 flex flex-col justify-between min-h-[220px] group hover:border-coral transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
                style={{ animationDelay: `${idx * 120}ms` }}
              >
                <div className="absolute inset-0 bg-coral/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <span className="font-[var(--font-display)] text-5xl sm:text-6xl font-black text-white block leading-none group-hover:text-coral transition-colors">
                    {item.value}
                  </span>
                </div>
                <div className="relative z-10 mt-6">
                  <p className="font-[var(--font-mono)] font-bold text-white/70 text-sm leading-snug mb-3">
                    {item.label}
                  </p>
                  <span className="font-[var(--font-mono)] text-[0.65rem] font-bold text-golden uppercase tracking-widest bg-white/5 px-2 py-1 border border-white/10 inline-block">
                    Source: {item.source}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Divider text */}
          <div className="reveal-on-scroll mt-16 text-center">
            <p className="font-[var(--font-mono)] text-white/30 font-bold text-sm tracking-widest uppercase bg-white/5 inline-block px-6 py-3 border border-white/10">
              Chitragupt exists because truth-tellers should not have to die for the truth
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4: THE PIPELINE — FULL WALKTHROUGH
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-36 px-4 sm:px-6 lg:px-8 bg-ivory border-b-[4px] border-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 reveal-on-scroll">
            <div className="brutal-badge bg-black text-white inline-flex mb-6 border-[3px] border-golden shadow-[4px_4px_0px_#FFD93D] text-lg px-6 py-2">
              PROTOCOL PIPELINE
            </div>
            <h2 className="font-[var(--font-display)] text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter mb-6">
              How It <span className="text-coral underline decoration-black decoration-[5px] underline-offset-8">Works</span>
            </h2>
            <p className="font-[var(--font-mono)] font-bold text-gray text-lg max-w-2xl mx-auto">
              Six cryptographic steps separate raw evidence from permanent, uncensorable publication.
            </p>
          </div>

          <div className="space-y-8">
            {PIPELINE_STEPS.map((step, idx) => {
              const IconComp = step.icon;
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className="reveal-on-scroll"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div className={`brutal-card bg-white border-[4px] border-black p-0 overflow-hidden flex flex-col md:flex-row shadow-[8px_8px_0px_#1A1A1A] hover:shadow-[4px_4px_0px_#1A1A1A] hover:translate-x-1 hover:translate-y-1 transition-all group ${isEven ? "" : "md:flex-row-reverse"}`}>
                    {/* Number + Icon panel */}
                    <div className={`${step.color} md:w-1/4 p-8 sm:p-10 border-b-[4px] md:border-b-0 ${isEven ? "md:border-r-[4px]" : "md:border-l-[4px]"} border-black flex flex-col justify-center items-center text-center relative overflow-hidden`}>
                      <div className="absolute inset-0 dot-grid opacity-20" />
                      <div className="relative z-10">
                        <span className="font-[var(--font-display)] text-6xl sm:text-7xl font-black text-black/20 block leading-none mb-4 group-hover:text-black/40 transition-colors">
                          {step.num}
                        </span>
                        <div className="w-16 h-16 bg-white border-[3px] border-black flex items-center justify-center shadow-[3px_3px_0px_#1A1A1A] group-hover:rotate-12 transition-transform mx-auto">
                          <IconComp className="w-8 h-8 text-black" />
                        </div>
                      </div>
                    </div>

                    {/* Content panel */}
                    <div className="md:w-3/4 p-8 sm:p-10 flex flex-col justify-center">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <h3 className="font-[var(--font-display)] text-2xl sm:text-3xl font-black uppercase tracking-tight text-black group-hover:text-coral transition-colors">
                          {step.title}
                        </h3>
                        <span className="font-[var(--font-mono)] text-xs font-bold text-charcoal uppercase tracking-[0.2em] bg-golden/30 px-3 py-1.5 border border-black/10 inline-flex items-center gap-2">
                          {step.sanskrit} <span className="text-gray">/ {step.romanized}</span>
                        </span>
                      </div>
                      <p className="font-[var(--font-mono)] text-base font-medium text-gray leading-relaxed max-w-2xl">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 5: PROTOCOL PRINCIPLES — 6-GRID
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-36 px-4 sm:px-6 lg:px-8 bg-white border-b-[4px] border-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 reveal-on-scroll">
            <div className="brutal-badge bg-cyan text-black inline-flex mb-6 border-[3px] border-black shadow-[3px_3px_0px_#1A1A1A] transform rotate-1 hover:-rotate-1 transition-transform">
              Core Tenets
            </div>
            <h2 className="font-[var(--font-display)] text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter">
              Protocol <span className="text-cyan underline decoration-black decoration-[5px] underline-offset-8">Principles</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRINCIPLES.map((p, idx) => (
              <div
                key={idx}
                className="reveal-on-scroll border-[4px] border-black bg-white p-8 shadow-[6px_6px_0_#1A1A1A] hover:-translate-y-2 hover:shadow-[10px_10px_0_#1A1A1A] transition-all group cursor-default flex flex-col justify-between min-h-[320px]"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div>
                  <div className="text-4xl mb-6 group-hover:scale-125 group-hover:-rotate-12 transition-transform inline-block">{p.icon}</div>
                  <h3 className="font-[var(--font-display)] text-2xl font-black uppercase mb-2 tracking-tight group-hover:text-coral transition-colors">
                    {p.title}
                  </h3>
                  <span className="font-[var(--font-mono)] text-xs font-bold text-white uppercase tracking-widest bg-charcoal px-2 py-1 inline-block mb-5">
                    {p.subtitle}
                  </span>
                  <p className="font-[var(--font-mono)] text-sm font-medium text-gray leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 6: ARCHITECTURE — TERMINAL VISUALIZATION
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-36 px-4 sm:px-6 lg:px-8 bg-charcoal border-b-[4px] border-black relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16 reveal-on-scroll">
            <div className="brutal-badge bg-golden text-black inline-flex mb-6 border-[3px] border-black shadow-[3px_3px_0px_#1A1A1A]">
              System Internals
            </div>
            <h2 className="font-[var(--font-display)] text-5xl sm:text-6xl font-black uppercase tracking-tighter text-white mb-4">
              Under The <span className="text-golden">Hood</span>
            </h2>
          </div>

          {/* Terminal window */}
          <div className="reveal-on-scroll border-[4px] border-white/20 bg-black overflow-hidden shadow-[12px_12px_0_#FFD93D]">
            {/* Titlebar */}
            <div className="flex items-center justify-between px-6 py-3 bg-white/5 border-b-[3px] border-white/10">
              <div className="flex gap-2.5">
                <span className="w-3.5 h-3.5 rounded-full bg-coral border border-black/30" />
                <span className="w-3.5 h-3.5 rounded-full bg-golden border border-black/30" />
                <span className="w-3.5 h-3.5 rounded-full bg-green-500 border border-black/30" />
              </div>
              <span className="font-[var(--font-mono)] text-white/40 text-xs font-bold tracking-widest uppercase">chitragupt://architecture</span>
              <div />
            </div>

            {/* Terminal content */}
            <div className="p-6 sm:p-10 font-[var(--font-mono)] text-sm sm:text-base space-y-5">
              <div className="text-green-400">
                <span className="text-white/30 select-none">$ </span>
                cat SYSTEM_ARCHITECTURE.md
              </div>

              <div className="text-white/20 text-xs select-none">──────────────────────────────────────────────</div>

              <div className="space-y-4 text-white/80">
                <div className="flex flex-col sm:flex-row gap-2">
                  <span className="text-coral font-bold min-w-[180px]">ENCRYPTION:</span>
                  <span>AES-256-GCM via Web Crypto API (client-side)</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <span className="text-cyan font-bold min-w-[180px]">KEY_SPLITTING:</span>
                  <span>Shamir&apos;s Secret Sharing (K-of-N polynomial)</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <span className="text-golden font-bold min-w-[180px]">BLOCKCHAIN:</span>
                  <span>Polygon PoS (Amoy Testnet — chainId: 80002)</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <span className="text-coral font-bold min-w-[180px]">SMART_CONTRACT:</span>
                  <span>Chitragupt.sol — Solidity ^0.8.24</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <span className="text-cyan font-bold min-w-[180px]">STORAGE_PRIMARY:</span>
                  <span>IPFS via Web3.Storage (content-addressed)</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <span className="text-golden font-bold min-w-[180px]">STORAGE_BACKUP:</span>
                  <span>Arweave Permaweb (200+ year persistence)</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <span className="text-coral font-bold min-w-[180px]">AUTOMATION:</span>
                  <span>Chainlink Keepers (decentralized oracle network)</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <span className="text-cyan font-bold min-w-[180px]">HASH_VERIFY:</span>
                  <span>SHA-256 (on-chain immutable evidence fingerprint)</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <span className="text-golden font-bold min-w-[180px]">FRONTEND:</span>
                  <span>Next.js 16 + React 19 + TypeScript 5</span>
                </div>
              </div>

              <div className="text-white/20 text-xs select-none">──────────────────────────────────────────────</div>

              <div className="flex items-center gap-2">
                <span className="text-green-400 select-none">$ </span>
                <span className="text-white animate-pulse">█</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 7: PROTOCOL METRICS
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-golden border-b-[6px] border-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { ref: stat1.ref, count: stat1.count, suffix: "-BIT", label: "AES Encryption", sub: "Military Grade" },
              { ref: stat2.ref, count: stat2.count, suffix: "-of-3", label: "Default Threshold", sub: "Shard Geometry" },
              { ref: stat3.ref, count: stat3.count, suffix: "h", label: "Default Interval", sub: "Check-in Timer" },
              { ref: stat4.ref, count: stat4.count, suffix: "", label: "Admin Keys", sub: "Zero Privilege", display: "ZERO" },
            ].map((item, idx) => (
              <div
                key={idx}
                ref={item.ref}
                className="reveal-on-scroll bg-white border-[4px] border-black p-6 sm:p-8 shadow-[6px_6px_0_#1A1A1A] hover:-translate-y-2 hover:shadow-[10px_10px_0_#1A1A1A] transition-all flex flex-col items-center text-center group cursor-default"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <span className="font-[var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-black text-black leading-none group-hover:text-coral transition-colors">
                  {item.display || item.count}{item.suffix}
                </span>
                <span className="font-[var(--font-display)] font-bold text-lg sm:text-xl text-black mt-4 uppercase tracking-tight">
                  {item.label}
                </span>
                <span className="font-[var(--font-mono)] text-xs font-bold text-gray uppercase tracking-widest mt-2 bg-ivory px-3 py-1 border border-black/10">
                  {item.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 8: THE GUARDIAN COVENANT
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-36 px-4 sm:px-6 lg:px-8 bg-white border-b-[4px] border-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
          {/* Left — Covenant Art Card */}
          <div className="reveal-on-scroll flex items-center justify-center order-2 lg:order-1">
            <div className="w-full border-[6px] border-black bg-ivory p-10 sm:p-14 relative shadow-[12px_12px_0_#4ECDC4] group hover:shadow-[8px_8px_0_#FF6B6B] transition-shadow duration-500">
              <div className="absolute top-4 left-4 text-3xl font-bold text-black/10 group-hover:rotate-90 transition-transform duration-500">+</div>
              <div className="absolute top-4 right-4 text-3xl font-bold text-black/10 group-hover:-rotate-90 transition-transform duration-500">+</div>
              <div className="absolute bottom-4 left-4 text-3xl font-bold text-black/10 group-hover:-rotate-90 transition-transform duration-500">+</div>
              <div className="absolute bottom-4 right-4 text-3xl font-bold text-black/10 group-hover:rotate-90 transition-transform duration-500">+</div>

              <div className="text-center">
                <div className="w-24 h-24 bg-black border-[4px] border-black mx-auto flex items-center justify-center shadow-[6px_6px_0px_#FFD93D] mb-8 group-hover:rotate-12 transition-transform">
                  <UsersIcon className="w-12 h-12 text-golden" />
                </div>
                <h3 className="font-[var(--font-display)] text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-4">यमदूत</h3>
                <p className="font-[var(--font-display)] text-2xl font-bold uppercase text-charcoal tracking-widest mb-8">Yamadoot</p>

                <div className="space-y-3 font-[var(--font-mono)] text-sm font-bold text-left">
                  {[
                    "I shall hold this shard with integrity",
                    "I shall not reveal it prematurely",
                    "I shall submit it when the switch demands",
                    "I shall not collude with other guardians",
                    "I shall remain anonymous to the source",
                  ].map((oath, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-white border-[3px] border-black shadow-[3px_3px_0px_rgba(0,0,0,0.1)] hover:bg-golden/20 transition-colors">
                      <CheckIcon className="w-5 h-5 text-cyan shrink-0 mt-0.5" />
                      <span className="text-charcoal">{oath}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right — Text */}
          <div className="flex flex-col justify-center order-1 lg:order-2">
            <div className="reveal-on-scroll">
              <div className="brutal-badge bg-black text-white inline-flex mb-6 border-[3px] border-cyan shadow-[3px_3px_0px_#4ECDC4]">
                Guardian Network
              </div>
              <h2 className="font-[var(--font-display)] text-5xl sm:text-6xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                The Yamadoot <br />
                <span className="text-cyan underline decoration-black decoration-[5px] underline-offset-8">Covenant</span>
              </h2>
            </div>

            <div className="space-y-6 text-lg font-medium text-gray leading-relaxed">
              <p className="reveal-on-scroll" style={{ animationDelay: "100ms" }}>
                In Hindu mythology, the <strong className="text-black">Yamadoots</strong> are the divine messengers of Yama — the god of death and cosmic justice. They carry the records of mortal deeds to the celestial court for judgment. They are incorruptible servants of truth.
              </p>
              <p className="reveal-on-scroll" style={{ animationDelay: "200ms" }}>
                In the Chitragupt protocol, Yamadoots are <strong className="text-black">decentralized guardian wallets</strong> entrusted with individual cryptographic shards of the evidence decryption key. No single guardian holds enough information to unseal the vault.
              </p>
              <p className="reveal-on-scroll" style={{ animationDelay: "300ms" }}>
                When the Dead Man&apos;s Switch triggers, the smart contract authorizes guardians to submit their shards on-chain. When the threshold is met — mathematically, trustlessly, and autonomously — the evidence is reconstructed and permanently released.
              </p>
              <div className="reveal-on-scroll p-6 border-[4px] border-black bg-charcoal text-white font-[var(--font-mono)] font-bold text-sm shadow-[6px_6px_0px_#4ECDC4]" style={{ animationDelay: "400ms" }}>
                <span className="text-cyan">&gt;</span> Guardians can be journalists, legal counsels, NGOs, anonymous allies — anyone with an Ethereum wallet and the conviction to carry truth across the threshold.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 9: DEVELOPMENT TIMELINE
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-ivory border-b-[4px] border-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal-on-scroll">
            <div className="brutal-badge bg-golden text-black inline-flex mb-6 border-[3px] border-black shadow-[3px_3px_0px_#1A1A1A] transform -rotate-1 hover:rotate-0 transition-transform">
              Strategic Roadmap
            </div>
            <h2 className="font-[var(--font-display)] text-5xl sm:text-6xl font-black uppercase tracking-tighter">
              Development <span className="text-golden underline decoration-black decoration-[5px] underline-offset-8">Phases</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TIMELINE.map((t, idx) => (
              <div
                key={idx}
                className={`reveal-on-scroll border-[4px] border-black p-8 shadow-[6px_6px_0_#1A1A1A] hover:-translate-y-2 hover:shadow-[10px_10px_0_#1A1A1A] transition-all flex flex-col justify-between min-h-[220px] group cursor-default ${
                  t.status === "active" ? "bg-golden" : "bg-white"
                }`}
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-[var(--font-mono)] text-xs font-bold tracking-widest uppercase bg-black text-white px-3 py-1 border border-black">
                      {t.phase}
                    </span>
                    {t.status === "active" && (
                      <span className="flex items-center gap-2 font-[var(--font-mono)] text-xs font-bold text-black">
                        <span className="w-2.5 h-2.5 rounded-full bg-coral animate-pulse" />
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <h3 className="font-[var(--font-display)] text-2xl font-black uppercase tracking-tight text-black mb-2 group-hover:text-coral transition-colors">
                    {t.title}
                  </h3>
                  <p className="font-[var(--font-mono)] text-sm font-medium text-gray leading-relaxed">
                    {t.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t-[3px] border-black/10">
                  <span className="font-[var(--font-mono)] text-xs font-bold text-charcoal tracking-widest">{t.period}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 10: IMMERSIVE CTA
      ═══════════════════════════════════════════════════════ */}
      <section className="py-32 sm:py-40 px-4 sm:px-6 lg:px-8 bg-black border-t-[8px] border-golden text-white relative overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-16 w-16 h-16 border-[3px] border-white/10 animate-spin-slow hidden lg:block" />
        <div className="absolute bottom-24 right-20 w-10 h-10 bg-coral/30 border-[3px] border-coral/50 rounded-full animate-float hidden lg:block" />

        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          {/* Pulsing ring */}
          <div className="reveal-on-scroll relative mb-12">
            <div className="w-20 h-20 border-[4px] border-coral rounded-full flex items-center justify-center relative">
              <div className="w-6 h-6 bg-coral rounded-full animate-ping absolute" />
              <div className="w-6 h-6 bg-coral rounded-full relative z-10" />
            </div>
          </div>

          <h2 className="reveal-on-scroll font-[var(--font-display)] text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-[0.9]" style={{ animationDelay: "100ms" }}>
            Ready to break
            <br />
            <span className="text-coral">your silence?</span>
          </h2>

          <p
            className="reveal-on-scroll font-[var(--font-mono)] font-bold text-white/40 text-lg max-w-2xl mx-auto mb-16"
            style={{ animationDelay: "200ms" }}
          >
            No accounts. No tracking. No way to stop it. The blockchain is your witness and your shield.
          </p>

          <div className="reveal-on-scroll flex flex-col sm:flex-row gap-6 items-center" style={{ animationDelay: "300ms" }}>
            <Link
              href="/submit"
              className="brutal-btn bg-golden text-black border-[4px] border-white shadow-[8px_8px_0_#FF6B6B] hover:shadow-[4px_4px_0_#FF6B6B] hover:translate-x-1 hover:translate-y-1 py-6 px-12 text-xl font-bold font-[var(--font-mono)] uppercase tracking-widest inline-flex items-center gap-4 transition-all group"
            >
              ENTER THE VAULT
              <ArrowRightIcon className="group-hover:translate-x-2 transition-transform" />
            </Link>

            <Link
              href="/shabd-kosh"
              className="brutal-btn bg-transparent text-white border-[4px] border-white/30 hover:border-white hover:bg-white hover:text-black py-6 px-12 text-xl font-bold font-[var(--font-mono)] uppercase tracking-widest inline-flex items-center gap-4 transition-all shadow-none"
            >
              READ THE DOCS
            </Link>
          </div>

          {/* Bottom watermark */}
          <div className="reveal-on-scroll mt-24" style={{ animationDelay: "500ms" }}>
            <span className="text-4xl sm:text-6xl md:text-7xl font-black text-white/[0.06] font-[var(--font-display)] tracking-tighter uppercase select-none">
              सत्यम् एव जयते
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
