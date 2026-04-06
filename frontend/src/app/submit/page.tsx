"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import secrets from "secrets.js-grempe";

// brutalist icons (SVG)
const UploadIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const LockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export default function SubmitEvidence() {
  const [file, setFile] = useState<File | null>(null);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [encryptionDone, setEncryptionDone] = useState(false);

  const [threshold, setThreshold] = useState(3);
  const [totalShards, setTotalShards] = useState(5);
  const [guardians, setGuardians] = useState<string[]>(Array(5).fill(""));

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024 // 50MB
  });

  const handleGuardianChange = (index: number, value: string) => {
    const newGuardians = [...guardians];
    newGuardians[index] = value;
    setGuardians(newGuardians);
  };

  const handleTotalShardsChange = (val: number) => {
    setTotalShards(val);
    setGuardians(Array(val).fill(""));
    if (threshold > val) setThreshold(val);
  };

  const processEncryption = async () => {
    if (!file) return;
    setIsEncrypting(true);
    
    // Simulate encryption loop for UI demonstration
    setTimeout(() => {
      // 1. Generate AES Crypto Key
      // 2. Encrypt Buffer
      // 3. Shamir Secret Share execution mapping
      const hexSecret = secrets.str2hex("SampleAESKeyGenerated_256GCM_LocalMemory");
      const shares = secrets.share(hexSecret, totalShards, threshold);
      console.log("[CHITRAGUPT_ENGINE] Secure Shards Generated in Memory:", shares);
      
      setIsEncrypting(false);
      setEncryptionDone(true);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-32">
      {/* Header */}
      <div className="mb-12 mt-8">
        <div className="brutal-badge bg-coral text-white inline-flex mb-4 transform -rotate-1">Lekhaa Darj</div>
        <h1 className="font-[var(--font-display)] text-5xl md:text-6xl font-bold leading-tight">
          Submit <span className="text-coral underline decoration-black decoration-4 underline-offset-8">Saakshya</span>
        </h1>
        <p className="text-gray text-lg font-medium mt-4 max-w-2xl bg-white p-3 border-2 border-black inline-block shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
          Everything happens locally in your browser RAM. Your raw evidence never touches an external server.
        </p>
      </div>

      <div className="space-y-8 relative">
        {/* Step 1 */}
        {!encryptionDone && (
          <div className="brutal-card p-8 bg-white relative overflow-hidden group">
            {isEncrypting && (
              <div className="absolute inset-0 bg-white/90 z-20 flex flex-col items-center justify-center backdrop-blur-sm">
                <div className="brutal-skeleton w-80 h-24 mb-6" /> {/* Uses our new animation */}
                <h3 className="font-[var(--font-display)] text-2xl font-bold text-black uppercase animate-pulse">Running AES-256 Crypto loop</h3>
                <p className="text-sm font-bold font-[var(--font-mono)] text-white uppercase tracking-widest mt-2 bg-coral px-4 border border-black shadow-[2px_2px_0px_#1A1A1A]">SubtleCrypto Executing...</p>
              </div>
            )}

            <div className="flex items-center gap-4 mb-6">
               <div className="w-10 h-10 bg-golden border-[3px] border-black flex items-center justify-center font-[var(--font-mono)] font-bold text-xl shadow-[2px_2px_0px_#1A1A1A]">01</div>
               <h2 className="font-[var(--font-display)] text-2xl font-bold uppercase tracking-tight">Select Raw Evidence</h2>
            </div>
            
            <div 
              {...getRootProps()} 
              className={`
                border-4 border-dashed border-black bg-ivory p-12 flex flex-col items-center justify-center
                cursor-pointer transition-all duration-300 relative min-h-[250px]
                ${isDragActive ? 'bg-golden border-solid shadow-[inset_0px_0px_30px_rgba(0,0,0,0.1)] scale-[1.02]' : 'hover:bg-gray-light hover:shadow-[4px_4px_0px_#1A1A1A] hover:-translate-y-1 hover:-translate-x-1'}
              `}
            >
              <input {...getInputProps()} />
              <div className="w-20 h-20 bg-white border-[3px] border-black rounded-[4px] flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,0.15)] mb-6 group-hover:bg-coral group-hover:text-white transition-colors group-hover:rotate-6">
                <UploadIcon />
              </div>
              <p className="font-[var(--font-mono)] font-bold text-xl text-center text-black mb-2 tracking-wide uppercase">
                {isDragActive ? 'DROP TO ENCRYPT' : 'Drag & Drop File Here'}
              </p>
              <p className="text-sm font-semibold text-gray text-center max-w-sm">
                Max size 50MB. We construct recursive chunks locally to ensure Web3.Storage persistence.
              </p>

              {file && (
                <div className="absolute inset-x-4 bottom-4 bg-black p-4 border-[3px] border-cyan flex justify-between items-center transform rotate-1">
                  <div className="flex flex-col truncate w-full">
                     <span className="font-[var(--font-mono)] text-sm font-bold text-cyan tracking-wider truncate">&gt; {file.name}</span>
                     <span className="font-[var(--font-mono)] text-xs text-white/50">{(file.size / 1024 / 1024).toFixed(3)} MB [{file.type}]</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 2 */}
        {file && !encryptionDone && (
           <div className={`brutal-card p-8 bg-white transition-opacity duration-1000 ${isEncrypting ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-10 h-10 bg-golden border-[3px] border-black flex items-center justify-center font-[var(--font-mono)] font-bold text-xl shadow-[2px_2px_0px_#1A1A1A]">02</div>
                 <h2 className="font-[var(--font-display)] text-2xl font-bold uppercase tracking-tight">Yamadoot Parameters</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                 <div className="flex flex-col gap-3">
                    <label className="font-[var(--font-mono)] text-sm font-bold tracking-widest uppercase">Total Guardians (N)</label>
                    <input 
                      type="number" min={3} max={10} 
                      value={totalShards} onChange={(e) => handleTotalShardsChange(Number(e.target.value))}
                      className="w-full h-14 bg-ivory border-[3px] border-black px-4 font-[var(--font-mono)] text-xl font-bold shadow-[3px_3px_0px_#1A1A1A] focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_#FF6B6B] transition-shadow"
                    />
                 </div>
                 <div className="flex flex-col gap-3">
                    <label className="font-[var(--font-mono)] text-sm font-bold tracking-widest uppercase">Threshold Required (K)</label>
                    <input 
                      type="number" min={2} max={totalShards} 
                      value={threshold} onChange={(e) => setThreshold(Number(e.target.value))}
                      className="w-full h-14 bg-ivory border-[3px] border-black px-4 font-[var(--font-mono)] text-xl font-bold shadow-[3px_3px_0px_#1A1A1A] focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_#FF6B6B] transition-shadow"
                    />
                 </div>
              </div>

              <div className="space-y-4 bg-gray-light p-6 border-[3px] border-black">
                <label className="font-[var(--font-mono)] text-[0.65rem] font-bold tracking-widest uppercase block mb-2 opacity-60">ETH Address Mapping</label>
                {guardians.map((g, idx) => (
                  <div key={idx} className="flex relative items-center">
                    <div className="absolute left-0 w-14 h-14 bg-black border-y-[3px] border-l-[3px] border-black flex items-center justify-center text-golden font-[var(--font-mono)] font-bold text-xl">
                       {idx + 1}
                    </div>
                    <input 
                      type="text" placeholder="0x..." value={g} onChange={(e) => handleGuardianChange(idx, e.target.value)}
                      className="w-full h-14 pl-16 pr-4 bg-white border-[3px] border-black font-[var(--font-mono)] focus:outline-none focus:ring-4 ring-cyan transition-shadow placeholder:text-gray/50 font-bold"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <button 
                  onClick={processEncryption}
                  disabled={!file || isEncrypting || guardians.some(g => g === "")}
                  className="brutal-btn brutal-btn-dark px-10 py-6 text-xl w-full disabled:opacity-50 disabled:cursor-not-allowed group transition-all !justify-center"
                >
                  <LockIcon /> GENERATE SECURE SHARDS
                  <div className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform h-full"/>
                </button>
              </div>
           </div>
        )}

        {/* Success State */}
        {encryptionDone && (
           <div className="brutal-card p-12 bg-cyan relative overflow-hidden animate-fade-in-up">
             <div className="absolute inset-0 dot-grid opacity-30" />
             <div className="relative z-10 text-center flex flex-col items-center">
                <div className="w-24 h-24 bg-white border-[4px] border-black flex items-center justify-center shadow-[6px_6px_0px_#1A1A1A] mb-8 group overflow-hidden">
                  <div className="absolute inset-0 bg-coral w-full h-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" className="relative z-10 group-hover:stroke-white">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h2 className="font-[var(--font-display)] text-5xl font-bold uppercase mb-4 tracking-tight leading-none bg-white p-2 border-2 border-black -rotate-1">Client Pipeline Ready</h2>
                
                <div className="bg-white border-[4px] border-black p-6 text-left w-full max-w-2xl mb-8 mt-6 relative shadow-[8px_8px_0px_rgba(0,0,0,0.2)]">
                  <span className="absolute -top-3 -right-3 w-6 h-6 bg-coral border-2 border-black flex items-center justify-center animate-ping"></span>
                  <p className="font-[var(--font-mono)] text-sm font-bold text-gray uppercase tracking-widest mb-4 border-b-2 border-black/10 pb-2">Local RAM Execution Log</p>
                  <ul className="space-y-4 font-[var(--font-mono)] flex flex-col">
                    <li className="text-black bg-ivory p-2 border border-black text-xs sm:text-sm font-bold shadow-[2px_2px_0px_#1A1A1A]">&gt; Symmetric Key Gen: Success</li>
                    <li className="text-black bg-ivory p-2 border border-black text-xs sm:text-sm font-bold shadow-[2px_2px_0px_#1A1A1A]">&gt; Hash Output: 0x82a9...c4fb</li>
                    <li className="text-black bg-golden p-2 border border-black text-xs sm:text-sm font-bold shadow-[2px_2px_0px_#1A1A1A]">&gt; Created {totalShards} Unique Poly-Shards</li>
                    <li className="text-charcoal flex justify-between animate-pulse mt-4">&gt; Preparing Metamask Transaction <span>[Pending]</span></li>
                  </ul>
                </div>

                <div className="flex gap-4 w-full max-w-2xl">
                  <button className="brutal-btn brutal-btn-dark flex-1 py-6 text-lg tracking-widest h-auto">
                    SIGN TRANSACTION
                  </button>
                  <button onClick={() => window.location.reload()} className="brutal-btn brutal-btn-white py-6 px-12 text-lg h-auto border-black">
                    ABORT
                  </button>
                </div>
             </div>
           </div>
        )}
      </div>
    </div>
  );
}
