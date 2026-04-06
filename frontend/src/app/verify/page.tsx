"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function VerifyEvidence() {
  const [fileHash, setFileHash] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const buffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setFileHash("0x" + hashHex);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-32 pt-8">
      <div className="text-center mb-12 border-b-[4px] border-black pb-12">
        <div className="brutal-badge bg-golden text-black inline-flex mb-4">Satyanisht Pramaan</div>
        <h1 className="font-[var(--font-display)] text-5xl md:text-6xl font-bold uppercase tracking-tight leading-none">
          Trust but <span className="underline decoration-coral decoration-4 underline-offset-8">Verify</span>
        </h1>
        <p className="mt-8 font-[var(--font-mono)] font-bold text-gray max-w-xl mx-auto bg-white p-4 border-2 border-black inline-block shadow-[4px_4px_0px_#1A1A1A]">
          Drop any downloaded evidence file here. Your browser will instantly calculate its SHA-256 hash locally.
        </p>
      </div>

      <div 
        {...getRootProps()} 
        className={`
          border-[4px] border-black bg-white p-16 flex flex-col items-center justify-center
          cursor-pointer transition-all duration-300 min-h-[350px] shadow-[8px_8px_0px_#1A1A1A] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#1A1A1A] group
          ${isDragActive ? 'bg-cyan' : ''}
        `}
      >
        <input {...getInputProps()} />
        <div className="w-24 h-24 bg-ivory border-[4px] border-black flex items-center justify-center mb-8 shadow-[inset_4px_4px_0px_rgba(0,0,0,0.1)] group-hover:bg-coral group-hover:text-white transition-colors">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
             <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <p className="font-[var(--font-display)] font-bold text-3xl uppercase tracking-tight text-center">
          {isDragActive ? 'Release to Compute SHA-256' : 'Drop File to Verify Hash'}
        </p>
      </div>

      {fileHash && (
        <div className="mt-12 brutal-card p-10 bg-ivory border-coral animate-fade-in-up">
           <span className="font-[var(--font-mono)] text-sm font-bold text-coral uppercase tracking-widest block mb-4">Local SHA-256 Checksum Computed:</span>
           <div className="bg-white border-[3px] border-black p-6 font-[var(--font-mono)] text-base md:text-lg font-bold break-all shadow-[inset_3px_3px_0px_rgba(0,0,0,0.1)]">
             {fileHash}
           </div>
           
           <div className="mt-8">
             <span className="font-[var(--font-mono)] text-xs font-bold text-gray uppercase tracking-widest block mb-2">Step 2: Compare against Polygon Protocol</span>
             <div className="flex flex-col md:flex-row gap-4">
               <input 
                 type="text" 
                 placeholder="Enter Blockchain Verified Hash (0x...)" 
                 className="flex-1 bg-white border-[3px] border-black px-6 py-4 font-[var(--font-mono)] font-bold focus:outline-none focus:ring-4 ring-cyan transition-all"
               />
               <button className="brutal-btn brutal-btn-dark px-10 py-4 text-lg">COMPARE</button>
             </div>
           </div>
        </div>
      )}
    </div>
  );
}
