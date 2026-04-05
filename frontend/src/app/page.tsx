"use client";

import { useState, useEffect, useRef } from "react";

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

const ArrowRightIcon = ({ className = "" }) => (
  <svg className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ChevronDownIcon = ({ className = "" }) => (
  <svg className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

/* ──────────── DATA ──────────── */
const FEATURES = [
  {
    title: "Anonymous Submission",
    sanskrit: "Gupt Darj",
    description: "No login. No IP logging. No identity. Just the truth, submitted in complete anonymity.",
    icon: (
      <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    color: "bg-cyan",
  },
  {
    title: "AES 256 GCM Encryption",
    sanskrit: "Kavach Suraksha",
    description: "Military grade encryption happens entirely in your browser. Not a single byte of plaintext ever leaves your device.",
    icon: (
      <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    color: "bg-coral",
  },
  {
    title: "Shamir Secret Sharing",
    sanskrit: "Kunji Vibhajan",
    description: "Your encryption key is split into multiple shards. No single guardian can unlock the evidence alone.",
    icon: (
      <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
        <path d="M21 2v6h-6M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v6h6" />
      </svg>
    ),
    color: "bg-golden",
  },
  {
    title: "Permanent Storage",
    sanskrit: "Nitya Bhandaar",
    description: "Evidence stored on IPFS and Arweave simultaneously. Deleted from one? It lives forever on the other.",
    icon: (
      <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    ),
    color: "bg-indigo-400",
  },
  {
    title: "Dead Man Switch",
    sanskrit: "Antim Sanket",
    description: "Miss your check in and the switch triggers automatically. Chainlink Automation ensures no one can stop it.",
    icon: (
      <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    color: "bg-coral",
  },
  {
    title: "Guardian Network",
    sanskrit: "Yamadoot Mandal",
    description: "Trusted wallets hold key shards. When the switch fires, guardians assemble to unlock the truth.",
    icon: (
      <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    color: "bg-cyan",
  },
  {
    title: "On Chain Verification",
    sanskrit: "Satyanisht Pramaan",
    description: "SHA 256 hash stored on the blockchain at the moment of submission. Tamper proof. Court admissible.",
    icon: (
      <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
        <path d="m9 11 3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    color: "bg-golden",
  },
  {
    title: "Public Release",
    sanskrit: "Satya Prakash",
    description: "Once enough shards are submitted, the evidence is reconstructed and published to an uncensorable public URL.",
    icon: (
      <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M2 12h20" />
      </svg>
    ),
    color: "bg-indigo-400",
  },
];

const STEPS = [
  { number: "01", title: "Select Evidence", sanskrit: "Saakshya Chayan", description: "Select the files you wish to protect. Max 50MB per vault for optimal IPFS distribution." },
  { number: "02", title: "Client Side Encryption", sanskrit: "Kavach Nirman", description: "Your browser generates an AES-256-GCM key and encrypts the files locally. Plaintext never leaves your RAM." },
  { number: "03", title: "Key Sharding", sanskrit: "Kunji Vibhajan", description: "The AES key is cryptographically split using Shamir's Secret Sharing. You define the threshold (e.g., 3-of-5)." },
  { number: "04", title: "Smart Contract Creation", sanskrit: "Lekhaa Sthapana", description: "A record is created on the Polygon blockchain containing the encrypted CID and the list of Guardian addresses." },
  { number: "05", title: "Periodic Check In", sanskrit: "Jeevan Sanket", description: "You must return to the platform to ping the smart contract before your configured interval expires." },
  { number: "06", title: "Automatic Release", sanskrit: "Satya Prakash", description: "If you fail to check in, Chainlink triggers the dead man switch. Guardians submit their shards to decrypt the vault." },
];

const TERMS = [
  { english: "Evidence", sanskrit: "Saakshya", devanagari: "साक्ष्य" },
  { english: "Dead Man's Switch", sanskrit: "Antim Sanket", devanagari: "अंतिम संकेत" },
  { english: "Guardian", sanskrit: "Yamadoot", devanagari: "यमदूत" },
  { english: "Vault Record", sanskrit: "Lekhaa", devanagari: "लेखा" },
  { english: "Decryption/Release", sanskrit: "Prakash", devanagari: "प्रकाश" },
  { english: "Whistleblower", sanskrit: "Satyavadi", devanagari: "सत्यवादी" },
];

/* ──────────── CUSTOM LOADERS & EFFECTS ──────────── */

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$*&^%!अआइईउऊकखगघचछजझटठडढतथदधनपफबभम";

// The Redacted / Scramble Reveal Effect
function ScrambleText({ text, className = "", delayMs = 0 }: { text: string, className?: string, delayMs?: number }) {
  const [displayText, setDisplayText] = useState("");
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isIntersecting) return;

    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    timeout = setTimeout(() => {
      let iteration = 0;
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) return text[index];
              if (letter === " ") return " ";
              return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }
        iteration += text.length / 25; // Speed of unscramble
      }, 30);
    }, delayMs);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, isIntersecting, delayMs]);

  // If not intersecting, show redacted blocks
  return (
    <span ref={elementRef} className={className}>
      {displayText || text.replace(/[^\s]/g, '█')}
    </span>
  );
}

