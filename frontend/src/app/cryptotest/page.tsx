"use client";
import { useState } from "react";
import { secureEvidence, recoverEvidence, EncryptedPayload, Shard } from "@/lib/crypto";

export default function CryptoTestPage() {
  const [file, setFile] = useState<File | null>(null);
  const [encryptedInfo, setEncryptedInfo] = useState<{ payload: EncryptedPayload; shards: Shard[] } | null>(null);
  const [recoveredUrl, setRecoveredUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setEncryptedInfo(null);
      setRecoveredUrl(null);
      setError(null);
    }
  };

  const handleEncrypt = async () => {
    if (!file) return;
    try {
      setError(null);
      const start = performance.now();
      const result = await secureEvidence(file, 5, 3);
      const end = performance.now();
      console.log(`Encryption + Sharding took ${end - start}ms`);
      setEncryptedInfo({ payload: result.encryptedData, shards: result.shards });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDecrypt = async () => {
    if (!encryptedInfo || !file) return;
    try {
      setError(null);
      // Simulate taking exactly threshold shards (e.g. 3)
      const suppliedShards = encryptedInfo.shards.slice(0, 3);
      const start = performance.now();
      const recoveredFile = await recoverEvidence(
        encryptedInfo.payload,
        suppliedShards,
        file.type,
        "recovered-" + file.name
      );
      const end = performance.now();
      console.log(`Reconstruction + Decryption took ${end - start}ms`);
      
      if (recoveredUrl) {
        URL.revokeObjectURL(recoveredUrl);
      }
      const url = URL.createObjectURL(recoveredFile);
      setRecoveredUrl(url);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-[#FAFAFA] text-black">
      <h1 className="text-4xl font-bold border-4 border-black p-4 inline-block mb-8 shadow-[8px_8px_0_0_#000]">
        Crypto Engine Sandbox
      </h1>

      {error && (
        <div className="bg-red-500 text-white p-4 border-4 border-black font-bold mb-4 max-w-2xl">
          Error: {error}
        </div>
      )}

      <div className="border-4 border-black p-6 bg-white shadow-[8px_8px_0_0_#000] mb-8 max-w-2xl">
        <h2 className="text-2xl font-bold border-b-4 border-black pb-2 mb-4">1. Select Evidence</h2>
        <input type="file" onChange={handleFileChange} className="block w-full text-lg mb-4 cursor-pointer" />
        
        <button 
          onClick={handleEncrypt}
          disabled={!file}
          className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-bold py-2 px-6 border-4 border-black shadow-[4px_4px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
        >
          Encrypt & Split Key (5 parts, 3 threshold)
        </button>
      </div>

      {encryptedInfo && (
        <div className="border-4 border-black p-6 bg-yellow-300 shadow-[8px_8px_0_0_#000] mb-8 max-w-2xl overflow-hidden">
          <h2 className="text-2xl font-bold border-b-4 border-black pb-2 mb-4">2. Encrypted State</h2>
          <p><strong>Ciphertext Length:</strong> {encryptedInfo.payload.ciphertext.byteLength} bytes</p>
          <div className="mt-4">
            <h3 className="font-bold">Key Shards Generated:</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {encryptedInfo.shards.map((s, i) => (
                <li key={i} className="font-mono text-xs break-all">
                  Shard {s.id}: {s.data.slice(0, 30)}...{s.data.slice(-10)}
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={handleDecrypt}
            className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 border-4 border-black shadow-[4px_4px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            Recover File (Using Shards 1, 2 & 3)
          </button>
        </div>
      )}

      {recoveredUrl && (
        <div className="border-4 border-black p-6 bg-purple-300 shadow-[8px_8px_0_0_#000] max-w-2xl">
          <h2 className="text-2xl font-bold border-b-4 border-black pb-2 mb-4">3. Recovered Output</h2>
          <a 
            href={recoveredUrl} 
            download={file?.name ? "recovered-" + file.name : "evidence"}
            className="inline-block bg-white hover:bg-gray-100 text-black font-bold py-2 px-6 border-4 border-black shadow-[4px_4px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all mb-4"
          >
            Download Recovered Evidence
          </a>
          <div className="mt-4">
            {file?.type.startsWith('image/') && (
              <img src={recoveredUrl} alt="Recovered" className="max-w-full border-4 border-black" />
            )}
            {file?.type.startsWith('video/') && (
              <video src={recoveredUrl} controls className="max-w-full border-4 border-black" />
            )}
            {file?.type.startsWith('text/') && (
              <iframe src={recoveredUrl} className="w-full h-64 border-4 border-black bg-white" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
