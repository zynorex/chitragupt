"use client";

import { useState } from "react";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);

  // Mock State for UI architecture
  const mockVaults = [
    { id: 1, nextCheckin: "24h 12m", threshold: "3 of 5", status: "Active" },
    { id: 4, nextCheckin: "72h 00m", threshold: "2 of 3", status: "Active" }
  ];

  const handleCheckin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCheckedIn(true);
      setTimeout(() => setCheckedIn(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-32 pt-8">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end border-b-[4px] border-black pb-6 gap-6">
        <div>
           <div className="brutal-badge bg-cyan text-black inline-flex mb-4">Satyavadi Hub</div>
           <h1 className="font-[var(--font-display)] text-5xl md:text-6xl font-bold leading-tight">
             My <span className="underline decoration-coral decoration-4 underline-offset-8">Vaults</span>
           </h1>
        </div>
        <div className="w-full md:w-auto flex flex-col font-[var(--font-mono)] font-bold border-[3px] border-black bg-ivory shadow-[4px_4px_0px_#1A1A1A]">
           <div className="bg-black text-white px-4 py-1 text-xs tracking-widest uppercase">Connected Identity</div>
           <div className="px-4 py-3 text-lg">0xC4A...78B2</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Check-In Control Panel (Main focus) */}
        <div className="lg:col-span-1 border-[4px] border-black bg-coral p-8 shadow-[8px_8px_0px_#1A1A1A] relative overflow-hidden flex flex-col justify-between min-h-[450px]">
          <div className="absolute inset-0 dot-grid opacity-20" />
          
          <div className="relative z-10 text-center border-b-2 border-black/30 pb-4">
             <h2 className="font-[var(--font-display)] text-3xl font-bold uppercase text-white tracking-wide">Dead Man's Switch</h2>
             <p className="font-[var(--font-mono)] font-bold text-sm text-black mt-2 bg-white px-2 py-1 border-2 border-black inline-block shadow-[2px_2px_0px_#1A1A1A]">
                GLOBAL CHECK-IN
             </p>
          </div>

          <div className="relative z-10 flex flex-col items-center mt-8">
            <button 
              onClick={handleCheckin}
              disabled={loading}
              className={`
                w-48 h-48 rounded-full border-[6px] border-black flex flex-col items-center justify-center transition-all duration-200
                ${checkedIn ? 'bg-green-400 translate-y-4 shadow-none' : 'bg-white hover:bg-ivory shadow-[0px_15px_0px_#1A1A1A] active:translate-y-4 active:shadow-none'}
                ${loading ? 'opacity-80 pointer-events-none' : ''}
              `}
            >
               {loading ? (
                 <span className="font-[var(--font-mono)] font-bold text-black text-lg animate-pulse">TX WAITING</span>
               ) : checkedIn ? (
                 <>
                   <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="square">
                     <polyline points="20 6 9 17 4 12" />
                   </svg>
                   <span className="font-[var(--font-display)] font-extrabold text-black text-xl uppercase tracking-widest mt-2">SECURE</span>
                 </>
               ) : (
                 <>
                   <span className="font-[var(--font-display)] font-extrabold text-black text-3xl uppercase tracking-widest relative z-10">PUSH</span>
                   <span className="font-[var(--font-mono)] font-bold text-black text-[0.65rem] uppercase tracking-widest bg-yellow-300 px-2 mt-2 border-2 border-black shadow-[2px_2px_0px_#1A1A1A]">TO HEARTBEAT</span>
                 </>
               )}
            </button>
            <p className="font-[var(--font-mono)] text-center font-bold text-white text-xs mt-10 p-3 bg-black/20 border border-black/40">
              Execute `checkin()` to reset automation timers for all your active vaults simultaneously.
            </p>
          </div>
        </div>

        {/* Vaults List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-end border-b-[3px] border-black pb-2">
            <h3 className="font-[var(--font-mono)] font-bold text-xl uppercase tracking-widest">Active Deployments</h3>
            <span className="font-[var(--font-mono)] text-xs font-bold text-gray mb-1">TOTAL: {mockVaults.length}</span>
          </div>
          
          {mockVaults.map((vault) => (
            <div key={vault.id} className="brutal-card p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 group hover:bg-ivory">
              <div className="flex items-center gap-6">
                 <div className="w-16 h-16 bg-black border-[3px] border-black flex flex-col items-center justify-center text-golden shrink-0 shadow-[4px_4px_0px_#FFD93D] group-hover:-rotate-3 transition-transform">
                    <span className="text-[0.55rem] font-[var(--font-mono)] uppercase text-gray mb-1">ID</span>
                    <span className="text-2xl font-[var(--font-display)] font-bold leading-none">#{vault.id}</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="font-[var(--font-display)] font-bold text-2xl uppercase tracking-tight">IPFS+ARWEAVE COMBO</span>
                    <span className="font-[var(--font-mono)] text-sm font-bold text-gray bg-gray-light w-fit px-2 border border-black mt-1">Threshold: {vault.threshold}</span>
                 </div>
              </div>
              <div className="flex flex-col sm:items-end border-t-2 sm:border-t-0 sm:border-l-2 border-black/10 pt-4 sm:pt-0 sm:pl-6">
                <span className="font-[var(--font-mono)] text-xs text-charcoal font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-coral animate-pulse" /> Triggers In
                </span>
                <span className="font-[var(--font-display)] text-4xl font-bold text-black border-b-[3px] border-coral pb-1 group-hover:scale-105 transition-transform origin-right">
                  {checkedIn ? "72h 00m" : vault.nextCheckin}
                </span>
              </div>
            </div>
          ))}

          {mockVaults.length === 0 && (
            <div className="border-[4px] border-dashed border-black/20 p-16 flex flex-col items-center justify-center bg-white text-center">
               <span className="font-[var(--font-mono)] text-gray font-bold text-lg mb-4">No active Vaults located on Polygon.</span>
               <a href="/submit" className="brutal-btn brutal-btn-primary">CREATE LEKHAA</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
