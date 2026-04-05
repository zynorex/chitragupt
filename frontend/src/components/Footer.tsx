import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t-[6px] border-black text-ivory relative overflow-hidden pt-20 pb-8 z-10 w-full mt-auto">
      
      {/* Decorative Blueprint Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: "linear-gradient(#fff 2px, transparent 2px), linear-gradient(90deg, #fff 2px, transparent 2px)", 
          backgroundSize: "60px 60px",
          backgroundPosition: "center center"
        }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-16">
          
          {/* Left Column - Massive Brand Presentation */}
          <div className="lg:col-span-7 flex flex-col items-start gap-8">
            <div className="flex flex-col group">
              <span className="font-[var(--font-mono)] text-golden font-bold uppercase tracking-[0.3em] mb-2 border-l-4 border-golden pl-3">Protocol Architecture</span>
              <h2 className="font-[var(--font-display)] text-6xl sm:text-7xl lg:text-[5.5rem] font-black leading-[0.85] tracking-tighter text-white hover-glitch transition-all">
                CHITRAGUPT
              </h2>
            </div>
            
            <p className="text-xl lg:text-2xl max-w-md font-bold text-white/80 leading-snug">
              Permanent, uncensorable truth storage. 
              Built for the fearless. Designed to outlast.
            </p>

            {/* Social / Open Source Links */}
            <div className="flex gap-4 mt-4">
              <a href="https://github.com/zynorex/chitragupt" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-black border-2 border-white/20 flex items-center justify-center hover:border-coral hover:bg-coral hover:text-black transition-all group shadow-[4px_4px_0_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1">
                <span className="font-[var(--font-mono)] font-bold text-lg text-white group-hover:text-black">GH</span>
              </a>
              <a href="https://x.com/ayusheith" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-black border-2 border-white/20 flex items-center justify-center hover:border-cyan hover:bg-cyan hover:text-black transition-all group shadow-[4px_4px_0_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1">
                <span className="font-[var(--font-mono)] font-bold text-lg text-white group-hover:text-black">X</span>
              </a>
              <a href="https://github.com/zynorex/chitragupt" target="_blank" rel="noopener noreferrer" className="px-6 h-14 bg-black border-2 border-white/20 flex items-center justify-center hover:border-golden hover:bg-golden hover:text-black transition-all group shadow-[4px_4px_0_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1">
                <span className="font-[var(--font-mono)] font-bold tracking-widest text-white group-hover:text-black">READ_DOCS</span>
              </a>
            </div>
          </div>

          {/* Right Column - Navigation & Tech */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 w-full pt-4 lg:pt-0">
            {/* Sitemap */}
            <div className="flex flex-col gap-6">
              <h4 className="font-[var(--font-mono)] text-sm font-bold uppercase tracking-widest text-black bg-coral inline-block w-fit px-3 py-1 border border-black shadow-[2px_2px_0_#fff]">Sitemap</h4>
              <nav className="flex flex-col gap-4">
                {["Overview", "Mechanism", "Guardian Protocol", "Submit Evidence"].map(link => (
                  <Link key={link} href={`/#${link.toLowerCase().replace(/ /g, "-")}`} className="font-[var(--font-display)] text-xl font-bold text-white/80 hover:text-white hover:translate-x-3 transition-transform flex items-center gap-2 group">
                    <span className="text-golden opacity-0 transform -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all font-[var(--font-mono)]">&gt;</span> 
                    {link}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Network Data */}
            <div className="flex flex-col gap-6">
              <h4 className="font-[var(--font-mono)] text-sm font-bold uppercase tracking-widest text-black bg-cyan inline-block w-fit px-3 py-1 border border-black shadow-[2px_2px_0_#fff]">System Data</h4>
              <div className="flex flex-col gap-5 font-[var(--font-mono)] text-xs text-white/50">
                <div className="group cursor-default">
                  <span className="text-white block mb-1 font-bold group-hover:text-cyan transition-colors">CONTRACT_ID</span>
                  <span className="text-golden truncate w-full block bg-white/5 p-2 border border-white/10">0x7F4B...99a1</span>
                </div>
                <div className="group cursor-default">
                  <span className="text-white block mb-1 font-bold group-hover:text-coral transition-colors">STORAGE</span>
                  <span className="text-white block bg-white/5 p-2 border border-white/10">IPFS / ARWEAVE</span>
                </div>
                <div className="group cursor-default">
                  <span className="text-white block mb-1 font-bold group-hover:text-golden transition-colors">ENCRYPTION</span>
                  <span className="text-white block bg-white/5 p-2 border border-white/10">AES-256-GCM / SHSS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Massive Middle Terminal Block */}
        <div className="mt-20 w-full brutal-card bg-ivory border-[4px] border-black p-6 sm:p-8 hover:-translate-y-2 transition-transform shadow-[12px_12px_0_#FFD93D] group">
           <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6 w-full">
                {/* Visual Loader inside footer */}
                <div className="w-16 h-16 bg-black flex items-center justify-center shrink-0 border-[3px] border-black shadow-[inset_0_0_15px_rgba(255,107,107,0.5)]">
                  <div className="w-8 h-8 rounded-full border-4 border-coral border-t-transparent animate-spin" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-[var(--font-display)] text-2xl sm:text-3xl font-black text-black group-hover:text-coral transition-colors uppercase tracking-tight">Amoy Network Active</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <p className="font-[var(--font-mono)] text-sm text-gray font-bold uppercase tracking-wider">Node 482 Syncing &bull; Decryption Ready</p>
                  </div>
                </div>
              </div>
              <Link href="/submit" className="shrink-0 brutal-btn brutal-btn-primary py-5 px-10 w-full md:w-auto text-center border-[3px] text-lg">
                SUBMIT EVIDENCE
              </Link>
           </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t-2 border-white/10 flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12 pb-8">
          <p className="font-[var(--font-mono)] text-sm text-white/50 tracking-widest font-bold whitespace-nowrap">
            &copy; {new Date().getFullYear()} CHITRAGUPT PROTOCOL
          </p>
          <div className="w-full flex-1 border-t border-white/10 hidden lg:block" />
          <div className="text-3xl sm:text-4xl md:text-6xl font-black font-[var(--font-display)] text-white/10 tracking-tighter hover:text-white/20 transition-colors cursor-default whitespace-nowrap overflow-hidden text-center">
            सत्यम् एव जयते
          </div>
        </div>

      </div>
    </footer>
  );
}
