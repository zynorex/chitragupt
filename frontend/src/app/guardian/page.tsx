"use client";

import { useState } from "react";

export default function GuardianDashboard() {
  const [selectedVault, setSelectedVault] = useState<number | null>(null);

  const mockVaults = [
    { id: 4, triggerStatus: "TRIGGERED", threshold: "2 of 3", shardsCollected: 1, myShard: "hex..." },
    { id: 8, triggerStatus: "SECURE", threshold: "5 of 7", shardsCollected: 0, myShard: "hex..." },
  ];

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-32 pt-8">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end border-b-[4px] border-black pb-6 gap-6">
         <div>
            <div className="brutal-badge bg-black text-white inline-flex mb-4">Yamadoot Terminal</div>
            <h1 className="font-[var(--font-display)] text-5xl md:text-6xl font-bold leading-tight uppercase">
              Guardian <span className="text-cyan underline decoration-black decoration-4 underline-offset-8">Operations</span>
            </h1>
         </div>
         <div className="w-full md:w-auto flex flex-col font-[var(--font-mono)] font-bold border-[3px] border-black bg-white shadow-[4px_4px_0px_#1A1A1A]">
            <div className="bg-black text-white px-4 py-1 text-xs tracking-widest uppercase">Guardian Identity</div>
            <div className="px-4 py-3 text-lg">0xF0D...19A8</div>
         </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
         {mockVaults.map((vault) => (
           <div key={vault.id} className={`brutal-card p-0 overflow-hidden flex flex-col md:flex-row transition-all duration-500 shadow-[8px_8px_0px_#1A1A1A] ${vault.triggerStatus === 'TRIGGERED' ? 'border-coral' : 'border-black'}`}>
              <div className={`p-8 md:w-1/3 border-b-[4px] md:border-b-0 md:border-r-[4px] flex flex-col justify-center relative overflow-hidden ${vault.triggerStatus === 'TRIGGERED' ? 'bg-coral text-white border-coral' : 'bg-gray-light text-black border-black'}`}>
                 <div className="absolute inset-0 dot-grid opacity-20" />
                 <div className="relative z-10">
                   <span className="font-[var(--font-mono)] font-bold text-sm tracking-widest uppercase mb-2 block object-cover">Vault Target</span>
                   <span className="font-[var(--font-display)] font-extrabold text-7xl block leading-none">#{vault.id}</span>
                   <span className={`inline-block mt-4 px-3 py-1 font-[var(--font-mono)] font-bold text-xs uppercase border-2 shadow-[2px_2px_0px_#1A1A1A] ${vault.triggerStatus === 'TRIGGERED' ? 'bg-white text-coral border-white' : 'bg-white border-black text-black'}`}>
                     Status: {vault.triggerStatus}
                   </span>
                 </div>
              </div>
              
              <div className="p-8 flex-1 bg-white flex flex-col justify-center relative">
                 {vault.triggerStatus === 'SECURE' ? (
                   <div className="flex flex-col items-center text-center">
                     <div className="w-16 h-16 bg-white border-[3px] border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,0.15)] mb-6">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                       </svg>
                     </div>
                     <h3 className="font-[var(--font-display)] font-bold text-3xl uppercase tracking-tight">Evidence remains Sealed</h3>
                     <p className="font-[var(--font-mono)] font-bold text-sm text-gray mt-2 bg-ivory px-4 py-2 border border-black/10">The whistleblower continues to check in. No action required.</p>
                   </div>
                 ) : (
                   <div className="flex flex-col w-full h-full justify-between">
                     <div className="mb-8">
                       <h3 className="font-[var(--font-display)] font-bold text-3xl uppercase text-coral mb-2 flex items-center gap-3">
                         <span className="animate-ping w-3 h-3 bg-coral rounded-full inline-block" />
                         Dead Man Switch Triggered
                       </h3>
                       <p className="font-[var(--font-mono)] font-bold text-sm text-charcoal bg-ivory p-4 border-l-[4px] border-coral">The automated check-in missed its interval. You are now permitted by the smart contract parameters to submit your cryptographic piece.</p>
                     </div>
                     
                     <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-end font-[var(--font-mono)] font-bold border-b-[3px] border-black pb-2">
                           <span className="text-sm uppercase tracking-widest text-gray">Shards Collected / Threshold</span>
                           <span className="text-2xl text-coral">{vault.shardsCollected} / {vault.threshold}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 mt-4">
                          <div className="flex-1 relative">
                            <input type="text" readOnly value="****************************************" className="w-full bg-ivory border-[3px] border-black px-4 py-4 font-[var(--font-mono)] font-bold text-sm text-gray focus:outline-none focus:bg-white" />
                            <div className="absolute top-0 right-0 h-full px-4 flex items-center border-l-[3px] border-black bg-golden text-xs font-[var(--font-mono)] font-bold uppercase cursor-pointer hover:bg-black hover:text-white transition-colors">
                              Reveal Shard
                            </div>
                          </div>
                          <button className="brutal-btn brutal-btn-dark py-4 px-8 text-sm whitespace-nowrap">PUBLISH SHARD</button>
                        </div>
                     </div>
                   </div>
                 )}
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}
