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

/* ──────────── COMPONENTS ──────────── */

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-[3px] border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-golden border-[3px] border-black rounded-[4px] shadow-[3px_3px_0px_#1A1A1A] flex items-center justify-center">
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
    <section id="hero" className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-8 left-8 w-16 h-16 border-[3px] border-black/20 rotate-12 hidden lg:block" />
      <div className="absolute top-24 right-16 w-8 h-8 bg-coral border-[3px] border-black rounded-full hidden lg:block animate-float" />
      <div className="absolute bottom-16 left-24 w-12 h-12 bg-cyan border-[3px] border-black hidden lg:block" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-32 right-32 text-4xl font-bold text-black/10 hidden lg:block">+</div>
      <div className="absolute top-48 left-1/3 text-3xl font-bold text-black/10 hidden lg:block">+</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="brutal-badge bg-white mb-8">
            <span className="w-2 h-2 bg-coral rounded-full animate-pulse" />
            Decentralized &bull; Censorship Proof &bull; Unstoppable
          </div>

          {/* Main Headline */}
          <h1 className="font-[var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight max-w-5xl">
            Truth Cannot Be{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Deleted</span>
              <span className="absolute bottom-1 left-0 w-full h-4 md:h-5 bg-coral/60 -z-0" />
            </span>
          </h1>

          {/* Sanskrit Subline */}
          <p className="mt-6 font-[var(--font-mono)] text-lg md:text-xl text-charcoal/80 max-w-2xl">
            सत्यम् एव जयते &mdash; Truth alone triumphs
          </p>

          {/* Description */}
          <p className="mt-6 text-base md:text-lg text-gray max-w-2xl leading-relaxed">
            Upload encrypted evidence that gets sharded across a guardian network and stored permanently on chain. If you go silent, the dead man switch ensures your truth is released automatically.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <a href="#submit" className="brutal-btn brutal-btn-dark text-base py-3 px-8">
              Submit Evidence
              <ArrowRightIcon />
            </a>
            <a href="#how-it-works" className="brutal-btn brutal-btn-white text-base py-3 px-8">
              How It Works
              <ChevronDownIcon />
            </a>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 w-full max-w-3xl brutal-card px-4 py-4 sm:px-8 sm:py-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x-[3px] md:divide-black">
              {[
                { value: "AES 256", label: "Encryption" },
                { value: "5 of 3", label: "Shard Threshold" },
                { value: "IPFS+AR", label: "Dual Storage" },
                { value: "72h", label: "Default Interval" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center px-4">
                  <span className="font-[var(--font-mono)] text-xl sm:text-2xl font-bold text-black">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm text-gray mt-1 uppercase tracking-wider font-semibold">
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
    <section id="features" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="brutal-badge bg-cyan inline-flex mb-4">Core Features</div>
          <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-bold">
            Built for the Fearless
          </h2>
          <p className="mt-4 text-gray max-w-xl mx-auto text-lg">
            Every component is designed so that no government, corporation, or adversary can stop the truth from surfacing.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, i) => (
            <div key={i} className="brutal-card p-6 flex flex-col gap-4 group">
              {/* Icon */}
              <div className={`w-14 h-14 ${feature.color} border-[3px] border-black rounded-[4px] shadow-[3px_3px_0px_#1A1A1A] flex items-center justify-center group-hover:shadow-[1px_1px_0px_#1A1A1A] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all`}>
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="font-[var(--font-display)] text-lg font-bold leading-tight">
                {feature.title}
              </h3>

              {/* Sanskrit */}
              <span className="font-[var(--font-mono)] text-xs text-gray uppercase tracking-widest">
                {feature.sanskrit}
              </span>

              {/* Description */}
              <p className="text-sm text-gray leading-relaxed flex-grow">
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
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="brutal-badge bg-golden inline-flex mb-4">Process</div>
          <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-bold">
            How It Works
          </h2>
          <p className="mt-4 text-gray max-w-xl mx-auto text-lg">
            Six steps from raw evidence to permanent, uncensorable publication.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <div key={i} className="brutal-card p-6 flex gap-5">
              {/* Number */}
              <div className="step-number bg-golden">
                {step.number}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="font-[var(--font-display)] text-lg font-bold">
                  {step.title}
                </h3>
                <span className="font-[var(--font-mono)] text-xs text-gray uppercase tracking-widest">
                  {step.sanskrit}
                </span>
                <p className="text-sm text-gray leading-relaxed">
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
    <section id="terminology" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="brutal-badge bg-coral text-white inline-flex mb-4">Shabd Kosh</div>
          <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-bold">
            The Language of Truth
          </h2>
          <p className="mt-4 text-gray max-w-xl mx-auto text-lg">
            Chitragupt speaks in the timeless vocabulary of Sanskrit, the language of cosmic record keeping.
          </p>
        </div>

        {/* Terms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {TERMS.map((term, i) => (
            <div key={i} className="brutal-card p-6 flex flex-col items-center text-center gap-3">
              {/* Devanagari */}
              <span className="text-4xl font-bold text-black">
                {term.devanagari}
              </span>
              {/* Sanskrit */}
              <span className="font-[var(--font-mono)] text-base font-bold text-charcoal uppercase tracking-wider">
                {term.sanskrit}
              </span>
              {/* English */}
              <span className="text-sm text-gray">
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
    <div className="bg-black border-y-[3px] border-black py-3 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="font-[var(--font-mono)] text-sm font-bold text-golden tracking-widest">
          {text}{text}{text}{text}
        </span>
      </div>
    </div>
  );
}

function CTASection() {
  return (
    <section id="submit" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="brutal-card p-8 md:p-16 text-center relative overflow-hidden">
          {/* Decorative Corner Elements */}
          <div className="absolute top-4 left-4 text-2xl font-bold text-golden/40">+</div>
          <div className="absolute top-4 right-4 text-2xl font-bold text-golden/40">+</div>
          <div className="absolute bottom-4 left-4 text-2xl font-bold text-golden/40">+</div>
          <div className="absolute bottom-4 right-4 text-2xl font-bold text-golden/40">+</div>

          {/* Dot pattern background */}
          <div className="absolute inset-0 dot-grid" />

          <div className="relative z-10">
            <h2 className="font-[var(--font-display)] text-3xl md:text-5xl font-bold max-w-3xl mx-auto leading-tight">
              The World Needs to Know.
              <br />
              <span className="text-coral">You Have the Proof.</span>
            </h2>

            <p className="mt-6 text-gray max-w-xl mx-auto text-lg leading-relaxed">
              No accounts. No tracking. No way to stop it. Upload your evidence now and let the blockchain be your witness.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/submit" className="brutal-btn brutal-btn-dark text-lg py-4 px-10">
                Lekhaa Darj Karein
                <ArrowRightIcon className="w-6 h-6" />
              </a>
              <a href="/guardian" className="brutal-btn brutal-btn-primary text-lg py-4 px-10">
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
    <footer className="bg-black border-t-[3px] border-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-golden border-[3px] border-white rounded-[4px] shadow-[3px_3px_0px_#FFD93D] flex items-center justify-center">
                <span className="font-[var(--font-mono)] font-bold text-lg text-black">C</span>
              </div>
              <span className="font-[var(--font-display)] font-bold text-xl tracking-tight">CHITRAGUPT</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Named after the Hindu deity who maintains the permanent record of every soul&apos;s deeds. No forgetting. No forgiving. Just truth.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <h4 className="font-[var(--font-mono)] text-sm font-bold uppercase tracking-widest text-golden mb-2">Navigate</h4>
            {[
              { label: "Submit Evidence", href: "/submit" },
              { label: "Guardian Dashboard", href: "/guardian" },
              { label: "Public Vault", href: "/vault" },
            ].map((link) => (
              <a key={link.label} href={link.href} className="text-sm text-white/60 hover:text-golden transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          {/* Tech */}
          <div className="flex flex-col gap-3">
            <h4 className="font-[var(--font-mono)] text-sm font-bold uppercase tracking-widest text-golden mb-2">Technology</h4>
            <div className="flex flex-wrap gap-2">
              {["Solidity", "IPFS", "Arweave", "Chainlink", "Polygon", "Shamir"].map((tech) => (
                <span key={tech} className="px-3 py-1 text-xs font-bold border-2 border-white/20 rounded-[4px] text-white/80">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 font-[var(--font-mono)]">
            Open Source &bull; No Tracking &bull; Tor Compatible
          </p>
          <p className="text-xs text-white/40 font-[var(--font-mono)]">
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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
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
