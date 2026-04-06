"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ShabdKosh() {
  const sections = [
    { id: "preface", title: "Preface" },
    { id: "lexicon", title: "The Lexicon" },
    { id: "cryptography", title: "Cryptographic Architecture" },
    { id: "automation", title: "Decentralized Automation" },
    { id: "storage", title: "Immutable Storage" },
    { id: "opsec", title: "Operational Security" },
  ];

  const [activeSection, setActiveSection] = useState("preface");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
       window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 pb-32 pt-8 flex flex-col lg:flex-row gap-12">
      
      {/* Sticky Table of Contents Sidebar */}
      <aside className="lg:w-1/4 shrink-0">
         <div className="sticky top-32 brutal-card bg-ivory p-6">
            <h3 className="font-[var(--font-display)] font-bold text-2xl uppercase tracking-tight border-b-[4px] border-black pb-4 mb-4">
              Shabd Kosh <span className="text-sm font-[var(--font-mono)] block text-gray mt-1">v1.0 Documentation</span>
            </h3>
            <ul className="flex flex-col gap-2 font-[var(--font-mono)] font-bold text-sm uppercase">
               {sections.map(sec => (
                 <li key={sec.id}>
                   <button 
                     onClick={() => scrollTo(sec.id)}
                     className={`w-full text-left px-4 py-3 border-[3px] transition-all duration-200 ${activeSection === sec.id ? 'bg-black text-white border-black translate-x-2' : 'bg-white border-transparent hover:border-black hover:bg-golden text-charcoal'}`}
                   >
                     {activeSection === sec.id && <span className="mr-2 text-coral">&gt;</span>}
                     {sec.title}
                   </button>
                 </li>
               ))}
            </ul>
         </div>
      </aside>

      {/* Main Content Area */}
      <main className="lg:w-3/4 space-y-16">
        
        {/* Preface */}
        <section id="preface" className="scroll-mt-32">
          <div className="brutal-badge bg-black text-white inline-flex mb-4">01</div>
          <h1 className="font-[var(--font-display)] text-5xl md:text-6xl font-bold uppercase tracking-tight mb-8">
            The <span className="underline decoration-coral decoration-4 underline-offset-8">Preface</span>
          </h1>
          <div className="p-8 bg-white border-[4px] border-black shadow-[8px_8px_0px_#1A1A1A] text-lg font-medium text-charcoal space-y-6">
             <p>
               In an era of digital censorship, sovereign intelligence operations, and systemic suppression, truth is the most fragile commodity. The Chitragupt Protocol was engineered to solve a single mathematical problem: <strong>How can a volatile truth survive the absolute neutralization of its messenger?</strong>
             </p>
             <p>
               Chitragupt operates as a zero-trust, decentralized dead-man's switch. It requires no central servers, no administrators, and no trust. It utilizes state-of-the-art Web Crypto APIs to execute <code className="bg-gray-light px-2 py-1 border border-black font-[var(--font-mono)]">AES-256-GCM</code> entirely in your local RAM, splinters your decryption keys using <code className="bg-gray-light px-2 py-1 border border-black font-[var(--font-mono)]">Shamir's Secret Sharing</code>, and delegates those fragments to an anonymous network of digital guardians via the Polygon blockchain.
             </p>
          </div>
        </section>

        {/* The Lexicon */}
        <section id="lexicon" className="scroll-mt-32">
          <div className="brutal-badge bg-black text-white inline-flex mb-4">02</div>
          <h2 className="font-[var(--font-display)] text-5xl font-bold uppercase tracking-tight mb-8">The Lexicon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             
             <div className="bg-golden border-[4px] border-black p-6 group hover:-translate-y-2 transition-transform shadow-[6px_6px_0px_#1A1A1A]">
               <h4 className="font-[var(--font-display)] text-3xl font-bold uppercase mb-2">Satyavadi</h4>
               <span className="font-[var(--font-mono)] text-xs uppercase font-bold bg-white px-2 py-1 border-2 border-black inline-block mb-4">The Truth Teller (Whistleblower)</span>
               <p className="font-semibold text-sm">The instigator. The Satyavadi originates the evidence, encrypts it locally, defines the threshold variables, and is responsible for triggering the "Check-In" heartbeat function continuously.</p>
             </div>

             <div className="bg-coral text-white border-[4px] border-black p-6 group hover:-translate-y-2 transition-transform shadow-[6px_6px_0px_#1A1A1A]">
               <h4 className="font-[var(--font-display)] text-3xl font-bold uppercase mb-2">Yamadoot</h4>
               <span className="font-[var(--font-mono)] text-xs uppercase font-bold bg-black text-white px-2 py-1 border-2 border-white inline-block mb-4">The Guardian</span>
               <p className="font-semibold text-sm">The key carriers. Yamadoots are delegated specific, mathematically useless cryptographic shards. They do not know the other guardians, nor can they access the evidence unless the Dead-Man switch is triggered natively on-chain.</p>
             </div>

             <div className="bg-cyan border-[4px] border-black p-6 group hover:-translate-y-2 transition-transform shadow-[6px_6px_0px_#1A1A1A]">
               <h4 className="font-[var(--font-display)] text-3xl font-bold uppercase mb-2">Lekhaa</h4>
               <span className="font-[var(--font-mono)] text-xs uppercase font-bold bg-white px-2 py-1 border-2 border-black inline-block mb-4">The Vault Structure</span>
               <p className="font-semibold text-sm">A smart contract struct representing a single encrypted submission. It contains the IPFS CID of the ciphertext, the SHA-256 hash of the original file, the threshold geometry (N/K), and the timestamp blocks.</p>
             </div>

             <div className="bg-ivory border-[4px] border-black p-6 group hover:-translate-y-2 transition-transform shadow-[6px_6px_0px_#1A1A1A]">
               <h4 className="font-[var(--font-display)] text-3xl font-bold uppercase mb-2">Antim Sanket</h4>
               <span className="font-[var(--font-mono)] text-xs uppercase font-bold bg-black text-white px-2 py-1 border-2 border-black inline-block mb-4">The Final Signal</span>
               <p className="font-semibold text-sm">The fail-state. When the Satyavadi fails to ping the blockchain within their required interval (e.g., 72 hours), the Antim Sanket is logged. This legalizes the Yamadoots to publish their shards for public reconstruction.</p>
             </div>

          </div>
        </section>

        {/* Cryptography */}
        <section id="cryptography" className="scroll-mt-32">
          <div className="brutal-badge bg-black text-white inline-flex mb-4">03</div>
          <h2 className="font-[var(--font-display)] text-5xl font-bold uppercase tracking-tight mb-8">Cryptographic Architecture</h2>
          <div className="p-8 bg-white border-l-[8px] border-[4px] border-black border-l-cyan space-y-6">
             <h3 className="font-[var(--font-mono)] text-xl font-bold uppercase tracking-widest text-cyan mb-6">Pipeline Logic</h3>
             
             <div className="space-y-4">
               <div className="flex relative">
                 <div className="w-12 h-12 bg-black text-white border-2 border-black flex items-center justify-center font-[var(--font-display)] text-2xl font-bold z-10">1</div>
                 <div className="ml-4 pt-2">
                   <h5 className="font-bold uppercase text-lg">Symmetric Encryption</h5>
                   <p className="text-gray-700 font-medium">Your browser's <code className="bg-gray-100 p-1 border border-black/20">window.crypto.subtle</code> API generates an ephemeral AES-256-GCM symmetric key. The raw file buffer is encrypted into a Ciphertext blob entirely within client-side memory.</p>
                 </div>
               </div>

               <div className="flex relative items-start">
                 <div className="w-12 h-12 bg-black text-white border-2 border-black flex items-center justify-center font-[var(--font-display)] text-2xl font-bold z-10 shrink-0">2</div>
                 <div className="ml-4 pt-2">
                   <h5 className="font-bold uppercase text-lg">Shamir's Secret Sharing (Decentralized Threshold)</h5>
                   <p className="text-gray-700 font-medium mb-4">The ephemeral AES key is instantly destroyed, but not before being mathematically fractured into <em>N</em> poly-shards using a cryptographic geometry algorithm developed by Adi Shamir. A minimum of <em>K</em> shards are required to intersect and mathematically derive the original master key.</p>
                   
                   <div className="bg-black text-green-400 font-[var(--font-mono)] text-sm p-4 rounded-[4px] overflow-hidden">
                     <div className="opacity-50 select-none">// Example Threshold: K=3, N=5</div>
                     <div><span className="text-coral">Shard 1:</span> 80164db6e5b41052...</div>
                     <div><span className="text-coral">Shard 2:</span> 802d3ac1a77421ab...</div>
                     <div><span className="text-coral">Shard 3:</span> 8031a0e9b9c8da42...</div>
                     <div className="text-white mt-2">&gt; Intersecting 3 curves reveals Y-intercept (AES Key).</div>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </section>

        {/* Decentralized Automation */}
        <section id="automation" className="scroll-mt-32">
          <div className="brutal-badge bg-black text-white inline-flex mb-4">04</div>
          <h2 className="font-[var(--font-display)] text-5xl font-bold uppercase tracking-tight mb-8">Decentralized Automation</h2>
          
          <div className="brutal-card bg-ivory p-0 overflow-hidden flex flex-col md:flex-row shadow-[8px_8px_0px_#1A1A1A]">
            <div className="md:w-1/3 border-b-[4px] md:border-b-0 md:border-r-[4px] border-black bg-coral p-8 flex flex-col justify-center">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="text-white mb-6">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <h3 className="font-[var(--font-display)] text-4xl font-bold text-white uppercase leading-none">Keeper Nodes</h3>
            </div>
            <div className="md:w-2/3 p-8 bg-white font-medium text-lg flex flex-col justify-center">
              <p className="mb-4 text-charcoal">
                Relying on a traditional server cron-job to check the Dead-Man switch is a centralized vulnerability (servers can be seized or shut down).
              </p>
              <p className="text-charcoal">
                Chitragupt relies on **Chainlink Keepers** on the Polygon network. It utilizes an independent, oracle-based network of decentralized hardware nodes that constantly read the blockchain state. If `block.timestamp &gt; lastCheckin + interval`, the Keeper network autonomously transactions the `triggerSanket()` function, definitively unsealing the vault geometry without human intervention.
              </p>
            </div>
          </div>
        </section>

        {/* Immutable Storage */}
        <section id="storage" className="scroll-mt-32">
          <div className="brutal-badge bg-black text-white inline-flex mb-4">05</div>
          <h2 className="font-[var(--font-display)] text-5xl font-bold uppercase tracking-tight mb-8">Permanence Protocol</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border-[4px] border-black bg-white shadow-[6px_6px_0px_#1A1A1A]">
               <h4 className="font-[var(--font-mono)] text-xl font-bold uppercase tracking-widest text-black mb-4">IPFS Routing</h4>
               <p className="font-medium text-gray-700">The encrypted AES payload is initially deployed to the InterPlanetary File System via Web3.Storage. Data is content-addressed, meaning the routing ID is a hash of the file itself. It cannot be altered without changing the ID entirely.</p>
            </div>
            <div className="p-8 border-[4px] border-black bg-white shadow-[6px_6px_0px_#1A1A1A]">
               <h4 className="font-[var(--font-mono)] text-xl font-bold uppercase tracking-widest text-black mb-4">Arweave Backbone</h4>
               <p className="font-medium text-gray-700">To prevent IPFS garbage collection from destroying the evidence, the cipher-node is backed into the Arweave 'Permaweb'. An endowment is paid upfront guaranteeing the persistence of the encrypted block for 200+ years.</p>
            </div>
          </div>
        </section>

        {/* OpSec */}
        <section id="opsec" className="scroll-mt-32">
          <div className="brutal-badge bg-black text-white inline-flex mb-4">06</div>
          <h2 className="font-[var(--font-display)] text-5xl font-bold uppercase tracking-tight mb-8">Operational Security Warnings</h2>
          
          <div className="p-8 bg-red-500 text-white border-[4px] border-black shadow-[8px_8px_0px_#1A1A1A] group">
            <div className="flex items-center gap-4 mb-6 border-b-4 border-black pb-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="square">
                 <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                 <line x1="12" y1="9" x2="12" y2="13"/>
                 <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <h3 className="font-[var(--font-display)] text-4xl font-bold uppercase tracking-tighter">Crucial Disclaimers</h3>
            </div>
            <ul className="list-disc list-outside ml-6 font-bold text-lg space-y-4">
               <li>There is no protocol that can save you if your local machine is compromised. Do not upload payloads from machines infected with hardware rootkits or sophisticated spyware.</li>
               <li>Use the Tor Browser to obfuscate your metadata (IP address, location) while interfacing with the Chitragupt HTTP frontend.</li>
               <li>When funding the Gas fee to deploy the Lekhaa smart contract transaction, use a 'burner' wallet funded through a non-KYC exchange or a cryptocurrency tumbler (Tornado Cash equivalents) to avoid wallet-trail doxxing.</li>
            </ul>
          </div>
        </section>

      </main>
    </div>
  );
}
