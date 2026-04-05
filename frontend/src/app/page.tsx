"use client";

import { useState, useEffect } from "react";

/* ──────────── ICONS (inline SVGs) ──────────── */

function ShieldIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}

function LockIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}

function KeyIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"/>
    </svg>
  );
}

function CloudIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/>
    </svg>
  );
}

function TimerIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

function UsersIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

function CheckCircleIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  );
}

function GlobeIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

function ArrowRightIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}

function MenuIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  );
}

function CloseIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

function ChevronDownIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}

/* ──────────── DATA ──────────── */

const FEATURES = [
  {
    icon: <ShieldIcon />,
    title: "Anonymous Submission",
    sanskrit: "Gupt Darj",
    description: "No login. No IP logging. No identity. Just the truth, submitted in complete anonymity.",
    color: "bg-cyan",
  },
  {
    icon: <LockIcon />,
    title: "AES 256 GCM Encryption",
    sanskrit: "Kavach Suraksha",
    description: "Military grade encryption happens entirely in your browser. Not a single byte of plaintext ever leaves your device.",
    color: "bg-coral",
  },
  {
    icon: <KeyIcon />,
    title: "Shamir Secret Sharing",
    sanskrit: "Kunji Vibhajan",
    description: "Your encryption key is split into multiple shards. No single guardian can unlock the evidence alone.",
    color: "bg-golden",
  },
  {
    icon: <CloudIcon />,
    title: "Permanent Storage",
    sanskrit: "Nitya Bhhandaar",
    description: "Evidence stored on IPFS and Arweave simultaneously. Deleted from one? It lives forever on the other.",
    color: "bg-purple text-white",
  },
  {
    icon: <TimerIcon />,
    title: "Dead Man Switch",
    sanskrit: "Antim Sanket",
    description: "Miss your check in and the switch triggers automatically. Chainlink Automation ensures no one can stop it.",
    color: "bg-coral",
  },
  {
    icon: <UsersIcon />,
    title: "Guardian Network",
    sanskrit: "Yamadoot Mandal",
    description: "Trusted wallets hold key shards. When the switch fires, guardians assemble to unlock the truth.",
    color: "bg-cyan",
  },
  {
    icon: <CheckCircleIcon />,
    title: "On Chain Verification",
    sanskrit: "Satyanisht Praramaan",
    description: "SHA 256 hash stored on the blockchain at the moment of submission. Tamper proof. Court admissible.",
    color: "bg-golden",
  },
  {
    icon: <GlobeIcon />,
    title: "Public Release",
    sanskrit: "Satya Prakash",
    description: "Once enough shards are submitted, the evidence is reconstructed and published to an uncensorable public URL.",
    color: "bg-purple text-white",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Upload Evidence",
    sanskrit: "Saakshya Uplabdh Karein",
    description: "Select your files. They never leave your browser unencrypted.",
  },
  {
    number: "02",
    title: "Encrypt Locally",
    sanskrit: "Sthaniya Suraksha",
    description: "AES 256 GCM encrypts everything client side. The key exists only in your memory.",
  },
  {
    number: "03",
    title: "Shard the Key",
    sanskrit: "Kunji Vibhaajan",
    description: "Shamir splits the key into N shards. Each guardian receives one shard.",
  },
  {
    number: "04",
    title: "Store Permanently",
    sanskrit: "Sthaayi Bhhandaaran",
    description: "Encrypted blob goes to IPFS and Arweave. CIDs recorded on chain.",
  },
  {
    number: "05",
    title: "Set the Switch",
    sanskrit: "Antim Sanket Sthaapit",
    description: "Configure your check in interval. Miss it and the dead man switch fires.",
  },
  {
    number: "06",
    title: "Truth Released",
    sanskrit: "Satya Prakash",
    description: "Guardians submit shards. Evidence is reconstructed and published permanently.",
  },
];

