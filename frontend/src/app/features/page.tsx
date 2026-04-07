"use client";
import React from "react";
import Link from "next/link";

const FeatureCard = ({ title, desc, number, color }: { title: string, desc: string, number: string, color: string }) => (
  <div className={`border-4 border-black p-6 relative group bg-white hover:${color} transition-colors shadow-[8px_8px_0_0_#000]`}>
    <div className="absolute -top-6 -right-6 text-6xl font-[var(--font-mono)] font-black text-black/10 group-hover:text-black/20 transition-all">
      {number}
    </div>
    <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-bold text-xl mb-6 font-[var(--font-mono)]">
      {number}
    </div>
    <h3 className="text-2xl font-black mb-4 font-[var(--font-display)] uppercase">{title}</h3>
    <p className="font-[var(--font-mono)] text-sm leading-relaxed">{desc}</p>
    <div className="mt-8 border-t-4 border-black pt-4">
      <div className="h-2 w-full bg-black/10">
        <div className={`h-full bg-black w-1/3 group-hover:w-full transition-all duration-500`}></div>
      </div>
    </div>
  </div>
);

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-ivory pt-32 pb-24 text-charcoal overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-golden/20 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-cyan/20 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-20 text-center sm:text-left relative">
          <div className="inline-block border-4 border-black bg-coral px-4 py-2 mb-6 shadow-[4px_4px_0_0_#000] rotate-[-2deg]">
            <span className="font-[var(--font-mono)] text-white font-bold tracking-widest text-sm uppercase">Protocol Architecture</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black uppercase font-[var(--font-display)] leading-[0.9] tracking-tighter mb-8">
            Engineered For
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral to-golden stroke-black stroke-2" style={{ WebkitTextStroke: '2px black' }}>
              Absolute Truth
            </span>
          </h1>
          <p className="max-w-2xl font-[var(--font-mono)] text-lg border-l-4 border-black pl-6 opacity-90 mx-auto sm:mx-0">
            Chitragupt utilizes military-grade client-side encryption fragmented across decentralized entities. Single points of failure have been mathematically eradicated.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            number="01"
            title="In-Browser Encryption"
            desc="AES-256-GCM encryption occurs entirely on the client side. Your plaintext evidence, files, and metadata never hit our servers. Only the encrypted ciphertext blob leaves your hardware."
            color="bg-cyan"
          />
          <FeatureCard 
            number="02"
            title="Shamir's Secret Sharing"
            desc="The master decryption key is instantly fragmented natively using Shamir's cryptographic algorithms. No single Guardian holds the complete key, preventing unilateral unsealing."
            color="bg-golden"
          />
          <FeatureCard 
            number="03"
            title="Decentralized Guardians"
            desc="Key shards are distributed to trusted third-party entities (journalists, independent watchdogs, legal counsels) known as Yamadoots. A threshold must cooperate to reconstruct the vault."
            color="bg-purple-300"
          />
          <FeatureCard 
            number="04"
            title="Dead Man Switch"
            desc="Automated Chainlink Keepers constantly monitor the whistleblower's check-in parameter. If the whistleblower goes missing, the system automatically triggers a decryption cascade."
            color="bg-red-400"
          />
          <FeatureCard 
            number="05"
            title="IPFS Immutable Storage"
            desc="Once encrypted, your evidence is pinned permanently onto the InterPlanetary File System (IPFS) and anchored to Arweave. It cannot be censored, taken down by DMCA, or deleted."
            color="bg-green-400"
          />
          <FeatureCard 
            number="06"
            title="Zero-Knowledge Identity"
            desc="Our SATYAVADI protocol (Upcoming) uses zk-SNARKs allowing whistleblowers to cryptographically prove they work for an organization without revealing their actual identity."
            color="bg-coral"
          />
        </div>

        {/* Action Call */}
        <div className="mt-24 border-4 border-black p-12 bg-black text-white text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 group-hover:scale-110 transition-transform duration-1000"></div>
          <h2 className="text-3xl sm:text-5xl font-black font-[var(--font-display)] uppercase mb-6 relative z-10">
            Trust the Math. <br/> Not the Server.
          </h2>
          <Link href="/submit" className="relative z-10 inline-flex items-center text-black font-bold font-[var(--font-mono)] bg-golden px-8 py-4 border-4 border-transparent hover:bg-white hover:border-white transition-all shadow-[6px_6px_0_0_#FFF] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]">
            INITIATE PROTOCOL
            <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="3" strokeLinecap="square" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </Link>
        </div>

      </div>
    </div>
  );
}
