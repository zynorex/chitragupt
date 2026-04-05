"use client";

import { useEffect } from "react";
import Link from "next/link";

/* ──────────── HOOKS ──────────── */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ──────────── PAGE ──────────── */
export default function AboutPage() {
  useScrollReveal();
  
  return (
    <div className="flex flex-col min-h-screen">
       {/* Hero Section */}
       <header className="py-24 sm:py-32 md:py-40 px-4 sm:px-6 lg:px-8 border-b-[4px] border-black bg-ivory">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
             <div className="brutal-badge bg-white mb-8 border-[3px] border-black px-4 py-2 font-[var(--font-mono)] font-bold text-sm sm:text-base tracking-widest text-charcoal shadow-[4px_4px_0px_#1A1A1A] reveal-on-scroll">
                THE MANIFESTO
             </div>
             <h1 className="font-[var(--font-display)] text-6xl sm:text-8xl md:text-9xl font-black leading-[0.9] tracking-tighter uppercase mb-8 reveal-on-scroll" style={{ animationDelay: '100ms' }}>
                Truth Is <br/><span className="text-coral underline decoration-8 sm:decoration-[16px] underline-offset-8">Absolute.</span>
             </h1>
             <p className="max-w-3xl text-xl sm:text-2xl font-[var(--font-mono)] font-bold text-charcoal leading-relaxed reveal-on-scroll" style={{ animationDelay: '200ms' }}>
                We believe that vital information belongs to humanity, not to corporations, corrupt governments, or systemic oppressors.
             </p>
          </div>
       </header>

       {/* Story / Lore Section */}
       <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden border-b-[4px] border-black">
          <div className="absolute top-0 right-0 p-12 text-[30rem] sm:text-[40rem] font-black text-black/5 pointer-events-none font-[var(--font-mono)] leading-none select-none z-0">
             C
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
             <div className="flex flex-col justify-center reveal-on-scroll">
                <h2 className="font-[var(--font-display)] text-5xl sm:text-7xl font-black uppercase tracking-tighter mb-8 text-black">
                   The <br/><span className="text-golden underline decoration-8 sm:decoration-8 underline-offset-8">Divine</span> Record
                </h2>
                <div className="space-y-6 text-lg sm:text-xl font-medium text-gray leading-relaxed font-[var(--font-mono)]">
                   <p>
                      In ancient mythology, <strong>Chitragupt</strong> is the cosmic accountant. The celestial scribe who maintains the Akashic records—logging every deed, every truth, every action without bias, forgetfulness, or corruption.
                   </p>
                   <p>
                      In the modern digital battleground, truth is constantly rewritten. Whistleblowers are silenced. Evidence is destroyed. Servers are seized. History is rewritten by the victors.
                   </p>
                   <p className="p-6 sm:p-8 border-[4px] border-black bg-ivory shadow-[8px_8px_0_#FF6B6B] text-black font-bold transform -rotate-1 hover:rotate-0 transition-transform">
                      Our protocol is the digital manifestation of this concept. A tamper-proof, decentralized vault where truth cannot be deleted, silenced, or surrendered.
                   </p>
                </div>
             </div>
             <div className="flex items-center justify-center reveal-on-scroll" style={{ animationDelay: '200ms' }}>
                <div className="w-full h-full min-h-[400px] border-[6px] border-black bg-black p-8 relative shadow-[16px_16px_0_#FFD93D] flex flex-col justify-between">
                   <div className="flex justify-between w-full">
                      <span className="w-4 h-4 bg-coral rounded-full animate-pulse" />
                      <span className="text-golden font-[var(--font-mono)] text-sm font-bold tracking-widest uppercase bg-white/10 px-2 border border-white/20">System Lore // Vol 1</span>
                   </div>
                   <div className="text-center relative py-12">
                      <div className="text-[6rem] sm:text-[10rem] font-bold text-white/[0.05] absolute inset-0 flex items-center justify-center pointer-events-none font-[var(--font-mono)]">
                         सत्यम्
                      </div>
                      <h3 className="font-[var(--font-display)] text-4xl sm:text-5xl font-black text-white relative z-10 leading-[1.1] tracking-tight">
                         IMMUTABLE.<br/>
                         FEARLESS.<br/>
                         PERMANENT.
                      </h3>
                   </div>
                   <div className="w-full border-t border-white/20 pt-4 mt-8 flex justify-between text-white/50 font-[var(--font-mono)] text-xs uppercase font-bold tracking-widest">
                      <span>Encryption: SECURE</span>
                      <span>Nodes: AMOY 482</span>
                   </div>
                </div>
             </div>
          </div>
       </section>

       {/* The Mechanics Detail */}
       <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col">
             <div className="brutal-badge bg-black text-white w-fit mb-12 border-[3px] border-golden px-6 py-2 shadow-[4px_4px_0_#FFD93D] reveal-on-scroll font-bold tracking-widest text-lg font-[var(--font-mono)] uppercase">
                SYSTEM MECHANICS
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                   { title: "ZERO TRUST", desc: "We don't know who you are. We don't want to know. Tor-friendly, zero accounts, no IP logs.", color: "bg-coral" },
                   { title: "SHARDED KEYS", desc: "No single authority holds the key. Shamir's Secret Sharing splits decompression keys across decentralized guardian nodes.", color: "bg-cyan" },
                   { title: "DEAD MANS SWITCH", desc: "Evidence remains locked until a time-lock expires without your check-in. If you vanish, the truth activates.", color: "bg-golden" }
                ].map((feature, idx) => (
                   <div key={idx} className="brutal-card bg-white border-[4px] border-black p-8 shadow-[8px_8px_0_#1A1A1A] hover:-translate-y-2 hover:shadow-[12px_12px_0_#1A1A1A] transition-all flex flex-col justify-between h-auto min-h-[350px] reveal-on-scroll" style={{ animationDelay: `${idx * 150}ms` }}>
                      <div>
                         <div className={`w-16 h-16 ${feature.color} border-[3px] border-black rounded-full mb-8 shadow-[inset_4px_4px_0_rgba(255,255,255,0.4)] flex items-center justify-center font-[var(--font-mono)] font-bold text-2xl text-black`}>
                           0{idx + 1}
                         </div>
                         <h3 className="font-[var(--font-display)] text-3xl font-black uppercase mb-4 tracking-tight text-black">{feature.title}</h3>
                         <p className="font-[var(--font-mono)] text-base font-bold text-gray leading-relaxed">
                            {feature.desc}
                         </p>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </section>

       {/* CTA to Main Action */}
       <section className="py-32 px-4 sm:px-6 lg:px-8 bg-black border-t-[8px] border-golden text-white relative overflow-hidden">
          {/* Subtle grid pattern for dark bg */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          
          <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center reveal-on-scroll">
             <div className="w-16 h-16 border-4 border-coral rounded-full flex items-center justify-center mb-8">
                <div className="w-4 h-4 bg-coral rounded-full animate-ping" />
             </div>
             <h2 className="font-[var(--font-display)] text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12">
                Ready to break <br className="hidden sm:block"/> your silence?
             </h2>
             <Link href="/submit" className="brutal-btn bg-golden text-black border-[4px] border-white shadow-[8px_8px_0_#FF6B6B] hover:bg-white hover:text-black py-6 px-12 text-xl font-bold font-[var(--font-mono)] uppercase tracking-widest inline-flex items-center gap-4 transition-all hover:scale-105 active:scale-95 group">
                ENTER THE VAULT
                <svg className="w-8 h-8 group-hover:translate-x-2 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
             </Link>
          </div>
       </section>
    </div>
  );
}