// Skeleton wrapper component
function SkeletonWrap({ loaded, children, className = "" }: { loaded: boolean, children: React.ReactNode, className?: string }) {
  if (loaded) return <>{children}</>;
  return <div className={`brutal-skeleton inline-block rounded-[2px] ${className}`} />;
}

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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

/* ──────────── COMPONENTS ──────────── */

function Navbar({ loaded }: { loaded?: boolean }) {
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
            <SkeletonWrap loaded={loaded ?? true} className="w-10 h-10 sm:w-12 sm:h-12">
              <a href="#" className="relative group block">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-coral border-[3px] border-black shadow-[2px_2px_0px_#1A1A1A] flex items-center justify-center group-hover:bg-golden transition-colors group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none ease-out">
                  <span className="font-[var(--font-mono)] font-bold text-xl sm:text-2xl text-white group-hover:text-black">C</span>
                </div>
                {/* Decoration cross */}
                <div className="absolute -top-2 -left-2 text-black/20 text-xs font-[var(--font-mono)] font-bold opacity-0 group-hover:opacity-100 transition-opacity">+</div>
              </a>
            </SkeletonWrap>
            <div className="hidden sm:flex flex-col">
              <SkeletonWrap loaded={loaded ?? true} className="w-32 h-6">
                <span className="font-[var(--font-display)] font-extrabold text-xl tracking-tight leading-none uppercase">Chitragupt</span>
              </SkeletonWrap>
              <SkeletonWrap loaded={loaded ?? true} className="w-24 h-4 mt-1">
                <span className="font-[var(--font-mono)] text-[0.6rem] font-bold text-gray uppercase tracking-[0.2em]">Protocol V1.0</span>
              </SkeletonWrap>
            </div>
          </div>

          {/* Desktop Links (Center) */}
          <div className="hidden lg:flex items-center gap-1">
            {["FEATURES", "HOW IT WORKS", "SHABD KOSH"].map((item) => (
              <SkeletonWrap key={item} loaded={loaded ?? true} className="w-24 h-10 mx-1">
                <a
                  href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                  className="relative px-3 py-2 text-sm font-bold font-[var(--font-mono)] text-charcoal tracking-wide group overflow-hidden inline-flex items-center justify-center"
                >
                  <span className="relative z-10 group-hover:text-black transition-colors">{item}</span>
                  <span className="absolute bottom-1 left-3 right-3 h-[3px] bg-black transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                  <span className="absolute inset-0 bg-golden/20 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-0 rounded-[2px]" />
                </a>
              </SkeletonWrap>
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
             <SkeletonWrap loaded={loaded ?? true} className="w-24 sm:w-40 h-10 sm:h-12 hidden sm:block">
               <a href="#submit" className="brutal-btn brutal-btn-primary px-6 h-10 sm:h-12 items-center justify-center text-sm font-bold font-[var(--font-mono)] tracking-wider w-full text-center">
                 OPEN VAULT
               </a>
             </SkeletonWrap>

             {/* Mobile Menu Button */}
             <button
               onClick={() => setMobileOpen(!mobileOpen)}
               className="lg:hidden w-10 h-10 sm:w-12 sm:h-12 border-[3px] border-black flex items-center justify-center bg-cyan shadow-[3px_3px_0px_#1A1A1A] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all relative overflow-hidden group"
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
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-base font-bold font-[var(--font-mono)] text-black tracking-widest border-[3px] border-transparent hover:border-black hover:bg-golden hover:translate-x-2 transition-all uppercase"
              >
                <span className="text-coral mr-2">&gt;</span> {item}
              </a>
            ))}
            <div className="border-t-[3px] border-black/20 pt-5 mt-2">
              <a href="#submit" onClick={() => setMobileOpen(false)} className="brutal-btn brutal-btn-dark w-full justify-center py-4 text-sm font-bold font-[var(--font-mono)]">
                SUBMIT EVIDENCE
              </a>
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

function HeroSection({ loaded }: { loaded: boolean }) {
  return (
    <section id="hero" className="relative py-16 md:py-24 lg:py-32 overflow-hidden flex items-center justify-center min-h-[90vh]">
      {/* Decorative Elements */}
      <div className="absolute top-12 left-12 w-20 h-20 border-[3px] border-black/20 animate-spin-slow hidden lg:block" />
      <div className="absolute top-24 right-20 w-10 h-10 bg-coral border-[3px] border-black rounded-full hidden lg:block animate-pulse-ring" />
      <div className="absolute top-24 right-20 w-10 h-10 bg-coral border-[3px] border-black rounded-full hidden lg:block animate-float" />
      <div className="absolute bottom-20 left-24 w-16 h-16 bg-cyan border-[3px] border-black hidden lg:block animate-float" style={{ animationDelay: "1.5s" }} />
      <div className="absolute bottom-32 right-32 text-4xl font-bold text-black/10 hidden lg:block deco-cross opacity-50" />
      <div className="absolute top-48 left-1/3 text-3xl font-bold text-black/10 hidden lg:block deco-cross opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full reveal-on-scroll">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <SkeletonWrap loaded={loaded} className="w-72 h-8 mb-8">
            <div className="brutal-badge bg-white hover:bg-ivory transition-colors cursor-default transform hover:-rotate-2">
              <span className="w-2 h-2 bg-coral rounded-full animate-pulse" />
              Decentralized &bull; Censorship Proof &bull; Unstoppable
            </div>
          </SkeletonWrap>

          {/* Main Headline */}
          <SkeletonWrap loaded={loaded} className="w-full max-w-4xl h-20 sm:h-24 md:h-32 mb-8 mt-2">
            <h1 className="font-[var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight max-w-5xl hover-glitch transition-all">
              <ScrambleText text="Truth Cannot Be " delayMs={200} />
              <span className="relative inline-block">
                <span className="relative z-10">
                   <ScrambleText text="Deleted." delayMs={600} />
                </span>
                <span className={`absolute bottom-1 left-0 w-full h-4 md:h-5 bg-coral/60 -z-0 transform -skew-x-12 transition-all duration-1000 ${loaded ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} />
              </span>
            </h1>
          </SkeletonWrap>

          {/* Sanskrit Subline */}
          <SkeletonWrap loaded={loaded} className="w-full max-w-md h-12 mb-8">
            <p className="font-[var(--font-mono)] text-lg md:text-xl text-charcoal/80 max-w-2xl bg-white px-4 py-2 border-2 border-black inline-block transform rotate-1 shadow-[2px_2px_0px_#1A1A1A]">
              <ScrambleText text="सत्यम् एव जयते — Truth alone triumphs" delayMs={1000} />
            </p>
          </SkeletonWrap>

          {/* Description */}
          <SkeletonWrap loaded={loaded} className="w-full max-w-2xl h-20 mb-4 mt-4">
            <p className="text-base md:text-lg text-gray max-w-2xl leading-relaxed font-semibold min-h-[80px]">
              {loaded && <ScrambleText text="Upload encrypted evidence that gets sharded across a guardian network and stored permanently on chain. If you go silent, the dead man switch ensures your truth is released automatically." delayMs={1400} />}
            </p>
          </SkeletonWrap>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-6">
            <SkeletonWrap loaded={loaded} className="w-56 h-14">
              <a href="#submit" className="brutal-btn brutal-btn-dark text-base py-4 px-8 group">
                Submit Evidence
                <ArrowRightIcon className="group-hover:translate-x-1 transition-transform" />
              </a>
            </SkeletonWrap>
            <SkeletonWrap loaded={loaded} className="w-56 h-14">
              <a href="#how-it-works" className="brutal-btn brutal-btn-white text-base py-4 px-8 group">
                How It Works
                <ChevronDownIcon className="group-hover:translate-y-1 transition-transform" />
              </a>
            </SkeletonWrap>
          </div>

          {/* Stats Bar */}
          <div className={`mt-20 w-full max-w-4xl transition-all duration-1000 transform delay-700 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-100'}`}>
             <SkeletonWrap loaded={loaded} className="w-full h-32">
                <div className="brutal-card px-4 py-6 sm:px-8 sm:py-8 bg-white hover:bg-ivory">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x-[3px] md:divide-black">
                    {[
                      { value: "AES 256", label: "Encryption" },
                      { value: "5 of 3", label: "Shard Threshold" },
                      { value: "IPFS+AR", label: "Dual Storage" },
                      { value: "72h", label: "Default Interval" },
                    ].map((stat, idx) => (
                      <div key={stat.label} className="flex flex-col items-center px-4 group cursor-default" style={{ animationDelay: `${idx * 100}ms` }}>
                        <span className="font-[var(--font-mono)] text-2xl sm:text-3xl font-bold text-black group-hover:text-coral transition-colors">
                          {stat.value}
                        </span>
                        <span className="text-xs sm:text-sm text-gray mt-2 uppercase tracking-widest font-bold group-hover:text-black transition-colors">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
             </SkeletonWrap>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32 bg-white border-y-[3px] border-black border-dashed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 reveal-on-scroll">
          <div className="brutal-badge bg-cyan inline-flex mb-6 transform -rotate-2 hover:rotate-0 transition-transform">Core Features</div>
          <h2 className="font-[var(--font-display)] text-5xl md:text-6xl font-bold">
            <ScrambleText text="Built for the " />
            <span className="text-coral underline decoration-black decoration-4 underline-offset-8">Fearless</span>
          </h2>
          <p className="mt-6 text-gray max-w-2xl mx-auto text-xl font-medium">
            <ScrambleText text="Every component is designed so that no government, corporation, or adversary can stop the truth from surfacing." delayMs={200} />
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, i) => (
            <div key={i} className={`reveal-on-scroll brutal-card ${i % 2 === 0 ? '' : 'tilt-right'} p-8 flex flex-col gap-5 group cursor-default bg-white hover:bg-ivory`} style={{ transitionDelay: `${i * 50}ms` }}>
              {/* Icon */}
              <div className={`icon-box w-16 h-16 ${feature.color} border-[3px] border-black rounded-[4px] shadow-[3px_3px_0px_#1A1A1A] flex items-center justify-center transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="font-[var(--font-display)] text-xl font-bold leading-tight group-hover:text-coral transition-colors">
                <ScrambleText text={feature.title} />
              </h3>

              {/* Sanskrit */}
              <span className="font-[var(--font-mono)] text-sm font-bold text-charcoal uppercase tracking-widest px-2 py-1 bg-golden/20 inline-block w-fit border border-black/10">
                <ScrambleText text={feature.sanskrit} delayMs={100} />
              </span>

              {/* Description */}
              <p className="text-base text-gray font-medium leading-relaxed flex-grow">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 reveal-on-scroll">
          <div className="brutal-badge bg-golden inline-flex mb-6 transform rotate-2 hover:-rotate-0 transition-transform">Process</div>
          <h2 className="font-[var(--font-display)] text-5xl md:text-6xl font-bold">
            <ScrambleText text="How It Works" />
          </h2>
          <p className="mt-6 text-gray max-w-2xl mx-auto text-xl font-medium">
            <ScrambleText text="Six steps from raw evidence to permanent, uncensorable publication." delayMs={200} />
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <div key={i} className="reveal-on-scroll brutal-card p-8 flex gap-6 group cursor-default hover:bg-white" style={{ transitionDelay: `${i * 100}ms` }}>
              {/* Number */}
              <div className="step-number bg-golden group-hover:bg-coral group-hover:text-white group-hover:-rotate-12 transition-all duration-300">
                {step.number}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3 flex-1">
                <h3 className="font-[var(--font-display)] text-xl font-bold">
                  <ScrambleText text={step.title} />
                </h3>
                <span className="font-[var(--font-mono)] text-xs font-bold text-charcoal uppercase tracking-widest bg-cyan/20 px-2 py-1 w-fit border border-black/10">
                  <ScrambleText text={step.sanskrit} delayMs={100} />
                </span>
                <p className="text-base text-gray font-medium leading-relaxed mt-1">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TerminologySection() {
  return (
    <section id="terminology" className="py-20 md:py-32 bg-white border-y-[3px] border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 reveal-on-scroll">
          <div className="brutal-badge bg-coral text-white inline-flex mb-6 transform -rotate-1 hover:rotate-0 transition-transform">Shabd Kosh</div>
          <h2 className="font-[var(--font-display)] text-5xl md:text-6xl font-bold">
            <ScrambleText text="The Language of Truth" />
          </h2>
          <p className="mt-6 text-gray max-w-2xl mx-auto text-xl font-medium">
             <ScrambleText text="Chitragupt speaks in the timeless vocabulary of Sanskrit, the language of cosmic record keeping." delayMs={200} />
          </p>
        </div>

        {/* Terms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {TERMS.map((term, i) => (
            <div key={i} className="reveal-on-scroll brutal-card p-8 flex flex-col items-center text-center gap-4 group cursor-default hover:bg-ivory" style={{ transitionDelay: `${i * 50}ms` }}>
              {/* Devanagari */}
              <span className="text-5xl font-bold text-black opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                <ScrambleText text={term.devanagari} />
              </span>
              {/* Sanskrit */}
              <span className="font-[var(--font-mono)] text-lg font-bold text-coral uppercase tracking-widest mt-2">
                <ScrambleText text={term.sanskrit} delayMs={100} />
              </span>
              {/* English */}
              <span className="text-base font-semibold text-gray">
                {term.english}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MarqueeStrip() {
  const text = "TRUTH CANNOT BE DELETED \u00B7 सत्यम् एव जयते \u00B7 CHITRAGUPT \u00B7 DECENTRALIZED \u00B7 CENSORSHIP PROOF \u00B7 UNSTOPPABLE \u00B7 ";
  return (
    <div className="bg-charcoal border-y-[3px] border-black py-4 overflow-hidden shadow-[inset_0px_5px_15px_rgba(0,0,0,0.5)]">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="font-[var(--font-mono)] text-base font-bold text-golden tracking-widest whitespace-pre">
          {text}{text}{text}{text}
        </span>
      </div>
    </div>
  );
}

function CTASection() {
  return (
    <section id="submit" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
        <div className="brutal-card bg-ivory p-8 md:p-20 text-center relative overflow-hidden group">
          {/* Decorative Corner Elements */}
          <div className="absolute top-6 left-6 text-3xl font-bold text-golden/60 group-hover:rotate-90 transition-transform duration-500">+</div>
          <div className="absolute top-6 right-6 text-3xl font-bold text-golden/60 group-hover:-rotate-90 transition-transform duration-500">+</div>
          <div className="absolute bottom-6 left-6 text-3xl font-bold text-golden/60 group-hover:-rotate-90 transition-transform duration-500">+</div>
          <div className="absolute bottom-6 right-6 text-3xl font-bold text-golden/60 group-hover:rotate-90 transition-transform duration-500">+</div>

          {/* Dot pattern background */}
          <div className="absolute inset-0 dot-grid group-hover:opacity-30 transition-opacity" />

          <div className="relative z-10">
            <h2 className="font-[var(--font-display)] text-4xl md:text-6xl font-bold max-w-4xl mx-auto leading-tight hover-glitch">
              <ScrambleText text="The World Needs to Know." />
              <br />
              <span className="text-coral underline decoration-black decoration-4 underline-offset-8">
                <ScrambleText text="You Have the Proof." delayMs={300} />
              </span>
            </h2>

            <p className="mt-8 text-charcoal font-semibold max-w-2xl mx-auto text-xl leading-relaxed bg-white/80 p-4 border-2 border-black inline-block transform rotate-1 shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
              No accounts. No tracking. No way to stop it. Upload your evidence now and let the blockchain be your witness.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="/submit" className="brutal-btn brutal-btn-dark text-xl py-5 px-12 transform hover:scale-105 active:scale-95 transition-transform">
                Lekhaa Darj Karein
                <ArrowRightIcon className="w-6 h-6" />
              </a>
              <a href="/guardian" className="brutal-btn brutal-btn-primary text-xl py-5 px-12 transform hover:-rotate-2 transition-transform">
                Yamadoot Panel
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black border-t-[4px] border-black text-white relative overflow-hidden">
        {/* subtle bg logo */}
        <div className="absolute right-0 bottom-0 text-[30rem] font-bold text-white/[0.02] leading-none pointer-events-none font-[var(--font-mono)]">
            C
        </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-6 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-golden border-[3px] border-white rounded-[4px] shadow-[4px_4px_0px_#FFD93D] flex items-center justify-center transform hover:rotate-12 transition-transform">
                <span className="font-[var(--font-mono)] font-bold text-xl text-black">C</span>
              </div>
              <span className="font-[var(--font-display)] font-bold text-2xl tracking-tight">CHITRAGUPT</span>
            </div>
            <p className="text-base text-white/80 leading-relaxed max-w-sm font-medium">
              Named after the Hindu deity who maintains the permanent record of every soul&apos;s deeds. No forgetting. No forgiving. <span className="text-golden font-bold">Just truth.</span>
            </p>
          </div>

          {/* Navigation */}
          <div className="col-span-1 md:col-span-3 flex flex-col gap-4">
            <h4 className="font-[var(--font-mono)] text-sm font-bold uppercase tracking-widest text-coral mb-2">Navigate</h4>
            {[
              { label: "Submit Evidence", href: "/submit" },
              { label: "Guardian Dashboard", href: "/guardian" },
              { label: "Public Vault", href: "/vault" },
            ].map((link) => (
              <a key={link.label} href={link.href} className="text-base font-medium text-white/70 hover:text-golden hover:translate-x-2 transition-all">
                {link.label}
              </a>
            ))}
          </div>

          {/* Tech */}
          <div className="col-span-1 md:col-span-3 flex flex-col gap-4">
            <h4 className="font-[var(--font-mono)] text-sm font-bold uppercase tracking-widest text-cyan mb-2">Technology</h4>
            <div className="flex flex-wrap gap-2">
              {["Solidity", "IPFS", "Arweave", "Chainlink", "Polygon", "Shamir"].map((tech) => (
                <span key={tech} className="px-3 py-1.5 text-xs font-bold border-[2px] border-white/20 rounded-[4px] text-white/90 hover:border-golden hover:text-golden transition-colors cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t-[2px] border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 reveal-on-scroll">
          <p className="text-sm text-white/50 font-[var(--font-mono)] font-bold tracking-wider">
            OPEN SOURCE &bull; NO TRACKING &bull; TOR COMPATIBLE
          </p>
          <p className="text-base text-golden font-[var(--font-mono)] font-bold px-4 py-2 border-2 border-white/20">
            सत्यम् एव जयते
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ──────────── PAGE ──────────── */

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [appLoaded, setAppLoaded] = useState(false);
  useScrollReveal();

  useEffect(() => {
    setMounted(true);
    
    // Simulate loading for the Skeleton blocks
    const timer = setTimeout(() => {
      setAppLoaded(true);
    }, 1800);
    
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`flex flex-col min-h-screen transition-opacity duration-1000 opacity-100`}>
      <Navbar loaded={appLoaded} />
      <main className="flex-1 overflow-hidden">
        <HeroSection loaded={appLoaded} />
        <MarqueeStrip />
        <FeaturesSection />
        <HowItWorksSection />
        <TerminologySection />
        <MarqueeStrip />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