const TERMS = [
  { english: "Vault / Record", sanskrit: "Lekhaa", devanagari: "लेखा" },
  { english: "Guardian", sanskrit: "Yamadoot", devanagari: "यमदूत" },
  { english: "Evidence", sanskrit: "Saakshya", devanagari: "साक्ष्य" },
  { english: "Release", sanskrit: "Prakash", devanagari: "प्रकाश" },
  { english: "Dead Man Switch", sanskrit: "Antim Sanket", devanagari: "अंतिम संकेत" },
  { english: "Whistleblower", sanskrit: "Satyavadi", devanagari: "सत्यवादी" },
];

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

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-[3px] border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-golden border-[3px] border-black rounded-[4px] shadow-[3px_3px_0px_#1A1A1A] flex items-center justify-center hover-glitch">
              <span className="font-[var(--font-mono)] font-bold text-lg text-black">C</span>
            </div>
            <span className="font-[var(--font-display)] font-bold text-xl tracking-tight hidden sm:block">CHITRAGUPT</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {["Features", "How It Works", "Terminology"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="brutal-link px-4 py-2 text-sm font-semibold text-black hover:bg-golden/30 rounded-[4px] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a href="#submit" className="brutal-btn brutal-btn-primary text-sm py-2 px-5 hidden sm:inline-flex">
              Submit Evidence
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 border-[3px] border-black rounded-[4px] flex items-center justify-center bg-white shadow-[3px_3px_0px_#1A1A1A] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t-[3px] border-black bg-white">
          <div className="px-4 py-4 flex flex-col gap-2">
            {["Features", "How It Works", "Terminology"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-base font-semibold border-[3px] border-black rounded-[4px] bg-ivory shadow-[3px_3px_0px_#1A1A1A] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all"
              >
                {item}
              </a>
            ))}
            <a
              href="#submit"
              onClick={() => setMobileOpen(false)}
              className="brutal-btn brutal-btn-primary w-full text-center mt-2"
            >
              Submit Evidence
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
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
          <div className="brutal-badge bg-white mb-8 hover:bg-ivory transition-colors cursor-default transform hover:-rotate-2">
            <span className="w-2 h-2 bg-coral rounded-full animate-pulse" />
            Decentralized &bull; Censorship Proof &bull; Unstoppable
          </div>

          {/* Main Headline */}
          <h1 className="font-[var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight max-w-5xl hover-glitch">
            Truth Cannot Be{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Deleted</span>
              <span className="absolute bottom-1 left-0 w-full h-4 md:h-5 bg-coral/60 -z-0 transform -skew-x-12" />
            </span>
          </h1>

          {/* Sanskrit Subline */}
          <p className="mt-8 font-[var(--font-mono)] text-lg md:text-xl text-charcoal/80 max-w-2xl bg-white px-4 py-2 border-2 border-black inline-block transform rotate-1 shadow-[2px_2px_0px_#1A1A1A]">
            सत्यम् एव जयते &mdash; Truth alone triumphs
          </p>

          {/* Description */}
          <p className="mt-8 text-base md:text-lg text-gray max-w-2xl leading-relaxed font-semibold">
            Upload encrypted evidence that gets sharded across a guardian network and stored permanently on chain. If you go silent, the dead man switch ensures your truth is released automatically.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-6">
            <a href="#submit" className="brutal-btn brutal-btn-dark text-base py-4 px-8 group">
              Submit Evidence
              <ArrowRightIcon className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#how-it-works" className="brutal-btn brutal-btn-white text-base py-4 px-8 group">
              How It Works
              <ChevronDownIcon className="group-hover:translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Stats Bar */}
          <div className="mt-20 w-full max-w-4xl brutal-card px-4 py-6 sm:px-8 sm:py-8 bg-white hover:bg-ivory transition-colors">
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
            Built for the <span className="text-coral underline decoration-black decoration-4 underline-offset-8">Fearless</span>
          </h2>
          <p className="mt-6 text-gray max-w-2xl mx-auto text-xl font-medium">
            Every component is designed so that no government, corporation, or adversary can stop the truth from surfacing.
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
                {feature.title}
              </h3>

              {/* Sanskrit */}
              <span className="font-[var(--font-mono)] text-sm font-bold text-charcoal uppercase tracking-widest px-2 py-1 bg-golden/20 inline-block w-fit border border-black/10">
                {feature.sanskrit}
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
            How It Works
          </h2>
          <p className="mt-6 text-gray max-w-2xl mx-auto text-xl font-medium">
            Six steps from raw evidence to permanent, uncensorable publication.
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
                  {step.title}
                </h3>
                <span className="font-[var(--font-mono)] text-xs font-bold text-charcoal uppercase tracking-widest bg-cyan/20 px-2 py-1 w-fit border border-black/10">
                  {step.sanskrit}
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
            The Language of Truth
          </h2>
          <p className="mt-6 text-gray max-w-2xl mx-auto text-xl font-medium">
            Chitragupt speaks in the timeless vocabulary of Sanskrit, the language of cosmic record keeping.
          </p>
        </div>

        {/* Terms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {TERMS.map((term, i) => (
            <div key={i} className="reveal-on-scroll brutal-card p-8 flex flex-col items-center text-center gap-4 group cursor-default hover:bg-ivory" style={{ transitionDelay: `${i * 50}ms` }}>
              {/* Devanagari */}
              <span className="text-5xl font-bold text-black opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                {term.devanagari}
              </span>
              {/* Sanskrit */}
              <span className="font-[var(--font-mono)] text-lg font-bold text-coral uppercase tracking-widest mt-2">
                {term.sanskrit}
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
              The World Needs to Know.
              <br />
              <span className="text-coral underline decoration-black decoration-4 underline-offset-8">You Have the Proof.</span>
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
  useScrollReveal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 overflow-hidden">
        <HeroSection />
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
